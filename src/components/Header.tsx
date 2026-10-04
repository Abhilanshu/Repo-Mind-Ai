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
    { id: 1, category: 'issues', icon: <AlertTriangle className="w-3.5 h-3.5 text-[#B7791F]" />, text: `16 Technical Debt items cataloged for ${repo.name}`, time: '5m ago' },
    { id: 2, category: 'security', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#C53030]" />, text: 'Security Audit: 1 Critical vulnerability flagged', time: '12m ago' },
    { id: 3, category: 'agent', icon: <Bot className="w-3.5 h-3.5 text-[#171717]" />, text: 'RepoMind Code Agent: Refactoring patch ready', time: '25m ago' },
    { id: 4, category: 'deps', icon: <Package className="w-3.5 h-3.5 text-[#315EFB]" />, text: 'Dependencies: 2 outdated libraries require bump', time: '1h ago' },
    { id: 5, category: 'tests', icon: <TestTube2 className="w-3.5 h-3.5 text-[#16803C]" />, text: 'Pytest coverage suite evaluated (76%)', time: '2h ago' }
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
    <header className="h-16 border-b border-[#E4E4DE] bg-white sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between font-sans">
      
      {/* Left: Brand + Greeting & Project Selector */}
      <div className="flex items-center space-x-4">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => onNavigateTab && onNavigateTab('overview')}
        >
          <div className="w-8 h-8 rounded-lg bg-[#171717] flex items-center justify-center text-white font-bold text-sm shadow-sm">
            🧠
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-[#181816]">RepoMind</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-[#F1F1ED] text-[#686862] border border-[#E4E4DE]">Platform</span>
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-[#E4E4DE] hidden sm:block" />

        {/* Greeting callout */}
        <div className="hidden xl:block text-xs font-semibold text-[#686862]">
          {getGreeting()}, <span className="text-[#181816] font-bold">Abhilanshu 👋</span>
        </div>

        {/* Repository Selector */}
        <div className="relative">
          <button
            onClick={() => setShowRepoDropdown(!showRepoDropdown)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#F7F7F4] hover:bg-[#F1F1ED] border border-[#E4E4DE] text-xs text-[#181816] font-semibold transition"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#171717]" />
            <span className="max-w-[130px] md:max-w-[190px] truncate">{repo.name}</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#E4E4DE] text-[#181816] rounded font-mono">{repo.branch}</span>
            <ChevronDown className="w-3 h-3 text-[#96968E]" />
          </button>

          {showRepoDropdown && (
            <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-[#E4E4DE] shadow-xl p-2 z-50">
              <div className="text-[10px] font-semibold text-[#96968E] uppercase px-2 py-1">Active Software Projects</div>
              
              {presetRepos.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => { onSwitchRepo(r.name); setShowRepoDropdown(false); }}
                  className="w-full text-left flex items-center justify-between p-2 rounded-xl hover:bg-[#F7F7F4] text-xs transition"
                >
                  <div className="flex items-center space-x-2">
                    <GitBranch className="w-3.5 h-3.5 text-[#171717] shrink-0" />
                    <span className="text-[#181816] font-medium truncate">{r.name}</span>
                  </div>
                  {repo.name.toLowerCase() === r.name.toLowerCase() ? (
                    <Check className="w-3.5 h-3.5 text-[#16803C] shrink-0" />
                  ) : (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#F1F1ED] text-[#686862] border border-[#E4E4DE]">{r.tag}</span>
                  )}
                </button>
              ))}

              <div className="my-1 border-t border-[#E4E4DE]" />

              <button
                onClick={() => { onOpenRepoInput(); setShowRepoDropdown(false); }}
                className="w-full text-left flex items-center space-x-2 p-2 rounded-xl bg-[#F7F7F4] hover:bg-[#F1F1ED] text-[#181816] text-xs font-semibold transition"
              >
                <Plus className="w-3.5 h-3.5 text-[#171717]" />
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
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[#F7F7F4] hover:bg-[#F1F1ED] border border-[#E4E4DE] text-xs text-[#686862] transition group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-[#96968E] group-hover:text-[#181816] transition" />
            <span>Search issues, dependencies, security, files...</span>
          </div>
          <div className="flex items-center space-x-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-[#181816] border border-[#E4E4DE]">
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
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#F7F7F4] hover:bg-[#F1F1ED] border border-[#E4E4DE] text-[#181816] text-xs font-semibold transition"
          >
            <Globe className="w-3.5 h-3.5 text-[#171717]" />
            <span>Landing Page</span>
          </button>
        )}

        {/* WhatsApp Notifier Button */}
        <button
          onClick={onOpenWhatsAppModal}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#F7F7F4] hover:bg-[#F1F1ED] border border-[#E4E4DE] text-[#181816] text-xs font-semibold transition"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#16803C]" />
          <span>WhatsApp Alerts</span>
        </button>

        {/* Export Report Trigger */}
        <button
          onClick={onOpenReportModal}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#171717] hover:bg-[#313131] text-white text-xs font-semibold shadow-sm transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Export Report</span>
        </button>

        {/* Notification Center Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-[#F7F7F4] hover:bg-[#F1F1ED] border border-[#E4E4DE] text-[#181816] transition relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-[#686862]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#16803C] rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#16803C] rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-[#E4E4DE] shadow-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#E4E4DE]">
                <span className="text-xs font-bold text-[#181816]">Notification Center</span>
                <span className="text-[10px] text-[#686862] font-mono">5 unread</span>
              </div>

              <div className="flex items-center space-x-1 pt-2 pb-1 overflow-x-auto text-[10px] font-mono">
                {['all', 'issues', 'security', 'agent', 'deps', 'tests'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterNotifCategory(cat)}
                    className={`px-2 py-0.5 rounded capitalize transition ${
                      filterNotifCategory === cat 
                        ? 'bg-[#171717] text-white font-bold' 
                        : 'bg-[#F1F1ED] text-[#686862] hover:text-[#181816]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-2 mt-2 max-h-64 overflow-y-auto pr-1">
                {filteredNotifs.map(n => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-[#F7F7F4] hover:bg-[#F1F1ED] border border-[#E4E4DE] text-xs transition flex items-start space-x-2.5">
                    <div className="mt-0.5 shrink-0">{n.icon}</div>
                    <div className="flex-1">
                      <p className="text-[#181816] text-[11px] leading-snug">{n.text}</p>
                      <span className="text-[9px] text-[#96968E] mt-1 block font-mono">{n.time}</span>
                    </div>
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
            className="flex items-center space-x-2 p-1 rounded-xl bg-[#F7F7F4] hover:bg-[#F1F1ED] border border-[#E4E4DE] transition"
          >
            <div className="w-7 h-7 rounded-lg bg-[#171717] flex items-center justify-center text-xs font-bold text-white">
              A
            </div>
            <span className="text-xs font-semibold text-[#181816] hidden lg:inline px-1">Abhilanshu</span>
            <ChevronDown className="w-3 h-3 text-[#96968E] hidden lg:inline" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#E4E4DE] shadow-xl p-2 z-50">
              <div className="px-3 py-2 border-b border-[#E4E4DE]">
                <p className="text-xs font-bold text-[#181816]">Abhilanshu Vittolia</p>
                <p className="text-[10px] text-[#686862]">abhilanshu@repomind.ai</p>
                <span className="mt-1 inline-block text-[9px] font-mono px-1.5 py-0.5 bg-[#F1F1ED] text-[#181816] rounded border border-[#E4E4DE]">Pro Workspace</span>
              </div>
              <div className="py-1 space-y-0.5 text-xs text-[#686862]">
                <button onClick={() => { onNavigateTab && onNavigateTab('projects'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#F7F7F4] hover:text-[#181816] transition">Projects & Repositories</button>
                <button onClick={() => { onNavigateTab && onNavigateTab('settings'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#F7F7F4] hover:text-[#181816] transition">API Keys & Webhooks</button>
                <button onClick={() => { onNavigateTab && onNavigateTab('settings'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#F7F7F4] hover:text-[#181816] transition">Workspace Settings</button>
              </div>
              <div className="pt-1 border-t border-[#E4E4DE]">
                <button className="w-full text-left px-3 py-1.5 text-xs text-[#C53030] hover:bg-rose-50 rounded transition">Logout</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
