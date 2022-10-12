import { ISocketService } from '#business/services/iSocketService'
import { Server, Socket } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

interface User {
  userId: string
  username: string
}

export class SocketService implements ISocketService {
  constructor (
    private io: Server
  ) { }

  init (): void {
    const socketsOnline: Socket[] = []
    const usersOnline: User[] = []
    const chatsActive: {
      chatId: string
      participants: User[]
      position: number
      messages: {
        userId: string
        username: string
        message: string
      }[]
    }[] = []

    this.io.on('connection', socket => {
      let username: string
      console.log('a user connected')
      socketsOnline.push(socket)

      this.io.emit('users online', usersOnline)

      socket.on('login', (data) => {
        console.log(`a user ${data.username} connected`)

        username = data.username

        usersOnline.push({
          userId: socket.id,
          username
        })

        this.io.emit('users online', usersOnline)
      })

      socket.on('disconnect', () => {
        console.log(`user ${usersOnline.find(u => u.userId === socket.id)?.username} disconnected`)

        const i = usersOnline.map((u) => u.userId).indexOf(socket.id)
        console.log(i)
        console.log(usersOnline)
        usersOnline.splice(i, 1)
        const j = socketsOnline.map((s) => s.id).indexOf(socket.id)
        console.log(j)
        socketsOnline.splice(j, 1)

        const chatsActiveCurrentUser = chatsActive.filter(c => c.participants.map(p => p.userId).find(userId => userId === socket.id))
        for (const chatActive of chatsActiveCurrentUser) {
          const k = chatsActive.map(c => c.chatId).indexOf(chatActive.chatId)
          chatsActive.splice(k, 1)

          for (const { userId } of chatActive.participants) {
            const chatsActiveCurrentUser = chatsActive.filter(c => c.participants.find(p => p.userId === userId))

            this.io.to(userId).emit('chats active', chatsActiveCurrentUser)
          }

          this.io.in(chatActive.chatId).socketsLeave(chatActive.chatId)
        }

        this.io.emit('users online', usersOnline)
      })

      socket.on('new chat', ({ destinyUserId, destinyUsername }) => {
        const destinySocket = socketsOnline.find((s) => s.id === destinyUserId)

        const chatId = uuidv4()

        socket.join(chatId)
        destinySocket?.join(chatId)

        chatsActive.push({
          chatId,
          messages: [],
          position: chatsActive.length + 1,
          participants: [
            {
              userId: socket.id,
              username
            },
            {
              userId: destinyUserId,
              username: destinyUsername
            }
          ]
        })


        for (const userId of [socket.id, destinyUserId]) {
          const chatsActiveCurrentUser = chatsActive.filter(c => c.participants.find(p => p.userId === userId))

          this.io.to(userId).emit('chats active', chatsActiveCurrentUser)
        }
      })

      socket.on('send message', ({ chatId, message }) => {
        const i = chatsActive.map((c) => c.chatId).indexOf(chatId)
        chatsActive[i].messages.push({
          userId: socket.id,
          username,
          message
        })

        for (const participant of chatsActive[i].participants) {
          const chatsActiveCurrentUser = chatsActive.filter(c => c.participants.find(p => p.userId === participant.userId))

          this.io.to(participant.userId).emit('chats active', chatsActiveCurrentUser)
        }
      })
    })
  }
}
