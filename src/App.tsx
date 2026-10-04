import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import { LandingPage } from './components/LandingPage';
import { RepoInputModal } from './components/RepoInputModal';
import { AnalysisProgressScreen } from './components/AnalysisProgressScreen';
import { Preloader } from './components/Preloader';

import { ProjectsView } from './components/ProjectsView';
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
import { WhatsAppNotificationModal } from './components/WhatsAppNotificationModal';
import { SettingsView } from './components/SettingsView';

import { NavigationTab, TechnicalDebtIssue, SecurityFinding, FullRepoAnalysisData, WhatsAppConfig } from './types/repomind';
import { generateDynamicRepoData } from './mockData/repoData';

export function App() {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'landing' | 'analyzing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Dynamic Repository Dataset State
  const [analysisData, setAnalysisData] = useState<FullRepoAnalysisData>(
    generateDynamicRepoData('Abhilanshu/Repo-Mind-Ai')
  );

  // WhatsApp Configuration State
  const [whatsAppConfig, setWhatsAppConfig] = useState<WhatsAppConfig>({
    phoneNumber: '+91 98765 43210',
    enabled: true,
    notifyOnAnalysis: true,
    notifyOnCriticalSec: true,
    notifyOnFixApplied: true,
    notifyOnSprintReady: true
  });

  // Modals
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [repoInputModalOpen, setRepoInputModalOpen] = useState(false);
  const [selectedFileForModal, setSelectedFileForModal] = useState<string | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
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
    setTimeout(() => setToastText(null), 3500);
  };

  const handleStartAnalysis = (repoUrl: string) => {
    setRepoInputModalOpen(false);
    const newDataset = generateDynamicRepoData(repoUrl);
    setAnalysisData(newDataset);
    setViewMode('analyzing');
  };

  const handleAnalysisComplete = () => {
    setViewMode('dashboard');
    triggerToast(`✓ Analysis complete for ${analysisData.metadata.name}!`);
    if (whatsAppConfig.enabled && whatsAppConfig.notifyOnAnalysis) {
      setTimeout(() => {
        triggerToast(`📱 WhatsApp Alert Sent to ${whatsAppConfig.phoneNumber}: Analysis Completed!`);
      }, 1500);
    }
  };

  const handleExploreDemo = () => {
    const demoData = generateDynamicRepoData('Abhilanshu/Repo-Mind-Ai');
    setAnalysisData(demoData);
    setViewMode('dashboard');
    triggerToast(`⚡ Loaded Repository Intelligence for Abhilanshu/Repo-Mind-Ai`);
  };

  const handleGenerateFixPatch = (findingOrIssue: SecurityFinding | TechnicalDebtIssue) => {
    setActiveTab('ai_assistant');
    triggerToast(`✨ RepoMind AI generated fix patch for ${findingOrIssue.id}! Asking permission...`);
  };

  const handleApplyFixSuccess = (issueTitle: string) => {
    triggerToast(`✅ RepoMind AI applied fix to codebase: ${issueTitle}`);
    if (whatsAppConfig.enabled && whatsAppConfig.notifyOnFixApplied) {
      setTimeout(() => {
        triggerToast(`📱 WhatsApp Notification Sent: Code Patch Applied!`);
      }, 1200);
    }
  };

  if (loading) {
    return <Preloader onFinish={() => setLoading(false)} />;
  }

  const {
    metadata: repoData,
    debtIssues,
    securityFindings,
    dependencies,
    codeQualityFiles,
    archNodes,
    archEdges,
    prioritizedActions,
    sprintTasks,
    initialMessages
  } = analysisData;

  return (
    <div className="min-h-screen bg-[#090611] text-[#F8F7FF] flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white">
      
      {/* View Mode 1: Landing Page */}
      {viewMode === 'landing' && (
        <LandingPage
          onStartAnalysis={() => setRepoInputModalOpen(true)}
          onExploreDemo={handleExploreDemo}
        />
      )}

      {/* View Mode 2: Analysis Screen */}
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
            onOpenWhatsAppModal={() => setWhatsAppModalOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />

          <div className="flex flex-1 relative">
            <Sidebar
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              criticalIssueCount={repoData.issuesBreakdown.critical}
            />

            {/* Main Content Viewport */}
            <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto">
              
              {/* TAB 0: PROJECTS */}
              {activeTab === 'projects' && (
                <ProjectsView
                  currentRepo={repoData}
                  onSelectProject={(url) => handleStartAnalysis(url)}
                  onOpenNewRepoModal={() => setRepoInputModalOpen(true)}
                />
              )}

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
                    actions={prioritizedActions}
                    onGenerateSprintPlan={() => setActiveTab('sprint')}
                    onViewIssue={(id) => {
                      const found = debtIssues.find(i => i.id === id);
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
                    nodes={archNodes}
                    edges={archEdges}
                    onSelectFile={(f) => setSelectedFileForModal(f)}
                  />
                  <DependencyGraphView 
                    files={codeQualityFiles}
                    onSelectFile={(f) => setSelectedFileForModal(f)}
                  />
                </div>
              )}

              {/* TAB 3: TECHNICAL DEBT */}
              {activeTab === 'debt' && (
                <TechnicalDebtExplorer
                  issues={debtIssues}
                  onSelectIssue={(issue) => setSelectedFileForModal(issue.file)}
                />
              )}

              {/* TAB 4: SECURITY CENTER */}
              {activeTab === 'security' && (
                <SecurityDashboard
                  findings={securityFindings}
                  onGenerateFix={(finding) => handleGenerateFixPatch(finding)}
                />
              )}

              {/* TAB 5: DEPENDENCIES */}
              {activeTab === 'dependencies' && (
                <DependencyIntelligence dependencies={dependencies} />
              )}

              {/* TAB 6: CODE QUALITY */}
              {activeTab === 'quality' && (
                <CodeQualityView
                  files={codeQualityFiles}
                  onSelectFile={(f) => setSelectedFileForModal(f)}
                />
              )}

              {/* TAB 7: TESTING HEALTH */}
              {activeTab === 'testing' && (
                <TestingIntelligenceView onSelectFile={(f) => setSelectedFileForModal(f)} />
              )}

              {/* TAB 8: REPOMIND CODE AGENT */}
              {activeTab === 'ai_assistant' && (
                <AICodebaseAssistant 
                  initialMessages={initialMessages}
                  onApplyFixSuccess={handleApplyFixSuccess}
                />
              )}

              {/* TAB 9: AI SPRINT PLANNER */}
              {activeTab === 'sprint' && (
                <SprintPlannerView 
                  initialTasks={sprintTasks}
                  onViewIssue={(id) => setActiveTab('debt')}
                />
              )}

              {/* TAB 10: REPORTS & EXPORT */}
              {activeTab === 'reports' && (
                <div className="glass-panel rounded-3xl p-8 text-center max-w-xl mx-auto space-y-4 bg-[#110B1F] border border-[#2A1B42]">
                  <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/20 text-[#C4B5FD] flex items-center justify-center mx-auto border border-[#7C3AED]/30 text-2xl">
                    📄
                  </div>
                  <h2 className="text-xl font-extrabold text-white">Engineering Health Reports</h2>
                  <p className="text-xs text-[#A9A1B8]">Generate executive stakeholder PDF/HTML, JSON, or Markdown reports.</p>
                  <button
                    onClick={() => setReportModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-extrabold text-xs transition shadow-lg shadow-[#7C3AED]/30"
                  >
                    Open Report Generator Modal →
                  </button>
                </div>
              )}

              {/* TAB 11: SETTINGS */}
              {activeTab === 'settings' && (
                <SettingsView 
                  whatsAppConfig={whatsAppConfig}
                  onOpenWhatsAppModal={() => setWhatsAppModalOpen(true)}
                />
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
            triggerToast(`✨ RepoMind AI prepared refactoring patch for ${f}. Asking permission...`);
          }}
        />
      )}

      {/* Report Generator Modal */}
      <ReportGeneratorModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        repo={repoData}
      />

      {/* WhatsApp Notification Configuration Modal */}
      <WhatsAppNotificationModal
        isOpen={whatsAppModalOpen}
        onClose={() => setWhatsAppModalOpen(false)}
        config={whatsAppConfig}
        onSaveConfig={(newConfig) => {
          setWhatsAppConfig(newConfig);
          triggerToast(`📱 WhatsApp notification settings saved for ${newConfig.phoneNumber}!`);
        }}
        onTriggerTestNotification={(msg) => {
          triggerToast(`📱 WhatsApp Alert Dispatched: ${msg.split('\n')[0]}`);
        }}
      />

      {/* Toast Notification Banner */}
      {toastText && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#171026] text-white border border-[#7C3AED] text-xs font-mono font-bold shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          {toastText}
        </div>
      )}

    </div>
  );
}
