import {  Send } from 'lucide-react'
import { useState } from 'react'
import { useMessageStore } from '../store/messageStore'
import toast from 'react-hot-toast'

const ChatInput = () => {
    const [ textInput, setTextInput]  = useState("")
    const { sendMessage, isSendMessage } = useMessageStore()

    const handlesendMessage = () =>{
        if(textInput.trim() === ""){
            return toast.error("Type message")
        }
        sendMessage(textInput)
        setTextInput("")
    }
    return (
        <div className='bg-base-300 lg:px-24  px-10  py-3' >
            <div className='flex gap-3' >

                <input onChange={(e)=>setTextInput(e.target.value)} placeholder='Type a message..' value={textInput} className='w-full flex-1 bg-base-100 px-7 rounded-l-full
                ' type="text" />
                <div onClick={handlesendMessage} className='p-3 bg-base-300 relative rounded-full flex items-center justify-center hover:bg-base-300/50' >
                    {
                        isSendMessage ?
                        <p className='loading loading-spinner loading-lg size-4' ></p>:
                        <Send aria-disabled className='size-4 cursor-pointer' />
                    }

                </div>
            </div>
        </div>
    )
}

export default ChatInput