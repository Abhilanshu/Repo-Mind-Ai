import React, { useState } from 'react';
import { GitBranch, Link2, Zap, X, Check, ArrowRight, FolderArchive } from 'lucide-react';

interface RepoInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAnalysis: (repoUrlOrFile: string) => void;
  onExploreDemo: () => void;
}

export const RepoInputModal: React.FC<RepoInputModalProps> = ({
  isOpen,
  onClose,
  onStartAnalysis,
  onExploreDemo
}) => {
  const [githubUrl, setGithubUrl] = useState('');
  const [genericUrl, setGenericUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#130d24] border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden relative p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">🔍 Analyze Your Repository</h2>
            <p className="text-xs text-slate-300">Connect a public or private repository for deep AI code intelligence.</p>
          </div>
        </div>

        {/* Options Grid */}
        <div className="space-y-5">
          
          {/* Option 1: GitHub Repository */}
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 hover:border-purple-500/50 transition">
            <div className="flex items-center space-x-2 text-xs font-bold text-white mb-2">
              <GitBranch className="w-4 h-4 text-purple-400" />
              <span>Option 1: Connect GitHub Repository</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="flex-1 bg-[#0b0813] border border-purple-900/50 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
              />
              <button
                onClick={() => onStartAnalysis(githubUrl || 'https://github.com/facefusion/facefusion')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center space-x-1 shrink-0"
              >
                <span>Connect GitHub →</span>
              </button>
            </div>
          </div>

          {/* Option 2: Upload Repository */}
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`p-6 rounded-2xl border-2 border-dashed transition text-center ${
              dragActive 
                ? 'border-purple-400 bg-purple-900/30' 
                : 'border-purple-800/50 bg-purple-950/20 hover:border-purple-500/40'
            }`}
          >
            <FolderArchive className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">Option 2: Drop your repository here</div>
            <div className="text-[11px] text-slate-400 mt-1">ZIP, TAR.GZ • Max 500 MB</div>
            
            {selectedFile ? (
              <div className="mt-3 inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-mono border border-purple-500/40">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)</span>
              </div>
            ) : null}

            <div className="mt-3">
              <button
                onClick={() => onStartAnalysis(selectedFile ? selectedFile.name : 'uploaded_codebase.zip')}
                className="px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700/50 text-purple-200 text-xs font-semibold transition"
              >
                Upload File & Analyze
              </button>
            </div>
          </div>

          {/* Option 3: Repository URL */}
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 hover:border-purple-500/50 transition">
            <div className="flex items-center space-x-2 text-xs font-bold text-white mb-2">
              <Link2 className="w-4 h-4 text-indigo-400" />
              <span>Option 3: Repository URL</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={genericUrl}
                onChange={(e) => setGenericUrl(e.target.value)}
                placeholder="https://github.com/company/project"
                className="flex-1 bg-[#0b0813] border border-purple-900/50 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
              />
              <button
                onClick={() => onStartAnalysis(genericUrl || 'https://github.com/facefusion/facefusion')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shrink-0"
              >
                Start Analysis
              </button>
            </div>
          </div>

          {/* Instant Demo Option */}
          <div className="pt-2 text-center border-t border-purple-900/30">
            <button
              onClick={() => {
                onClose();
                onExploreDemo();
              }}
              className="text-xs font-bold text-purple-300 hover:text-purple-200 underline decoration-purple-500/50 underline-offset-4 transition"
            >
              ⚡ Or load Demo Repository (facefusion/facefusion) instantly →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
