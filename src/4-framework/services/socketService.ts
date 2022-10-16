import { ISocketService } from '#business/services/iSocketService'
import { Server, Socket } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

interface ChatUser {
  userId: number
  socketId: string
  username: string
}

export class SocketService implements ISocketService {
  constructor (
    private io: Server
  ) { }

  init (): void {
    const socketsOnline: Socket[] = []
    const usersOnline: ChatUser[] = []
    const chatsActive: {
      chatId: string
      participants: ChatUser[]
      messages: {
        user: ChatUser
        message: string
      }[]
    }[] = []

    this.io.on('connection', socket => {
      let currentUser: ChatUser
      console.log('a user connected')
      socketsOnline.push(socket)

      this.io.emit('users online', usersOnline)

      socket.on('login', (data) => {
        console.log(`a user ${data.username} connected`)

        const existingUser = usersOnline.find(u => u.userId === data.userId)

        if (!existingUser) {
          currentUser = {
            socketId: socket.id,
            username: data.username,
            userId: data.userId
          }

          usersOnline.push(currentUser)

          this.io.emit('users online', usersOnline)
        }
      })

      socket.on('disconnect', () => {
        console.log(`user ${usersOnline.find(u => u.socketId === socket.id)?.username} disconnected`)

        const i = usersOnline.map((u) => u.socketId).indexOf(socket.id)
        console.log(i)
        console.log(usersOnline)
        usersOnline.splice(i, 1)
        const j = socketsOnline.map((s) => s.id).indexOf(socket.id)
        console.log(j)
        socketsOnline.splice(j, 1)

        const chatsActiveCurrentUser = chatsActive.filter(c => c.participants.map(p => p.socketId).find(socketId => socketId === socket.id))
        for (const chatActive of chatsActiveCurrentUser) {
          const k = chatsActive.map(c => c.chatId).indexOf(chatActive.chatId)
          chatsActive.splice(k, 1)

          for (const { socketId } of chatActive.participants) {
            const chatsActiveCurrentUser = chatsActive.filter(c => c.participants.find(p => p.socketId === socketId))

            let position = 0
            const chatsWithPosition = chatsActiveCurrentUser.map(chat => ({ ...chat, position: position++ }))

            this.io.to(socketId).emit('chats active', chatsWithPosition)
          }

          this.io.in(chatActive.chatId).socketsLeave(chatActive.chatId)
        }

        this.io.emit('users online', usersOnline)
      })

      socket.on('new chat', ({ destinyUserId, destinySocketId }) => {
        const destinySocket = socketsOnline.find((s) => s.id === destinySocketId)
        const destinyUser = usersOnline.find(u => u.userId === destinyUserId)

        if (destinySocket && destinyUser) {
          const chatId = uuidv4()

          socket.join(chatId)
          destinySocket?.join(chatId)

          chatsActive.push({
            chatId,
            messages: [],
            participants: [
              currentUser,
              destinyUser
            ]
          })

          for (const userId of [socket.id, destinyUserId]) {
            const chatsActiveCurrentUser = chatsActive.filter(c => c.participants.find(p => p.socketId === userId))

            let position = 0
            const chatsWithPosition = chatsActiveCurrentUser.map(chat => ({ ...chat, position: position++ }))

            this.io.to(userId).emit('chats active', chatsWithPosition)
          }
        }
      })

      socket.on('send message', ({ chatId, message }) => {
        const i = chatsActive.map((c) => c.chatId).indexOf(chatId)
        chatsActive[i].messages.push({
          user: currentUser,
          message
        })

        for (const participant of chatsActive[i].participants) {
          const chatsActiveCurrentUser = chatsActive.filter(c => c.participants.find(p => p.socketId === participant.socketId))

          let position = 0
          const chatsWithPosition = chatsActiveCurrentUser.map(chat => ({ ...chat, position: position++ }))

          this.io.to(participant.socketId).emit('chats active', chatsWithPosition)
        }
      })
    })
  }
}
