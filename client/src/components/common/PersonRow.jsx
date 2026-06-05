import React from 'react'
import StatusDot from '../ui/StatusDot'

const PersonRow = ({ person, actionLabel, showStatus = false }) => {
    return (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 p-3">
            <div className="flex min-w-0 items-center gap-3">
                <div className="relative">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${person.gradient || 'from-brand to-accent'} text-xs font-bold text-white`}>
                        {person.initials}
                    </div>
                    {showStatus ? (
                        <div className="absolute -bottom-0.5 -right-0.5">
                            <StatusDot status={person.status} />
                        </div>
                    ) : null}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text-primary">{person.name}</p>
                    <p className="truncate text-xs text-text-secondary">{person.meta}</p>
                </div>
            </div>
            <button className="shrink-0 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-secondary transition-colors hover:border-border-hover hover:bg-surface-hover hover:text-text-primary">
                {actionLabel}
            </button>
        </div>
    )
}

export default PersonRow