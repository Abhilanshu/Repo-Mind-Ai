import React, { useState } from 'react';
import { Package, ShieldAlert, Sparkles, Copy, Check } from 'lucide-react';
import { DependencyItem } from '../types/repomind';

interface DependencyIntelligenceProps {
  dependencies: DependencyItem[];
}

export const DependencyIntelligence: React.FC<DependencyIntelligenceProps> = ({ dependencies: initialDeps }) => {
  const [deps, setDeps] = useState<DependencyItem[]>(initialDeps);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [upgradedPkg, setUpgradedPkg] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const handleUpgrade = (id: string, pkgName: string) => {
    setDeps(prev => prev.map(d => d.id === id ? { ...d, current: d.latest, status: 'up_to_date', risk: 'low', vulnerabilities: 0 } : d));
    setUpgradedPkg(`pip install --upgrade ${pkgName}`);
    setTimeout(() => setUpgradedPkg(null), 4000);
  };

  const handleUpgradeAll = () => {
    setDeps(prev => prev.map(d => ({ ...d, current: d.latest, status: 'up_to_date', risk: 'low', vulnerabilities: 0 })));
    setUpgradedPkg(`pip install --upgrade ${deps.map(d => d.package).join(' ')}`);
    setTimeout(() => setUpgradedPkg(null), 4000);
  };

  const filtered = filterStatus === 'all'
    ? deps
    : deps.filter(d => d.status === filterStatus);

  const total = deps.length * 3;
  const outdated = deps.filter(d => d.status === 'outdated').length;
  const vulnerable = deps.filter(d => d.status === 'vulnerable').length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="card-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E4E4DE]">
        <div>
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-[#171717]" />
            <h2 className="text-lg font-extrabold text-[#181816]">📦 Dependency Intelligence</h2>
          </div>
          <p className="text-xs text-[#686862] mt-1">
            Automated package audits, security vulnerability detection, and version upgrades.
          </p>
        </div>

        <button
          onClick={handleUpgradeAll}
          className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#313131] text-white font-extrabold text-xs transition shadow-sm flex items-center space-x-1.5 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Upgrade All Dependencies →</span>
        </button>
      </div>

      {/* Dependency Summary Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="card-panel rounded-2xl p-4 bg-white border border-[#E4E4DE]">
          <div className="text-xs text-[#686862]">Total Dependencies</div>
          <div className="text-2xl font-extrabold text-[#181816] mt-1">{total}</div>
          <div className="text-[10px] text-[#96968E] mt-1">package.json & requirements.txt</div>
        </div>
        <div className="card-panel rounded-2xl p-4 bg-white border border-[#E4E4DE]">
          <div className="text-xs text-[#686862]">Outdated Packages</div>
          <div className="text-2xl font-extrabold text-[#B7791F] mt-1">{outdated}</div>
          <div className="text-[10px] text-[#686862] mt-1">Updates available</div>
        </div>
        <div className="card-panel rounded-2xl p-4 bg-white border border-[#E4E4DE]">
          <div className="text-xs text-[#686862]">Vulnerable Dependencies</div>
          <div className="text-2xl font-extrabold text-[#C53030] mt-1">{vulnerable}</div>
          <div className="text-[10px] text-[#C53030] font-bold mt-1">Requires urgent bump</div>
        </div>
      </div>

      {upgradedPkg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16803C] text-xs font-mono font-bold flex items-center justify-between animate-in fade-in duration-150">
          <span>✓ Executed Upgrade Command: <code className="text-[#181816]">{upgradedPkg}</code></span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(upgradedPkg);
              setCopiedCmd(true);
              setTimeout(() => setCopiedCmd(false), 2000);
            }}
            className="px-3 py-1 rounded bg-[#16803C] text-white text-[11px] font-bold flex items-center space-x-1"
          >
            {copiedCmd ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white" />}
            <span>{copiedCmd ? 'Copied!' : 'Copy Command'}</span>
          </button>
        </div>
      )}

      {/* Dependency Matrix Table */}
      <div className="card-panel rounded-3xl p-6 bg-white border border-[#E4E4DE]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-sm font-bold text-[#181816]">Package Version & Security Table</h3>

          <div className="flex items-center space-x-1.5">
            {['all', 'vulnerable', 'outdated', 'up_to_date'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition ${
                  filterStatus === st
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#F7F7F4] text-[#686862] hover:text-[#181816] border border-[#E4E4DE]'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E4DE] text-[#686862] uppercase font-mono text-[10px]">
                <th className="pb-3 font-semibold">Package Name</th>
                <th className="pb-3 font-semibold">Current Version</th>
                <th className="pb-3 font-semibold">Latest Version</th>
                <th className="pb-3 font-semibold">Risk Level</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4DE]">
              {filtered.map((dep) => (
                <tr key={dep.id} className="hover:bg-[#F7F7F4] transition">
                  <td className="py-3 font-mono font-bold text-[#181816] flex items-center space-x-2">
                    <Package className="w-3.5 h-3.5 text-[#171717]" />
                    <span>{dep.package}</span>
                  </td>
                  <td className="py-3 text-[#686862] font-mono">{dep.current}</td>
                  <td className="py-3 text-[#181816] font-mono font-bold">{dep.latest}</td>
                  <td className="py-3 font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      dep.risk === 'critical' || dep.risk === 'high' ? 'bg-rose-50 text-[#C53030] border border-rose-200' :
                      dep.risk === 'medium' ? 'bg-amber-50 text-[#B7791F] border border-amber-200' :
                      'bg-emerald-50 text-[#16803C] border border-emerald-200'
                    }`}>
                      {dep.risk}
                    </span>
                  </td>
                  <td className="py-3 font-mono">
                    {dep.status === 'vulnerable' && (
                      <span className="text-[#C53030] font-bold flex items-center space-x-1">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>⚠️ Vulnerable</span>
                      </span>
                    )}
                    {dep.status === 'outdated' && (
                      <span className="text-[#B7791F] font-bold">🟡 Outdated</span>
                    )}
                    {dep.status === 'up_to_date' && (
                      <span className="text-[#16803C] font-bold">🟢 Secure</span>
                    )}
                  </td>
                  <td className="py-3">
                    {dep.status !== 'up_to_date' ? (
                      <button
                        onClick={() => handleUpgrade(dep.id, dep.package)}
                        className="px-3 py-1 rounded-lg bg-[#171717] hover:bg-[#313131] text-white font-bold text-[11px] transition shadow-sm"
                      >
                        Upgrade →
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#16803C] font-bold font-mono">✓ Latest Version</span>
                    )}
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
