import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Key, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/app';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col justify-center items-center p-4 font-sans selection:bg-[#6D4AFF] selection:text-white">
      
      {/* Brand Header Link */}
      <Link to="/" className="flex items-center space-x-3 mb-8 group">
        <div className="w-10 h-10 rounded-2xl bg-[#6D4AFF] flex items-center justify-center text-white font-bold text-xl shadow-md shadow-[#6D4AFF]/20 transition group-hover:scale-105">
          🧠
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-[#1F2937]">RepoMind AI</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E8E5DF] shadow-xl text-[#1F2937]">
        
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1F2937]">Sign In to Your Workspace</h1>
          <p className="text-xs text-[#4B5563] mt-1.5">Access RepoMind Software Repository Intelligence & AI Agent.</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-[#C53030] text-xs font-semibold flex items-center space-x-2">
            <span>⚠️ {error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[#1F2937] font-bold flex items-center space-x-1.5">
                <Key className="w-3.5 h-3.5 text-[#6D4AFF]" />
                <span>Password</span>
              </label>
              <Link to="/forgot-password" className="text-[11px] font-semibold text-[#6D4AFF] hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#6D4AFF] transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white text-xs font-extrabold transition shadow-md shadow-[#6D4AFF]/25 flex items-center justify-center space-x-2 mt-4 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In to Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Social / SSO Links */}
        <div className="mt-6 pt-5 border-t border-[#E8E5DF] space-y-3">
          <Link
            to="/sso"
            className="w-full py-2.5 rounded-xl bg-[#F7F5F2] hover:bg-[#EEE9FF] border border-[#E8E5DF] text-[#1F2937] font-bold text-xs transition flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#6D4AFF]" />
            <span>Sign In with Enterprise SAML SSO</span>
          </Link>

          <div className="text-center text-xs text-[#4B5563] pt-2">
            Don't have an account?{' '}
            <Link to="/register" className="font-extrabold text-[#6D4AFF] hover:underline">
              Create a free Pro account →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
