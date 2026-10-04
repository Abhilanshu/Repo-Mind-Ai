import React, { useState } from 'react';
import { AlertTriangle, Search, ArrowRight } from 'lucide-react';
import { TechnicalDebtIssue } from '../types/repomind';

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
    <div className="space-y-6 font-sans">
      
      {/* Header & Filters */}
      <div className="card-panel rounded-3xl p-6 space-y-4 bg-white border border-[#E4E4DE]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-[#B7791F]" />
              <h2 className="text-lg font-extrabold text-[#181816]">📝 Technical Debt Explorer</h2>
            </div>
            <p className="text-xs text-[#686862] mt-1">
              Searchable catalog of technical debt issues with effort estimates and AI patches.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-[#181816] bg-[#F7F7F4] px-3 py-1.5 rounded-xl border border-[#E4E4DE]">
            <span>Showing {filtered.length} of {issues.length} items</span>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#E4E4DE]">
          
          {/* Search Input */}
          <div className="flex items-center space-x-2 bg-[#F7F7F4] px-3.5 py-2 rounded-xl border border-[#E4E4DE] text-xs">
            <Search className="w-4 h-4 text-[#96968E] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by file or title..."
              className="bg-transparent text-[#181816] placeholder-[#96968E] focus:outline-none w-full"
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
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#F7F7F4] text-[#686862] hover:text-[#181816] border border-[#E4E4DE]'
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
            className="bg-[#F7F7F4] border border-[#E4E4DE] rounded-xl px-3.5 py-2 text-xs text-[#181816] focus:outline-none focus:border-[#171717]"
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
      <div className="card-panel rounded-3xl p-6 overflow-hidden bg-white border border-[#E4E4DE]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E4DE] text-[#686862] uppercase font-mono text-[10px]">
                <th className="pb-3 font-semibold">Issue Title</th>
                <th className="pb-3 font-semibold">Severity</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">File Path</th>
                <th className="pb-3 font-semibold">Effort</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4DE]">
              {filtered.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => onSelectIssue(item)}
                  className="hover:bg-[#F7F7F4] transition cursor-pointer group"
                >
                  <td className="py-3.5 pr-3 font-semibold text-[#181816] group-hover:text-black">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono text-[#686862] font-bold">{item.id}</span>
                      <span className="line-clamp-1">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      item.severity === 'critical' ? 'bg-rose-50 text-[#C53030] border border-rose-200' :
                      item.severity === 'high' ? 'bg-amber-50 text-[#B7791F] border border-amber-200' :
                      item.severity === 'medium' ? 'bg-blue-50 text-[#315EFB] border border-blue-200' :
                      'bg-[#F1F1ED] text-[#686862] border border-[#E4E4DE]'
                    }`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="py-3.5 text-[#686862] font-mono capitalize">{item.category.replace('_', ' ')}</td>
                  <td className="py-3.5 text-[#686862] font-mono text-[11px]">{item.file}:{item.line}</td>
                  <td className="py-3.5 font-mono text-[#181816] font-bold">{item.effortHours}h</td>
                  <td className="py-3.5 font-mono">
                    <span className="px-2 py-0.5 rounded text-[10px] capitalize font-semibold bg-[#F1F1ED] text-[#181816] border border-[#E4E4DE]">
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectIssue(item);
                      }}
                      className="px-3 py-1 rounded-lg bg-[#171717] hover:bg-[#313131] text-white font-bold text-[11px] transition flex items-center space-x-1"
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
