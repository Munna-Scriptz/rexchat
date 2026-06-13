import React from 'react'
import ChatHeader from '../components/Home/ChatHeader'
import ChatMessages from '../components/Home/ChatMessages'
import ChatInput from '../components/Home/ChatInput'
import { useOutletContext, useParams } from 'react-router'
import { useGetMessageQuery } from '../api'

const Conversation = () => {
    const params = useParams()?.id
    const { userId } = useOutletContext();

    // -------------- Fetch Messages ---------------
    const { data: messages, isFetching: isMessageFeching } = useGetMessageQuery(params)
    
    return (
        <>
            <main id="Home" className="flex-1 flex flex-col bg-bg">
                {/* Floating Header */}
                <ChatHeader />

                {/* Messages */}
                <ChatMessages messages={messages?.data} userId={userId} />

                {/* Input */}
                <ChatInput />
            </main>
        </>
    )
}

export default Conversation