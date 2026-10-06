import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { setReportModalOpen } = useOutletContext<any>();
  return (
    <div className="card-panel rounded-3xl p-8 text-center max-w-xl mx-auto space-y-4 bg-white border border-[#E8E5DF] font-sans shadow-md">
      <div className="w-16 h-16 rounded-2xl bg-[#EEE9FF] text-[#6D4AFF] flex items-center justify-center mx-auto border border-[#D8CAFF] text-2xl font-bold">
        📄
      </div>
      <h2 className="text-xl font-extrabold text-[#1F2937]">Executive Stakeholder Reports</h2>
      <p className="text-xs text-[#4B5563]">Generate executive PDF/HTML, JSON, or Markdown reports for team leads and stakeholders.</p>
      <button
        onClick={() => setReportModalOpen(true)}
        className="px-6 py-3 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white font-extrabold text-xs transition shadow-md shadow-[#6D4AFF]/25 flex items-center space-x-2 mx-auto"
      >
        <Sparkles className="w-4 h-4 text-white" />
        <span>Open Report Generator Modal →</span>
      </button>
    </div>
  );
};
