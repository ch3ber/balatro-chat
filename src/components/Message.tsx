interface MessageProps {
  isBotMessage?: boolean
  message: string
}

export const Message = ({ isBotMessage = false, message }: MessageProps) => {
  if (isBotMessage) {
    return (
      <li className="bg-white rounded-xl p-2.5 self-end mr-10 border-3 border-[#B9C2D2] max-w-[70%]">
        <p className="text-black text-center w-fit">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat, fuga sapiente omnis at
          amet excepturi! Maxime impedit animi nulla eos commodi eius vero cupiditate in, esse placeat. Est,
          rem.
        </p>
      </li>
    )
  }

  return (
    <li className="bg-white rounded-xl p-2.5 self-start ml-10 border-3 border-[#B9C2D2] max-w-[70%]">
      <p className="text-black text-center w-fit">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ipsum omnis quis deserunt vero incidunt
        voluptates nobis accusantium in veritatis. Voluptatum maxime rem nemo aliquid illo minus dolor vitae
        soluta.
      </p>
    </li>
  )
}
