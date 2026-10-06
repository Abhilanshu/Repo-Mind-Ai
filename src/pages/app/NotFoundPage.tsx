import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col justify-center items-center p-6 text-center font-sans">
      <div className="w-16 h-16 rounded-3xl bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF] flex items-center justify-center text-3xl font-extrabold mb-4 shadow-md">
        404
      </div>
      <h1 className="text-3xl font-extrabold text-[#1F2937] mb-2">Page Not Found</h1>
      <p className="text-xs text-[#4B5563] max-w-sm mb-6 leading-relaxed">
        The requested route does not exist or has been moved to a different workspace path.
      </p>
      <div className="flex items-center space-x-3">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#F1F3F6] border border-[#E8E5DF] text-[#1F2937] text-xs font-bold transition"
        >
          Marketing Homepage
        </Link>
        <Link
          to="/app"
          className="px-5 py-2.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white text-xs font-extrabold shadow-md shadow-[#6D4AFF]/25 transition flex items-center space-x-1.5"
        >
          <span>App Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
