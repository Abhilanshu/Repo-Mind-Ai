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
    { id: 1, category: 'issues', icon: <AlertTriangle className="w-3.5 h-3.5 text-[#B7791F]" />, text: `16 Technical Debt items cataloged for ${repo.name}`, time: '5m ago' },
    { id: 2, category: 'security', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#C53030]" />, text: 'Security Audit: 1 Critical vulnerability flagged', time: '12m ago' },
    { id: 3, category: 'agent', icon: <Bot className="w-3.5 h-3.5 text-[#6D4AFF]" />, text: 'RepoMind Code Agent: Refactoring patch ready', time: '25m ago' },
    { id: 4, category: 'deps', icon: <Package className="w-3.5 h-3.5 text-[#B7791F]" />, text: 'Dependencies: 2 outdated libraries require bump', time: '1h ago' },
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
    <header className="h-16 border-b border-[#E8E5DF] bg-white/95 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between font-sans shadow-xs">
      
      {/* Left: Brand + Greeting & Project Selector */}
      <div className="flex items-center space-x-4">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => onNavigateTab && onNavigateTab('overview')}
        >
          <div className="w-8 h-8 rounded-xl bg-[#6D4AFF] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#6D4AFF]/20">
            🧠
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-[#1F2937]">RepoMind</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-md bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">Platform</span>
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-[#E8E5DF] hidden sm:block" />

        {/* Greeting callout */}
        <div className="hidden xl:block text-xs font-semibold text-[#4B5563]">
          {getGreeting()}, <span className="text-[#1F2937] font-bold">Abhilanshu 👋</span>
        </div>

        {/* Repository Selector */}
        <div className="relative">
          <button
            onClick={() => setShowRepoDropdown(!showRepoDropdown)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#F7F5F2] hover:bg-[#F1F3F6] border border-[#E8E5DF] text-xs text-[#1F2937] font-semibold transition"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#6D4AFF]" />
            <span className="max-w-[130px] md:max-w-[190px] truncate">{repo.name}</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#E8E5DF] text-[#1F2937] rounded font-mono">{repo.branch}</span>
            <ChevronDown className="w-3 h-3 text-[#9CA3AF]" />
          </button>

          {showRepoDropdown && (
            <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-[#E8E5DF] shadow-xl p-2 z-50">
              <div className="text-[10px] font-semibold text-[#9CA3AF] uppercase px-2 py-1">Active Software Projects</div>
              
              {presetRepos.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => { onSwitchRepo(r.name); setShowRepoDropdown(false); }}
                  className="w-full text-left flex items-center justify-between p-2 rounded-xl hover:bg-[#F7F5F2] text-xs transition"
                >
                  <div className="flex items-center space-x-2">
                    <GitBranch className="w-3.5 h-3.5 text-[#6D4AFF] shrink-0" />
                    <span className="text-[#1F2937] font-medium truncate">{r.name}</span>
                  </div>
                  {repo.name.toLowerCase() === r.name.toLowerCase() ? (
                    <Check className="w-3.5 h-3.5 text-[#16803C] shrink-0" />
                  ) : (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#F1F3F6] text-[#4B5563] border border-[#E8E5DF]">{r.tag}</span>
                  )}
                </button>
              ))}

              <div className="my-1 border-t border-[#E8E5DF]" />

              <button
                onClick={() => { onOpenRepoInput(); setShowRepoDropdown(false); }}
                className="w-full text-left flex items-center space-x-2 p-2 rounded-xl bg-[#F7F5F2] hover:bg-[#F1F3F6] text-[#1F2937] text-xs font-semibold transition"
              >
                <Plus className="w-3.5 h-3.5 text-[#6D4AFF]" />
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
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[#F7F5F2] hover:bg-[#F1F3F6] border border-[#E8E5DF] text-xs text-[#4B5563] transition group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#6D4AFF] transition" />
            <span>Search issues, dependencies, security, files...</span>
          </div>
          <div className="flex items-center space-x-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-[#1F2937] border border-[#E8E5DF]">
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
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#EEE9FF] hover:bg-[#D8CAFF] text-[#6D4AFF] border border-[#D8CAFF] text-xs font-bold transition"
          >
            <Globe className="w-3.5 h-3.5 text-[#6D4AFF]" />
            <span>Landing Page</span>
          </button>
        )}

        {/* WhatsApp Notifier Button */}
        <button
          onClick={onOpenWhatsAppModal}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#EAF7EF] hover:bg-[#C6ECD3] border border-[#C6ECD3] text-[#16803C] text-xs font-bold transition"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#16803C]" />
          <span>WhatsApp Alerts</span>
        </button>

        {/* Export Report Trigger */}
        <button
          onClick={onOpenReportModal}
          className="hidden sm:flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white text-xs font-bold shadow-md shadow-[#6D4AFF]/25 transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Export Report</span>
        </button>

        {/* Notification Center Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-[#F7F5F2] hover:bg-[#F1F3F6] border border-[#E8E5DF] text-[#1F2937] transition relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-[#4B5563]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#16803C] rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#16803C] rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-[#E8E5DF] shadow-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E5DF]">
                <span className="text-xs font-bold text-[#1F2937]">Notification Center</span>
                <span className="text-[10px] text-[#9CA3AF] font-mono">5 unread</span>
              </div>

              <div className="flex items-center space-x-1 pt-2 pb-1 overflow-x-auto text-[10px] font-mono">
                {['all', 'issues', 'security', 'agent', 'deps', 'tests'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterNotifCategory(cat)}
                    className={`px-2 py-0.5 rounded capitalize transition ${
                      filterNotifCategory === cat 
                        ? 'bg-[#6D4AFF] text-white font-bold' 
                        : 'bg-[#F1F3F6] text-[#4B5563] hover:text-[#1F2937]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-2 mt-2 max-h-64 overflow-y-auto pr-1">
                {filteredNotifs.map((n) => (
                  <div key={n.id} className="p-2 rounded-xl bg-[#F7F5F2] hover:bg-[#F1F3F6] border border-[#E8E5DF] text-xs flex items-start space-x-2 transition">
                    <div className="mt-0.5 shrink-0">{n.icon}</div>
                    <div className="flex-1">
                      <div className="text-[#1F2937] leading-tight font-medium text-[11px]">{n.text}</div>
                      <div className="text-[9px] text-[#9CA3AF] font-mono mt-0.5">{n.time}</div>
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
