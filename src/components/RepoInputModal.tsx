import React, { useState } from 'react';
import { GitBranch, Link2, Zap, X, Check, Folder, FolderArchive, Upload } from 'lucide-react';

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
  const [gitlabUrl, setGitlabUrl] = useState('');
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

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const firstFile = e.target.files[0];
      const folderName = firstFile.webkitRelativePath.split('/')[0] || 'local-project';
      onStartAnalysis(`workspace/${folderName}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white border border-[#E4E4DE] rounded-3xl shadow-2xl overflow-hidden relative p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 text-[#181816]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#F1F1ED] hover:bg-[#E4E4DE] text-[#686862] hover:text-[#181816] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#171717] flex items-center justify-center text-white shadow-md">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#181816]">➕ Add Repository / Project</h2>
            <p className="text-xs text-[#686862]">Analyze a local folder, upload a ZIP, or connect a GitHub/GitLab repository.</p>
          </div>
        </div>

        {/* Options Grid */}
        <div className="space-y-4">
          
          {/* Option A: Upload Folder */}
          <div className="p-4 rounded-2xl bg-[#F7F7F4] border border-[#E4E4DE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <Folder className="w-5 h-5 text-[#171717]" />
              <div>
                <div className="text-xs font-bold text-[#181816]">📂 Upload Folder (Local Project)</div>
                <div className="text-[11px] text-[#686862]">Analyze source files locally without external connection</div>
              </div>
            </div>

            <label className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#313131] text-white text-xs font-bold transition cursor-pointer shrink-0 text-center">
              Choose Folder
              <input 
                type="file" 
                // @ts-ignore
                webkitdirectory="" 
                directory="" 
                className="hidden" 
                onChange={handleFolderSelect}
              />
            </label>
          </div>

          {/* Option B: Upload ZIP */}
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`p-5 rounded-2xl border-2 border-dashed transition text-center ${
              dragActive 
                ? 'border-[#171717] bg-[#F1F1ED]' 
                : 'border-[#E4E4DE] bg-[#F7F7F4] hover:border-[#171717]'
            }`}
          >
            <FolderArchive className="w-6 h-6 text-[#171717] mx-auto mb-1.5" />
            <div className="text-xs font-bold text-[#181816]">📦 Upload ZIP Archive</div>
            <div className="text-[11px] text-[#686862]">Drop your project .zip archive here</div>
            
            {selectedFile ? (
              <div className="mt-2 inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#E4E4DE] text-[#181816] text-xs font-mono">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)</span>
              </div>
            ) : null}

            <div className="mt-2">
              <button
                onClick={() => onStartAnalysis(selectedFile ? selectedFile.name : 'uploaded_project.zip')}
                className="px-4 py-2 rounded-xl bg-[#F1F1ED] hover:bg-[#E4E4DE] text-[#181816] text-xs font-bold transition border border-[#E4E4DE]"
              >
                Analyze ZIP File
              </button>
            </div>
          </div>

          {/* Option C: GitHub / GitLab URL */}
          <div className="p-4 rounded-2xl bg-[#F7F7F4] border border-[#E4E4DE] space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#181816]">
              <GitBranch className="w-4 h-4 text-[#171717]" />
              <span>🔗 Connect GitHub / GitLab Repository</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/facebook/react"
                className="flex-1 bg-white border border-[#E4E4DE] rounded-xl px-3.5 py-2 text-xs text-[#181816] placeholder-[#96968E] focus:outline-none focus:border-[#171717] transition"
              />
              <button
                onClick={() => onStartAnalysis(githubUrl || 'https://github.com/facebook/react')}
                className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#313131] text-white text-xs font-bold transition shrink-0"
              >
                Connect & Analyze →
              </button>
            </div>
          </div>

          {/* Built-in Demo Shortcut */}
          <div className="pt-2 text-center border-t border-[#E4E4DE]">
            <button
              onClick={() => {
                onClose();
                onExploreDemo();
              }}
              className="text-xs font-bold text-[#686862] hover:text-[#181816] underline underline-offset-4 transition"
            >
              ⚡ Return to built-in RepoMind Demo Store →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
