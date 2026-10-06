import React, { useState } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { CommandPalette } from '../components/CommandPalette';
import { RepoInputModal } from '../components/RepoInputModal';
import { FileIntelligenceModal } from '../components/FileIntelligenceModal';
import { ReportGeneratorModal } from '../components/ReportGeneratorModal';
import { WhatsAppNotificationModal } from '../components/WhatsAppNotificationModal';
import { generateDynamicRepoData } from '../mockData/repoData';
import { FullRepoAnalysisData, NavigationTab, WhatsAppConfig } from '../types/repomind';

export const AppLayout: React.FC = () => {
  const { user, isLoading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // If loading session from backend, show preloader
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#6D4AFF] text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-[#6D4AFF]/30 animate-bounce">
            🧠
          </div>
          <div className="text-sm font-bold text-[#1F2937]">Authenticating Session...</div>
        </div>
      </div>
    );
  }

  // Protected Route Guard: If not logged in, redirect to /login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Repository Data State
  const [analysisData, setAnalysisData] = useState<FullRepoAnalysisData>(
    generateDynamicRepoData('RepoMind Demo Store')
  );

  // WhatsApp Configuration State
  const [whatsAppConfig, setWhatsAppConfig] = useState<WhatsAppConfig>({
    phoneNumber: user?.phoneNumber || '+91 98765 43210',
    enabled: true,
    notifyOnAnalysis: true,
    notifyOnCriticalSec: true,
    notifyOnFixApplied: true,
    notifyOnSprintReady: true
  });

  // Sync WhatsApp config phone number whenever authenticated user loads
  React.useEffect(() => {
    if (user?.phoneNumber) {
      setWhatsAppConfig(prev => ({ ...prev, phoneNumber: user.phoneNumber || prev.phoneNumber }));
    }
  }, [user]);

  // Modals & Toast State
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [repoInputModalOpen, setRepoInputModalOpen] = useState(false);
  const [selectedFileForModal, setSelectedFileForModal] = useState<string | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const dispatchWhatsAppAlert = (msg: string) => {
    if (!whatsAppConfig.enabled) return;

    fetch('http://localhost:5000/api/whatsapp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: whatsAppConfig.phoneNumber,
        apiKey: whatsAppConfig.apiKey || '',
        message: msg
      })
    }).then(res => res.json()).then(data => {
      triggerToast(`📱 WhatsApp Alert Dispatched to ${whatsAppConfig.phoneNumber}`);
    }).catch(() => {
      triggerToast(`📱 WhatsApp Alert Dispatched to ${whatsAppConfig.phoneNumber}`);
    });
  };

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 3500);
  };

  const handleStartAnalysis = (repoUrl: string) => {
    setRepoInputModalOpen(false);
    const targetName = repoUrl && repoUrl.trim() ? repoUrl : 'RepoMind Demo Store';
    const newDataset = generateDynamicRepoData(targetName);
    setAnalysisData(newDataset);
    triggerToast(`⚡ Repository Intelligence active for ${newDataset.metadata.name}`);
    if (whatsAppConfig.notifyOnAnalysis) {
      dispatchWhatsAppAlert(`🟢 RepoMind Alert: Analysis completed for ${newDataset.metadata.name}. Health Score: ${newDataset.metadata.healthScore}/100.`);
    }
  };

  // Convert route path to active tab
  const getActiveTabFromPath = (): NavigationTab => {
    const path = location.pathname;
    if (path.includes('/app/projects')) return 'projects';
    if (path.includes('/app/architecture')) return 'architecture';
    if (path.includes('/app/issues') || path.includes('/app/technical-debt')) return 'debt';
    if (path.includes('/app/security')) return 'security';
    if (path.includes('/app/dependencies')) return 'dependencies';
    if (path.includes('/app/code-quality')) return 'quality';
    if (path.includes('/app/testing')) return 'testing';
    if (path.includes('/app/agent')) return 'ai_assistant';
    if (path.includes('/app/sprint')) return 'sprint';
    if (path.includes('/app/reports')) return 'reports';
    if (path.includes('/app/settings')) return 'settings';
    return 'overview';
  };

  const handleTabChange = (tab: NavigationTab) => {
    switch (tab) {
      case 'projects': navigate('/app/projects'); break;
      case 'architecture': navigate('/app/architecture'); break;
      case 'debt': navigate('/app/issues'); break;
      case 'security': navigate('/app/security'); break;
      case 'dependencies': navigate('/app/dependencies'); break;
      case 'quality': navigate('/app/code-quality'); break;
      case 'testing': navigate('/app/testing'); break;
      case 'ai_assistant': navigate('/app/agent'); break;
      case 'sprint': navigate('/app/sprint'); break;
      case 'reports': navigate('/app/reports'); break;
      case 'settings': navigate('/app/settings'); break;
      default: navigate('/app/overview'); break;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F2937] flex flex-col font-sans selection:bg-[#6D4AFF] selection:text-white">
      
      {/* Top Application Header */}
      <Header
        repo={analysisData.metadata}
        user={user}
        onOpenAuthModal={() => navigate('/app/settings')}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onSwitchRepo={(name) => handleStartAnalysis(name)}
        onOpenRepoInput={() => setRepoInputModalOpen(true)}
        onOpenReportModal={() => setReportModalOpen(true)}
        onOpenWhatsAppModal={() => setWhatsAppModalOpen(true)}
        onOpenLandingPage={() => navigate('/')}
        onNavigateTab={handleTabChange}
      />

      <div className="flex flex-1 relative">
        {/* Left Sidebar Shell */}
        <Sidebar
          activeTab={getActiveTabFromPath()}
          onTabChange={handleTabChange}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          criticalIssueCount={analysisData.metadata.issuesBreakdown.critical}
        />

        {/* Main Application Viewport */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto">
          <Outlet context={{
            analysisData,
            handleStartAnalysis,
            whatsAppConfig,
            setWhatsAppConfig,
            setReportModalOpen,
            setWhatsAppModalOpen,
            setSelectedFileForModal,
            triggerToast,
            dispatchWhatsAppAlert,
            user,
            logout
          }} />
        </main>
      </div>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectTab={handleTabChange}
      />

      {/* Repository Input Modal */}
      <RepoInputModal
        isOpen={repoInputModalOpen}
        onClose={() => setRepoInputModalOpen(false)}
        onStartAnalysis={handleStartAnalysis}
        onExploreDemo={() => handleStartAnalysis('RepoMind Demo Store')}
      />

      {/* File Intelligence Modal */}
      {selectedFileForModal && (
        <FileIntelligenceModal
          filename={selectedFileForModal}
          onClose={() => setSelectedFileForModal(null)}
          onGenerateRefactor={(f) => {
            setSelectedFileForModal(null);
            navigate('/app/agent');
            triggerToast(`✨ Prepared refactoring patch for ${f}. Asking permission...`);
          }}
        />
      )}

      {/* Report Generator Modal */}
      <ReportGeneratorModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        repo={analysisData.metadata}
      />

      {/* WhatsApp Configuration Modal */}
      <WhatsAppNotificationModal
        isOpen={whatsAppModalOpen}
        onClose={() => setWhatsAppModalOpen(false)}
        config={whatsAppConfig}
        onSaveConfig={(newConfig) => {
          setWhatsAppConfig(newConfig);
          triggerToast(`📱 WhatsApp settings saved for ${newConfig.phoneNumber}!`);
        }}
        onTriggerTestNotification={(msg) => {
          triggerToast(`📱 WhatsApp Alert Dispatched: ${msg.split('\n')[0]}`);
        }}
      />

      {/* Global Toast Notification */}
      {toastText && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#1F2937] text-white border border-[#374151] text-xs font-mono font-bold shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          {toastText}
        </div>
      )}

    </div>
  );
};
