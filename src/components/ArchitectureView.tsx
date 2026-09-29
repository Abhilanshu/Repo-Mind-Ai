import React, { useState } from 'react';
import { Network, AlertCircle, RefreshCw, ZoomIn, ZoomOut, Layers, ChevronRight, Sparkles, FileCode2, ArrowRight } from 'lucide-react';
import { ArchNode, ArchEdge } from '../types/repomind';

interface ArchitectureViewProps {
  nodes: ArchNode[];
  edges: ArchEdge[];
  onSelectFile?: (filename: string) => void;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ nodes, edges, onSelectFile }) => {
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(nodes[1] || nodes[0]);
  const [zoomLevel, setZoomLevel] = useState(100);

  const circularEdges = edges.filter(e => e.isCircular);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-2xl p-5">
        <div>
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-extrabold text-white">🏗️ Architecture Intelligence & Dependency Mapping</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            System architectural topology parsed from Python package imports and module structure.
          </p>
        </div>

        {/* Circular Dependency Warning Alert */}
        {circularEdges.length > 0 && (
          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Circular Dependency Alert: Job Manager ⇄ Core Engine</span>
          </div>
        )}
      </div>

      {/* Main Interactive Canvas & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Canvas Area (2 cols) */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 relative overflow-hidden min-h-[480px] flex flex-col justify-between">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between z-10 mb-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-800/40">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Interactive Layer Topology Diagram</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-purple-950/60 p-1 rounded-xl border border-purple-800/40 text-xs text-slate-300 font-mono">
              <button 
                onClick={() => setZoomLevel(Math.max(70, zoomLevel - 10))}
                className="p-1 hover:text-white transition rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2">{zoomLevel}%</span>
              <button 
                onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
                className="p-1 hover:text-white transition rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Topology Graph Visualizer */}
          <div 
            className="flex-1 flex flex-col items-center justify-center space-y-6 py-6 transition-all duration-300"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            {/* Layer 1: UI / Gradio */}
            <div className="w-full max-w-md flex justify-center">
              <NodePill 
                node={nodes[0]} 
                isSelected={selectedNode?.id === nodes[0].id} 
                onClick={() => setSelectedNode(nodes[0])} 
              />
            </div>

            {/* Down Arrow */}
            <div className="w-0.5 h-6 bg-purple-500/40 relative">
              <div className="absolute -bottom-1 -left-1 text-purple-400 text-xs">↓</div>
            </div>

            {/* Layer 2: Job Manager & Queue (Circular alert) */}
            <div className="w-full max-w-md flex justify-center relative">
              <NodePill 
                node={nodes[1]} 
                isSelected={selectedNode?.id === nodes[1].id} 
                onClick={() => setSelectedNode(nodes[1])}
                hasCircular
              />
            </div>

            {/* Circular Arrow Indicator */}
            <div className="flex items-center space-x-2 text-[10px] font-mono text-rose-400 bg-rose-950/60 px-3 py-0.5 rounded-full border border-rose-500/30">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Circular Coupling: job_manager ⇄ core_engine</span>
            </div>

            {/* Layer 3: Core Execution Engine */}
            <div className="w-full max-w-md flex justify-center">
              <NodePill 
                node={nodes[2]} 
                isSelected={selectedNode?.id === nodes[2].id} 
                onClick={() => setSelectedNode(nodes[2])} 
              />
            </div>

            {/* Split Arrows */}
            <div className="w-full max-w-lg flex justify-around">
              <div className="w-0.5 h-6 bg-purple-500/40 relative">
                <div className="absolute -bottom-1 -left-1 text-purple-400 text-xs">↓</div>
              </div>
              <div className="w-0.5 h-6 bg-purple-500/40 relative">
                <div className="absolute -bottom-1 -left-1 text-purple-400 text-xs">↓</div>
              </div>
            </div>

            {/* Layer 4: Processors & Utils */}
            <div className="w-full max-w-lg grid grid-cols-2 gap-4">
              <NodePill 
                node={nodes[3]} 
                isSelected={selectedNode?.id === nodes[3].id} 
                onClick={() => setSelectedNode(nodes[3])} 
              />
              <NodePill 
                node={nodes[4]} 
                isSelected={selectedNode?.id === nodes[4].id} 
                onClick={() => setSelectedNode(nodes[4])} 
              />
            </div>

          </div>

          {/* Canvas Footer */}
          <div className="text-[11px] text-slate-400 font-mono text-center pt-3 border-t border-purple-900/30">
            Click any layer component node to view deep architectural metrics & file coupling.
          </div>

        </div>

        {/* Selected Component Node Inspector Panel (1 col) */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
                <span className="text-xs uppercase font-bold text-purple-300 font-mono">Component Inspector</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  selectedNode.status === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  selectedNode.status === 'warning' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {selectedNode.status.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white">{selectedNode.name}</h3>
                <p className="text-xs text-slate-300 mt-1 font-mono">
                  Module Type: <span className="text-purple-300">{selectedNode.type}</span>
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                  <div className="text-slate-400">Total Files</div>
                  <div className="text-lg font-extrabold text-white mt-0.5">{selectedNode.fileCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                  <div className="text-slate-400">Dependencies</div>
                  <div className="text-lg font-extrabold text-purple-300 mt-0.5">{selectedNode.dependenciesCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                  <div className="text-slate-400">Complexity</div>
                  <div className="text-lg font-extrabold text-amber-400 mt-0.5">{selectedNode.complexity}</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                  <div className="text-slate-400">Technical Debt</div>
                  <div className="text-lg font-extrabold text-rose-400 mt-0.5">{selectedNode.debtCount} items</div>
                </div>
              </div>

              {/* AI Architecture Insight */}
              <div className="p-4 rounded-2xl bg-purple-950/50 border border-purple-800/40 text-xs">
                <div className="flex items-center space-x-1.5 text-purple-300 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Structural Diagnosis</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  This component exhibits heavy afferent coupling. Refactoring its interface contracts will reduce cascade regression risk across dependent modules.
                </p>
              </div>

              <button
                onClick={() => onSelectFile && onSelectFile('facefusion/core.py')}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center justify-center space-x-1.5"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>View Component Source Files</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-xs text-slate-400">
              Select a component node from the topology diagram.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

const NodePill: React.FC<{ node: ArchNode; isSelected: boolean; onClick: () => void; hasCircular?: boolean }> = ({
  node,
  isSelected,
  onClick,
  hasCircular
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl transition-all duration-200 text-left border relative group ${
        isSelected
          ? 'bg-purple-900/60 border-purple-400 shadow-xl shadow-purple-500/20 scale-[1.02]'
          : 'bg-[#140e29]/80 hover:bg-purple-950/40 border-purple-800/40 hover:border-purple-500/40'
      }`}
    >
      {hasCircular && (
        <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-mono font-bold animate-pulse">
          Circular
        </span>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold text-white group-hover:text-purple-200 transition">{node.name}</span>
        <span className="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
          {node.type}
        </span>
      </div>
      <div className="flex items-center space-x-3 mt-2 text-[11px] text-slate-400 font-mono">
        <span>📁 {node.fileCount} files</span>
        <span>🔗 {node.dependenciesCount} deps</span>
        <span className={node.risk === 'High' ? 'text-amber-400 font-bold' : ''}>Risk: {node.risk}</span>
      </div>
    </button>
  );
};
