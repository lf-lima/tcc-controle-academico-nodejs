import { ActiveChat, ChatUser } from '#business/dto/chat/chatDtos'
import { ISocketService } from '#business/services/iSocketService'
import { Server, Socket } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

export class ChatService implements ISocketService {
  constructor (
    private io: Server
  ) { }

  private socketsOnline: Socket[] = []
  private usersOnline: ChatUser[] = []
  private chatsActive: ActiveChat[]  = []
  private institutionsRooms: string[] = []

  init (): void {
    this.io.on('connection', socket => {
      let currentUser: ChatUser
      console.log('a user connected')
      this.socketsOnline.push(socket)

      socket.on('login', (data) => {
        console.log(`a user ${data.username} connected`)

        const existingUser = this.usersOnline.find(u => u.userId === data.userId)

        if (!existingUser) {
          currentUser = {
            socketId: socket.id,
            username: data.username,
            userId: data.userId,
            institutionId: data.institutionId
          }

          this.usersOnline.push(currentUser)

          if (currentUser.institutionId) {
            const roomName = `institution-${currentUser.institutionId}`

            const existingRoom = this.institutionsRooms.find(room => room === roomName)

            if (!existingRoom) {
              this.institutionsRooms.push(roomName)
            }

            socket.join(roomName)
          }
        }

        this.refreshUsersOnline(currentUser)
      })

      socket.on('disconnect', () => {
        console.log(`user ${this.usersOnline.find(u => u.socketId === socket.id)?.username} disconnected`)

        const j = this.socketsOnline.map((s) => s.id).indexOf(socket.id)
        console.log(j)
        this.socketsOnline.splice(j, 1)

        this.logout(socket, currentUser)
      })

      socket.on('logout', () => this.logout(socket, currentUser))

      socket.on('new chat', ({ destinyUserId, destinySocketId }) => {
        const isMeToMeChat = destinyUserId === currentUser.userId

        let existingChat: ActiveChat | undefined

        if (isMeToMeChat) {
          existingChat = this.chatsActive.find(chat => {
            return chat.participants.length === 1 &&
              chat.participants[0].socketId === destinySocketId
          })
        } else {
          existingChat = this.chatsActive.find(chat => {
            return chat.participants.find(p => p.socketId === destinySocketId)
              && chat.participants.find(p => p.socketId === currentUser.socketId)
          })
        }

        if (existingChat) {
          return
        }

        const destinySocket = this.socketsOnline.find((s) => s.id === destinySocketId)
        const destinyUser = this.usersOnline.find(u => u.userId === destinyUserId)

        if (destinySocket && destinyUser) {
          const chatId = uuidv4()

          socket.join(chatId)
          destinySocket?.join(chatId)

          const participants = [
            currentUser,
            destinyUser
          ]


          if (destinySocketId === currentUser.socketId) {
            participants.pop()
          }

          this.chatsActive.push({
            chatId,
            messages: [],
            participants
          })


          this.refreshChatsForParticipants([currentUser])
        }
      })

      socket.on('close chat', ({ chatId }) => {
        const indexOfChat = this.chatsActive.map(c => c.chatId).indexOf(chatId)

        if (indexOfChat !== -1) {
          const participants = this.chatsActive[indexOfChat].participants

          this.chatsActive.splice(indexOfChat, 1)

          this.refreshChatsForParticipants(participants)
        }
      })

      socket.on('send message', ({ chatId, message }) => {
        const i = this.chatsActive.map((c) => c.chatId).indexOf(chatId)
        this.chatsActive[i].messages.push({
          user: currentUser,
          message
        })

        this.refreshChatsForParticipants(this.chatsActive[i].participants)
      })
    })
  }

  private logout (socket: Socket, currentUser: ChatUser): void {
    const i = this.usersOnline.map((u) => u.socketId).indexOf(socket.id)
    this.usersOnline.splice(i, 1)

    const chatsActiveCurrentUser = this.chatsActive.filter(c => c.participants.map(p => p.socketId).find(socketId => socketId === socket.id))
    for (const chatActive of chatsActiveCurrentUser) {
      const k = this.chatsActive.map(c => c.chatId).indexOf(chatActive.chatId)
      this.chatsActive.splice(k, 1)

      this.refreshChatsForParticipants(chatActive.participants)

      this.io.in(chatActive.chatId).socketsLeave(chatActive.chatId)
    }

    if (currentUser?.institutionId) {
      socket.leave(`institution-${currentUser.institutionId}`)
    }

    this.refreshUsersOnline(currentUser)

    currentUser = {} as any
  }

  private refreshChatsForParticipants (participants: ChatUser[]) {
    for (const participant of participants) {
      const chatsActiveCurrentUser = this.chatsActive.filter(
        c => c.participants.find(p => p.socketId === participant.socketId)
      )

      let position = 1
      const chatsWithPosition = chatsActiveCurrentUser.map(chat => ({ ...chat, position: position++ }))

      this.io.to(participant.socketId).emit('chats active', chatsWithPosition)
    }
  }

  private refreshUsersOnline (currentUser: ChatUser) {
    const adminUsers = this.usersOnline.filter(user => !user.institutionId)

    for (const adminUser of adminUsers) {
      this.io.to(adminUser.socketId).emit('users online', this.usersOnline)
    }

    if (currentUser?.institutionId) {
      this.io.to(`institution-${currentUser.institutionId}`)
        .emit(
          'users online',
          this.usersOnline.filter(user => user.institutionId === currentUser?.institutionId || !user.institutionId)
        )
    } else {
      const institutionRooms = this.institutionsRooms.map(room => {
        const [,institutionIdString] = room.split('-')
        const institutionId = Number(institutionIdString)

        return { roomName: room, institutionId }
      })

      for (const institutionRoom of institutionRooms) {
        this.io.to(institutionRoom.roomName).emit('users online', this.usersOnline.filter(user => user.institutionId === institutionRoom.institutionId || !user.institutionId))
      }
    }
  }
}
