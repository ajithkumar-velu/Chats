
const ChatSkeleton = () => {
    const value = Array(7).fill(null)
    return (
        <div className="overflow-y-auto flex-1 w-full pt-2" >
            {value.map((val, idx) => (

                <div key={idx} className={`chat px-3 w-full ${idx % 2 == 0 ? "chat-end" : "chat-start"}`}>
                    <div className="skeleton chat-bubble w-52 h-16"></div>
                    <div className="chat-footer w-16 h-4 mt-2 skeleton">
                            {/* <time className="text-xs opacity-50 skeleton "></time> */}
                        </div>
                    {/* <div className="chat-bubble flex flex-col"></div> */}
                    {/* <div className="chat-footer"></div> */}
                </div>
            ))}
        </div>
    )
}

export default ChatSkeleton