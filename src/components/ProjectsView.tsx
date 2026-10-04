import React from 'react';
import { FolderGit2, ArrowRight, GitBranch, AlertTriangle, ShieldCheck, TestTube2, Package, Plus } from 'lucide-react';
import { RepositoryMetadata } from '../types/repomind';

interface ProjectsViewProps {
  currentRepo: RepositoryMetadata;
  onSelectProject: (repoUrl: string) => void;
  onOpenNewRepoModal: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  currentRepo,
  onSelectProject,
  onOpenNewRepoModal
}) => {
  const projectsList = [
    {
      id: 'p1',
      name: currentRepo.name,
      techStack: 'React 19 • TypeScript • Python AST',
      health: currentRepo.healthScore,
      issues: currentRepo.totalIssues,
      outdatedDeps: 2,
      coverage: 78,
      status: 'Active Project',
      url: currentRepo.url || 'Abhilanshu/Repo-Mind-Ai'
    },
    {
      id: 'p2',
      name: 'facebook/react',
      techStack: 'JavaScript • Flow • Monorepo',
      health: 91,
      issues: 8,
      outdatedDeps: 1,
      coverage: 92,
      status: 'Monorepo',
      url: 'facebook/react'
    },
    {
      id: 'p3',
      name: 'expressjs/express',
      techStack: 'Node.js • JavaScript • REST Engine',
      health: 84,
      issues: 14,
      outdatedDeps: 4,
      coverage: 81,
      status: 'Backend API',
      url: 'expressjs/express'
    },
    {
      id: 'p4',
      name: 'tailwindlabs/tailwindcss',
      techStack: 'PostCSS • Rust Engine • TypeScript',
      health: 95,
      issues: 3,
      outdatedDeps: 0,
      coverage: 94,
      status: 'Core Engine',
      url: 'tailwindlabs/tailwindcss'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FolderGit2 className="w-5 h-5 text-[#8B5CF6]" />
            <h2 className="text-lg font-extrabold text-white">📁 Software Projects & Repository Registry</h2>
          </div>
          <p className="text-xs text-[#A9A1B8] mt-1">
            Manage analyzed engineering codebases, repository health, and automated debt tracking.
          </p>
        </div>

        <button
          onClick={onOpenNewRepoModal}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white font-extrabold text-xs transition shadow-lg shadow-[#7C3AED]/25 flex items-center space-x-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Analyze New Project →</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsList.map((proj) => {
          const isCurrent = proj.name.toLowerCase() === currentRepo.name.toLowerCase();
          return (
            <div
              key={proj.id}
              className={`glass-panel rounded-3xl p-6 transition-all duration-200 border flex flex-col justify-between space-y-4 ${
                isCurrent 
                  ? 'border-[#7C3AED] bg-[#171026] shadow-xl shadow-[#7C3AED]/10' 
                  : 'hover:border-[#7C3AED]/50 bg-[#110B1F]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
                    <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                      <span>{proj.name}</span>
                    </h3>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isCurrent 
                      ? 'bg-[#7C3AED]/20 text-[#C4B5FD] border border-[#7C3AED]/40' 
                      : 'bg-[#171026] text-[#A9A1B8] border border-[#2A1B42]'
                  }`}>
                    {isCurrent ? 'Active Project' : proj.status}
                  </span>
                </div>

                <p className="text-xs text-[#A9A1B8] font-mono mt-1">
                  {proj.techStack}
                </p>
              </div>

              {/* Metrics Grid inside card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-[#171026] border border-[#2A1B42] text-xs font-mono">
                <div>
                  <div className="text-[10px] text-[#A9A1B8]">Health</div>
                  <div className="font-bold text-white text-sm mt-0.5 flex items-center space-x-1">
                    <span>{proj.health}%</span>
                    <span className="text-emerald-400 text-xs">🟢</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#A9A1B8]">Issues</div>
                  <div className="font-bold text-[#F8F7FF] text-sm mt-0.5">{proj.issues}</div>
                </div>

                <div>
                  <div className="text-[10px] text-[#A9A1B8]">Dependencies</div>
                  <div className="font-bold text-[#F8F7FF] text-sm mt-0.5">{proj.outdatedDeps} outdated</div>
                </div>

                <div>
                  <div className="text-[10px] text-[#A9A1B8]">Coverage</div>
                  <div className="font-bold text-[#F8F7FF] text-sm mt-0.5">{proj.coverage}%</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#2A1B42]">
                <span className="text-[11px] text-[#A9A1B8]">Updated 10m ago</span>
                
                <button
                  onClick={() => onSelectProject(proj.url)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                    isCurrent
                      ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/30'
                      : 'bg-[#171026] hover:bg-[#2A1B42] text-[#C4B5FD] border border-[#2A1B42]'
                  }`}
                >
                  <span>{isCurrent ? 'Viewing Active' : 'Open Project'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
