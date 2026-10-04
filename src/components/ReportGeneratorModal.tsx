import React, { useState } from 'react';
import { X, FileSpreadsheet, Download, Check, Sparkles, FileText, Code2 } from 'lucide-react';
import { RepositoryMetadata } from '../types/repomind';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  repo: RepositoryMetadata;
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({
  isOpen,
  onClose,
  repo
}) => {
  const [downloaded, setDownloaded] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = (format: 'pdf' | 'json' | 'md') => {
    const filename = `repomind-health-report-${repo.name.replace('/', '-')}`;
    
    if (format === 'json') {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(repo, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `${filename}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else if (format === 'md') {
      const mdContent = `# RepoMind AI Engineering Health Report\n\n` +
        `**Repository:** ${repo.name}\n` +
        `**Branch:** ${repo.branch}\n` +
        `**Health Score:** ${repo.healthScore}/100\n` +
        `**Total LOC:** ${repo.totalLoc}\n` +
        `**Total Issues:** ${repo.totalIssues}\n` +
        `**Estimated Debt Payback:** ${repo.totalDebtHours} hours\n\n` +
        `## Senior AI Architect Executive Summary\n\n> ${repo.aiSummary}\n\n` +
        `## Health Breakdown\n` +
        `- Code Quality: ${repo.healthBreakdown.codeQuality}/100\n` +
        `- Architecture Topology: ${repo.healthBreakdown.architecture}/100\n` +
        `- Security & Risk: ${repo.healthBreakdown.security}/100\n` +
        `- Testing Coverage: ${repo.healthBreakdown.testing}/100\n` +
        `- Supply Chain Dependencies: ${repo.healthBreakdown.dependencies}/100\n` +
        `- Documentation: ${repo.healthBreakdown.documentation}/100\n\n` +
        `_Report generated automatically by RepoMind AI Engine_`;

      const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(mdContent);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `${filename}.md`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else if (format === 'pdf') {
      // Trigger browser print to PDF or download formatted HTML document
      const htmlContent = `<html><head><title>${filename}</title><style>body{font-family:sans-serif;padding:30px;color:#111;}h1{color:#4c1d95;}</style></head><body>` +
        `<h1>RepoMind AI Engineering Health Report</h1>` +
        `<p><strong>Repository:</strong> ${repo.name} (${repo.branch})</p>` +
        `<p><strong>Health Score:</strong> ${repo.healthScore} / 100</p>` +
        `<hr><p>${repo.aiSummary}</p></body></html>`;
      const dataStr = "data:text/html;charset=utf-8," + encodeURIComponent(htmlContent);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `${filename}.html`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }

    setDownloaded(format.toUpperCase());
    setTimeout(() => setDownloaded(null), 3000);
  };

  const sections = [
    '1. Executive Summary',
    '2. Repository Overview & LOC Metrics',
    '3. Architectural Topology & Coupling Analysis',
    '4. Categorized Technical Debt Audit',
    '5. Security & CVE Vulnerability Scanning',
    '6. Supply Chain Dependencies Matrix',
    '7. Automated Testing Health & Coverage Gaps',
    '8. AST Code Quality & Maintainability Index',
    '9. Senior AI Architect Recommendations',
    '10. Prioritized Engineering Roadmap'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#130d24] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white">📄 Engineering Health Report Generator</h2>
            <p className="text-xs text-slate-300">Generate executive PDF/HTML, JSON, or Markdown reports for stakeholders & tech leads.</p>
          </div>
        </div>

        {/* Included Sections Checklist */}
        <div className="mb-6 p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40">
          <div className="text-xs font-bold text-white mb-2 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Automated Report Sections Included:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] font-mono text-slate-300">
            {sections.map((sec, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{sec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Download Buttons Row */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleExport('pdf')}
            className="py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs transition shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Export HTML/PDF</span>
          </button>

          <button
            onClick={() => handleExport('json')}
            className="py-3 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700/50 text-purple-200 font-extrabold text-xs transition flex items-center justify-center space-x-1.5"
          >
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => handleExport('md')}
            className="py-3 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700/50 text-purple-200 font-extrabold text-xs transition flex items-center justify-center space-x-1.5"
          >
            <Download className="w-4 h-4 text-purple-400" />
            <span>Export Markdown</span>
          </button>
        </div>

        {downloaded && (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-mono animate-in fade-in duration-150">
            ✓ Downloaded report in {downloaded} format!
          </div>
        )}

      </div>
    </div>
  );
};
