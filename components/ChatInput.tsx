'use client'

import { FormEvent, useState } from "react"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"

import { toast } from "react-hot-toast"

type ChatProps = {
    chatId: string
}

const ChatInput = ({ chatId }: ChatProps) => {

    const [prompt, setPrompt] = useState<string>("")
    const { data: session } = useSession()

    const model = "text-davinci-003"

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!prompt) return;

        const input = prompt.trim()
        setPrompt("")

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(collection(db, "users", session?.user?.email!, "chats", chatId, "messages"), message)

        // Toast notification
        const notification = toast.loading("ChatGPT is thinking...")

        await fetch(`/api/askQuestion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then(() => {
            toast.success("ChatGPT has responded!", {
                id: notification
            })
            console.log("Success")
        })
    }

    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <form onSubmit={sendMessage} className="p-4 space-x-5 flex">
                <input
                    className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
                    disabled={!session}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    type="text"
                    placeholder="Type your message here..."
                />

                <button
                    disabled={!prompt || !session}
                    type="submit"
                    className={`bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed`}
                >
                    <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
                </button>
            </form>

            <div>
                {/* Modal Selection */}
            </div>
        </div>
    )
}

export default ChatInput