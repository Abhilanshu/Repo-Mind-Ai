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
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4 text-blue-600" /> },
    { id: 'architecture', label: 'Architecture', icon: <Network className="w-4 h-4" /> },
    { id: 'debt', label: 'Technical Debt', icon: <AlertTriangle className="w-4 h-4 text-amber-500" />, badge: 16, badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'security', label: 'Security Center', icon: <ShieldCheck className="w-4 h-4 text-rose-500" />, badge: criticalIssueCount, badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' },
    { id: 'dependencies', label: 'Dependencies', icon: <Package className="w-4 h-4" />, badge: '2 Outdated', badgeColor: 'bg-slate-100 text-slate-700 border-slate-200' },
    { id: 'quality', label: 'Code Quality', icon: <FileCode2 className="w-4 h-4" /> },
    { id: 'testing', label: 'Testing Health', icon: <TestTube2 className="w-4 h-4" />, badge: '76%', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'ai_assistant', label: 'RepoMind Code Agent', icon: <Bot className="w-4 h-4 text-indigo-600" /> },
    { id: 'sprint', label: 'AI Sprint Planner', icon: <CalendarCheck2 className="w-4 h-4 text-blue-600" /> },
    { id: 'reports', label: 'Reports & Export', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] sticky top-16 z-20 font-sans`}>
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
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center space-x-3">
                <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'} transition`}>
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
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 relative overflow-hidden">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Pro Workspace</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-tight">
              Repository Intelligence active.
            </p>
            <div className="mt-2 text-[10px] text-slate-500 font-mono">
              Local & AST engine online
            </div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs transition font-semibold"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <div className="flex items-center space-x-2"><ChevronLeft className="w-4 h-4" /><span>Collapse Sidebar</span></div>}
        </button>
      </div>
    </aside>
  );
};
