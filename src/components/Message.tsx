interface MessageProps {
  isBotMessage?: boolean
  message: string
}

export const Message = ({ isBotMessage = false, message }: MessageProps) => {
  const baseClasses = 'bg-white rounded-xl p-2.5 border-3 border-[#B9C2D2] max-w-[70%]'

  if (isBotMessage) {
    return (
      <li className={`${baseClasses} self-end mr-10`}>
        <p className="text-black whitespace-pre-wrap break-words">{message}</p>
      </li>
    )
  }

  return (
    <li className={`${baseClasses} self-start ml-10`}>
      <p className="text-black whitespace-pre-wrap break-words">{message}</p>
    </li>
  )
}
