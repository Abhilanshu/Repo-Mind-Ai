import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import { LandingPage } from './components/LandingPage';
import { RepoInputModal } from './components/RepoInputModal';
import { AnalysisProgressScreen } from './components/AnalysisProgressScreen';
import { Preloader } from './components/Preloader';

import { HealthScoreCard } from './components/HealthScoreCard';
import { TechnicalDebtCard } from './components/TechnicalDebtCard';
import { ExecutiveSummaryCard } from './components/ExecutiveSummaryCard';
import { PrioritizationEngine } from './components/PrioritizationEngine';
import { ArchitectureView } from './components/ArchitectureView';
import { DependencyGraphView } from './components/DependencyGraphView';
import { CodeQualityView } from './components/CodeQualityView';
import { SecurityDashboard } from './components/SecurityDashboard';
import { DependencyIntelligence } from './components/DependencyIntelligence';
import { TestingIntelligenceView } from './components/TestingIntelligenceView';
import { TechnicalDebtExplorer } from './components/TechnicalDebtExplorer';
import { AICodebaseAssistant } from './components/AICodebaseAssistant';
import { SprintPlannerView } from './components/SprintPlannerView';
import { FileIntelligenceModal } from './components/FileIntelligenceModal';
import { ReportGeneratorModal } from './components/ReportGeneratorModal';
import { SettingsView } from './components/SettingsView';

import { NavigationTab, TechnicalDebtIssue, SecurityFinding } from './types/repomind';
import { 
  mockRepository, 
  mockTechnicalDebtIssues, 
  mockSecurityFindings, 
  mockDependencies, 
  mockCodeQualityFiles, 
  mockArchNodes, 
  mockArchEdges, 
  mockPrioritizedActions, 
  mockSprintTasks, 
  mockInitialChatMessages 
} from './mockData/repoData';

