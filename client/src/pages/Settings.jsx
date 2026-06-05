import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  FiArrowLeft,
  FiBell,
  FiCamera,
  FiCheck,
  FiLock,
  FiMail,
  FiMoon,
  FiSave,
  FiShield,
  FiSlash,
  FiSun,
  FiUser,
  FiUserPlus,
  FiUsers,
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { Link } from 'react-router';
import { useGetProfileQuery, useResetPasswordMutation, useUpdateProfileMutation } from '../api';
import Button from '../components/ui/Buttons';
import Inputs from '../components/ui/Inputs';
import StatusDot from '../components/ui/StatusDot';

const tabs = [
  { id: 'profile', label: 'Profile', icon: FiUser },
  { id: 'friends', label: 'Friends', icon: FiUsers },
  { id: 'followers', label: 'Followers', icon: FiUserPlus },
  { id: 'preferences', label: 'Preferences', icon: FiSun },
  { id: 'security', label: 'Security', icon: FiLock },
  { id: 'groups', label: 'Groups', icon: HiOutlineSparkles },
  { id: 'blocked', label: 'Blocked', icon: FiSlash },
];

const friends = [
  { name: 'Sophia Chen', meta: 'Design partner', initials: 'SC', status: 'online', gradient: 'from-violet-500 to-fuchsia-500' },
  { name: 'Marcus Rivera', meta: 'Product lead', initials: 'MR', status: 'away', gradient: 'from-amber-500 to-orange-500' },
  { name: 'Aria Patel', meta: 'Frontend guild', initials: 'AP', status: 'offline', gradient: 'from-indigo-500 to-violet-500' },
  { name: 'Noah Brooks', meta: 'Backend guild', initials: 'NB', status: 'online', gradient: 'from-cyan-500 to-blue-500' },
];

