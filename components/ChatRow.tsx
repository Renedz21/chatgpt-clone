import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore"
import { db } from "../firebase"

type Props = {
    id: string
}

const ChatRow = ({ id }: Props) => {

    const pathName = usePathname();
    const router = useRouter();
    const { data: session } = useSession();

    const [active, setActive] = useState<boolean>(false);

    const [messages] = useCollection(
        collection(db, "users", session?.user?.email!, "chats", id, "messages"),
    )

    useEffect(() => {
        if (!pathName) return;

        setActive(pathName.includes(id));
    }, [pathName])

    const removeChat = async () => {
        const result = await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
        console.log(result);
        router.replace("/");
    }

    return (
        <Link
            href={`/chat/${id}`}
            className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}
        >
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <p className="flex-1 hidden md:inline-flex truncate">
                {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
            </p>
            <TrashIcon onClick={removeChat} className="w-5 h-5 text-gray-700 hover:text-red-700" />
        </Link>
    )
}

export default ChatRow