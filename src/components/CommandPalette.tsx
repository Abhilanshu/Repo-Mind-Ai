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
    { label: 'View Technical Debt Overview', tab: 'debt' as NavigationTab, icon: <AlertTriangle className="w-4 h-4 text-[#B7791F]" /> },
    { label: 'Inspect Security Center Vulnerabilities', tab: 'security' as NavigationTab, icon: <ShieldCheck className="w-4 h-4 text-[#C53030]" /> },
    { label: 'Explore Interactive Architecture Graph', tab: 'architecture' as NavigationTab, icon: <Network className="w-4 h-4 text-[#171717]" /> },
    { label: 'Open AI Codebase Assistant Chat', tab: 'ai_assistant' as NavigationTab, icon: <Sparkles className="w-4 h-4 text-[#171717]" /> },
    { label: 'View Recommended Engineering Sprint Plan', tab: 'sprint' as NavigationTab, icon: <CalendarCheck2 className="w-4 h-4 text-[#16803C]" /> },
    { label: 'Inspect Code Quality & Maintainability Index', tab: 'quality' as NavigationTab, icon: <FileCode2 className="w-4 h-4 text-[#181816]" /> },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4 font-sans">
      <div className="w-full max-w-2xl bg-white border border-[#E4E4DE] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E4E4DE] flex items-center space-x-3 bg-[#F7F7F4]">
          <Search className="w-5 h-5 text-[#686862]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search file, or ask AI..."
            className="w-full bg-transparent text-[#181816] placeholder-[#96968E] text-sm focus:outline-none font-medium"
            autoFocus
          />
          <div className="flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#E4E4DE] text-[#181816] font-bold">
            <span>ESC</span>
          </div>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-96 overflow-y-auto space-y-1">
          <div className="text-[10px] uppercase font-bold text-[#686862] px-3 py-1">Quick Commands</div>
          
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectTab(item.tab);
                  onClose();
                }}
                className="w-full text-left flex items-center justify-between p-3 rounded-xl hover:bg-[#F7F7F4] text-xs text-[#181816] transition group border border-transparent hover:border-[#E4E4DE]"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg bg-[#F1F1ED] border border-[#E4E4DE]">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-[#181816]">{item.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#171717] opacity-0 group-hover:opacity-100 transition" />
              </button>
            ))
          ) : (
            <div className="p-6 text-center text-xs text-[#686862]">
              No matching commands or files found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F7F7F4] border-t border-[#E4E4DE] flex items-center justify-between text-[11px] text-[#686862] font-mono">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <div className="flex items-center space-x-1 text-[#181816] font-bold">
            <Command className="w-3 h-3" />
            <span>RepoMind Command Palette</span>
          </div>
        </div>

      </div>
    </div>
  );
};
