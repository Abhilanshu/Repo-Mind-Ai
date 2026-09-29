import React, { useState, useEffect } from 'react';
import { Search, Command, ArrowRight, ShieldCheck, AlertTriangle, Network, Sparkles, FileCode2, CalendarCheck2 } from 'lucide-react';
import { NavigationTab } from '../types/repomind';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavigationTab) => void;
  onSelectIssue?: (issueId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from global window listener handled in App.tsx
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { label: 'View Technical Debt Overview', tab: 'debt' as NavigationTab, icon: <AlertTriangle className="w-4 h-4 text-amber-400" /> },
    { label: 'Inspect Security Center Vulnerabilities', tab: 'security' as NavigationTab, icon: <ShieldCheck className="w-4 h-4 text-rose-400" /> },
    { label: 'Explore Interactive Architecture Graph', tab: 'architecture' as NavigationTab, icon: <Network className="w-4 h-4 text-indigo-400" /> },
    { label: 'Open AI Codebase Assistant Chat', tab: 'ai_assistant' as NavigationTab, icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { label: 'View Recommended Engineering Sprint Plan', tab: 'sprint' as NavigationTab, icon: <CalendarCheck2 className="w-4 h-4 text-emerald-400" /> },
    { label: 'Inspect Code Quality & Maintainability Index', tab: 'quality' as NavigationTab, icon: <FileCode2 className="w-4 h-4 text-purple-300" /> },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-[#130d24] border border-purple-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-purple-900/40 flex items-center space-x-3 bg-purple-950/20">
          <Search className="w-5 h-5 text-purple-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search file, or ask AI..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
            autoFocus
          />
          <div className="flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-700/40">
            <span>ESC</span>
          </div>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-96 overflow-y-auto space-y-1">
          <div className="text-[10px] uppercase font-bold text-purple-300/70 px-3 py-1">Quick Commands</div>
          
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectTab(item.tab);
                  onClose();
                }}
                className="w-full text-left flex items-center justify-between p-3 rounded-xl hover:bg-purple-900/40 text-xs text-slate-200 transition group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-800/40">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-slate-200 group-hover:text-white">{item.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition" />
              </button>
            ))
          ) : (
            <div className="p-6 text-center text-xs text-slate-400">
              No matching commands or files found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0d0918] border-t border-purple-900/30 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <div className="flex items-center space-x-1 text-purple-300">
            <Command className="w-3 h-3" />
            <span>RepoMind Command Palette</span>
          </div>
        </div>

      </div>
    </div>
  );
};
