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
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4 text-[#C4B5FD]" /> },
    { id: 'architecture', label: 'Architecture', icon: <Network className="w-4 h-4" /> },
    { id: 'debt', label: 'Technical Debt', icon: <AlertTriangle className="w-4 h-4" />, badge: 18, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { id: 'security', label: 'Security Center', icon: <ShieldCheck className="w-4 h-4" />, badge: criticalIssueCount, badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    { id: 'dependencies', label: 'Dependencies', icon: <Package className="w-4 h-4" />, badge: '2 Outdated', badgeColor: 'bg-[#7C3AED]/20 text-[#C4B5FD] border-[#7C3AED]/30' },
    { id: 'quality', label: 'Code Quality', icon: <FileCode2 className="w-4 h-4" /> },
    { id: 'testing', label: 'Testing Health', icon: <TestTube2 className="w-4 h-4" />, badge: '78%', badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    { id: 'ai_assistant', label: 'RepoMind Code Agent', icon: <Bot className="w-4 h-4 text-[#8B5CF6]" /> },
    { id: 'sprint', label: 'AI Sprint Planner', icon: <CalendarCheck2 className="w-4 h-4 text-indigo-400" /> },
    { id: 'reports', label: 'Reports & Export', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-[#090611]/90 border-r border-[#2A1B42] flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] sticky top-16 z-20 font-sans`}>
      {/* Navigation Items */}
      <div className="p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'justify-between px-3'} py-2 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 border border-[#8B5CF6]/40'
                  : 'text-[#A9A1B8] hover:text-white hover:bg-[#110B1F] border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center space-x-3">
                <span className={`${isActive ? 'text-white' : 'text-[#A9A1B8] group-hover:text-[#C4B5FD]'} transition`}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </div>

              {!collapsed && item.badge !== undefined && (
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Pro Plan Card & Sidebar Toggle */}
      <div className="p-3 space-y-3">
        {!collapsed && (
          <div className="p-3.5 rounded-2xl bg-[#110B1F] border border-[#2A1B42] relative overflow-hidden">
            <div className="flex items-center space-x-2 text-[#C4B5FD] font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Pro Plan Active</span>
            </div>
            <p className="text-[11px] text-[#A9A1B8] mt-1 leading-tight">
              Repository Intelligence Engine active.
            </p>
            <div className="mt-2 text-[10px] text-[#C4B5FD] font-mono">
              Unlimited scans & AST analysis
            </div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-xl bg-[#110B1F] hover:bg-[#171026] border border-[#2A1B42] text-[#A9A1B8] hover:text-white text-xs transition"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <div className="flex items-center space-x-2"><ChevronLeft className="w-4 h-4" /><span>Collapse Menu</span></div>}
        </button>
      </div>
    </aside>
  );
};
