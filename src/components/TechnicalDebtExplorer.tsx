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
      <div className="card-panel rounded-3xl p-6 space-y-4 bg-white border border-[#E8E5DF]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-[#FFF5DD] border border-[#F3D29A] text-[#B7791F]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-extrabold text-[#1F2937]">📝 Technical Debt Explorer</h2>
            </div>
            <p className="text-xs text-[#4B5563] mt-1">
              Searchable catalog of technical debt issues with effort estimates and AI patches.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-[#6D4AFF] bg-[#EEE9FF] px-3.5 py-1.5 rounded-xl border border-[#D8CAFF] font-bold">
            <span>Showing {filtered.length} of {issues.length} items</span>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#E8E5DF]">
          
          {/* Search Input */}
          <div className="flex items-center space-x-2 bg-[#F7F5F2] px-3.5 py-2 rounded-xl border border-[#E8E5DF] text-xs">
            <Search className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by file or title..."
              className="bg-transparent text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none w-full font-medium"
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
                    ? 'bg-[#6D4AFF] text-white shadow-xs'
                    : 'bg-[#F7F5F2] text-[#4B5563] hover:text-[#1F2937] border border-[#E8E5DF]'
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
            className="bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#6D4AFF]"
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
      <div className="card-panel rounded-3xl p-6 overflow-hidden bg-white border border-[#E8E5DF]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8E5DF] text-[#4B5563] uppercase font-mono text-[10px]">
                <th className="pb-3 font-semibold">Issue Title</th>
                <th className="pb-3 font-semibold">Severity</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">File Path</th>
                <th className="pb-3 font-semibold">Effort</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E5DF]">
              {filtered.map((item) => {
                const sevStyle = item.severity === 'critical' ? 'bg-[#FFF0F0] text-[#C53030] border-[#F5C6C6]' :
                  item.severity === 'high' ? 'bg-[#FFF5E6] text-[#B7791F] border-[#F3D29A]' :
                  item.severity === 'medium' ? 'bg-[#FFFBE8] text-[#B7791F] border-[#E8DFA5]' :
                  'bg-[#EEF5FF] text-[#1D4ED8] border-[#C8D9F5]';

                return (
                  <tr 
                    key={item.id} 
                    onClick={() => onSelectIssue(item)}
                    className="hover:bg-[#F7F5F2] transition cursor-pointer group"
                  >
                    <td className="py-3.5 pr-3 font-semibold text-[#1F2937]">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-[#4B5563] font-bold">{item.id}</span>
                        <span className="line-clamp-1">{item.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 font-mono">
                      <span className={`px-2.5 py-0.5 rounded-md font-bold uppercase text-[10px] border ${sevStyle}`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-3.5 text-[#4B5563] font-mono capitalize">{item.category.replace('_', ' ')}</td>
                    <td className="py-3.5 text-[#4B5563] font-mono text-[11px] font-bold">{item.file}:{item.line}</td>
                    <td className="py-3.5 font-mono text-[#1F2937] font-bold">{item.effortHours}h</td>
                    <td className="py-3.5 font-mono">
                      <span className="px-2 py-0.5 rounded-md text-[10px] capitalize font-semibold bg-[#F1F3F6] text-[#1F2937] border border-[#E8E5DF]">
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectIssue(item);
                        }}
                        className="px-3 py-1 rounded-lg bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white font-bold text-[11px] transition flex items-center space-x-1 shadow-xs"
                      >
                        <span>Fix Patch</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
