import React, { useState } from 'react'
import { useGetProfileQuery } from '../../api';
import Button from '../../components/ui/Buttons';
import { FiCamera, FiInbox, FiSave, FiUser } from 'react-icons/fi';
import StatusDot from '../../components/ui/StatusDot';
import Inputs from '../../components/ui/Inputs';
import { HiOutlineSparkles } from 'react-icons/hi2';

const Profile = () => {
    const { data: user, isFetching } = useGetProfileQuery();
    let isUpdatingProfile
    const [currentProfile, setCurrentProfile] = useState({
        name: "rexon",
        username: "rexon",
        bio: "Hey, guys im new here!"
    })
    // ----------- Handle Profile Update ------------
    const handleUpdate = () => {

    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4 md:gap-5">
            <section className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
                <div className="p-5 border-b border-border/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <label className="relative block cursor-pointer group" aria-label="Change avatar">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-brand to-accent flex items-center justify-center text-white text-2xl font-bold shadow-brand ring-2 ring-transparent transition-all group-hover:ring-accent/70">
                                {user?.data?.avatar ?
                                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0rJz6pclOd1NFNQZCX9FnjWJQNt7Ghogtag&s"} alt={"Avatar"} className="h-full w-full object-cover" />
                                    :
                                    (user?.data?.username)?.slice(0, 2)?.toUpperCase()
                                }
                            </div>
                            <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                <FiCamera className="text-2xl" />
                            </span>
                            <span className="absolute -right-1 -bottom-1">
                                <StatusDot status="online" />
                            </span>
                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={(event) => setThumbnailFile(event.target.files?.[0] || null)}
                            />
                        </label>
                        <div className="min-w-0">
                            <h2 className="text-lg font-bold text-text-primary truncate">{user?.data?.username}</h2>
                            <p className="text-sm text-text-secondary truncate">{user?.data?.email}</p>
                            <p className="mt-2 text-xs font-semibold text-accent">Click avatar to change photo</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Inputs
                        label="Display name"
                        id="settings-name"
                        placeholder="Your display name"
                        value={currentProfile.name}
                        onChange={(event) => handleProfileChange('name', event.target.value)}
                        leftIcon={<FiUser />}
                        disabled={isFetching || isUpdatingProfile}
                    />
                    <Inputs
                        label="Username"
                        id="settings-username"
                        placeholder="Username"
                        value={currentProfile.username}
                        onChange={(event) => handleProfileChange('username', event.target.value)}
                        leftIcon={<HiOutlineSparkles />}
                        disabled={isFetching || isUpdatingProfile}
                    />
                    <div className="md:col-span-2">
                        <Inputs
                            label="Bio"
                            id="settings-email"
                            type="email"
                            placeholder="Hey! im feeling well today"
                            value={currentProfile.bio}
                            onChange={(event) => handleProfileChange('bio', event.target.value)}
                            leftIcon={<FiInbox />}
                            disabled={isFetching || isUpdatingProfile}
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <Button type="submit" size="md" isLoading={isUpdatingProfile} leftIcon={<FiSave />}>
                            Save profile
                        </Button>
                    </div>
                </form>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
                <h2 className="text-base font-bold text-text-primary">Profile reach</h2>
                <p className="mt-1 text-sm text-text-secondary">Your social snapshot</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                        { label: 'Followers', value: '1,248', tone: 'text-accent' },
                        { label: 'Friends', value: '328', tone: 'text-online' },
                        { label: 'Groups', value: '18', tone: 'text-warning' },
                        { label: 'Blocked', value: '6', tone: 'text-error' },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-xl border border-border bg-muted/50 p-3">
                            <p className={`text-xl font-bold ${stat.tone}`}>{stat.value}</p>
                            <p className="mt-1 text-xs text-text-secondary">{stat.label}</p>
                        </div>
                    ))}
                </div>
                {/* <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-semibold text-text-secondary">
                        <span>Account completion</span>
                        <span>{accountHealth}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-brand to-accent" style={{ width: `${accountHealth}%` }} />
                    </div>
                </div> */}
            </section>
        </div>
    )
}

export default Profile