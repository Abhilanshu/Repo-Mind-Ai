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
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="card-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E4E4DE]">
        <div>
          <div className="flex items-center space-x-2">
            <TestTube2 className="w-5 h-5 text-[#16803C]" />
            <h2 className="text-lg font-extrabold text-[#181816]">🧪 Testing Intelligence & Test Suite Quality</h2>
          </div>
          <p className="text-xs text-[#686862] mt-1">
            Automated test suite coverage analysis across unit, integration, and E2E validation paths.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F7F7F4] px-4 py-2 rounded-xl border border-[#E4E4DE] text-xs font-mono text-[#181816]">
          <span>Total Coverage:</span>
          <span className="text-lg font-bold text-[#16803C]">76%</span>
        </div>
      </div>

      {/* Coverage Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-panel rounded-3xl p-6 bg-white border border-[#E4E4DE]">
          <div className="text-xs font-semibold text-[#686862]">Unit Tests Coverage</div>
          <div className="text-3xl font-extrabold text-[#181816] mt-2">84%</div>
          <div className="w-full h-2 bg-[#F1F1ED] rounded-full overflow-hidden mt-3">
            <div className="h-full bg-[#16803C] rounded-full" style={{ width: '84%' }} />
          </div>
          <p className="text-[11px] text-[#686862] mt-3">
            tests/unit_test.py runs 48 test cases covering utility functions.
          </p>
        </div>

        <div className="card-panel rounded-3xl p-6 bg-white border border-[#E4E4DE]">
          <div className="text-xs font-semibold text-[#686862]">Integration Tests Coverage</div>
          <div className="text-3xl font-extrabold text-[#181816] mt-2">72%</div>
          <div className="w-full h-2 bg-[#F1F1ED] rounded-full overflow-hidden mt-3">
            <div className="h-full bg-[#315EFB] rounded-full" style={{ width: '72%' }} />
          </div>
          <p className="text-[11px] text-[#686862] mt-3">
            Express API routes & MongoDB model integration paths.
          </p>
        </div>

        <div className="card-panel rounded-3xl p-6 bg-white border border-[#E4E4DE]">
          <div className="text-xs font-semibold text-[#686862]">E2E Store Validation</div>
          <div className="text-3xl font-extrabold text-[#B7791F] mt-2">58%</div>
          <div className="w-full h-2 bg-[#F1F1ED] rounded-full overflow-hidden mt-3">
            <div className="h-full bg-[#B7791F] rounded-full" style={{ width: '58%' }} />
          </div>
          <p className="text-[11px] text-[#686862] mt-3">
            Checkout workflow and end-to-end automation test suite.
          </p>
        </div>
      </div>

      {/* Untested Critical Paths & AI Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Untested Critical Paths List */}
        <div className="card-panel rounded-3xl p-6 space-y-3 bg-white border border-[#E4E4DE]">
          <h3 className="text-sm font-bold text-[#181816] flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-[#B7791F]" />
            <span>Untested Critical Code Paths</span>
          </h3>

          <div className="space-y-2 text-xs font-mono">
            {[
              { file: 'src/services/paymentService.ts', detail: 'order payment webhook processing error recovery', coverage: '0% Covered', color: 'text-[#C53030]' },
              { file: 'src/controllers/cartController.js', detail: 'out-of-stock inventory rollback handler', coverage: '14% Covered', color: 'text-[#B7791F]' },
              { file: 'server/models/Product.js', detail: 'document pre-save schema validator', coverage: '0% Covered', color: 'text-[#C53030]' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => onSelectFile && onSelectFile(item.file)}
                className="p-3 rounded-xl bg-[#F7F7F4] hover:bg-[#F1F1ED] border border-[#E4E4DE] flex items-center justify-between cursor-pointer transition"
              >
                <div>
                  <div className="text-[#181816] font-bold">{item.file}</div>
                  <div className="text-[10px] text-[#686862]">{item.detail}</div>
                </div>
                <span className={`${item.color} font-bold`}>{item.coverage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendation Card */}
        <div className="card-panel rounded-3xl p-6 bg-white border border-[#E4E4DE] flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#181816] mb-2">
              <Sparkles className="w-4 h-4 text-[#171717]" />
              <span>AI Testing Recommendation</span>
            </div>
            <blockquote className="text-sm text-[#181816] italic leading-relaxed p-4 rounded-2xl bg-[#F7F7F4] border border-[#E4E4DE]">
              "Payment gateway processing and inventory rollback handlers lack unit test coverage and should be prioritized to prevent regression bugs."
            </blockquote>
          </div>

          <div className="mt-4 space-y-3">
            <button
              onClick={handleGenerateMocks}
              className="w-full py-2.5 rounded-xl bg-[#171717] hover:bg-[#313131] text-white font-extrabold text-xs transition flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{mocksGenerated ? '✓ Generated Pytest Mocks Below!' : '✨ Generate Automated Pytest Mocks →'}</span>
            </button>

            {mocksGenerated && (
              <div className="p-3 bg-[#F7F7F4] rounded-xl border border-[#E4E4DE] animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#181816] pb-2 border-b border-[#E4E4DE] mb-2">
                  <span className="flex items-center space-x-1"><Code2 className="w-3 h-3 text-[#171717]" /><span>Generated test_payment.py</span></span>
                  <button onClick={handleCopyCode} className="text-[#181816] hover:underline flex items-center space-x-1">
                    {copied ? <Check className="w-3 h-3 text-[#16803C]" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[10px] font-mono text-[#181816] overflow-x-auto max-h-36">
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
