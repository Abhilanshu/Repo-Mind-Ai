import React, { useState } from 'react';
import { AlertTriangle, Filter, Search, Clock, ArrowRight, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { TechnicalDebtIssue, Severity, IssueCategory } from '../types/repomind';

interface TechnicalDebtExplorerProps {
  issues: TechnicalDebtIssue[];
  onSelectIssue: (issue: TechnicalDebtIssue) => void;
}

export const TechnicalDebtExplorer: React.FC<TechnicalDebtExplorerProps> = ({
  issues,
  onSelectIssue
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = issues.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.file.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || item.severity === severityFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesSeverity && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Filters */}
      <div className="glass-panel rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-extrabold text-white">📝 Technical Debt Explorer</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Searchable catalog of 147 technical debt issues with effort estimates and AI patches.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-800/40">
            <span>Showing {filtered.length} of {issues.length} items</span>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-purple-900/30">
          
          {/* Search Input */}
          <div className="flex items-center space-x-2 bg-[#0b0813] px-3.5 py-2 rounded-xl border border-purple-900/50 text-xs">
            <Search className="w-4 h-4 text-purple-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by file or title..."
              className="bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none w-full"
            />
          </div>

          {/* Severity Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto">
            {['all', 'critical', 'high', 'medium', 'low'].map(sev => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition shrink-0 ${
                  severityFilter === sev
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-purple-950/40 text-slate-400 hover:text-white border border-purple-800/40'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#0b0813] border border-purple-900/50 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Categories</option>
            <option value="architecture">Architecture</option>
            <option value="code_quality">Code Quality</option>
            <option value="security">Security</option>
            <option value="testing">Testing</option>
            <option value="performance">Performance</option>
            <option value="documentation">Documentation</option>
          </select>

        </div>
      </div>

      {/* Main Table */}
      <div className="glass-panel rounded-3xl p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-900/40 text-purple-300 uppercase font-mono text-[10px]">
                <th className="pb-3 font-semibold">Issue Title</th>
                <th className="pb-3 font-semibold">Severity</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">File Path</th>
                <th className="pb-3 font-semibold">Effort</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              {filtered.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => onSelectIssue(item)}
                  className="hover:bg-purple-950/40 transition cursor-pointer group"
                >
                  <td className="py-3.5 pr-3 font-semibold text-slate-100 group-hover:text-purple-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono text-purple-400 font-bold">{item.id}</span>
                      <span className="line-clamp-1">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      item.severity === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      item.severity === 'high' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                      item.severity === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    }`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-300 font-mono capitalize">{item.category.replace('_', ' ')}</td>
                  <td className="py-3.5 text-slate-300 font-mono text-[11px]">{item.file}:{item.line}</td>
                  <td className="py-3.5 font-mono text-purple-300 font-bold">{item.effortHours}h</td>
                  <td className="py-3.5 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] capitalize font-semibold ${
                      item.status === 'open' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      item.status === 'in_progress' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectIssue(item);
                      }}
                      className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] transition flex items-center space-x-1"
                    >
                      <span>Fix Patch</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
