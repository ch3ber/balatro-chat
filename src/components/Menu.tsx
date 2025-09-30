export const Menu = () => {
  return (
    <div className=" bg-[#1B2629]  fixed bottom-5 right-5 left-5 rounded-xl p-2">
      <div className="bg-[#3a5055] p-5 rounded">
        <form className=" flex justify-between items-center gap-5">
          <input
            type="text"
            className="text-sm bg-[#1B2629] w-[175px] rounded-xl h-15 border-1 border-white px-2"
          />
          <button
            type="submit"
            className="text-sm bg-[#0093FF] rounded-xl py-2 px-8"
          >
            Send <br />
            Message
          </button>
        </form>
      </div>
    </div>
  )
}
