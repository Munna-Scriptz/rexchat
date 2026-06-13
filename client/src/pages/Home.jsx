import { Link } from 'react-router';
import { FiMessageCircle, FiSearch, FiShield, FiUserPlus } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';

const quickActions = [
  {
    icon: <FiSearch />,
    title: 'Find a chat',
    description: 'Search existing conversations from the sidebar.',
  },
  {
    icon: <FiUserPlus />,
    title: 'Add people',
    description: 'Connect with friends and start a new thread.',
  },
  {
    icon: <FiShield />,
    title: 'Stay in control',
    description: 'Your messages stay organized in one focused space.',
  },
];

const Home = () => {
  const focusSidebarSearch = () => {
    document.getElementById('sidebar-search')?.focus();
  };

  return (
    <main id="Home" className="flex-1 flex flex-col bg-bg overflow-hidden rounded-3xl border border-border/70">
      <section className="relative flex min-h-full flex-1 items-center justify-center overflow-hidden px-5 py-8 sm:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(17,19,31,0.96),rgba(10,11,20,1)_54%,rgba(14,41,51,0.7))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />

        <div className="relative z-10 grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="max-w-2xl animate-slide-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft/50 px-3 py-1.5 text-xs font-semibold text-accent">
              <HiOutlineSparkles className="text-base" />
              Ready when you are
            </div>

            <h1 className="text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
              Start chatting today
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-text-secondary sm:text-base">
              Select a conversation from the sidebar or find someone new to begin messaging. RexChat keeps your chats fast, focused, and easy to follow.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/users"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand via-brand-light to-accent px-5 py-3 text-sm font-semibold text-white shadow-brand transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                <FiUserPlus className="text-lg" />
                Find people
              </Link>
              <button
                type="button"
                onClick={focusSidebarSearch}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/80 px-5 py-3 text-sm font-semibold text-text-primary transition-all duration-300 hover:border-border-hover hover:bg-muted"
              >
                <FiSearch className="text-lg" />
                Search chats
              </button>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {quickActions.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border/70 bg-surface/65 p-4 shadow-sm backdrop-blur">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-lg text-accent">
                    {item.icon}
                  </div>
                  <h2 className="text-sm font-semibold text-text-primary">{item.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-md animate-float lg:block">
            <div className="relative rounded-3xl border border-border bg-surface/90 p-5 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent text-lg text-white shadow-brand">
                  <FiMessageCircle />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">No chat selected</p>
                  <p className="text-xs text-text-secondary">Choose a conversation to begin</p>
                </div>
              </div>

              <div className="space-y-4 py-6">
                <div className="ml-auto max-w-[76%] rounded-2xl rounded-br-md bg-chat-sent px-4 py-3 text-sm text-white shadow-brand">
                  Hey, ready to catch up?
                </div>
                <div className="max-w-[74%] rounded-2xl rounded-bl-md bg-chat-received px-4 py-3 text-sm text-text-primary">
                  Pick a chat and your messages will appear here.
                </div>
                <div className="ml-auto max-w-[68%] rounded-2xl rounded-br-md bg-chat-sent/80 px-4 py-3 text-sm text-white">
                  Let's start something new.
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-border bg-bg/80 px-4 py-3">
                <div className="h-2 flex-1 rounded-full bg-muted" />
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-bg">
                  <FiMessageCircle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
};

export default Home;