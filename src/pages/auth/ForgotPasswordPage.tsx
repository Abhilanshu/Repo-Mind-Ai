import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Check } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1F2937]">Reset Your Password</h1>
          <p className="text-xs text-[#4B5563] mt-1.5">Enter your work email address to receive a secure reset link.</p>
        </div>

        {sent ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#16803C] text-xs font-semibold space-y-2 text-center">
            <Check className="w-6 h-6 text-[#16803C] mx-auto" />
            <p>Password reset email sent to <strong>{email}</strong>!</p>
            <Link to="/login" className="inline-block pt-2 font-bold hover:underline">
              Return to Login →
            </Link>
          </div>
        ) : (
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

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white text-xs font-extrabold transition shadow-md shadow-[#6D4AFF]/25 flex items-center justify-center space-x-2 mt-4"
            >
              <span>Send Password Reset Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-[#E8E5DF] text-center text-xs text-[#4B5563]">
          Remembered your password?{' '}
          <Link to="/login" className="font-extrabold text-[#6D4AFF] hover:underline">
            Back to Sign In →
          </Link>
        </div>

      </div>
    </div>
  );
};
