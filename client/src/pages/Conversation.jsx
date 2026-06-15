import React, { useEffect } from 'react'
import ChatHeader from '../components/Home/ChatHeader'
import ChatMessages from '../components/Home/ChatMessages'
import ChatInput from '../components/Home/ChatInput'
import { useOutletContext, useParams } from 'react-router'
import { useGetConvoSingleQuery, useGetMessageQuery } from '../api'
import { useSelector } from 'react-redux'

const Conversation = () => {
    const convoId = useParams()?.id
    const { userId } = useOutletContext();

    // -------------- Fetch Messages ---------------
    const { isFetching } = useGetMessageQuery(convoId)
    const { data: chatUser, isFetching: isConvFetching } = useGetConvoSingleQuery(convoId)
    const messageList = useSelector((state) => state.messages.messages)

    return (
        <>
            <main id="Home" className="flex-1 flex flex-col bg-bg">
                {/* Floating Header */}
                <ChatHeader conversation={chatUser?.data} isLoading={isConvFetching} />

                {/* Messages */}
                <ChatMessages messages={messageList} userId={userId} />

                {/* Input */}
                <ChatInput conversation={convoId} />
            </main>
        </>
    )
}

export default Conversation