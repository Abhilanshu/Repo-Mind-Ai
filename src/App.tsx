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
import { AuthModal } from './components/AuthModal';

import { NavigationTab, TechnicalDebtIssue, SecurityFinding, FullRepoAnalysisData, WhatsAppConfig } from './types/repomind';
import { generateDynamicRepoData } from './mockData/repoData';

export function App() {
  // Instant Dashboard Opening (Default loading to false so app opens directly with zero delay)
  const [loading, setLoading] = useState(false);
  
  // Instant Dashboard Opening Requirement (Default to 'dashboard' so app is immediately usable!)
  const [viewMode, setViewMode] = useState<'landing' | 'analyzing' | 'dashboard'>('dashboard');
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Built-in Demo Repository Dataset State ("RepoMind Demo Store")
  const [analysisData, setAnalysisData] = useState<FullRepoAnalysisData>(
    generateDynamicRepoData('RepoMind Demo Store')
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

  // Modals & User State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string; plan: string } | null>(() => {
    const saved = localStorage.getItem('repomind_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return { name: 'Abhilanshu', email: 'abhilanshu@repomind.io', role: 'Senior Architect', plan: 'Pro Plan' };
  });

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
    const targetName = repoUrl && repoUrl.trim() ? repoUrl : 'RepoMind Demo Store';
    const newDataset = generateDynamicRepoData(targetName);
    setAnalysisData(newDataset);
    setViewMode('dashboard');
    triggerToast(`⚡ Repository Intelligence active for ${newDataset.metadata.name}`);
  };

  const handleAnalysisComplete = () => {
    setViewMode('dashboard');
    triggerToast(`✓ Analysis complete for ${analysisData.metadata.name}!`);
    if (whatsAppConfig.enabled && whatsAppConfig.notifyOnAnalysis) {
      setTimeout(() => {
        triggerToast(`📱 WhatsApp Alert Dispatched to ${whatsAppConfig.phoneNumber}: Analysis Completed!`);
      }, 1500);
    }
  };

  const handleExploreDemo = () => {
    const demoData = generateDynamicRepoData('RepoMind Demo Store');
    setAnalysisData(demoData);
    setViewMode('dashboard');
    triggerToast(`⚡ Loaded Repository Intelligence for RepoMind Demo Store`);
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
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
            user={user}
            onOpenAuthModal={() => setAuthModalOpen(true)}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onSwitchRepo={(name) => {
              handleStartAnalysis(name);
            }}
            onOpenRepoInput={() => setRepoInputModalOpen(true)}
            onOpenReportModal={() => setReportModalOpen(true)}
            onOpenWhatsAppModal={() => setWhatsAppModalOpen(true)}
            onOpenLandingPage={() => setViewMode('landing')}
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

                  {/* GitHub Intelligence Engine Integration Card */}
                  <div className="card-panel rounded-3xl p-6 bg-white border border-[#E8E5DF] space-y-4 font-sans">
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
                        onClick={() => setActiveTab('architecture')}
                        className="p-4 rounded-2xl bg-[#F7F5F2] hover:bg-[#EEE9FF] border border-[#E8E5DF] hover:border-[#D8CAFF] transition cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono font-extrabold text-[#1F2937] group-hover:text-[#6D4AFF] text-xs flex items-center space-x-1.5">
                            <span>repowise-dev / repowise</span>
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
                        onClick={() => setActiveTab('ai_assistant')}
                        className="p-4 rounded-2xl bg-[#F7F5F2] hover:bg-[#EEE9FF] border border-[#E8E5DF] hover:border-[#D8CAFF] transition cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono font-extrabold text-[#1F2937] group-hover:text-[#6D4AFF] text-xs flex items-center space-x-1.5">
                            <span>Oussamcsc / codebase-intelligence</span>
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
                <div className="glass-panel rounded-3xl p-8 text-center max-w-xl mx-auto space-y-4 bg-white border border-[#E4E4DE]">
                  <div className="w-16 h-16 rounded-2xl bg-[#F1F1ED] text-[#171717] flex items-center justify-center mx-auto border border-[#E4E4DE] text-2xl">
                    📄
                  </div>
                  <h2 className="text-xl font-extrabold text-[#181816]">Engineering Health Reports</h2>
                  <p className="text-xs text-[#686862]">Generate executive stakeholder PDF/HTML, JSON, or Markdown reports.</p>
                  <button
                    onClick={() => setReportModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-[#171717] hover:bg-[#313131] text-white font-extrabold text-xs transition shadow-md"
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
                  onOpenAuthModal={() => setAuthModalOpen(true)}
                  user={user}
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

      {/* Enterprise Authentication & SAML SSO Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);
          triggerToast(`🔒 Authenticated session established for ${userData.name} (${userData.role})`);
        }}
      />

      {/* Toast Notification Banner */}
      {toastText && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#171717] text-white border border-[#313131] text-xs font-mono font-bold shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          {toastText}
        </div>
      )}

    </div>
  );
}
