import React, { useState } from 'react';
import { Settings, Shield, Bell, GitBranch, MessageSquare, Bot, Cpu, Check, Smartphone } from 'lucide-react';
import { WhatsAppConfig } from '../types/repomind';

interface SettingsViewProps {
  whatsAppConfig?: WhatsAppConfig;
  onOpenWhatsAppModal?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  whatsAppConfig,
  onOpenWhatsAppModal
}) => {
  const [analysisDepth, setAnalysisDepth] = useState<'quick' | 'standard' | 'deep'>('standard');
  const [aiModel, setAiModel] = useState('antigravity-pair-programmer');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-extrabold text-white">⚙️ Repository Intelligence Settings</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Configure AST static analysis depth, Antigravity AI pair programming models, and WhatsApp chatbot alerts.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs transition shadow-lg shadow-purple-600/20"
        >
          {savedToast ? '✓ Saved Changes' : 'Save Settings'}
        </button>
      </div>

      {/* WhatsApp Chatbot Integration Card */}
      <div className="glass-panel rounded-3xl p-6 bg-gradient-to-br from-emerald-950/40 via-purple-950/30 to-[#120a28] border border-emerald-500/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <span>📱 WhatsApp AI Chatbot Notifier</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">Active</span>
              </h3>
              <p className="text-xs text-slate-300">Receive instant WhatsApp notifications when analysis completes or code fixes are applied.</p>
            </div>
          </div>

          <button
            onClick={onOpenWhatsAppModal}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition shadow-lg shadow-emerald-600/30 flex items-center space-x-1.5"
          >
            <Smartphone className="w-4 h-4" />
            <span>Configure WhatsApp Bot →</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300 font-mono gap-2">
          <div>
            Registered Phone: <span className="text-emerald-300 font-bold">{whatsAppConfig?.phoneNumber || '+91 98765 43210'}</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>Analysis: {whatsAppConfig?.notifyOnAnalysis ? '✓ Enabled' : 'Disabled'}</span>
            <span>Fixes: {whatsAppConfig?.notifyOnFixApplied ? '✓ Enabled' : 'Disabled'}</span>
          </div>
        </div>
      </div>

      {/* Analysis Settings Card */}
      <div className="glass-panel rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span>AST Analysis Depth & Scanning Controls</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['quick', 'standard', 'deep'] as const).map(depth => (
            <button
              key={depth}
              onClick={() => setAnalysisDepth(depth)}
              className={`p-4 rounded-2xl border transition text-left capitalize ${
                analysisDepth === depth
                  ? 'bg-purple-900/60 border-purple-400 text-white shadow-lg'
                  : 'bg-purple-950/30 border-purple-800/40 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-bold">{depth} Scan</div>
              <div className="text-[10px] text-slate-400 mt-1">
                {depth === 'quick' ? 'Basic LOC & Cyclomatic check (< 10s)' :
                 depth === 'standard' ? 'Full AST, Call Graph & Security scan (15s)' :
                 'Deep AST, Saturation & Flow graph (45s)'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Model Selection */}
      <div className="glass-panel rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Bot className="w-4 h-4 text-indigo-400" />
          <span>AI Pair Programmer & Architect Model</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => setAiModel('antigravity-pair-programmer')}
            className={`p-4 rounded-2xl border transition text-left ${
              aiModel === 'antigravity-pair-programmer'
                ? 'bg-purple-900/60 border-purple-400 text-white shadow-lg'
                : 'bg-purple-950/30 border-purple-800/40 text-slate-400'
            }`}
          >
            <div className="font-bold flex items-center space-x-1.5 text-white">
              <span>🧠 Antigravity Agentic Pair Programmer</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded">Recommended</span>
            </div>
            <div className="text-[10px] text-purple-300 mt-1">Asks explicit permission before modifying codebase files</div>
          </button>

          <button
            onClick={() => setAiModel('claude-3-5-sonnet')}
            className={`p-4 rounded-2xl border transition text-left ${
              aiModel === 'claude-3-5-sonnet'
                ? 'bg-purple-900/60 border-purple-400 text-white shadow-lg'
                : 'bg-purple-950/30 border-purple-800/40 text-slate-400'
            }`}
          >
            <div className="font-bold">Claude 3.5 Sonnet Code Intelligence</div>
            <div className="text-[10px] text-slate-400 mt-1">Deep refactoring patch generation focus</div>
          </button>
        </div>
      </div>

      {/* Integrations */}
      <div className="glass-panel rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <GitBranch className="w-4 h-4 text-purple-300" />
          <span>Team Integrations</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-white">GitHub Actions CI/CD</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Connected</span>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-white">WhatsApp Bot Notifications</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Active</span>
          </div>
        </div>
      </div>

    </div>
  );
};
