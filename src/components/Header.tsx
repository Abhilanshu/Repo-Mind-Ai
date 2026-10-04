import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  User, 
  Sparkles, 
  Terminal, 
  Command, 
  ChevronDown, 
  Check, 
  GitBranch, 
  Zap,
  FolderGit2,
  MessageSquare
} from 'lucide-react';
import { RepositoryMetadata } from '../types/repomind';

interface HeaderProps {
  repo: RepositoryMetadata;
  onOpenCommandPalette: () => void;
  onSwitchRepo: (repoName: string) => void;
  onOpenRepoInput: () => void;
  onOpenReportModal: () => void;
  onOpenWhatsAppModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  repo,
  onOpenCommandPalette,
  onSwitchRepo,
  onOpenRepoInput,
  onOpenReportModal,
  onOpenWhatsAppModal
}) => {
  const [showRepoDropdown, setShowRepoDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, type: 'critical', text: `Analysis complete for ${repo.name}`, time: '10m ago' },
    { id: 2, type: 'warning', text: '3 high-complexity functions flagged for refactoring', time: '1h ago' },
    { id: 3, type: 'info', text: 'WhatsApp AI Chatbot active & ready', time: '2h ago' }
  ];

  const presetRepos = [
    { name: 'Abhilanshu/Repo-Mind-Ai', tag: 'React / TS' },
    { name: 'facebook/react', tag: 'Monorepo' },
    { name: 'expressjs/express', tag: 'Node.js' },
    { name: 'tailwindlabs/tailwindcss', tag: 'CSS Engine' },
  ];

  return (
    <header className="h-16 border-b border-purple-900/30 bg-[#0e0a1c]/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Logo & Repo Switcher */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20 border border-purple-400/30">
            <span className="text-lg">🧠</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">RepoMind</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">AI</span>
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-purple-900/40 hidden sm:block" />

        {/* Repository Selector */}
        <div className="relative">
          <button
            onClick={() => setShowRepoDropdown(!showRepoDropdown)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/40 text-xs text-slate-200 transition"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-medium max-w-[140px] md:max-w-[200px] truncate">{repo.name}</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded font-mono">{repo.branch}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showRepoDropdown && (
            <div className="absolute left-0 mt-2 w-72 rounded-xl bg-[#140f2b] border border-purple-500/30 shadow-2xl p-2 z-50">
              <div className="text-[10px] font-semibold text-purple-300/70 uppercase px-2 py-1">Analyzed Repositories</div>
              
              {presetRepos.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => { onSwitchRepo(r.name); setShowRepoDropdown(false); }}
                  className="w-full text-left flex items-center justify-between p-2 rounded-lg hover:bg-purple-900/30 text-xs transition"
                >
                  <div className="flex items-center space-x-2">
                    <GitBranch className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="text-white font-medium truncate">{r.name}</span>
                  </div>
                  {repo.name.toLowerCase() === r.name.toLowerCase() ? (
                    <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  ) : (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800/40">{r.tag}</span>
                  )}
                </button>
              ))}

              <div className="my-1 border-t border-purple-900/40" />

              <button
                onClick={() => { onOpenRepoInput(); setShowRepoDropdown(false); }}
                className="w-full text-left flex items-center space-x-2 p-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-semibold transition"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>+ Analyze Any GitHub Repository</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Global Search / Command Palette Trigger */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-purple-950/30 hover:bg-purple-900/30 border border-purple-800/30 text-xs text-slate-400 transition group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-300 transition" />
            <span>Search files, technical debt, security findings...</span>
          </div>
          <div className="flex items-center space-x-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-700/40">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right: Actions, Notifications, Profile */}
      <div className="flex items-center space-x-3">
        
        {/* WhatsApp Bot Trigger Button */}
        <button
          onClick={onOpenWhatsAppModal}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition shadow-md shadow-emerald-900/20"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp Bot</span>
        </button>

        <button
          onClick={onOpenReportModal}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-200" />
          <span>Export Report</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/40 text-slate-300 hover:text-white transition relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-purple-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#140f2b] border border-purple-500/30 shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-purple-900/40">
                <span className="text-xs font-bold text-white">Notifications</span>
                <span className="text-[10px] text-purple-400 font-mono">3 unread</span>
              </div>
              <div className="space-y-2 mt-2">
                {notifications.map(n => (
                  <div key={n.id} className="p-2 rounded-lg bg-purple-950/50 hover:bg-purple-900/30 border border-purple-800/30 text-xs transition">
                    <p className="text-slate-200 font-medium leading-snug">{n.text}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center space-x-2 p-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/40 transition"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
              A
            </div>
            <span className="text-xs font-semibold text-slate-200 hidden lg:inline">Abhilanshu</span>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden lg:inline" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#140f2b] border border-purple-500/30 shadow-2xl p-2 z-50">
              <div className="px-3 py-2 border-b border-purple-900/40">
                <p className="text-xs font-bold text-white">Abhilanshu Vittolia</p>
                <p className="text-[10px] text-purple-300">abhilanshu@repomind.ai</p>
                <span className="mt-1 inline-block text-[9px] font-mono px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">Personal Workspace</span>
              </div>
              <div className="py-1 space-y-0.5 text-xs text-slate-300">
                <button className="w-full text-left px-3 py-1.5 rounded hover:bg-purple-900/30 transition">Repositories</button>
                <button className="w-full text-left px-3 py-1.5 rounded hover:bg-purple-900/30 transition">API Keys & Tokens</button>
                <button className="w-full text-left px-3 py-1.5 rounded hover:bg-purple-900/30 transition">Workspace Settings</button>
              </div>
              <div className="pt-1 border-t border-purple-900/40">
                <button className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30 rounded transition">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
