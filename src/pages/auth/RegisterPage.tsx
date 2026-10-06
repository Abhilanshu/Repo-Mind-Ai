import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User as UserIcon, Mail, Key, ArrowRight, Check } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [role, setRole] = useState('Senior Architect');
  const { register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const success = await register(name, email, password, role, phoneNumber);
    if (success) {
      navigate('/app', { replace: true });
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
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1F2937]">Create Pro Account</h1>
          <p className="text-xs text-[#4B5563] mt-1.5">Start analyzing repository intelligence & technical debt in seconds.</p>
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
              <UserIcon className="w-3.5 h-3.5 text-[#6D4AFF]" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Developer Name"
              className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#6D4AFF] transition"
            />
          </div>

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
              <span>Password (at least 6 characters)</span>
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#6D4AFF] transition"
            />
          </div>

          <div>
            <label className="block text-[#1F2937] font-bold mb-1.5 flex items-center space-x-1.5">
              <span className="text-[#16803C]">📱</span>
              <span>WhatsApp Alert Phone Number</span>
              <span className="text-[10px] text-[#16803C] font-mono font-bold bg-[#EAF7EF] px-1.5 py-0.2 rounded">Auto Alerts</span>
            </label>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#16803C] transition"
            />
          </div>

          <div>
            <label className="block text-[#1F2937] font-bold mb-1.5">Engineering Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#6D4AFF]"
            >
              <option value="Senior Architect">Senior Architect / Lead Engineer</option>
              <option value="Full Stack Developer">Full Stack Software Developer</option>
              <option value="Security Specialist">Security Auditor / Lead</option>
              <option value="Engineering Manager">Engineering Manager / CTO</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white text-xs font-extrabold transition shadow-md shadow-[#6D4AFF]/25 flex items-center justify-center space-x-2 mt-4 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Create Pro Workspace Account</span>
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 pt-5 border-t border-[#E8E5DF] text-center text-xs text-[#4B5563]">
          Already have an account?{' '}
          <Link to="/login" className="font-extrabold text-[#6D4AFF] hover:underline">
            Sign In here →
          </Link>
        </div>

      </div>
    </div>
  );
};
