import { useMemo, useState } from 'react'
import { Message } from './Message'
import { Menu } from './Menu'
import { AIService } from '../services/aiService'

type ChatMessage = {
  id: string
  message: string
  isBotMessage: boolean
}

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

export const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: createId(),
      isBotMessage: true,
      message: '¡Bienvenido a Balatro Chat! Pregúntame lo que quieras sobre el juego.',
    },
  ])
  const [isSending, setIsSending] = useState(false)
  const aiService = useMemo(() => new AIService(), [])

  const handleSend = async (userMessage: string) => {
    const messageEntry: ChatMessage = {
      id: createId(),
      isBotMessage: false,
      message: userMessage,
    }

    setMessages((prev) => [...prev, messageEntry])
    setIsSending(true)

    try {
      const botReply = await aiService.sendMessage(userMessage)
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          isBotMessage: true,
          message: botReply,
        },
      ])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          isBotMessage: true,
          message:
            'Hubo un problema al contactar con el servicio de IA. Inténtalo de nuevo en unos instantes.',
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="pb-44">
      <ul className="mt-20 flex flex-col gap-5">
        {messages.map((message) => (
          <Message
            key={message.id}
            isBotMessage={message.isBotMessage}
            message={message.message}
          />
        ))}
      </ul>
      <Menu
        onSend={handleSend}
        isSending={isSending}
      />
    </div>
  )
}

export default Chat
