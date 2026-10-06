import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { HealthScoreCard } from '../../components/HealthScoreCard';
import { TechnicalDebtCard } from '../../components/TechnicalDebtCard';
import { ExecutiveSummaryCard } from '../../components/ExecutiveSummaryCard';
import { PrioritizationEngine } from '../../components/PrioritizationEngine';
import { useNavigate } from 'react-router-dom';

export const OverviewPage: React.FC = () => {
  const { analysisData, setSelectedFileForModal } = useOutletContext<any>();
  const navigate = useNavigate();

  const {
    metadata: repoData,
    debtIssues,
    prioritizedActions
  } = analysisData;

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Grid: Health Score + Technical Debt */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthScoreCard 
          score={repoData.healthScore} 
          breakdown={repoData.healthBreakdown} 
        />
        <TechnicalDebtCard 
          totalIssues={repoData.totalIssues}
          breakdown={repoData.issuesBreakdown}
          debtHours={repoData.totalDebtHours}
          trendDelta={repoData.debtHoursTrendDelta}
          onViewAll={() => navigate('/app/issues')}
        />
      </div>

      {/* AI Executive Summary Card */}
      <ExecutiveSummaryCard
        summaryText={repoData.aiSummary}
        onGenerateActionPlan={() => navigate('/app/sprint')}
        onAskAI={() => navigate('/app/agent')}
      />

      {/* GitHub Open Source Intelligence Engine Integration Card */}
      <div className="card-panel rounded-3xl p-6 bg-white border border-[#E8E5DF] space-y-4 font-sans shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E5DF] pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6D4AFF] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#6D4AFF]/20">
              🐙
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#1F2937] flex items-center space-x-2">
                <span>Integrated Open Source Intelligence Engines</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#EAF7EF] text-[#16803C] border border-[#C6ECD3] font-bold">Active Engine</span>
              </h3>
              <p className="text-xs text-[#4B5563]">Synthesizing AST static analysis algorithms and AI refactoring agents from open-source GitHub repositories.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Repowise Engine Card */}
          <div 
            onClick={() => navigate('/app/architecture')}
            className="p-4 rounded-2xl bg-[#F7F5F2] hover:bg-[#EEE9FF] border border-[#E8E5DF] hover:border-[#D8CAFF] transition cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono font-extrabold text-[#1F2937] group-hover:text-[#6D4AFF] text-xs">
                repowise-dev / repowise
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EEE9FF] text-[#6D4AFF] font-bold">AST Engine</span>
            </div>
            <p className="text-[11px] text-[#4B5563] leading-relaxed mb-3">
              Multi-language AST static parser, cyclomatic complexity metrics, circular dependency grapher, and technical debt hour calculations.
            </p>
            <div className="flex items-center space-x-2 text-[10px] font-mono font-bold text-[#6D4AFF]">
              <span>Explore Architecture Topology Graph →</span>
            </div>
          </div>

          {/* Codebase Intelligence Engine Card */}
          <div 
            onClick={() => navigate('/app/agent')}
            className="p-4 rounded-2xl bg-[#F7F5F2] hover:bg-[#EEE9FF] border border-[#E8E5DF] hover:border-[#D8CAFF] transition cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono font-extrabold text-[#1F2937] group-hover:text-[#6D4AFF] text-xs">
                Oussamcsc / codebase-intelligence
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EAF7EF] text-[#16803C] font-bold">AI Code Agent</span>
            </div>
            <p className="text-[11px] text-[#4B5563] leading-relaxed mb-3">
              Permission-gated AI refactoring agent ([Approve & Apply Fix]), Pytest coverage generator, OWASP security scanner, and sprint task planner.
            </p>
            <div className="flex items-center space-x-2 text-[10px] font-mono font-bold text-[#16803C]">
              <span>Launch AI Code Refactoring Agent →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prioritization Engine ("What Should I Fix First?") */}
      <PrioritizationEngine
        actions={prioritizedActions}
        onGenerateSprintPlan={() => navigate('/app/sprint')}
        onViewIssue={(id) => {
          const found = debtIssues.find((i: any) => i.id === id);
          if (found) setSelectedFileForModal(found.file);
          else navigate('/app/issues');
        }}
      />

    </div>
  );
};