export function App() {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'landing' | 'analyzing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [repoData, setRepoData] = useState(mockRepository);

  // Modals
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [repoInputModalOpen, setRepoInputModalOpen] = useState(false);
  const [selectedFileForModal, setSelectedFileForModal] = useState<string | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 3000);
  };

  const handleStartAnalysis = (repoUrl: string) => {
    setRepoInputModalOpen(false);
    setViewMode('analyzing');
    if (repoUrl.includes('project-alpha')) {
      setRepoData({
        ...mockRepository,
        name: 'acme-corp/project-alpha',
        repositoryType: 'React/TypeScript'
      });
    } else {
      setRepoData(mockRepository);
    }
  };

  const handleAnalysisComplete = () => {
    setViewMode('dashboard');
    triggerToast('✓ Repository analysis completed successfully!');
  };

  const handleExploreDemo = () => {
    setRepoData(mockRepository);
    setViewMode('dashboard');
    triggerToast('⚡ Loaded Demo Repository: facefusion/facefusion');
  };

  const handleGenerateFixPatch = (findingOrIssue: SecurityFinding | TechnicalDebtIssue) => {
    setActiveTab('ai_assistant');
    triggerToast(`✨ AI fix patch generated for ${findingOrIssue.id}!`);
  };

  if (loading) {
    return <Preloader onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      
      {/* View Mode 1: Landing Page */}
      {viewMode === 'landing' && (
        <LandingPage
          onStartAnalysis={() => setRepoInputModalOpen(true)}
          onExploreDemo={handleExploreDemo}
        />
      )}

      {/* View Mode 2: Cinematic Analysis Screen */}
      {viewMode === 'analyzing' && (
        <AnalysisProgressScreen
          repoName={repoData.name}
          onComplete={handleAnalysisComplete}
        />
      )}

      {/* View Mode 3: Main SaaS Engineering Intelligence Dashboard */}
      {viewMode === 'dashboard' && (
        <div className="flex flex-col min-h-screen">
          <Header
            repo={repoData}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onSwitchRepo={(name) => {
              handleStartAnalysis(name);
            }}
            onOpenRepoInput={() => setRepoInputModalOpen(true)}
            onOpenReportModal={() => setReportModalOpen(true)}
          />

          <div className="flex flex-1 relative">
            <Sidebar
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              criticalIssueCount={mockRepository.issuesBreakdown.critical}
            />

            {/* Main Content Viewport */}
            <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
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
                      onViewAll={() => setActiveTab('debt')}
                    />
                  </div>

                  {/* AI Executive Summary Card */}
                  <ExecutiveSummaryCard
                    summaryText={repoData.aiSummary}
                    onGenerateActionPlan={() => setActiveTab('sprint')}
                    onAskAI={() => setActiveTab('ai_assistant')}
                  />

                  {/* Prioritization Engine ("What Should I Fix First?") */}
                  <PrioritizationEngine
                    actions={mockPrioritizedActions}
                    onGenerateSprintPlan={() => setActiveTab('sprint')}
                    onViewIssue={(id) => {
                      const found = mockTechnicalDebtIssues.find(i => i.id === id);
                      if (found) setSelectedFileForModal(found.file);
                      else setActiveTab('debt');
                    }}
                  />
                </div>
              )}

              {/* TAB 2: ARCHITECTURE */}
              {activeTab === 'architecture' && (
                <div className="space-y-8">
                  <ArchitectureView 
                    nodes={mockArchNodes}
                    edges={mockArchEdges}
                    onSelectFile={(f) => setSelectedFileForModal(f)}
                  />
                  <DependencyGraphView 
                    files={mockCodeQualityFiles}
                    onSelectFile={(f) => setSelectedFileForModal(f)}
                  />
                </div>
              )}

              {/* TAB 3: TECHNICAL DEBT */}
              {activeTab === 'debt' && (
                <TechnicalDebtExplorer
                  issues={mockTechnicalDebtIssues}
                  onSelectIssue={(issue) => setSelectedFileForModal(issue.file)}
                />
              )}

              {/* TAB 4: SECURITY CENTER */}
              {activeTab === 'security' && (
                <SecurityDashboard
                  findings={mockSecurityFindings}
                  onGenerateFix={(finding) => handleGenerateFixPatch(finding)}
                />
              )}

              {/* TAB 5: DEPENDENCIES */}
              {activeTab === 'dependencies' && (
                <DependencyIntelligence dependencies={mockDependencies} />
              )}

              {/* TAB 6: CODE QUALITY */}
              {activeTab === 'quality' && (
                <CodeQualityView
                  files={mockCodeQualityFiles}
                  onSelectFile={(f) => setSelectedFileForModal(f)}
                />
              )}

              {/* TAB 7: TESTING HEALTH */}
              {activeTab === 'testing' && (
                <TestingIntelligenceView />
              )}

              {/* TAB 8: AI CODEBASE ASSISTANT */}
              {activeTab === 'ai_assistant' && (
                <AICodebaseAssistant initialMessages={mockInitialChatMessages} />
              )}

              {/* TAB 9: AI SPRINT PLANNER */}
              {activeTab === 'sprint' && (
                <SprintPlannerView 
                  initialTasks={mockSprintTasks}
                  onViewIssue={(id) => setActiveTab('debt')}
                />
              )}

              {/* TAB 10: REPORTS & EXPORT */}
              {activeTab === 'reports' && (
                <div className="glass-panel rounded-3xl p-8 text-center max-w-xl mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600/20 text-purple-300 flex items-center justify-center mx-auto border border-purple-500/30 text-2xl">
                    📄
                  </div>
                  <h2 className="text-xl font-extrabold text-white">Engineering Health Reports</h2>
                  <p className="text-xs text-slate-300">Generate executive stakeholder PDF, JSON, or Markdown reports.</p>
                  <button
                    onClick={() => setReportModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs transition shadow-lg shadow-purple-600/30"
                  >
                    Open Report Generator Modal →
                  </button>
                </div>
              )}

              {/* TAB 11: SETTINGS */}
              {activeTab === 'settings' && (
                <SettingsView />
              )}

            </main>
          </div>
        </div>
      )}

      {/* Global Command Palette (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectTab={(tab) => {
          setViewMode('dashboard');
          setActiveTab(tab);
        }}
      />

      {/* Repository Input Modal */}
      <RepoInputModal
        isOpen={repoInputModalOpen}
        onClose={() => setRepoInputModalOpen(false)}
        onStartAnalysis={handleStartAnalysis}
        onExploreDemo={handleExploreDemo}
      />

      {/* File Intelligence Modal */}
      {selectedFileForModal && (
        <FileIntelligenceModal
          filename={selectedFileForModal}
          onClose={() => setSelectedFileForModal(null)}
          onGenerateRefactor={(f) => {
            setSelectedFileForModal(null);
            setActiveTab('ai_assistant');
            triggerToast(`✨ Generated refactoring plan for ${f}!`);
          }}
        />
      )}

      {/* Report Generator Modal */}
      <ReportGeneratorModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        repo={repoData}
      />

      {/* Toast Notification Banner */}
      {toastText && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-purple-900 text-white border border-purple-400 text-xs font-mono font-bold shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          {toastText}
        </div>
      )}

    </div>
  );
}
