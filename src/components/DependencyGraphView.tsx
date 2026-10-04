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
    <div className="space-y-6 font-sans text-[#181816]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-panel rounded-2xl p-5 bg-white border border-[#E4E4DE]">
        <div>
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-[#171717]" />
            <h2 className="text-lg font-extrabold text-[#181816]">🕸️ Codebase Dependency & Call Graph</h2>
          </div>
          <p className="text-xs text-[#686862] mt-1">
            Explore module dependency connections, import trees, and maintainability clusters.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F7F7F4] px-3.5 py-1.5 rounded-xl border border-[#E4E4DE] text-xs font-mono text-[#181816]">
          <Search className="w-3.5 h-3.5 text-[#686862]" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter nodes..."
            className="bg-transparent focus:outline-none text-[#181816] placeholder-[#96968E] w-32"
          />
        </div>
      </div>

      {/* Main Graph Grid & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Node Network Map (2 cols) */}
        <div className="lg:col-span-2 card-panel rounded-3xl p-6 relative min-h-[460px] flex flex-col justify-between bg-white border border-[#E4E4DE]">
          <div className="text-xs font-mono text-[#686862] mb-4 flex items-center justify-between">
            <span>Visual Dependency Matrix ({filteredFiles.length} modules)</span>
            <div className="flex items-center space-x-4 text-[10px]">
              <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#16803C]" /><span>High (MI &gt; 80)</span></span>
              <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#B7791F]" /><span>Medium (MI 65-80)</span></span>
              <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-[#C53030]" /><span>Low (MI &lt; 65)</span></span>
            </div>
          </div>

          {/* Graphical Nodes Cluster Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-4">
            {filteredFiles.map((f, idx) => {
              const isSelected = selectedFile?.file === f.file;
              const statusColor = f.maintainabilityIndex >= 80 
                ? 'border-emerald-200 bg-emerald-50 text-[#16803C]'
                : f.maintainabilityIndex >= 65
                ? 'border-amber-200 bg-amber-50 text-[#B7791F]'
                : 'border-rose-200 bg-rose-50 text-[#C53030]';

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedFile(f)}
                  className={`p-3 rounded-2xl border transition-all duration-200 text-left relative overflow-hidden group ${statusColor} ${
                    isSelected ? 'ring-2 ring-[#171717] scale-[1.03] shadow-md font-bold' : 'hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-1">
                    <FileCode2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs font-mono font-bold truncate text-[#181816]">{f.file.split('/').pop()}</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#686862]">
                    Complexity: <span className="font-bold text-[#181816]">{f.avgComplexity}</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#686862]">
                    MI: <span className="font-bold text-[#181816]">{f.maintainabilityIndex}/100</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-[#686862] text-center pt-3 border-t border-[#E4E4DE]">
            Node links automatically indicate import dependencies across modules.
          </div>
        </div>

        {/* Selected File Node Inspector */}
        <div className="card-panel rounded-3xl p-6 flex flex-col justify-between bg-white border border-[#E4E4DE]">
          {selectedFile ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-[#E4E4DE]">
                <span className="text-[10px] font-mono uppercase text-[#686862]">File Node Inspector</span>
                <h3 className="text-base font-extrabold text-[#181816] mt-1 break-all">{selectedFile.file}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
                  <div className="text-[#686862]">Lines of Code</div>
                  <div className="text-base font-extrabold text-[#181816] mt-0.5">{selectedFile.loc}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
                  <div className="text-[#686862]">Functions</div>
                  <div className="text-base font-extrabold text-[#181816] mt-0.5">{selectedFile.functions}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
                  <div className="text-[#686862]">Avg Complexity</div>
                  <div className="text-base font-extrabold text-[#B7791F] mt-0.5">{selectedFile.avgComplexity}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
                  <div className="text-[#686862]">Maintainability</div>
                  <div className="text-base font-extrabold text-[#16803C] mt-0.5">{selectedFile.maintainabilityIndex} / 100</div>
                </div>
              </div>

              {selectedFile.hasBareExcepts && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-[#C53030] text-xs font-mono">
                  ⚠️ Contains bare exception handler (except:)
                </div>
              )}

              <button
                onClick={() => onSelectFile && onSelectFile(selectedFile.file)}
                className="w-full py-2.5 rounded-xl bg-[#171717] hover:bg-[#313131] text-white text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <span>Deep File Intelligence →</span>
              </button>
            </div>
          ) : (
            <div className="text-xs text-[#686862] text-center my-auto">Select a file node</div>
          )}
        </div>

      </div>

    </div>
  );
};
