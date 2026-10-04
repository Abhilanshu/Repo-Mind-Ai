import React, { useState } from 'react';
import { Settings, Shield, Bell, GitBranch, MessageSquare, Bot, Cpu, Check, Smartphone, Key, Layers, CreditCard, Lock, Sparkles, Sliders } from 'lucide-react';
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
  const [aiModel, setAiModel] = useState('repomind-code-agent');
  const [llmProvider, setLlmProvider] = useState('anthropic');
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl font-sans">
      
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#110B1F] border border-[#2A1B42]">
        <div>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-[#8B5CF6]" />
            <h2 className="text-lg font-extrabold text-white">⚙️ Platform & Enterprise Settings</h2>
          </div>
          <p className="text-xs text-[#A9A1B8] mt-1">
            Configure AST static analysis depth, Multi-LLM provider models, webhooks, and WhatsApp alerts.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-extrabold text-xs transition shadow-lg shadow-[#7C3AED]/20 shrink-0"
        >
          {savedToast ? '✓ Saved Changes' : 'Save Settings'}
        </button>
      </div>

      {/* Commercial Plans & Billing Tier Selection */}
      <div className="glass-panel rounded-3xl p-6 bg-[#110B1F] border border-[#2A1B42] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-[#8B5CF6]" />
            <h3 className="text-sm font-extrabold text-white">Commercial Subscription Tiers</h3>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#7C3AED]/20 text-[#C4B5FD] border border-[#7C3AED]/30 font-bold">
            Current Tier: Pro Plan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          {[
            { id: 'free', name: 'Individual', price: '$0 / mo', desc: 'Free for open-source & single developers' },
            { id: 'pro', name: 'Pro', price: '$49 / mo', desc: 'Unlimited repositories & Code Agent refactoring' },
            { id: 'team', name: 'Team', price: '$199 / mo', desc: '10 Team seats, WhatsApp alerts & Jira export' },
            { id: 'enterprise', name: 'Enterprise', price: 'Custom', desc: 'SAML SSO, dedicated VPC & custom AST rules' }
          ].map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                selectedPlan === plan.id
                  ? 'bg-[#171026] border-[#7C3AED] text-white shadow-lg'
                  : 'bg-[#090611] border-[#2A1B42] text-[#A9A1B8] hover:text-white'
              }`}
            >
              <div>
                <div className="font-bold text-white flex items-center justify-between">
                  <span>{plan.name}</span>
                  {selectedPlan === plan.id && <Check className="w-4 h-4 text-[#C4B5FD]" />}
                </div>
                <div className="text-base font-extrabold text-purple-300 mt-1">{plan.price}</div>
                <p className="text-[10px] text-[#A9A1B8] mt-1.5 leading-snug">{plan.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-LLM Backend Provider Abstraction */}
      <div className="glass-panel rounded-3xl p-6 bg-[#110B1F] border border-[#2A1B42] space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
          <Bot className="w-4 h-4 text-[#8B5CF6]" />
          <span>Multi-LLM Provider & Model Selection</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          {[
            { id: 'anthropic', provider: 'Anthropic', model: 'Claude 3.5 Sonnet', tag: 'Default' },
            { id: 'openai', provider: 'OpenAI', model: 'GPT-4o Intelligence', tag: 'Active' },
            { id: 'ollama', provider: 'Ollama', model: 'Local Llama 3 (Offline)', tag: 'Private' },
            { id: 'gemini', provider: 'Google', model: 'Gemini 1.5 Pro', tag: 'Fast' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setLlmProvider(item.id)}
              className={`p-4 rounded-2xl border transition text-left ${
                llmProvider === item.id
                  ? 'bg-[#171026] border-[#7C3AED] text-white shadow-lg'
                  : 'bg-[#090611] border-[#2A1B42] text-[#A9A1B8] hover:text-white'
              }`}
            >
              <div className="font-bold text-white flex items-center justify-between">
                <span>{item.provider}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#7C3AED]/20 text-[#C4B5FD] rounded">{item.tag}</span>
              </div>
              <div className="text-[11px] text-[#C4B5FD] mt-1">{item.model}</div>
            </button>
          ))}
        </div>
      </div>

      {/* WhatsApp Notifier Card */}
      <div className="glass-panel rounded-3xl p-6 bg-[#110B1F] border border-[#2A1B42] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <span>📱 WhatsApp AI Mobile Notifier</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">Active</span>
              </h3>
              <p className="text-xs text-[#A9A1B8]">Receive instant WhatsApp notifications when analysis completes or code fixes are applied.</p>
            </div>
          </div>

          <button
            onClick={onOpenWhatsAppModal}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition shadow-lg shadow-emerald-600/30 flex items-center space-x-1.5 shrink-0"
          >
            <Smartphone className="w-4 h-4" />
            <span>Configure WhatsApp Notifier →</span>
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#171026] border border-[#2A1B42] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#A9A1B8] font-mono gap-2">
          <div>
            Registered Phone: <span className="text-emerald-300 font-bold">{whatsAppConfig?.phoneNumber || '+91 98765 43210'}</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>Analysis: {whatsAppConfig?.notifyOnAnalysis ? '✓ Enabled' : 'Disabled'}</span>
            <span>Fixes: {whatsAppConfig?.notifyOnFixApplied ? '✓ Enabled' : 'Disabled'}</span>
          </div>
        </div>
      </div>

      {/* AST Analysis Depth */}
      <div className="glass-panel rounded-3xl p-6 bg-[#110B1F] border border-[#2A1B42] space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-[#8B5CF6]" />
          <span>AST Analysis Depth & Scan Controls</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['quick', 'standard', 'deep'] as const).map(depth => (
            <button
              key={depth}
              onClick={() => setAnalysisDepth(depth)}
              className={`p-4 rounded-2xl border transition text-left capitalize ${
                analysisDepth === depth
                  ? 'bg-[#171026] border-[#7C3AED] text-white shadow-lg'
                  : 'bg-[#090611] border-[#2A1B42] text-[#A9A1B8] hover:text-white'
              }`}
            >
              <div className="text-xs font-bold">{depth} Scan</div>
              <div className="text-[10px] text-[#A9A1B8] mt-1">
                {depth === 'quick' ? 'Basic LOC & Cyclomatic check (< 10s)' :
                 depth === 'standard' ? 'Full AST, Call Graph & Security scan (15s)' :
                 'Deep AST, Saturation & Flow graph (45s)'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Enterprise Architecture Integration Previews */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* GitHub Webhooks */}
        <div className="glass-panel rounded-2xl p-4 bg-[#110B1F] border border-[#2A1B42] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-white">
            <GitBranch className="w-4 h-4 text-[#8B5CF6]" />
            <span>GitHub Webhooks</span>
          </div>
          <p className="text-[11px] text-[#A9A1B8]">Auto-trigger scans on git push & pull request events.</p>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block font-bold">Coming Soon</span>
        </div>

        {/* Enterprise RBAC */}
        <div className="glass-panel rounded-2xl p-4 bg-[#110B1F] border border-[#2A1B42] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-white">
            <Lock className="w-4 h-4 text-[#8B5CF6]" />
            <span>Enterprise RBAC Roles</span>
          </div>
          <p className="text-[11px] text-[#A9A1B8]">Manage Admin, Lead Engineer, and Viewer permissions.</p>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block font-bold">Coming Soon</span>
        </div>

        {/* Custom Rule Builder */}
        <div className="glass-panel rounded-2xl p-4 bg-[#110B1F] border border-[#2A1B42] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-white">
            <Sliders className="w-4 h-4 text-[#8B5CF6]" />
            <span>Custom AST Rule Builder</span>
          </div>
          <p className="text-[11px] text-[#A9A1B8]">Define project-specific AST static rules and security lints.</p>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block font-bold">Coming Soon</span>
        </div>

      </div>

    </div>
  );
};
