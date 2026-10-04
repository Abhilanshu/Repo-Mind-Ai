import React from 'react';
import { FolderGit2, ArrowRight, GitBranch, Plus } from 'lucide-react';
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
      techStack: 'React • Node • Express • MongoDB • Python',
      health: currentRepo.healthScore,
      issues: currentRepo.totalIssues,
      outdatedDeps: 2,
      coverage: 76,
      status: 'Active Project',
      url: currentRepo.url || 'RepoMind Demo Store'
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
    }
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header */}
      <div className="card-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E4E4DE]">
        <div>
          <div className="flex items-center space-x-2">
            <FolderGit2 className="w-5 h-5 text-[#171717]" />
            <h2 className="text-lg font-extrabold text-[#181816]">📁 Software Projects & Repository Registry</h2>
          </div>
          <p className="text-xs text-[#686862] mt-1">
            Manage analyzed engineering codebases, repository health, and automated debt tracking.
          </p>
        </div>

        <button
          onClick={onOpenNewRepoModal}
          className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#313131] text-white font-extrabold text-xs transition shadow-sm flex items-center space-x-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project / Upload Folder →</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsList.map((proj) => {
          const isCurrent = proj.name.toLowerCase() === currentRepo.name.toLowerCase();
          return (
            <div
              key={proj.id}
              className={`card-panel rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between space-y-4 bg-white ${
                isCurrent 
                  ? 'border-[#171717] shadow-md' 
                  : 'hover:border-[#96968E]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16803C]" />
                    <h3 className="text-base font-extrabold text-[#181816] flex items-center space-x-2">
                      <span>{proj.name}</span>
                    </h3>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isCurrent 
                      ? 'bg-[#171717] text-white' 
                      : 'bg-[#F1F1ED] text-[#686862] border border-[#E4E4DE]'
                  }`}>
                    {isCurrent ? 'Active Project' : proj.status}
                  </span>
                </div>

                <p className="text-xs text-[#686862] font-mono mt-1">
                  {proj.techStack}
                </p>
              </div>

              {/* Metrics Grid inside card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-[#F7F7F4] border border-[#E4E4DE] text-xs font-mono">
                <div>
                  <div className="text-[10px] text-[#96968E]">Health</div>
                  <div className="font-bold text-[#181816] text-sm mt-0.5 flex items-center space-x-1">
                    <span>{proj.health}%</span>
                    <span className="text-[#16803C] text-xs">🟢</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#96968E]">Issues</div>
                  <div className="font-bold text-[#181816] text-sm mt-0.5">{proj.issues}</div>
                </div>

                <div>
                  <div className="text-[10px] text-[#96968E]">Dependencies</div>
                  <div className="font-bold text-[#181816] text-sm mt-0.5">{proj.outdatedDeps} outdated</div>
                </div>

                <div>
                  <div className="text-[10px] text-[#96968E]">Coverage</div>
                  <div className="font-bold text-[#181816] text-sm mt-0.5">{proj.coverage}%</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E4E4DE]">
                <span className="text-[11px] text-[#96968E]">Indexed & Active</span>
                
                <button
                  onClick={() => onSelectProject(proj.url)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                    isCurrent
                      ? 'bg-[#171717] text-white shadow-sm'
                      : 'bg-[#F1F1ED] hover:bg-[#E4E4DE] text-[#181816] border border-[#E4E4DE]'
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
