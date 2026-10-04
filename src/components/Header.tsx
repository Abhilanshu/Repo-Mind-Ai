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
  Plus,
  Globe
} from 'lucide-react';
import { RepositoryMetadata } from '../types/repomind';

interface HeaderProps {
  repo: RepositoryMetadata;
  onOpenCommandPalette: () => void;
  onSwitchRepo: (repoName: string) => void;
  onOpenRepoInput: () => void;
  onOpenReportModal: () => void;
  onOpenWhatsAppModal: () => void;
  onOpenLandingPage?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  repo,
  onOpenCommandPalette,
  onSwitchRepo,
  onOpenRepoInput,
  onOpenReportModal,
  onOpenWhatsAppModal,
  onOpenLandingPage,
  onNavigateTab
}) => {
  const [showRepoDropdown, setShowRepoDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [filterNotifCategory, setFilterNotifCategory] = useState<string>('all');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const notifications = [
    { id: 1, category: 'issues', icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />, text: `16 Technical Debt items cataloged for ${repo.name}`, time: '5m ago' },
    { id: 2, category: 'security', icon: <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />, text: 'Security Audit: 1 Critical vulnerability flagged', time: '12m ago' },
    { id: 3, category: 'agent', icon: <Bot className="w-3.5 h-3.5 text-blue-600" />, text: 'RepoMind Code Agent: Refactoring patch ready', time: '25m ago' },
    { id: 4, category: 'deps', icon: <Package className="w-3.5 h-3.5 text-indigo-600" />, text: 'Dependencies: 2 outdated libraries require bump', time: '1h ago' },
    { id: 5, category: 'tests', icon: <TestTube2 className="w-3.5 h-3.5 text-emerald-600" />, text: 'Pytest coverage suite evaluated (76%)', time: '2h ago' }
  ];

  const filteredNotifs = filterNotifCategory === 'all'
    ? notifications
    : notifications.filter(n => n.category === filterNotifCategory);

  const presetRepos = [
    { name: 'RepoMind Demo Store', tag: 'React / Node / Python' },
    { name: 'facebook/react', tag: 'Monorepo' },
    { name: 'expressjs/express', tag: 'Node.js' },
    { name: 'tailwindlabs/tailwindcss', tag: 'Rust Engine' },
  ];

  return (
    <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between font-sans shadow-xs">
      
      {/* Left: Brand + Greeting & Project Selector */}
      <div className="flex items-center space-x-4">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => onNavigateTab && onNavigateTab('overview')}
        >
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-blue-500/20">
            🧠
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">RepoMind</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">Platform</span>
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-200 hidden sm:block" />

        {/* Greeting callout */}
        <div className="hidden xl:block text-xs font-semibold text-slate-600">
          {getGreeting()}, <span className="text-slate-900 font-bold">Abhilanshu 👋</span>
        </div>

        {/* Repository Selector */}
        <div className="relative">
          <button
            onClick={() => setShowRepoDropdown(!showRepoDropdown)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-900 font-semibold transition"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="max-w-[130px] md:max-w-[190px] truncate">{repo.name}</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-slate-200 text-slate-800 rounded font-mono">{repo.branch}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showRepoDropdown && (
            <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50">
              <div className="text-[10px] font-semibold text-slate-400 uppercase px-2 py-1">Active Software Projects</div>
              
              {presetRepos.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => { onSwitchRepo(r.name); setShowRepoDropdown(false); }}
                  className="w-full text-left flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-xs transition"
                >
                  <div className="flex items-center space-x-2">
                    <GitBranch className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="text-slate-900 font-medium truncate">{r.name}</span>
                  </div>
                  {repo.name.toLowerCase() === r.name.toLowerCase() ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">{r.tag}</span>
                  )}
                </button>
              ))}

              <div className="my-1 border-t border-slate-200" />

              <button
                onClick={() => { onOpenRepoInput(); setShowRepoDropdown(false); }}
                className="w-full text-left flex items-center space-x-2 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-semibold transition"
              >
                <Plus className="w-3.5 h-3.5 text-blue-600" />
                <span>+ Add Repository / Upload Code</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Global Search / Command Palette Trigger */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-600 transition group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition" />
            <span>Search issues, dependencies, security, files...</span>
          </div>
          <div className="flex items-center space-x-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right: Actions, Notifications, User Menu */}
      <div className="flex items-center space-x-3">
        
        {/* Landing Page Button */}
        {onOpenLandingPage && (
          <button
            onClick={onOpenLandingPage}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Landing Page</span>
          </button>
        )}

        {/* WhatsApp Notifier Button */}
        <button
          onClick={onOpenWhatsAppModal}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold transition"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp Alerts</span>
        </button>

        {/* Export Report Trigger */}
        <button
          onClick={onOpenReportModal}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm shadow-blue-500/20 transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Export Report</span>
        </button>

        {/* Notification Center Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-900">Notification Center</span>
                <span className="text-[10px] text-slate-500 font-mono">5 unread</span>
              </div>

              <div className="flex items-center space-x-1 pt-2 pb-1 overflow-x-auto text-[10px] font-mono">
                {['all', 'issues', 'security', 'agent', 'deps', 'tests'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterNotifCategory(cat)}
                    className={`px-2 py-0.5 rounded capitalize transition ${
                      filterNotifCategory === cat 
                        ? 'bg-blue-600 text-white font-bold' 
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-2 mt-2 max-h-64 overflow-y-auto pr-1">
                {filteredNotifs.map((n) => (
                  <div key={n.id} className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs flex items-start space-x-2 transition">
                    <div className="mt-0.5 shrink-0">{n.icon}</div>
                    <div className="flex-1">
                      <div className="text-slate-800 leading-tight font-medium text-[11px]">{n.text}</div>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
