import React from 'react'

export const ProfileSkeleton = () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4 md:gap-5 animate-pulse">
            {/* Main Section Skeleton */}
            <section className="rounded-xl border border-border bg-surface overflow-hidden">
                {/* Header/Avatar Area */}
                <div className="p-5 border-b border-border/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative w-24 h-24 rounded-2xl bg-muted shrink-0">
                            <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-surface bg-muted" />
                        </div>
                        <div className="min-w-0 space-y-2">
                            <div className="h-5 bg-muted rounded w-32" />
                            <div className="h-4 bg-muted rounded w-48" />
                            <div className="h-3 bg-muted rounded w-36 mt-2" />
                        </div>
                    </div>
                </div>

                {/* Form Fields Area */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Display Name Input */}
                    <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-20" />
                        <div className="h-10 bg-muted rounded-xl w-full" />
                    </div>
                    {/* Username Input */}
                    <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-16" />
                        <div className="h-10 bg-muted rounded-xl w-full" />
                    </div>
                    {/* Bio Input */}
                    <div className="md:col-span-2 space-y-2">
                        <div className="h-3 bg-muted rounded w-10" />
                        <div className="h-10 bg-muted rounded-xl w-full" />
                    </div>
                    {/* Save Button */}
                    <div className="md:col-span-2 flex justify-end mt-2">
                        <div className="h-10 bg-muted rounded-xl w-32" />
                    </div>
                </div>
            </section>

            {/* Sidebar Section Skeleton (Profile Reach) */}
            <section className="rounded-xl border border-border bg-surface p-5 h-fit">
                <div className="h-5 bg-muted rounded w-28" />
                <div className="h-4 bg-muted rounded w-36 mt-1" />

                {/* Stat Grid Blocks */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="rounded-xl border border-border bg-muted/30 p-3 space-y-2">
                            <div className="h-6 bg-muted rounded w-14" />
                            <div className="h-3 bg-muted rounded w-12" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
