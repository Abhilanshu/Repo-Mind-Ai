import React, { useState } from 'react';
import { Network, AlertCircle, RefreshCw, ZoomIn, ZoomOut, Layers, FileCode2 } from 'lucide-react';
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
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-panel rounded-2xl p-5 bg-white border border-[#E4E4DE]">
        <div>
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-[#171717]" />
            <h2 className="text-lg font-extrabold text-[#181816]">🏗️ Architecture Intelligence & Dependency Mapping</h2>
          </div>
          <p className="text-xs text-[#686862] mt-1">
            System architectural topology parsed from source package imports and module structure.
          </p>
        </div>

        {/* Circular Dependency Alert */}
        {circularEdges.length > 0 && (
          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-rose-50 text-[#C53030] border border-rose-200 text-xs font-mono">
            <AlertCircle className="w-4 h-4 text-[#C53030] shrink-0" />
            <span>Circular Dependency Alert: Job Manager ⇄ Core Engine</span>
          </div>
        )}
      </div>

      {/* Main Interactive Canvas & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Canvas Area (2 cols) */}
        <div className="lg:col-span-2 card-panel rounded-3xl p-6 relative overflow-hidden min-h-[480px] flex flex-col justify-between bg-white border border-[#E4E4DE]">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between z-10 mb-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#181816] bg-[#F7F7F4] px-3 py-1.5 rounded-xl border border-[#E4E4DE]">
              <Layers className="w-3.5 h-3.5 text-[#171717]" />
              <span>Interactive Layer Topology Diagram</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-[#F7F7F4] p-1 rounded-xl border border-[#E4E4DE] text-xs text-[#181816] font-mono">
              <button 
                onClick={() => setZoomLevel(Math.max(70, zoomLevel - 10))}
                className="p-1 hover:bg-[#E4E4DE] transition rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2">{zoomLevel}%</span>
              <button 
                onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
                className="p-1 hover:bg-[#E4E4DE] transition rounded"
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
            {/* Layer 1 */}
            <div className="w-full max-w-md flex justify-center">
              <NodePill 
                node={nodes[0]} 
                isSelected={selectedNode?.id === nodes[0].id} 
                onClick={() => setSelectedNode(nodes[0])} 
              />
            </div>

            {/* Down Arrow */}
            <div className="w-0.5 h-6 bg-[#E4E4DE] relative">
              <div className="absolute -bottom-1 -left-1 text-[#171717] text-xs">↓</div>
            </div>

            {/* Layer 2 */}
            <div className="w-full max-w-md flex justify-center relative">
              <NodePill 
                node={nodes[1]} 
                isSelected={selectedNode?.id === nodes[1].id} 
                onClick={() => setSelectedNode(nodes[1])}
                hasCircular
              />
            </div>

            {/* Circular Indicator */}
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#C53030] bg-rose-50 px-3 py-0.5 rounded-full border border-rose-200">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Circular Coupling: job_manager ⇄ core_engine</span>
            </div>

            {/* Layer 3 */}
            <div className="w-full max-w-md flex justify-center">
              <NodePill 
                node={nodes[2]} 
                isSelected={selectedNode?.id === nodes[2].id} 
                onClick={() => setSelectedNode(nodes[2])} 
              />
            </div>

          </div>

          {/* Canvas Footer */}
          <div className="text-[11px] text-[#686862] font-mono text-center pt-3 border-t border-[#E4E4DE]">
            Click any layer component node to view deep architectural metrics & file coupling.
          </div>

        </div>

        {/* Selected Component Inspector Panel */}
        <div className="card-panel rounded-3xl p-6 flex flex-col justify-between bg-white border border-[#E4E4DE]">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E4DE]">
                <span className="text-xs uppercase font-bold text-[#686862] font-mono">Component Inspector</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  selectedNode.status === 'critical' ? 'bg-rose-50 text-[#C53030] border border-rose-200' :
                  selectedNode.status === 'warning' ? 'bg-amber-50 text-[#B7791F] border border-amber-200' :
                  'bg-emerald-50 text-[#16803C] border border-emerald-200'
                }`}>
                  {selectedNode.status.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[#181816]">{selectedNode.name}</h3>
                <p className="text-xs text-[#686862] mt-1 font-mono">
                  Module Type: <span className="text-[#181816] font-bold">{selectedNode.type}</span>
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
                  <div className="text-[#686862]">Total Files</div>
                  <div className="text-lg font-extrabold text-[#181816] mt-0.5">{selectedNode.fileCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
                  <div className="text-[#686862]">Dependencies</div>
                  <div className="text-lg font-extrabold text-[#181816] mt-0.5">{selectedNode.dependenciesCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
                  <div className="text-[#686862]">Complexity</div>
                  <div className="text-lg font-extrabold text-[#B7791F] mt-0.5">{selectedNode.complexity}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
                  <div className="text-[#686862]">Technical Debt</div>
                  <div className="text-lg font-extrabold text-[#C53030] mt-0.5">{selectedNode.debtCount} items</div>
                </div>
              </div>

              <button
                onClick={() => onSelectFile && onSelectFile('src/services/paymentService.ts')}
                className="w-full py-2.5 rounded-xl bg-[#171717] hover:bg-[#313131] text-white text-xs font-bold transition flex items-center justify-center space-x-1.5"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>View Component Source Files</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-xs text-[#686862]">
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
  if (!node) return null;
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl transition-all duration-200 text-left border relative group ${
        isSelected
          ? 'bg-[#171717] text-white border-[#171717] shadow-md scale-[1.01]'
          : 'bg-[#F7F7F4] hover:bg-[#F1F1ED] text-[#181816] border-[#E4E4DE]'
      }`}
    >
      {hasCircular && (
        <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#C53030] text-white text-[9px] font-mono font-bold">
          Circular
        </span>
      )}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-extrabold ${isSelected ? 'text-white' : 'text-[#181816]'}`}>{node.name}</span>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
          isSelected ? 'bg-[#313131] text-white' : 'bg-[#E4E4DE] text-[#181816]'
        }`}>
          {node.type}
        </span>
      </div>
      <div className={`flex items-center space-x-3 mt-2 text-[11px] font-mono ${isSelected ? 'text-slate-300' : 'text-[#686862]'}`}>
        <span>📁 {node.fileCount} files</span>
        <span>🔗 {node.dependenciesCount} deps</span>
        <span className={node.risk === 'High' ? 'text-[#B7791F] font-bold' : ''}>Risk: {node.risk}</span>
      </div>
    </button>
  );
};
