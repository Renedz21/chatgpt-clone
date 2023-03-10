import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../utils/queryApi'

import admin from 'firebase-admin'
import adminDb from '../../firebaseAdmin'

type Data = {
    answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { prompt, chatId, model, session } = req.body

    if (!prompt) {
        res.status(400).json({ answer: 'No prompt provided' })
    }

    if (!chatId) {
        res.status(400).json({ answer: 'Please provide a valid Chat Id!' })
    }

    // ChatGPT API

    const response = await query(prompt, chatId, model)

    const message: Message = {
        text: response || 'ChatGPT is currently unavailable. Please try again later.',
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'ChatGPT',
            name: 'ChatGPT',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
        }
    }

    await adminDb
        .collection('users')
        .doc(session?.user?.email!)
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(message)

    res.status(200).json({ answer: message.text })
}
