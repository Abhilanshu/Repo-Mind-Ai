import React from 'react';
import { 
  LayoutDashboard, 
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
    { id: 'architecture', label: 'Architecture', icon: <Network className="w-4 h-4" /> },
    { id: 'debt', label: 'Technical Debt', icon: <AlertTriangle className="w-4 h-4" />, badge: 147, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { id: 'security', label: 'Security Center', icon: <ShieldCheck className="w-4 h-4" />, badge: criticalIssueCount, badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    { id: 'dependencies', label: 'Dependencies', icon: <Package className="w-4 h-4" />, badge: '4 Vuln', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { id: 'quality', label: 'Code Quality', icon: <FileCode2 className="w-4 h-4" /> },
    { id: 'testing', label: 'Testing Health', icon: <TestTube2 className="w-4 h-4" />, badge: '63%', badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    { id: 'ai_assistant', label: 'AI Codebase Assistant', icon: <Bot className="w-4 h-4 text-purple-400" /> },
    { id: 'sprint', label: 'AI Sprint Planner', icon: <CalendarCheck2 className="w-4 h-4 text-indigo-400" /> },
    { id: 'reports', label: 'Reports & Export', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-[#0e0a1c]/90 border-r border-purple-900/30 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] sticky top-16 z-20`}>
      {/* Upper Navigation Items */}
      <div className="p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'justify-between px-3'} py-2 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-purple-700/80 to-indigo-800/80 text-white shadow-lg shadow-purple-900/40 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-purple-950/40 border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center space-x-3">
                <span className={`${isActive ? 'text-purple-200' : 'text-slate-400 group-hover:text-purple-300'} transition`}>
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

      {/* Bottom Pro Callout & Collapse Toggle */}
      <div className="p-3 space-y-3">
        {!collapsed && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-950/80 via-purple-900/40 to-indigo-950/80 border border-purple-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center space-x-2 text-purple-300 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Pro Plan Active</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-tight">
              AI Continuous Codebase Monitoring enabled.
            </p>
            <div className="mt-2 text-[10px] text-purple-400 font-mono">
              Unlimited repos & AST scans
            </div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/30 text-slate-400 hover:text-white text-xs transition"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <div className="flex items-center space-x-2"><ChevronLeft className="w-4 h-4" /><span>Collapse Menu</span></div>}
        </button>
      </div>
    </aside>
  );
};
