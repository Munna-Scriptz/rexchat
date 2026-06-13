import React from 'react'
import ChatHeader from '../components/Home/ChatHeader'
import ChatMessages from '../components/Home/ChatMessages'
import ChatInput from '../components/Home/ChatInput'

const Conversation = () => {
    return (
        <>
            <main id="Home" className="flex-1 flex flex-col bg-bg">
                {/* Floating Header */}
                <ChatHeader />

                {/* Messages */}
                <ChatMessages />

                {/* Input */}
                <ChatInput />
            </main>
        </>
    )
}

export default Conversation