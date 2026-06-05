import React from 'react'
import PersonRow from '../../components/common/PersonRow';

const Followers = () => {
    const followers = [
        { name: 'Emma Watson', meta: 'Following since March', initials: 'EW', gradient: 'from-emerald-500 to-teal-500' },
        { name: 'Liam Park', meta: 'Sent a friend request', initials: 'LP', gradient: 'from-rose-500 to-pink-500' },
        { name: 'Nina Brooks', meta: '3 mutual friends', initials: 'NB', gradient: 'from-cyan-500 to-blue-500' },
        { name: 'Caleb Ortiz', meta: 'Joined from Groups', initials: 'CO', gradient: 'from-lime-500 to-emerald-500' },
    ];
    return (
        <section className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-text-primary">Followers</h2>
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
                {followers.map((follower, i) => <PersonRow key={i} person={follower} actionLabel="Follow back" />)}
            </div>
        </section>
    )
}

export default Followers