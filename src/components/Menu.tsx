import { useState } from 'react'
import type { FormEvent } from 'react'

interface MenuProps {
  onSend: (message: string) => Promise<void> | void
  isSending?: boolean
}

export const Menu = ({ onSend, isSending = false }: MenuProps) => {
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      return
    }

    await onSend(trimmedMessage)
    setMessage('')
  }

  return (
    <div className=" bg-[#1B2629]  fixed bottom-5 right-5 left-5 rounded-xl p-2">
      <div className="bg-[#3a5055] p-5 rounded">
        <form className=" flex justify-between items-center gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            className="text-sm bg-[#1B2629] w-full rounded-xl h-15 border-1 border-white px-2"
            placeholder="Escribe tu mensaje"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            disabled={isSending}
          />
          <button
            type="submit"
            className="text-sm bg-[#0093FF] rounded-xl py-2 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSending || message.trim().length === 0}
          >
            {isSending ? 'Enviando…' : (
              <>
                Send <br />
                Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
