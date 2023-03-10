import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'

type MessageProps = {
    message: DocumentData
}

const Message = ({ message }: MessageProps) => {

    const isChatGpt = message.user._id === "ChatGPT"

    return (
        <div className={`py-5 text-white ${isChatGpt ? 'bg-[#434654]' : ''}`}>
            <div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
                <img
                    src={message.user.avatar}
                    alt="avatar"
                    className='w-8 h-8 rounded-full'
                />
                <p className='pt-1 text-base'>{message.text}</p>
            </div>
        </div>

    )
}

export default Message