import React from 'react'
import { FiArrowRight, FiMessageSquare, FiSearch, FiSend, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router';

export const ChatEmptyState = () => {
    return (
        <div className="flex h-full min-h-[320px] items-center justify-center px-4 py-10">
            <div className="relative max-w-md overflow-hidden rounded-[2rem] text-center">

                <div className="relative">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand via-brand-light to-accent text-xl text-white shadow-brand">
                        <FiMessageSquare />
                    </div>
                    <h2 className="text-base font-semibold text-text-primary">No messages yet</h2>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
                        This conversation is empty for now. Send the first message and your thread will appear here instantly.
                    </p>

                    <div className="mt-5 flex items-center justify-center gap-2 text-xs text-text-muted">
                        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-bg/80 px-3 py-1.5">
                            <FiSend className="text-[11px]" />
                            Start the chat
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-bg/80 px-3 py-1.5">
                            Fast, focused, private
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ConvoEmptyState = () => {
    return (
        <div className="flex-1 overflow-y-auto pt-10">
            <div className="relative flex flex-col px-4 items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand via-brand-light to-accent text-xl text-white shadow-brand">
                    <FiUsers />
                </div>

                <p className="text-sm font-semibold text-text-primary">Your inbox is quiet</p>
                <p className="mt-2 max-w-[20rem] text-sm leading-6 text-text-secondary">
                    Discover people to start a new conversation, build your network, and make this sidebar feel alive.
                </p>

                <div className="mt-4 flex w-full flex-col gap-2">
                    <Link
                        to={"/users"}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand via-brand-light to-accent px-4 py-3 text-sm font-semibold text-white shadow-brand transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                    >
                        Discover people
                        <FiArrowRight className="text-base" />
                    </Link>
                    <button
                        type="button"
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border bg-bg/80 px-4 py-3 text-sm font-semibold text-text-primary transition-all duration-300 hover:border-border-hover hover:bg-muted"
                    >
                        <FiSearch className="text-base" />
                        Browse users
                    </button>
                </div>
            </div>
        </div>
    )
}
