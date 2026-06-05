import React from 'react'
import PersonRow from '../../components/common/PersonRow';

const Friends = () => {
    const friends = [
        { name: 'Sophia Chen', meta: 'Design partner', initials: 'SC', status: 'online', gradient: 'from-violet-500 to-fuchsia-500' },
        { name: 'Marcus Rivera', meta: 'Product lead', initials: 'MR', status: 'away', gradient: 'from-amber-500 to-orange-500' },
        { name: 'Aria Patel', meta: 'Frontend guild', initials: 'AP', status: 'offline', gradient: 'from-indigo-500 to-violet-500' },
        { name: 'Noah Brooks', meta: 'Backend guild', initials: 'NB', status: 'online', gradient: 'from-cyan-500 to-blue-500' },
    ];

    return (
        <section className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-text-primary">Friends</h2>
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
                {friends.map((friend) => <PersonRow key={friend.name} person={friend} actionLabel="Message" showStatus />)}
            </div>
        </section>
    )
}

export default Friends