const followers = [
  { name: 'Emma Watson', meta: 'Following since March', initials: 'EW', gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Liam Park', meta: 'Sent a friend request', initials: 'LP', gradient: 'from-rose-500 to-pink-500' },
  { name: 'Nina Brooks', meta: '3 mutual friends', initials: 'NB', gradient: 'from-cyan-500 to-blue-500' },
  { name: 'Caleb Ortiz', meta: 'Joined from Groups', initials: 'CO', gradient: 'from-lime-500 to-emerald-500' },
];

const groups = [
  { name: 'Frontend Guild', meta: '48 members', initials: 'FG', tone: 'text-accent' },
  { name: 'RexChat Beta', meta: '18 members', initials: 'RB', tone: 'text-warning' },
  { name: 'Product Studio', meta: '26 members', initials: 'PS', tone: 'text-online' },
];

const blockedUsers = [
  { name: 'Jordan Blake', meta: 'Blocked 2 weeks ago', initials: 'JB' },
  { name: 'Taylor Morgan', meta: 'Blocked from messages', initials: 'TM' },
  { name: 'Sam Carter', meta: 'Blocked from profile', initials: 'SC' },
];

const preferenceToggles = [
  { id: 'messagePreview', label: 'Message previews', description: 'Show new message text in notifications.' },
  { id: 'friendRequests', label: 'Friend requests', description: 'Allow people to send friend requests.' },
  { id: 'activityStatus', label: 'Activity status', description: 'Show friends when you are active.' },
];

const themes = [
  { id: 'rex', label: 'Rex', colors: ['bg-brand', 'bg-accent', 'bg-muted'] },
  { id: 'forest', label: 'Forest', colors: ['bg-emerald-500', 'bg-lime-400', 'bg-slate-700'] },
  { id: 'ember', label: 'Ember', colors: ['bg-rose-500', 'bg-amber-400', 'bg-zinc-700'] },
];

const initialsFromName = (name = 'User') => name.trim().slice(0, 2).toUpperCase();

const PersonRow = ({ person, actionLabel, showStatus = false }) => (
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
);

const ToggleRow = ({ item, enabled, onToggle }) => (
  <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-muted/40 p-4">
    <div>
      <p className="text-sm font-semibold text-text-primary">{item.label}</p>
      <p className="mt-1 text-xs text-text-secondary">{item.description}</p>
    </div>
    <button
      type="button"
      aria-pressed={enabled}
      onClick={onToggle}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${enabled ? 'bg-accent' : 'bg-elevated'}`}
    >
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

const Settings = () => {
  const { data: user, isFetching } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [resetPassword, { isLoading: isResettingPassword }] = useResetPasswordMutation();

  const profile = user?.data || {};
  const displayName = profile.name || profile.username || 'RexChat User';
  const displayEmail = profile.email || 'No email connected';

  const [activeTab, setActiveTab] = useState('profile');
  const [mode, setMode] = useState('dark');
  const [theme, setTheme] = useState('rex');
  const [toggles, setToggles] = useState({
    messagePreview: true,
    friendRequests: true,
    activityStatus: false,
  });
  const [profileForm, setProfileForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    currentPasswordErr: '',
    newPasswordErr: '',
    confirmPasswordErr: '',
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const baseProfileForm = useMemo(() => ({
    name: profile.name || profile.username || '',
    username: profile.username || '',
    email: profile.email || '',
  }), [profile.email, profile.name, profile.username]);

  const thumbnailObjectUrl = useMemo(() => (thumbnailFile ? URL.createObjectURL(thumbnailFile) : ''), [thumbnailFile]);
  useEffect(() => {
    if (!thumbnailObjectUrl) return undefined;
    return () => URL.revokeObjectURL(thumbnailObjectUrl);
  }, [thumbnailObjectUrl]);

  const currentProfileForm = {
    name: profileForm.name ?? baseProfileForm.name,
    username: profileForm.username ?? baseProfileForm.username,
    email: profileForm.email ?? baseProfileForm.email,
  };
  const thumbnailPreview = thumbnailObjectUrl || profile.thumbnail || profile.avatar || '';

  const accountHealth = useMemo(() => {
    const completed = [currentProfileForm.name, currentProfileForm.username, currentProfileForm.email, thumbnailPreview].filter(Boolean).length;
    return Math.round((completed / 4) * 100);
  }, [currentProfileForm.email, currentProfileForm.name, currentProfileForm.username, thumbnailPreview]);

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label || 'Settings';

  const handleProfileChange = (key, value) => {
    setProfileForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePasswordChange = (key, value) => {
    setPasswordForm((prev) => ({ ...prev, [key]: value, [`${key}Err`]: '' }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    if (!currentProfileForm.name.trim()) return toast.error('Name is required');
    if (!currentProfileForm.username.trim()) return toast.error('Username is required');

    const payload = new FormData();
    payload.append('name', currentProfileForm.name.trim());
    payload.append('username', currentProfileForm.username.trim());
    if (currentProfileForm.email.trim()) payload.append('email', currentProfileForm.email.trim());
    if (thumbnailFile) payload.append('thumbnail', thumbnailFile);

    try {
      await updateProfile(payload).unwrap();
      toast.success('Profile updated');
    } catch (error) {
      toast.error(error?.data?.message || 'Could not update profile');
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (!passwordForm.currentPassword) {
      return setPasswordForm((prev) => ({ ...prev, currentPasswordErr: 'Current password is required' }));
    }
    if (!passwordForm.newPassword) {
      return setPasswordForm((prev) => ({ ...prev, newPasswordErr: 'New password is required' }));
    }
    if (passwordForm.newPassword.length < 6) {
      return setPasswordForm((prev) => ({ ...prev, newPasswordErr: 'Password must be at least 6 characters' }));
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return setPasswordForm((prev) => ({ ...prev, confirmPasswordErr: 'Passwords do not match' }));
    }

    try {
      await resetPassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }).unwrap();
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        currentPasswordErr: '',
        newPasswordErr: '',
        confirmPasswordErr: '',
      });
      toast.success('Password reset successfully');
    } catch (error) {
      toast.error(error?.data?.message || 'Could not reset password');
    }
  };

  const renderProfilePage = () => (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4 md:gap-5">
      <section className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="relative block cursor-pointer group" aria-label="Change avatar">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-brand to-accent flex items-center justify-center text-white text-2xl font-bold shadow-brand ring-2 ring-transparent transition-all group-hover:ring-accent/70">
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  initialsFromName(displayName)
                )}
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
              <h2 className="text-lg font-bold text-text-primary truncate">{displayName}</h2>
              <p className="text-sm text-text-secondary truncate">{displayEmail}</p>
              <p className="mt-2 text-xs font-semibold text-accent">Click avatar to change photo</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Inputs
            label="Display name"
            id="settings-name"
            placeholder="Your display name"
            value={currentProfileForm.name}
            onChange={(event) => handleProfileChange('name', event.target.value)}
            leftIcon={<FiUser />}
            disabled={isFetching || isUpdatingProfile}
          />
          <Inputs
            label="Username"
            id="settings-username"
            placeholder="Username"
            value={currentProfileForm.username}
            onChange={(event) => handleProfileChange('username', event.target.value)}
            leftIcon={<HiOutlineSparkles />}
            disabled={isFetching || isUpdatingProfile}
          />
          <div className="md:col-span-2">
            <Inputs
              label="Email"
              id="settings-email"
              type="email"
              placeholder="name@example.com"
              value={currentProfileForm.email}
              onChange={(event) => handleProfileChange('email', event.target.value)}
              leftIcon={<FiMail />}
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
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-text-secondary">
            <span>Account completion</span>
            <span>{accountHealth}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-brand to-accent" style={{ width: `${accountHealth}%` }} />
          </div>
        </div>
      </section>
    </div>
  );

  const renderPreferencesPage = () => (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4 md:gap-5">
      <section className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center gap-2">
          <FiSun className="text-accent" />
          <h2 className="text-base font-bold text-text-primary">Appearance</h2>
        </div>
        <div className="mt-5 grid grid-cols-2 rounded-xl border border-border bg-muted/40 p-1">
          {[
            { id: 'light', label: 'Light mode', icon: FiSun },
            { id: 'dark', label: 'Dark mode', icon: FiMoon },
          ].map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id)}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${mode === option.id ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
                  }`}
              >
                <Icon />
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Themes</p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            {themes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTheme(item.id)}
                className={`rounded-xl border p-4 text-left transition-all ${theme === item.id ? 'border-accent bg-accent-soft/60' : 'border-border bg-muted/40 hover:border-border-hover'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {item.colors.map((color) => (
                      <span key={color} className={`h-5 w-5 rounded-full ${color}`} />
                    ))}
                  </div>
                  {theme === item.id ? <FiCheck className="text-accent" /> : null}
                </div>
                <p className="mt-4 text-sm font-semibold text-text-primary">{item.label}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center gap-2">
          <FiBell className="text-accent" />
          <h2 className="text-base font-bold text-text-primary">Preferences</h2>
        </div>
        <div className="mt-5 space-y-3">
          {preferenceToggles.map((item) => (
            <ToggleRow
              key={item.id}
              item={item}
              enabled={toggles[item.id]}
              onToggle={() => setToggles((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
            />
          ))}
        </div>
      </section>
    </div>
  );

  const renderSecurityPage = () => (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4 md:gap-5">
      <section className="rounded-xl border border-border bg-surface shadow-sm">
        <div className="p-5 border-b border-border/70">
          <div className="flex items-center gap-2">
            <FiLock className="text-accent" />
            <h2 className="text-base font-bold text-text-primary">Change password</h2>
          </div>
          <p className="mt-1 text-sm text-text-secondary">Use a password you do not use on other sites.</p>
        </div>
        <form onSubmit={handlePasswordSubmit} className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Inputs
            label="Current password"
            id="current-password"
            type="password"
            placeholder="Current password"
            value={passwordForm.currentPassword}
            error={passwordForm.currentPasswordErr}
            onChange={(event) => handlePasswordChange('currentPassword', event.target.value)}
            disabled={isResettingPassword}
          />
          <Inputs
            label="New password"
            id="new-password"
            type="password"
            placeholder="New password"
            value={passwordForm.newPassword}
            error={passwordForm.newPasswordErr}
            onChange={(event) => handlePasswordChange('newPassword', event.target.value)}
            disabled={isResettingPassword}
          />
          <Inputs
            label="Confirm password"
            id="confirm-password"
            type="password"
            placeholder="Confirm password"
            value={passwordForm.confirmPassword}
            error={passwordForm.confirmPasswordErr}
            onChange={(event) => handlePasswordChange('confirmPassword', event.target.value)}
            disabled={isResettingPassword}
          />
          <div className="md:col-span-3 flex justify-end">
            <Button type="submit" variant="secondary" size="md" isLoading={isResettingPassword}>
              Update password
            </Button>
          </div>
        </form>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5">
        <FiShield className="text-2xl text-online" />
        <h2 className="mt-4 text-base font-bold text-text-primary">Account protection</h2>
        <div className="mt-4 space-y-3 text-sm text-text-secondary">
          <p className="flex items-center gap-2"><FiCheck className="text-online" /> Email connected</p>
          <p className="flex items-center gap-2"><FiCheck className="text-online" /> Password login enabled</p>
          <p className="flex items-center gap-2"><FiCheck className="text-online" /> Profile visibility active</p>
        </div>
      </section>
    </div>
  );

  const renderTabPage = () => {
    if (activeTab === 'profile') return renderProfilePage();
    if (activeTab === 'preferences') return renderPreferencesPage();
    if (activeTab === 'security') return renderSecurityPage();
    if (activeTab === 'friends') {
      return (
        <section className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-base font-bold text-text-primary">Friends</h2>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
            {friends.map((friend) => <PersonRow key={friend.name} person={friend} actionLabel="Message" showStatus />)}
          </div>
        </section>
      );
    }
    if (activeTab === 'followers') {
      return (
        <section className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-base font-bold text-text-primary">Followers</h2>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
            {followers.map((follower) => <PersonRow key={follower.name} person={follower} actionLabel="Follow back" />)}
          </div>
        </section>
      );
    }
    if (activeTab === 'groups') {
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
      );
    }
    return (
      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="text-base font-bold text-text-primary">Blocked users</h2>
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
          {blockedUsers.map((person) => <PersonRow key={person.name} person={person} actionLabel="Unblock" />)}
        </div>
      </section>
    );
  };

  return (
    <main id="Settings" className="min-h-screen bg-bg text-text-primary">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row">
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-72 shrink-0 border-b border-border bg-bg/95 p-4 backdrop-blur-xl lg:border-b-0 lg:border-r lg:p-5">
          <div className="flex items-center justify-between gap-3 lg:block">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">RexChat</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-text-primary">Settings</h1>
            </div>
            <Link
              to="/"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-text-secondary transition-colors hover:border-border-hover hover:bg-surface-hover hover:text-text-primary lg:mt-5 lg:w-full"
            >
              <FiArrowLeft />
              <span className="hidden sm:inline">Back to chat</span>
            </Link>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-brand to-accent flex items-center justify-center text-xs font-bold text-white">
              {thumbnailPreview ? (
                <img src={thumbnailPreview} alt={displayName} className="h-full w-full object-cover" />
              ) : (
                initialsFromName(displayName)
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">{displayName}</p>
              <p className="truncate text-xs text-text-secondary">{displayEmail}</p>
            </div>
          </div>

          <nav className="mt-5 overflow-x-auto lg:overflow-visible" aria-label="Settings sections">
            <div className="flex min-w-max gap-2 lg:min-w-0 lg:flex-col">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-all lg:w-full ${isActive
                        ? 'bg-gradient-to-r from-brand to-accent text-white shadow-brand'
                        : 'border border-border bg-surface text-text-secondary hover:border-border-hover hover:bg-surface-hover hover:text-text-primary'
                      }`}
                  >
                    <Icon className="shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="mt-5 hidden items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 lg:flex">
            <FiShield className="text-online" />
            <span className="text-xs font-semibold text-text-secondary">Protected profile</span>
          </div>
        </aside>

        <section className="min-w-0 flex-1 overflow-y-auto p-4 md:p-6 lg:h-screen">
          <div className="mx-auto max-w-5xl animate-fade-in">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Settings page</p>
                <h2 className="mt-1 text-2xl font-bold text-text-primary">{activeTabLabel}</h2>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 sm:hidden">
                <FiShield className="text-online" />
                <span className="text-xs font-semibold text-text-secondary">Protected profile</span>
              </div>
            </div>
            {renderTabPage()}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Settings;
