import React, { useState } from 'react';
import { Mail, Phone, Building2, Send, Check } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 px-6 max-w-4xl mx-auto font-sans space-y-12">
      <div className="text-center space-y-4">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">
          Enterprise Sales & Demos
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2937]">Contact Our Team</h1>
        <p className="text-sm text-[#4B5563]">Schedule a custom architecture demo or request enterprise SAML SSO setup.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-[#E8E5DF] shadow-xl text-[#1F2937]">
        {submitted ? (
          <div className="text-center p-8 space-y-3">
            <Check className="w-10 h-10 text-[#16803C] mx-auto" />
            <h3 className="text-lg font-extrabold text-[#1F2937]">Demo Request Submitted!</h3>
            <p className="text-xs text-[#4B5563]">Our enterprise solution architects will reach out within 2 business hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#1F2937] font-bold mb-1.5">Full Name</label>
                <input required type="text" placeholder="Abhilanshu" className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937]" />
              </div>
              <div>
                <label className="block text-[#1F2937] font-bold mb-1.5">Work Email</label>
                <input required type="email" placeholder="dev@company.com" className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937]" />
              </div>
            </div>

            <div>
              <label className="block text-[#1F2937] font-bold mb-1.5">Company / Organization</label>
              <input required type="text" placeholder="Acme Software Corp" className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937]" />
            </div>

            <div>
              <label className="block text-[#1F2937] font-bold mb-1.5">Message / Demo Requirements</label>
              <textarea required rows={4} placeholder="We are looking to analyze 50+ microservice repositories..." className="w-full bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937]" />
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white font-extrabold text-xs transition shadow-md shadow-[#6D4AFF]/25 flex items-center justify-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Submit Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
