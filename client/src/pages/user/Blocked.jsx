import React from 'react'
import PersonRow from '../../components/common/PersonRow'

const Blocked = () => {
    const blockedUsers = [
        { name: 'Jordan Blake', meta: 'Blocked 2 weeks ago', initials: 'JB' },
        { name: 'Taylor Morgan', meta: 'Blocked from messages', initials: 'TM' },
        { name: 'Sam Carter', meta: 'Blocked from profile', initials: 'SC' },
    ];

    return (
        <section className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-text-primary">Blocked users</h2>
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
                {blockedUsers.map((person) => <PersonRow key={person.name} person={person} actionLabel="Unblock" />)}
            </div>
        </section>
    )
}

export default Blocked