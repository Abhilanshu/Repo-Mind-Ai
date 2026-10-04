import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Check, 
  GitBranch, 
  FolderGit2,
  MessageSquare,
  Sparkles,
  Command,
  CheckCircle2,
  AlertTriangle,
  TestTube2,
  Package,
  ShieldCheck,
  Bot,
  CalendarCheck2,
  Rocket
} from 'lucide-react';
import { RepositoryMetadata } from '../types/repomind';

interface HeaderProps {
  repo: RepositoryMetadata;
  onOpenCommandPalette: () => void;
  onSwitchRepo: (repoName: string) => void;
  onOpenRepoInput: () => void;
  onOpenReportModal: () => void;
  onOpenWhatsAppModal: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  repo,
  onOpenCommandPalette,
  onSwitchRepo,
  onOpenRepoInput,
  onOpenReportModal,
  onOpenWhatsAppModal,
  onNavigateTab
}) => {
  const [showRepoDropdown, setShowRepoDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [filterNotifCategory, setFilterNotifCategory] = useState<string>('all');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const notifications = [
    { id: 1, category: 'issues', icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />, text: `18 Technical Debt items cataloged for ${repo.name}`, time: '5m ago' },
    { id: 2, category: 'security', icon: <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />, text: 'Security Audit: 1 Critical vulnerability flagged', time: '12m ago' },
    { id: 3, category: 'agent', icon: <Bot className="w-3.5 h-3.5 text-[#C4B5FD]" />, text: 'RepoMind Code Agent: Refactoring patch ready', time: '25m ago' },
    { id: 4, category: 'deps', icon: <Package className="w-3.5 h-3.5 text-[#A78BFA]" />, text: 'Dependencies: 2 outdated libraries require bump', time: '1h ago' },
    { id: 5, category: 'tests', icon: <TestTube2 className="w-3.5 h-3.5 text-indigo-400" />, text: 'Pytest coverage suite evaluated (63%)', time: '2h ago' }
  ];

  const filteredNotifs = filterNotifCategory === 'all'
    ? notifications
    : notifications.filter(n => n.category === filterNotifCategory);

  const presetRepos = [
    { name: 'Abhilanshu/Repo-Mind-Ai', tag: 'React / TS' },
    { name: 'facebook/react', tag: 'Monorepo' },
    { name: 'expressjs/express', tag: 'Node.js' },
    { name: 'tailwindlabs/tailwindcss', tag: 'Rust / CSS' },
  ];

  return (
    <header className="h-16 border-b border-[#2A1B42] bg-[#090611]/90 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between font-sans">
      
      {/* Left: Brand + Greeting & Project Selector */}
      <div className="flex items-center space-x-4">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => onNavigateTab && onNavigateTab('overview')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#4C1D95] flex items-center justify-center shadow-lg shadow-[#7C3AED]/20 border border-[#8B5CF6]/30">
            <span className="text-lg">🧠</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">RepoMind</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-[#7C3AED]/20 text-[#C4B5FD] border border-[#7C3AED]/30">SaaS</span>
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-[#2A1B42] hidden sm:block" />

        {/* Greeting callout */}
        <div className="hidden xl:block text-xs font-semibold text-[#A9A1B8]">
          {getGreeting()}, <span className="text-white font-bold">Abhilanshu 👋</span>
        </div>

        {/* Repository Selector */}
        <div className="relative">
          <button
            onClick={() => setShowRepoDropdown(!showRepoDropdown)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#110B1F] hover:bg-[#171026] border border-[#2A1B42] text-xs text-[#F8F7FF] transition"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="font-medium max-w-[130px] md:max-w-[190px] truncate">{repo.name}</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#7C3AED]/20 text-[#C4B5FD] rounded font-mono">{repo.branch}</span>
            <ChevronDown className="w-3 h-3 text-[#A9A1B8]" />
          </button>

          {showRepoDropdown && (
            <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-[#110B1F] border border-[#2A1B42] shadow-2xl p-2 z-50">
              <div className="text-[10px] font-semibold text-[#A9A1B8] uppercase px-2 py-1">Active Software Repositories</div>
              
              {presetRepos.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => { onSwitchRepo(r.name); setShowRepoDropdown(false); }}
                  className="w-full text-left flex items-center justify-between p-2 rounded-xl hover:bg-[#171026] text-xs transition"
                >
                  <div className="flex items-center space-x-2">
                    <GitBranch className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                    <span className="text-white font-medium truncate">{r.name}</span>
                  </div>
                  {repo.name.toLowerCase() === r.name.toLowerCase() ? (
                    <Check className="w-3.5 h-3.5 text-[#C4B5FD] shrink-0" />
                  ) : (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#171026] text-[#A9A1B8] border border-[#2A1B42]">{r.tag}</span>
                  )}
                </button>
              ))}

              <div className="my-1 border-t border-[#2A1B42]" />

              <button
                onClick={() => { onOpenRepoInput(); setShowRepoDropdown(false); }}
                className="w-full text-left flex items-center space-x-2 p-2 rounded-xl bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 text-[#C4B5FD] text-xs font-semibold transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ Analyze Any GitHub Repository</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Global Search / Command Palette Trigger */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[#110B1F] hover:bg-[#171026] border border-[#2A1B42] text-xs text-[#A9A1B8] transition group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-[#8B5CF6] group-hover:text-[#C4B5FD] transition" />
            <span>Search issues, dependencies, security, files...</span>
          </div>
          <div className="flex items-center space-x-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#171026] text-[#C4B5FD] border border-[#2A1B42]">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right: Actions, Notifications, User Menu */}
      <div className="flex items-center space-x-3">
        
        {/* WhatsApp Bot Notifier Button */}
        <button
          onClick={onOpenWhatsAppModal}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#110B1F] hover:bg-[#171026] border border-[#2A1B42] text-[#C4B5FD] text-xs font-semibold transition"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp Notifier</span>
        </button>

        {/* Export Report Trigger */}
        <button
          onClick={onOpenReportModal}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white text-xs font-semibold shadow-md shadow-[#7C3AED]/20 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-200" />
          <span>Export Report</span>
        </button>

        {/* Notification Center Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-[#110B1F] hover:bg-[#171026] border border-[#2A1B42] text-[#F8F7FF] transition relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-[#C4B5FD]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7C3AED] rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7C3AED] rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#110B1F] border border-[#2A1B42] shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#2A1B42]">
                <span className="text-xs font-bold text-white">Notification Center</span>
                <span className="text-[10px] text-[#C4B5FD] font-mono">5 unread</span>
              </div>

              {/* Category Pills */}
              <div className="flex items-center space-x-1 pt-2 pb-1 overflow-x-auto text-[10px] font-mono">
                {['all', 'issues', 'security', 'agent', 'deps', 'tests'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterNotifCategory(cat)}
                    className={`px-2 py-0.5 rounded capitalize transition ${
                      filterNotifCategory === cat 
                        ? 'bg-[#7C3AED] text-white font-bold' 
                        : 'bg-[#171026] text-[#A9A1B8] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-2 mt-2 max-h-64 overflow-y-auto pr-1">
                {filteredNotifs.map(n => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-[#171026] hover:bg-[#2A1B42]/50 border border-[#2A1B42] text-xs transition flex items-start space-x-2.5">
                    <div className="mt-0.5 shrink-0">{n.icon}</div>
                    <div className="flex-1">
                      <p className="text-slate-200 text-[11px] leading-snug">{n.text}</p>
                      <span className="text-[9px] text-[#A9A1B8] mt-1 block font-mono">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center space-x-2 p-1.5 rounded-xl bg-[#110B1F] hover:bg-[#171026] border border-[#2A1B42] transition"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#4C1D95] flex items-center justify-center text-xs font-bold text-white">
              A
            </div>
            <span className="text-xs font-semibold text-[#F8F7FF] hidden lg:inline">Abhilanshu</span>
            <ChevronDown className="w-3 h-3 text-[#A9A1B8] hidden lg:inline" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#110B1F] border border-[#2A1B42] shadow-2xl p-2 z-50">
              <div className="px-3 py-2 border-b border-[#2A1B42]">
                <p className="text-xs font-bold text-white">Abhilanshu Vittolia</p>
                <p className="text-[10px] text-[#C4B5FD]">abhilanshu@repomind.ai</p>
                <span className="mt-1 inline-block text-[9px] font-mono px-1.5 py-0.5 bg-[#7C3AED]/20 text-[#C4B5FD] rounded border border-[#7C3AED]/30">Pro Workspace</span>
              </div>
              <div className="py-1 space-y-0.5 text-xs text-[#A9A1B8]">
                <button onClick={() => { onNavigateTab && onNavigateTab('projects'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#171026] hover:text-white transition">Projects & Repositories</button>
                <button onClick={() => { onNavigateTab && onNavigateTab('settings'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#171026] hover:text-white transition">API Keys & Webhooks</button>
                <button onClick={() => { onNavigateTab && onNavigateTab('settings'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#171026] hover:text-white transition">Workspace Settings</button>
              </div>
              <div className="pt-1 border-t border-[#2A1B42]">
                <button className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30 rounded transition">Logout</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
