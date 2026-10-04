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
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4 text-[#171717]" /> },
    { id: 'architecture', label: 'Architecture', icon: <Network className="w-4 h-4" /> },
    { id: 'debt', label: 'Technical Debt', icon: <AlertTriangle className="w-4 h-4" />, badge: 16, badgeColor: 'bg-[#F1F1ED] text-[#B7791F] border-[#E4E4DE]' },
    { id: 'security', label: 'Security Center', icon: <ShieldCheck className="w-4 h-4" />, badge: criticalIssueCount, badgeColor: 'bg-rose-50 text-[#C53030] border-rose-200' },
    { id: 'dependencies', label: 'Dependencies', icon: <Package className="w-4 h-4" />, badge: '2 Outdated', badgeColor: 'bg-[#F1F1ED] text-[#181816] border-[#E4E4DE]' },
    { id: 'quality', label: 'Code Quality', icon: <FileCode2 className="w-4 h-4" /> },
    { id: 'testing', label: 'Testing Health', icon: <TestTube2 className="w-4 h-4" />, badge: '76%', badgeColor: 'bg-[#F1F1ED] text-[#16803C] border-[#E4E4DE]' },
    { id: 'ai_assistant', label: 'RepoMind Code Agent', icon: <Bot className="w-4 h-4 text-[#171717]" /> },
    { id: 'sprint', label: 'AI Sprint Planner', icon: <CalendarCheck2 className="w-4 h-4 text-[#315EFB]" /> },
    { id: 'reports', label: 'Reports & Export', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white border-r border-[#E4E4DE] flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] sticky top-16 z-20 font-sans`}>
      {/* Upper Navigation */}
      <div className="p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'justify-between px-3'} py-2 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'text-[#686862] hover:text-[#181816] hover:bg-[#F7F7F4] border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center space-x-3">
                <span className={`${isActive ? 'text-white' : 'text-[#686862] group-hover:text-[#181816]'} transition`}>
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

      {/* Pro Plan Card & Collapse */}
      <div className="p-3 space-y-3">
        {!collapsed && (
          <div className="p-3.5 rounded-2xl bg-[#F7F7F4] border border-[#E4E4DE] relative overflow-hidden">
            <div className="flex items-center space-x-2 text-[#181816] font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#171717]" />
              <span>Pro Workspace</span>
            </div>
            <p className="text-[11px] text-[#686862] mt-1 leading-tight">
              Repository Intelligence active.
            </p>
            <div className="mt-2 text-[10px] text-[#96968E] font-mono">
              Local & AST engine online
            </div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-xl bg-[#F7F7F4] hover:bg-[#F1F1ED] border border-[#E4E4DE] text-[#686862] hover:text-[#181816] text-xs transition"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <div className="flex items-center space-x-2"><ChevronLeft className="w-4 h-4" /><span>Collapse Sidebar</span></div>}
        </button>
      </div>
    </aside>
  );
};
