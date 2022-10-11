import { ISocketService } from '#business/services/iSocketService'
import { Server, Socket } from 'socket.io'

export class SocketService implements ISocketService {
  private io!: Server

  constructor (server: Server) {
    this.io = server
  }

  init (): void {
    const usersOnline: string[] = []
    const messages: any[] = ['Testando mensagem']

    this.io.on('connection', socket => {
      console.log(`new user online: ${socket.id}`)
      usersOnline.push(socket.id)

      socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnect`)

        const i = usersOnline.indexOf(socket.id)
        usersOnline.splice(i, 1)
      })

      socket.emit('message:render-olds', messages)

      let username = ''
      socket.on('user:enter', (_username) => {
        username = _username
        console.log(`enter user: ${username}`)
      })

      socket.on('message:send', (message) => {
        const messageData = {
          username,
          message
        }

        messages.push(messageData)

        socket.broadcast.emit('message:new', messageData)
      })
    })
  }
}
