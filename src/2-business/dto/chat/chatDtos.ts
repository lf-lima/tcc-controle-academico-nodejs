export interface ChatUser {
  userId: number
  socketId: string
  username: string
  institutionId?: number
}

export interface ActiveChat {
  chatId: string
  participants: ChatUser[]
  messages: {
    user: ChatUser
    message: string
  }[]
}
