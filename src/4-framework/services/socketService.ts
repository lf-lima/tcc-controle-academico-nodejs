import { ISocketService } from '#business/services/iSocketService'
import { Server } from 'socket.io'

export class SocketService implements ISocketService {
  private io!: Server

  constructor (server: Server) {
    this.io = server
  }

  init (): void {
    const messages: any[] = ['Testando mensagem']

    this.io.on('connection', socket => {
      socket.emit('message:render-olds', messages)

      let username = ''
      socket.on('user:enter', (_username) => {
        username = _username
        console.log(`New user: ${username}`)
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
