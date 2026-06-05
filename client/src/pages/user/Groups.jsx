import React from 'react'

const Groups = () => {
    const groups = [
        { name: 'Frontend Guild', meta: '48 members', initials: 'FG', tone: 'text-accent' },
        { name: 'RexChat Beta', meta: '18 members', initials: 'RB', tone: 'text-warning' },
        { name: 'Product Studio', meta: '26 members', initials: 'PS', tone: 'text-online' },
    ];
    return (
        <section className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-text-primary">Groups</h2>
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
                {groups.map((group) => (
                    <div key={group.name} className="rounded-xl border border-border bg-muted/40 p-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-elevated text-sm font-bold ${group.tone}`}>{group.initials}</div>
                        <p className="mt-4 text-sm font-semibold text-text-primary">{group.name}</p>
                        <p className="mt-1 text-xs text-text-secondary">{group.meta}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Groups