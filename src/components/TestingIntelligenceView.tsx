import React, { useState } from 'react';
import { TestTube2, AlertTriangle, CheckCircle2, Sparkles, Code2, Copy, Check } from 'lucide-react';

interface TestingIntelligenceViewProps {
  onSelectFile?: (filename: string) => void;
}

export const TestingIntelligenceView: React.FC<TestingIntelligenceViewProps> = ({ onSelectFile }) => {
  const [mocksGenerated, setMocksGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const mockCodeSnippet = `import pytest
from unittest.mock import MagicMock
from src.controllers.coreController import executeSafeStep

def test_execute_safe_step_success():
    payload = {"repo": "Abhilanshu/Repo-Mind-Ai", "mode": "deep"}
    result = executeSafeStep(payload)
    assert result is not None
    assert result.get("success") is True

def test_execute_safe_step_validation_failure():
    payload = {"invalid_key": True}
    result = executeSafeStep(payload)
    assert result.get("success") is False
`;

  const handleGenerateMocks = () => {
    setMocksGenerated(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(mockCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <TestTube2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-extrabold text-white">🧪 Testing Intelligence & Coverage Quality</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Automated test suite coverage analysis across unit, integration, and E2E validation paths.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-indigo-950/60 px-4 py-2 rounded-xl border border-indigo-800/40 text-xs font-mono text-indigo-300">
          <span>Total Coverage:</span>
          <span className="text-lg font-bold text-white">63%</span>
        </div>
      </div>

      {/* Coverage Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-3xl p-6">
          <div className="text-xs font-semibold text-slate-400">Unit Tests Coverage</div>
          <div className="text-3xl font-extrabold text-indigo-300 mt-2">74%</div>
          <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '74%' }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            tests/test_suite.py runs 42 pytest cases covering helper utilities.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <div className="text-xs font-semibold text-slate-400">Integration Tests Coverage</div>
          <div className="text-3xl font-extrabold text-purple-300 mt-2">58%</div>
          <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '58%' }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Pipeline runner & AST parser integration routes.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <div className="text-xs font-semibold text-slate-400">E2E Stream Validation</div>
          <div className="text-3xl font-extrabold text-amber-400 mt-2">41%</div>
          <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '41%' }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            UI components and end-to-end automation test suite.
          </p>
        </div>
      </div>

      {/* Untested Critical Paths & AI Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Untested Critical Paths List */}
        <div className="glass-panel rounded-3xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Untested Critical Code Paths</span>
          </h3>

          <div className="space-y-2 text-xs font-mono">
            {[
              { file: 'src/controllers/coreController.ts', detail: 'process_step() error recovery fallback', coverage: '0% Covered', color: 'text-rose-400' },
              { file: 'repomind_server.py', detail: 'CORS header dispatch error handler', coverage: '12% Covered', color: 'text-amber-400' },
              { file: 'src/mockData/repoData.ts', detail: 'Dynamic generator error fallback', coverage: '0% Covered', color: 'text-rose-400' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => onSelectFile && onSelectFile(item.file)}
                className="p-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/40 flex items-center justify-between cursor-pointer transition"
              >
                <div>
                  <div className="text-white font-bold">{item.file}</div>
                  <div className="text-[10px] text-slate-400">{item.detail}</div>
                </div>
                <span className={`${item.color} font-bold`}>{item.coverage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendation Card */}
        <div className="glass-panel rounded-3xl p-6 bg-gradient-to-br from-[#160d33] to-[#120a29] border border-purple-500/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-300 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI Testing Recommendation</span>
            </div>
            <blockquote className="text-sm text-slate-200 italic leading-relaxed p-4 rounded-2xl bg-purple-950/50 border border-purple-800/40">
              "Authentication and controller execution modules have insufficient test coverage and should be prioritized to prevent regression bugs."
            </blockquote>
          </div>

          <div className="mt-4 space-y-3">
            <button
              onClick={handleGenerateMocks}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs transition flex items-center justify-center space-x-1.5 shadow-lg shadow-purple-600/30"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>{mocksGenerated ? '✓ Generated Pytest Mocks Below!' : '✨ Generate Automated Pytest Mocks →'}</span>
            </button>

            {mocksGenerated && (
              <div className="p-3 bg-[#080512] rounded-xl border border-purple-800/40 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[10px] font-mono text-purple-300 pb-2 border-b border-purple-900/40 mb-2">
                  <span className="flex items-center space-x-1"><Code2 className="w-3 h-3" /><span>Generated test_core.py</span></span>
                  <button onClick={handleCopyCode} className="text-purple-300 hover:text-white flex items-center space-x-1">
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[10px] font-mono text-slate-300 overflow-x-auto max-h-36">
                  {mockCodeSnippet}
                </pre>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
