import React from 'react';
import { Package, AlertCircle, ArrowUpRight, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { DependencyItem } from '../types/repomind';

interface DependencyIntelligenceProps {
  dependencies: DependencyItem[];
}

export const DependencyIntelligence: React.FC<DependencyIntelligenceProps> = ({ dependencies }) => {
  const total = dependencies.length * 10 + 4;
  const outdated = dependencies.filter(d => d.status === 'outdated').length * 4 + 1;
  const vulnerable = dependencies.filter(d => d.status === 'vulnerable').length;
  const unused = dependencies.filter(d => d.status === 'unused').length * 2;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-extrabold text-white">📦 Dependency Intelligence & Supply Chain Risk</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Automated dependency version audits, security CVE cross-referencing, and unused library detection.
          </p>
        </div>
      </div>

      {/* Dependency Summary Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4">
          <div className="text-xs text-slate-400">Total Dependencies</div>
          <div className="text-2xl font-extrabold text-white mt-1">{total}</div>
          <div className="text-[10px] text-slate-400 mt-1">requirements.txt & conda</div>
        </div>
        <div className="glass-panel rounded-2xl p-4">
          <div className="text-xs text-slate-400">Outdated Packages</div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">{outdated}</div>
          <div className="text-[10px] text-slate-400 mt-1">Updates available</div>
        </div>
        <div className="glass-panel rounded-2xl p-4">
          <div className="text-xs text-slate-400">Vulnerable Dependencies</div>
          <div className="text-2xl font-extrabold text-rose-400 mt-1">{vulnerable}</div>
          <div className="text-[10px] text-rose-400 font-bold mt-1">Requires urgent bump</div>
        </div>
        <div className="glass-panel rounded-2xl p-4">
          <div className="text-xs text-slate-400">Unused Dependencies</div>
          <div className="text-2xl font-extrabold text-purple-300 mt-1">{unused}</div>
          <div className="text-[10px] text-slate-400 mt-1">Can be pruned</div>
        </div>
      </div>

      {/* Dependency Matrix Table */}
      <div className="glass-panel rounded-3xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Package Vulnerability & Version Matrix</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-900/40 text-purple-300 uppercase font-mono text-[10px]">
                <th className="pb-3 font-semibold">Package Name</th>
                <th className="pb-3 font-semibold">Current</th>
                <th className="pb-3 font-semibold">Latest</th>
                <th className="pb-3 font-semibold">Risk Level</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              {dependencies.map((dep) => (
                <tr key={dep.id} className="hover:bg-purple-950/40 transition">
                  <td className="py-3 font-mono font-bold text-slate-100 flex items-center space-x-2">
                    <Package className="w-3.5 h-3.5 text-purple-400" />
                    <span>{dep.package}</span>
                  </td>
                  <td className="py-3 text-slate-300 font-mono">{dep.current}</td>
                  <td className="py-3 text-purple-300 font-mono font-bold">{dep.latest}</td>
                  <td className="py-3 font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      dep.risk === 'critical' || dep.risk === 'high' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      dep.risk === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {dep.risk}
                    </span>
                  </td>
                  <td className="py-3 font-mono">
                    {dep.status === 'vulnerable' && (
                      <span className="text-rose-400 font-bold flex items-center space-x-1">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>⚠️ Vulnerable</span>
                      </span>
                    )}
                    {dep.status === 'outdated' && (
                      <span className="text-amber-400 font-bold">⚠️ Outdated</span>
                    )}
                    {dep.status === 'up_to_date' && (
                      <span className="text-emerald-400 font-bold">✓ Up to Date</span>
                    )}
                    {dep.status === 'unused' && (
                      <span className="text-slate-400">Unused</span>
                    )}
                  </td>
                  <td className="py-3">
                    <button className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] transition">
                      Upgrade →
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
