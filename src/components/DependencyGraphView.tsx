import React, { useState } from 'react';
import { Network, FileCode2, AlertTriangle, ShieldCheck, ArrowRight, Search, Filter } from 'lucide-react';
import { CodeQualityFile } from '../types/repomind';

interface DependencyGraphViewProps {
  files: CodeQualityFile[];
  onSelectFile?: (filename: string) => void;
}

export const DependencyGraphView: React.FC<DependencyGraphViewProps> = ({ files, onSelectFile }) => {
  const [selectedFile, setSelectedFile] = useState<CodeQualityFile | null>(files[0] || null);
  const [filterQuery, setFilterQuery] = useState('');

  const filteredFiles = files.filter(f => f.file.toLowerCase().includes(filterQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-2xl p-5">
        <div>
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-extrabold text-white">🕸️ Codebase Dependency & Call Graph</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Explore module dependency connections, import trees, and maintainability clusters.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-purple-950/60 px-3.5 py-1.5 rounded-xl border border-purple-800/40 text-xs font-mono text-slate-300">
          <Search className="w-3.5 h-3.5 text-purple-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter nodes..."
            className="bg-transparent focus:outline-none text-slate-200 placeholder-slate-500 w-32"
          />
        </div>
      </div>

      {/* Main Graph Grid & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Node Network Map (2 cols) */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 relative min-h-[460px] flex flex-col justify-between">
          <div className="text-xs font-mono text-purple-300 mb-4 flex items-center justify-between">
            <span>Visual Dependency Matrix ({filteredFiles.length} modules)</span>
            <div className="flex items-center space-x-4 text-[10px]">
              <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /><span>High (MI &gt; 80)</span></span>
              <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-amber-400" /><span>Medium (MI 65-80)</span></span>
              <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-rose-400" /><span>Low (MI &lt; 65)</span></span>
            </div>
          </div>

          {/* Graphical Nodes Cluster Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-4">
            {filteredFiles.map((f, idx) => {
              const isSelected = selectedFile?.file === f.file;
              const statusColor = f.maintainabilityIndex >= 80 
                ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                : f.maintainabilityIndex >= 65
                ? 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                : 'border-rose-500/40 bg-rose-950/20 text-rose-300';

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedFile(f)}
                  className={`p-3 rounded-2xl border transition-all duration-200 text-left relative overflow-hidden group ${statusColor} ${
                    isSelected ? 'ring-2 ring-purple-400 scale-[1.03] shadow-xl' : 'hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-1">
                    <FileCode2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs font-mono font-bold truncate text-white">{f.file.split('/').pop()}</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Complexity: <span className="font-bold text-slate-200">{f.avgComplexity}</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    MI: <span className="font-bold text-slate-200">{f.maintainabilityIndex}/100</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-slate-400 text-center pt-3 border-t border-purple-900/30">
            Node links automatically indicate import dependencies across modules.
          </div>
        </div>

        {/* Selected File Node Inspector */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between">
          {selectedFile ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-purple-900/40">
                <span className="text-[10px] font-mono uppercase text-purple-300">File Node Inspector</span>
                <h3 className="text-base font-extrabold text-white mt-1 break-all">{selectedFile.file}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                  <div className="text-slate-400">Lines of Code</div>
                  <div className="text-base font-extrabold text-white mt-0.5">{selectedFile.loc}</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                  <div className="text-slate-400">Functions</div>
                  <div className="text-base font-extrabold text-purple-300 mt-0.5">{selectedFile.functions}</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                  <div className="text-slate-400">Avg Complexity</div>
                  <div className="text-base font-extrabold text-amber-400 mt-0.5">{selectedFile.avgComplexity}</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                  <div className="text-slate-400">Maintainability</div>
                  <div className="text-base font-extrabold text-emerald-400 mt-0.5">{selectedFile.maintainabilityIndex} / 100</div>
                </div>
              </div>

              {selectedFile.hasBareExcepts && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono">
                  ⚠️ Contains bare exception handler (except:)
                </div>
              )}

              <button
                onClick={() => onSelectFile && onSelectFile(selectedFile.file)}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center justify-center space-x-1.5"
              >
                <span>Deep File Intelligence →</span>
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-400 text-center my-auto">Select a file node</div>
          )}
        </div>

      </div>

    </div>
  );
};
