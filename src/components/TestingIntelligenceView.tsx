import React, { useState } from 'react';
import { TestTube2, AlertTriangle, Sparkles, Code2, Copy, Check } from 'lucide-react';

interface TestingIntelligenceViewProps {
  onSelectFile?: (filename: string) => void;
}

export const TestingIntelligenceView: React.FC<TestingIntelligenceViewProps> = ({ onSelectFile }) => {
  const [mocksGenerated, setMocksGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const mockCodeSnippet = `import pytest
from unittest.mock import MagicMock
from src.services.paymentService import processOrderPayment

def test_payment_service_success():
    payload = {"orderId": "ORD-9912", "amount": 149.50, "currency": "USD"}
    result = processOrderPayment(payload)
    assert result is not None
    assert result.get("success") is True

def test_payment_service_validation_failure():
    payload = {"invalid_payload": True}
    result = processOrderPayment(payload)
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
    <div className="space-y-6 font-sans text-[#1F2937]">
      
      {/* Header */}
      <div className="card-panel rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-grad-testing border border-[#C8D9F5]">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-[#EAF2FF] border border-[#C8D9F5] text-[#1D4ED8]">
              <TestTube2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-extrabold text-[#1F2937]">🧪 Testing Intelligence & Coverage Quality</h2>
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Automated test suite coverage analysis across unit, integration, and E2E validation paths.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-[#C8D9F5] text-xs font-mono text-[#1F2937] shadow-2xs">
          <span>Total Suite Coverage:</span>
          <span className="text-lg font-extrabold text-[#1D4ED8]">76%</span>
        </div>
      </div>

      {/* Coverage Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-panel rounded-3xl p-6 bg-white border border-[#E8E5DF]">
          <div className="text-xs font-bold text-[#4B5563]">Unit Tests Coverage</div>
          <div className="text-3xl font-extrabold text-[#16803C] mt-2">84%</div>
          <div className="w-full h-2.5 bg-[#F1F3F6] rounded-full overflow-hidden mt-3">
            <div className="h-full bg-[#16803C] rounded-full" style={{ width: '84%' }} />
          </div>
          <p className="text-[11px] text-[#4B5563] mt-3">
            tests/unit_test.py runs 48 test cases covering utility functions.
          </p>
        </div>

        <div className="card-panel rounded-3xl p-6 bg-white border border-[#E8E5DF]">
          <div className="text-xs font-bold text-[#4B5563]">Integration Tests Coverage</div>
          <div className="text-3xl font-extrabold text-[#1D4ED8] mt-2">72%</div>
          <div className="w-full h-2.5 bg-[#F1F3F6] rounded-full overflow-hidden mt-3">
            <div className="h-full bg-[#1D4ED8] rounded-full" style={{ width: '72%' }} />
          </div>
          <p className="text-[11px] text-[#4B5563] mt-3">
            Express API routes & MongoDB model integration paths.
          </p>
        </div>

        <div className="card-panel rounded-3xl p-6 bg-white border border-[#E8E5DF]">
          <div className="text-xs font-bold text-[#4B5563]">E2E Store Validation</div>
          <div className="text-3xl font-extrabold text-[#B7791F] mt-2">58%</div>
          <div className="w-full h-2.5 bg-[#F1F3F6] rounded-full overflow-hidden mt-3">
            <div className="h-full bg-[#B7791F] rounded-full" style={{ width: '58%' }} />
          </div>
          <p className="text-[11px] text-[#4B5563] mt-3">
            Checkout workflow and end-to-end automation test suite.
          </p>
        </div>
      </div>

      {/* Untested Critical Paths & AI Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Untested Critical Paths List */}
        <div className="card-panel rounded-3xl p-6 space-y-3 bg-white border border-[#E8E5DF]">
          <h3 className="text-sm font-bold text-[#1F2937] flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-[#B7791F]" />
            <span>Untested Critical Code Paths (7 paths)</span>
          </h3>

          <div className="space-y-2 text-xs font-mono">
            {[
              { file: 'src/services/paymentService.ts', detail: 'order payment webhook processing error recovery', coverage: '0% Covered', color: 'text-[#C53030] bg-[#FFF0F0] border-[#F5C6C6]' },
              { file: 'src/controllers/cartController.js', detail: 'out-of-stock inventory rollback handler', coverage: '14% Covered', color: 'text-[#B7791F] bg-[#FFF5E6] border-[#F3D29A]' },
              { file: 'server/models/Product.js', detail: 'document pre-save schema validator', coverage: '0% Covered', color: 'text-[#C53030] bg-[#FFF0F0] border-[#F5C6C6]' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => onSelectFile && onSelectFile(item.file)}
                className="p-3 rounded-xl bg-[#F7F5F2] hover:bg-[#F1F3F6] border border-[#E8E5DF] flex items-center justify-between cursor-pointer transition"
              >
                <div>
                  <div className="text-[#1F2937] font-bold">{item.file}</div>
                  <div className="text-[10px] text-[#4B5563]">{item.detail}</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${item.color}`}>{item.coverage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendation Card */}
        <div className="card-panel rounded-3xl p-6 bg-grad-testing border border-[#C8D9F5] flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#1D4ED8] mb-2">
              <Sparkles className="w-4 h-4 text-[#1D4ED8]" />
              <span>AI Testing Recommendation</span>
            </div>
            <blockquote className="text-sm text-[#1F2937] italic leading-relaxed p-4 rounded-2xl bg-white/90 border border-[#C8D9F5] shadow-2xs">
              "Payment gateway processing and inventory rollback handlers lack unit test coverage and should be prioritized to prevent regression bugs."
            </blockquote>
          </div>

          <div className="mt-4 space-y-3">
            <button
              onClick={handleGenerateMocks}
              className="w-full py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-extrabold text-xs transition flex items-center justify-center space-x-1.5 shadow-md shadow-[#1D4ED8]/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{mocksGenerated ? '✓ Generated Pytest Mocks Below!' : '✨ Generate Automated Pytest Mocks →'}</span>
            </button>

            {mocksGenerated && (
              <div className="p-3 bg-white rounded-xl border border-[#C8D9F5] animate-in fade-in duration-200 shadow-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#1D4ED8] pb-2 border-b border-[#C8D9F5] mb-2 font-bold">
                  <span className="flex items-center space-x-1"><Code2 className="w-3.5 h-3.5 text-[#1D4ED8]" /><span>Generated test_payment.py</span></span>
                  <button onClick={handleCopyCode} className="text-[#1D4ED8] hover:underline flex items-center space-x-1">
                    {copied ? <Check className="w-3 h-3 text-[#16803C]" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[10px] font-mono text-[#1F2937] overflow-x-auto max-h-36">
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
