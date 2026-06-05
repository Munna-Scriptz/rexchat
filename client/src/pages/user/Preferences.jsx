import React, { useState } from 'react'
import { FiCheck, FiMoon, FiSun } from 'react-icons/fi';

const Preferences = () => {
    const [theme, setTheme] = useState('rex');
    const [mode, setMode] = useState('dark');

    const themes = [
        { id: 'rex', label: 'Rex', colors: ['bg-brand', 'bg-accent', 'bg-muted'] },
        { id: 'forest', label: 'Forest', colors: ['bg-emerald-500', 'bg-lime-400', 'bg-slate-700'] },
        { id: 'ember', label: 'Ember', colors: ['bg-rose-500', 'bg-amber-400', 'bg-zinc-700'] },
    ];

    return (
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
    )
}

export default Preferences