import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

export const MarketingLayout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F2937] flex flex-col justify-between font-sans selection:bg-[#6D4AFF] selection:text-white">
      
      {/* Public SaaS Navbar */}
      <nav className="h-20 border-b border-[#E8E5DF] px-6 lg:px-12 flex items-center justify-between max-w-7xl mx-auto w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xs">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-2xl bg-[#6D4AFF] flex items-center justify-center text-white font-bold text-xl shadow-md shadow-[#6D4AFF]/20 transition group-hover:scale-105">
            🧠
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-xl tracking-tight text-[#1F2937]">RepoMind</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">SaaS v2.5</span>
          </div>
        </Link>

        {/* Marketing Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-bold text-[#4B5563]">
          <Link to="/product" className="hover:text-[#6D4AFF] transition">Product</Link>
          <Link to="/features" className="hover:text-[#6D4AFF] transition">Features</Link>
          <Link to="/solutions" className="hover:text-[#6D4AFF] transition">Solutions</Link>
          <Link to="/security" className="hover:text-[#6D4AFF] transition">Security</Link>
          <Link to="/pricing" className="hover:text-[#6D4AFF] transition">Pricing</Link>
          <Link to="/docs" className="hover:text-[#6D4AFF] transition">Docs</Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {user ? (
            <Link
              to="/app"
              className="px-5 py-2.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white text-xs font-extrabold shadow-md shadow-[#6D4AFF]/25 transition flex items-center space-x-2"
            >
              <span>Go to App Dashboard →</span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#1F2937] bg-[#F7F5F2] hover:bg-[#EEE9FF] border border-[#E8E5DF] transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white text-xs font-extrabold shadow-md shadow-[#6D4AFF]/25 transition flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Public Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="py-12 border-t border-[#E8E5DF] bg-white text-xs text-[#4B5563] font-sans">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl">🧠</span>
              <span className="font-extrabold text-base text-[#1F2937]">RepoMind AI</span>
            </div>
            <p className="text-xs text-[#6D4AFF] font-medium leading-relaxed">
              Software Repository Intelligence & Technical Debt Analysis Platform.
            </p>
          </div>

          <div>
            <div className="font-bold text-[#1F2937] mb-3 uppercase text-[11px] font-mono tracking-wider">Product</div>
            <ul className="space-y-2 font-medium">
              <li><Link to="/product" className="hover:text-[#6D4AFF]">Overview</Link></li>
              <li><Link to="/features" className="hover:text-[#6D4AFF]">AST Engine</Link></li>
              <li><Link to="/security" className="hover:text-[#6D4AFF]">Security Scanner</Link></li>
              <li><Link to="/pricing" className="hover:text-[#6D4AFF]">Pricing Tiers</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-[#1F2937] mb-3 uppercase text-[11px] font-mono tracking-wider">Solutions</div>
            <ul className="space-y-2 font-medium">
              <li><Link to="/solutions" className="hover:text-[#6D4AFF]">Engineering Leads</Link></li>
              <li><Link to="/solutions" className="hover:text-[#6D4AFF]">CTOs & Architects</Link></li>
              <li><Link to="/docs" className="hover:text-[#6D4AFF]">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-[#1F2937] mb-3 uppercase text-[11px] font-mono tracking-wider">Company</div>
            <ul className="space-y-2 font-medium">
              <li><Link to="/about" className="hover:text-[#6D4AFF]">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#6D4AFF]">Contact Demo</Link></li>
              <li><Link to="/login" className="hover:text-[#6D4AFF]">Developer Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-[#E8E5DF] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div>© {new Date().getFullYear()} RepoMind Platform Inc. Commercial SaaS Engineering Product.</div>
          <div className="flex items-center space-x-4">
            <Link to="/security" className="hover:text-[#1F2937]">SOC2 & Security</Link>
            <Link to="/docs" className="hover:text-[#1F2937]">API Docs</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};
