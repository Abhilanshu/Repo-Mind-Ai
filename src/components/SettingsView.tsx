import React, { useState } from 'react';
import { Settings, Shield, Bell, GitBranch, MessageSquare, Bot, Cpu, Check, Smartphone, Key, Layers, CreditCard, Lock, Sparkles, Sliders, ShieldCheck, UserCheck, Wrench } from 'lucide-react';
import { WhatsAppConfig } from '../types/repomind';
import { useAuth } from '../context/AuthContext';

interface SettingsViewProps {
  whatsAppConfig?: WhatsAppConfig;
  onOpenWhatsAppModal?: () => void;
  onOpenAuthModal?: () => void;
  user?: { name: string; email: string; role: string; plan: string } | null;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  whatsAppConfig,
  onOpenWhatsAppModal,
  onOpenAuthModal,
  user
}) => {
  const { isAdmin, activateAdminMode } = useAuth();
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [pinSuccess, setPinSuccess] = useState(false);

  const [analysisDepth, setAnalysisDepth] = useState<'quick' | 'standard' | 'deep'>('standard');
  const [aiModel, setAiModel] = useState('repomind-code-agent');
  const [llmProvider, setLlmProvider] = useState('anthropic');
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [savedToast, setSavedToast] = useState(false);

  const handleAdminPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(false);
    setPinSuccess(false);

    const success = activateAdminMode(adminPin);
    if (success) {
      setPinSuccess(true);
      setAdminPin('');
    } else {
      setPinError(true);
    }
  };

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl font-sans text-[#181816]">
      
      {/* Top Banner */}
      <div className="card-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E4E4DE]">
        <div>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-[#171717]" />
            <h2 className="text-lg font-extrabold text-[#181816]">⚙️ Platform & Enterprise Settings</h2>
          </div>
          <p className="text-xs text-[#686862] mt-1">
            Configure AST static analysis depth, Multi-LLM provider models, webhooks, and WhatsApp alerts.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#313131] text-white font-extrabold text-xs transition shadow-md shrink-0"
        >
          {savedToast ? '✓ Saved Changes' : 'Save Settings'}
        </button>
      </div>

      {/* Authenticated Developer Account Card */}
      <div className="card-panel rounded-3xl p-6 bg-white border border-[#E8E5DF] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#6D4AFF] text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-[#6D4AFF]/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-[#1F2937]">{user?.name || 'Abhilanshu'}</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">
                  {user?.plan || 'Pro Plan'}
                </span>
              </div>
              <p className="text-xs text-[#4B5563] mt-0.5">{user?.email || 'abhilanshu@repomind.io'} • <span className="font-semibold text-[#1F2937]">{user?.role || 'Senior Architect'}</span></p>
            </div>
          </div>

          <button
            onClick={onOpenAuthModal}
            className="px-4 py-2.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white font-extrabold text-xs transition shadow-md shadow-[#6D4AFF]/25 flex items-center space-x-1.5 shrink-0"
          >
            <Lock className="w-4 h-4" />
            <span>Manage Authentication / SAML SSO →</span>
          </button>
        </div>
      </div>

      {/* Admin Mode Activation & Master Power Card */}
      <div className="card-panel rounded-3xl p-6 bg-white border border-[#E8E5DF] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E5DF] pb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md ${
              isAdmin ? 'bg-amber-500 text-white shadow-amber-500/30' : 'bg-[#F7F5F2] text-[#1F2937]'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-[#1F2937]">Enterprise Admin Activation</h3>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                  isAdmin ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-gray-100 text-gray-600 border-gray-300'
                }`}>
                  {isAdmin ? '👑 Admin Mode Unlocked' : 'Normal User Mode'}
                </span>
              </div>
              <p className="text-xs text-[#4B5563] mt-0.5">
                {isAdmin
                  ? 'You possess full Administrative Power: Manage security policies, team workspace access, and custom AST rules.'
                  : 'Enter your special secret Admin PIN (e.g. 9999) to unlock Admin Master Powers.'}
              </p>
            </div>
          </div>

          {!isAdmin && (
            <form onSubmit={handleAdminPinSubmit} className="flex items-center space-x-2 shrink-0">
              <input
                type="password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Enter Admin PIN (9999)"
                className="bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1F2937] focus:outline-none focus:border-[#6D4AFF] w-40"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#1F2937] hover:bg-[#374151] text-white font-extrabold text-xs transition shadow-xs"
              >
                Unlock Admin
              </button>
            </form>
          )}
        </div>

        {pinError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-[#C53030] text-xs font-semibold">
            ⚠️ Invalid Admin Secret PIN. Contact your organization lead.
          </div>
        )}

        {pinSuccess && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            🎉 Admin Master Access Activated! You now hold full enterprise administrative powers.
          </div>
        )}

        {/* Admin Powerful Tools (Unlocked ONLY for Admin) */}
        {isAdmin && (
          <div className="p-4 rounded-2xl bg-[#FFFBF0] border border-[#F6E05E] space-y-3">
            <div className="flex items-center space-x-2 text-amber-800 font-extrabold text-xs uppercase tracking-wider">
              <Wrench className="w-4 h-4 text-amber-600" />
              <span>Admin Power Tools & Security Policies</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#F6E05E] shadow-2xs">
                <div className="font-bold text-[#1F2937]">🛡️ Master Security Rules</div>
                <div className="text-[11px] text-[#4B5563] mt-1">Enforce mandatory OWASP blocking on PRs</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#F6E05E] shadow-2xs">
                <div className="font-bold text-[#1F2937]">👥 Team Workspace Manager</div>
                <div className="text-[11px] text-[#4B5563] mt-1">Add, promote, or revoke developer seats</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#F6E05E] shadow-2xs">
                <div className="font-bold text-[#1F2937]">⚙️ Custom AST Engine Rules</div>
                <div className="text-[11px] text-[#4B5563] mt-1">Define organization-wide AST lint limits</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Commercial Plans & Billing Tier Selection */}
      <div className="card-panel rounded-3xl p-6 bg-white border border-[#E4E4DE] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-[#171717]" />
            <h3 className="text-sm font-extrabold text-[#181816]">Commercial Subscription Tiers</h3>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#F1F1ED] text-[#181816] border border-[#E4E4DE] font-bold">
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
                  ? 'bg-[#171717] border-[#171717] text-white shadow-md'
                  : 'bg-[#F7F7F4] border-[#E4E4DE] text-[#686862] hover:text-[#181816] hover:bg-[#F1F1ED]'
              }`}
            >
              <div>
                <div className={`font-bold flex items-center justify-between ${selectedPlan === plan.id ? 'text-white' : 'text-[#181816]'}`}>
                  <span>{plan.name}</span>
                  {selectedPlan === plan.id && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className={`text-base font-extrabold mt-1 ${selectedPlan === plan.id ? 'text-white' : 'text-[#181816]'}`}>{plan.price}</div>
                <p className={`text-[10px] mt-1.5 leading-snug ${selectedPlan === plan.id ? 'text-slate-300' : 'text-[#686862]'}`}>{plan.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-LLM Backend Provider Abstraction */}
      <div className="card-panel rounded-3xl p-6 bg-white border border-[#E4E4DE] space-y-4">
        <h3 className="text-sm font-extrabold text-[#181816] flex items-center space-x-2">
          <Bot className="w-4 h-4 text-[#171717]" />
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
                  ? 'bg-[#171717] border-[#171717] text-white shadow-md'
                  : 'bg-[#F7F7F4] border-[#E4E4DE] text-[#686862] hover:text-[#181816] hover:bg-[#F1F1ED]'
              }`}
            >
              <div className={`font-bold flex items-center justify-between ${llmProvider === item.id ? 'text-white' : 'text-[#181816]'}`}>
                <span>{item.provider}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${llmProvider === item.id ? 'bg-white/20 text-white' : 'bg-[#E4E4DE] text-[#181816]'}`}>{item.tag}</span>
              </div>
              <div className={`text-[11px] mt-1 ${llmProvider === item.id ? 'text-slate-300' : 'text-[#686862]'}`}>{item.model}</div>
            </button>
          ))}
        </div>
      </div>

      {/* WhatsApp Notifier Card */}
      <div className="card-panel rounded-3xl p-6 bg-white border border-[#E4E4DE] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-[#16803C] border border-emerald-200">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#181816] flex items-center space-x-2">
                <span>📱 WhatsApp AI Mobile Notifier</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-[#16803C] border border-emerald-200 font-bold">Active</span>
              </h3>
              <p className="text-xs text-[#686862]">Receive instant WhatsApp notifications when analysis completes or code fixes are applied.</p>
            </div>
          </div>

          <button
            onClick={onOpenWhatsAppModal}
            className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#313131] text-white font-extrabold text-xs transition shadow-md flex items-center space-x-1.5 shrink-0"
          >
            <Smartphone className="w-4 h-4" />
            <span>Configure WhatsApp Notifier →</span>
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F7F7F4] border border-[#E4E4DE] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#686862] font-mono gap-2">
          <div>
            Registered Phone: <span className="text-[#16803C] font-bold">{whatsAppConfig?.phoneNumber || '+91 98765 43210'}</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>Analysis: {whatsAppConfig?.notifyOnAnalysis ? '✓ Enabled' : 'Disabled'}</span>
            <span>Fixes: {whatsAppConfig?.notifyOnFixApplied ? '✓ Enabled' : 'Disabled'}</span>
          </div>
        </div>
      </div>

      {/* AST Analysis Depth */}
      <div className="card-panel rounded-3xl p-6 bg-white border border-[#E4E4DE] space-y-4">
        <h3 className="text-sm font-extrabold text-[#181816] flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-[#171717]" />
          <span>AST Analysis Depth & Scan Controls</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['quick', 'standard', 'deep'] as const).map(depth => (
            <button
              key={depth}
              onClick={() => setAnalysisDepth(depth)}
              className={`p-4 rounded-2xl border transition text-left capitalize ${
                analysisDepth === depth
                  ? 'bg-[#171717] border-[#171717] text-white shadow-md'
                  : 'bg-[#F7F7F4] border-[#E4E4DE] text-[#686862] hover:text-[#181816] hover:bg-[#F1F1ED]'
              }`}
            >
              <div className={`text-xs font-bold ${analysisDepth === depth ? 'text-white' : 'text-[#181816]'}`}>{depth} Scan</div>
              <div className={`text-[10px] mt-1 ${analysisDepth === depth ? 'text-slate-300' : 'text-[#686862]'}`}>
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
        <div className="card-panel rounded-2xl p-4 bg-white border border-[#E4E4DE] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#181816]">
            <GitBranch className="w-4 h-4 text-[#171717]" />
            <span>GitHub Webhooks</span>
          </div>
          <p className="text-[11px] text-[#686862]">Auto-trigger scans on git push & pull request events.</p>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-50 text-[#B7791F] border border-amber-200 inline-block font-bold">Coming Soon</span>
        </div>

        {/* Enterprise RBAC */}
        <div className="card-panel rounded-2xl p-4 bg-white border border-[#E4E4DE] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#181816]">
            <Lock className="w-4 h-4 text-[#171717]" />
            <span>Enterprise RBAC Roles</span>
          </div>
          <p className="text-[11px] text-[#686862]">Manage Admin, Lead Engineer, and Viewer permissions.</p>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-50 text-[#B7791F] border border-amber-200 inline-block font-bold">Coming Soon</span>
        </div>

        {/* Custom Rule Builder */}
        <div className="card-panel rounded-2xl p-4 bg-white border border-[#E4E4DE] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#181816]">
            <Sliders className="w-4 h-4 text-[#171717]" />
            <span>Custom AST Rule Builder</span>
          </div>
          <p className="text-[11px] text-[#686862]">Define project-specific AST static rules and security lints.</p>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-50 text-[#B7791F] border border-amber-200 inline-block font-bold">Coming Soon</span>
        </div>

      </div>

    </div>
  );
};
