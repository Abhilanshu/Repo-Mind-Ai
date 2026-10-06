import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Check, Sparkles, Key, Building2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: { name: string; email: string; role: string; plan: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'sso'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Senior Architect');
  const [ssoDomain, setSsoDomain] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const userObj = {
        name: name.trim() || 'Abhilanshu',
        email: email.trim() || 'abhilanshu@repomind.io',
        role: role,
        plan: 'Pro Plan'
      };
      localStorage.setItem('repomind_user', JSON.stringify(userObj));
      onLoginSuccess(userObj);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md modal-card p-6 sm:p-8 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-[#1F2937]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#F7F5F2] hover:bg-[#F1F3F6] text-[#4B5563] hover:text-[#1F2937] transition border border-[#E8E5DF]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#6D4AFF] flex items-center justify-center text-white shadow-md shadow-[#6D4AFF]/20">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#1F2937] flex items-center space-x-2">
              <span>{authMode === 'login' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Enterprise SAML SSO'}</span>
            </h2>
            <p className="text-xs text-[#4B5563]">Access RepoMind Software Repository Intelligence & Code Agent.</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#F7F5F2] rounded-xl border border-[#E8E5DF] mb-6 text-xs font-semibold">
          <button
            onClick={() => setAuthMode('login')}
            className={`py-1.5 rounded-lg transition ${authMode === 'login' ? 'bg-[#6D4AFF] text-white font-bold shadow-xs' : 'text-[#4B5563] hover:text-[#1F2937]'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`py-1.5 rounded-lg transition ${authMode === 'signup' ? 'bg-[#6D4AFF] text-white font-bold shadow-xs' : 'text-[#4B5563] hover:text-[#1F2937]'}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setAuthMode('sso')}
            className={`py-1.5 rounded-lg transition ${authMode === 'sso' ? 'bg-[#6D4AFF] text-white font-bold shadow-xs' : 'text-[#4B5563] hover:text-[#1F2937]'}`}
          >
            SAML SSO
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {authMode === 'signup' && (
            <div>
              <label className="block text-[#1F2937] font-bold mb-1.5 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-[#6D4AFF]" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Abhilanshu"
                className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#6D4AFF] transition"
              />
            </div>
          )}

          {authMode !== 'sso' && (
            <>
              <div>
                <label className="block text-[#1F2937] font-bold mb-1.5 flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#6D4AFF]" />
                  <span>Work Email</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@company.com"
                  className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#6D4AFF] transition"
                />
              </div>

              <div>
                <label className="block text-[#1F2937] font-bold mb-1.5 flex items-center space-x-1.5">
                  <Key className="w-3.5 h-3.5 text-[#6D4AFF]" />
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#6D4AFF] transition"
                />
              </div>
            </>
          )}

          {authMode === 'sso' && (
            <div>
              <label className="block text-[#1F2937] font-bold mb-1.5 flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#6D4AFF]" />
                <span>Enterprise Domain (Okta / Azure AD / SAML)</span>
              </label>
              <input
                type="text"
                required
                value={ssoDomain}
                onChange={(e) => setSsoDomain(e.target.value)}
                placeholder="company.okta.com"
                className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#6D4AFF] transition"
              />
            </div>
          )}

          {authMode === 'signup' && (
            <div>
              <label className="block text-[#1F2937] font-bold mb-1.5">Developer Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#6D4AFF]"
              >
                <option value="Senior Architect">Senior Architect / Lead Engineer</option>
                <option value="Full Stack Engineer">Full Stack Software Developer</option>
                <option value="Security Specialist">Security Specialist</option>
                <option value="Engineering Manager">Engineering Manager / CTO</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white text-xs font-extrabold transition shadow-md shadow-[#6D4AFF]/25 flex items-center justify-center space-x-2 mt-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>{authMode === 'login' ? 'Sign In to RepoMind' : authMode === 'signup' ? 'Create Pro Account' : 'Authenticate with SAML SSO'}</span>
              </>
            )}
          </button>
        </form>

        {/* OAuth Social Dividers */}
        <div className="mt-5 pt-4 border-t border-[#E8E5DF] space-y-2">
          <div className="text-[10px] text-[#9CA3AF] uppercase text-center font-mono font-bold">Or Continue With</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                onLoginSuccess({ name: 'Abhilanshu', email: 'abhilanshu@github.com', role: 'Lead Engineer', plan: 'Pro Plan' });
                onClose();
              }}
              className="py-2 rounded-xl bg-[#F7F5F2] hover:bg-[#F1F3F6] border border-[#E8E5DF] text-[#1F2937] font-bold transition flex items-center justify-center space-x-1.5"
            >
              <span>🐙 GitHub OAuth</span>
            </button>
            <button
              onClick={() => {
                onLoginSuccess({ name: 'Abhilanshu', email: 'abhilanshu@gmail.com', role: 'Senior Architect', plan: 'Pro Plan' });
                onClose();
              }}
              className="py-2 rounded-xl bg-[#F7F5F2] hover:bg-[#F1F3F6] border border-[#E8E5DF] text-[#1F2937] font-bold transition flex items-center justify-center space-x-1.5"
            >
              <span>🌐 Google Workspace</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
