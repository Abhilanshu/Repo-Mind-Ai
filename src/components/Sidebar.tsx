import React from 'react';
import { 
  LayoutDashboard, 
  FolderGit2,
  Network, 
  AlertTriangle, 
  ShieldCheck, 
  Package, 
  FileCode2, 
  TestTube2, 
  Bot, 
  CalendarCheck2, 
  FileSpreadsheet, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { NavigationTab } from '../types/repomind';

interface SidebarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  criticalIssueCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  collapsed,
  onToggleCollapse,
  criticalIssueCount
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string | number; badgeColor?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4 text-[#6D4AFF]" /> },
    { id: 'architecture', label: 'Architecture', icon: <Network className="w-4 h-4" /> },
    { id: 'debt', label: 'Technical Debt', icon: <AlertTriangle className="w-4 h-4 text-[#B7791F]" />, badge: 16, badgeColor: 'bg-[#FFF5DD] text-[#B7791F] border-[#F3D29A]' },
    { id: 'security', label: 'Security Center', icon: <ShieldCheck className="w-4 h-4 text-[#C53030]" />, badge: criticalIssueCount, badgeColor: 'bg-[#FDECEE] text-[#C53030] border-[#F5C6C6]' },
    { id: 'dependencies', label: 'Dependencies', icon: <Package className="w-4 h-4" />, badge: '2 Outdated', badgeColor: 'bg-[#FFF5DD] text-[#B7791F] border-[#F3D29A]' },
    { id: 'quality', label: 'Code Quality', icon: <FileCode2 className="w-4 h-4" /> },
    { id: 'testing', label: 'Testing Health', icon: <TestTube2 className="w-4 h-4" />, badge: '76%', badgeColor: 'bg-[#EAF7EF] text-[#16803C] border-[#C6ECD3]' },
    { id: 'ai_assistant', label: 'RepoMind Code Agent', icon: <Bot className="w-4 h-4 text-[#6D4AFF]" /> },
    { id: 'sprint', label: 'AI Sprint Planner', icon: <CalendarCheck2 className="w-4 h-4 text-[#1D4ED8]" /> },
    { id: 'reports', label: 'Reports & Export', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-[#FBFAF8] border-r border-[#E8E5DF] flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] sticky top-16 z-20 font-sans`}>
      {/* Navigation Links */}
      <div className="p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'justify-between px-3'} py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#EEE9FF] text-[#6D4AFF] font-bold shadow-xs'
                  : 'text-[#4B5563] hover:text-[#1F2937] hover:bg-[#F1F3F6] border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center space-x-3">
                <span className={`${isActive ? 'text-[#6D4AFF]' : 'text-[#6B7280] group-hover:text-[#1F2937]'} transition`}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </div>

              {!collapsed && item.badge !== undefined && (
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Pro Workspace Card & Collapse Control */}
      <div className="p-3 space-y-3">
        {!collapsed && (
          <div className="p-3.5 rounded-2xl bg-[#F2EDFF] border border-[#D8CAFF] relative overflow-hidden shadow-xs">
            <div className="flex items-center space-x-2 text-[#6D4AFF] font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#6D4AFF]" />
              <span>Pro Workspace</span>
            </div>
            <p className="text-[11px] text-[#4B5563] mt-1 leading-snug">
              Repository Intelligence active.
            </p>
            <div className="mt-2 text-[10px] text-[#6D4AFF] font-mono font-semibold">
              Local AST & CallMeBot online
            </div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-xl bg-white hover:bg-[#F1F3F6] border border-[#E8E5DF] text-[#4B5563] hover:text-[#1F2937] text-xs transition font-semibold shadow-xs"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <div className="flex items-center space-x-2"><ChevronLeft className="w-4 h-4" /><span>Collapse Sidebar</span></div>}
        </button>
      </div>
    </aside>
  );
};
