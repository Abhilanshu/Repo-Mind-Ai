import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Building2, ShieldCheck, ArrowRight } from 'lucide-react';

export const SsoPage: React.FC = () => {
  const [domain, setDomain] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSso = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = domain.trim() || 'enterprise.com';
    register('Enterprise User', `user@${cleanDomain}`, 'sso_pass_123', 'Senior Architect').then(() => {
      navigate('/app');
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col justify-center items-center p-4 font-sans selection:bg-[#6D4AFF] selection:text-white">
      
      <Link to="/" className="flex items-center space-x-3 mb-8 group">
        <div className="w-10 h-10 rounded-2xl bg-[#6D4AFF] flex items-center justify-center text-white font-bold text-xl shadow-md shadow-[#6D4AFF]/20 transition group-hover:scale-105">
          🧠
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-[#1F2937]">RepoMind AI</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E8E5DF] shadow-xl text-[#1F2937]">
        
        <div className="mb-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF] flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1F2937]">Enterprise SAML SSO</h1>
          <p className="text-xs text-[#4B5563] mt-1.5">Sign in using your Okta, Azure AD, or corporate identity provider.</p>
        </div>

        <form onSubmit={handleSso} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#1F2937] font-bold mb-1.5 flex items-center space-x-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#6D4AFF]" />
              <span>Enterprise Domain / Provider URL</span>
            </label>
            <input
              type="text"
              required
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="company.okta.com"
              className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#6D4AFF] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white text-xs font-extrabold transition shadow-md shadow-[#6D4AFF]/25 flex items-center justify-center space-x-2 mt-4"
          >
            <span>Continue with SAML SSO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#E8E5DF] text-center text-xs text-[#4B5563]">
          Standard login?{' '}
          <Link to="/login" className="font-extrabold text-[#6D4AFF] hover:underline">
            Back to Password Sign In →
          </Link>
        </div>

      </div>
    </div>
  );
};
