import { useEffect, useRef } from 'react'
import { useMessageStore } from '../store/messageStore'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import { useAuthStore } from '../store/userAuth'
import { chatMessageTime } from '../lib/utils'
import ChatSkeleton from './skeleton/ChatSkeleton'

const ChatContainer = () => {
    const { messages, getMessage, selectedUser, subscribeMessage, unsubscribeMessage, isMessageCheck } = useMessageStore()
    const { authUser } = useAuthStore()
    const bottomRef = useRef(null); 

    

    useEffect(() => {
        getMessage(selectedUser._id)
        subscribeMessage()

        return () => unsubscribeMessage()
    }, [getMessage, selectedUser._id, subscribeMessage, unsubscribeMessage])

    // console.log(messages);
    useEffect(() => {
        // Auto-scroll to bottom when messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (isMessageCheck) {
        return (
            <div className={`bg-base-200  flex-col rounded-box flex-1 ${selectedUser ? "flex" : "hidden md:flex"}`} >
                <ChatHeader />
                <ChatSkeleton />
                <ChatInput />
            </div>
        )
    }
  
    
    return (
        <div className={`bg-base-100 overflow-hidden flex-col rounded-box flex-1 ${selectedUser ? "flex" : "hidden md:flex"}`} >
            <ChatHeader />
            <div className='overflow-y-auto flex-1 w-full' >
                {Object.keys(messages).map((message, index) => (
                    <div key={index} >


                        <div className="text-center text-gray-500 flex items-center justify-center font-semibold my-2">
                            <p className='bg-base-300 w-fit px-3 py-0.5 text-xs rounded-full' >

                            {message}
                            </p>
                        </div>
                        {messages[message].map((msg, idx) => (

                            <div key={idx} className={`chat px-3 w-full ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                                <div className="chat-bubble flex flex-col">{msg.text}</div>
                                <div className="chat-footer">
                                    <time className="text-xs opacity-50">{chatMessageTime(msg.createdAt)}</time>
                                </div>
                            </div>
                        ))}
                                  <div ref={bottomRef} />
                    </div>
                ))}
            </div>
            
            <ChatInput />


        </div>
    )
}

export default ChatContainer