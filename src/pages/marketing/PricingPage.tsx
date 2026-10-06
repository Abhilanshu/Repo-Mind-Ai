import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export const PricingPage: React.FC = () => {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto font-sans space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">
          Commercial Subscriptions
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2937]">Transparent SaaS Pricing Tiers</h1>
        <p className="text-sm text-[#4B5563]">Scale your repository intelligence from single open-source projects to enterprise engineering orgs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: 'Individual',
            price: '$0',
            period: 'Free Forever',
            desc: 'For individual developers & open source projects',
            features: ['3 Repositories', 'Static AST Complexity Scan', 'Basic Technical Debt Catalog', 'Community Support'],
            buttonText: 'Get Started Free',
            highlighted: false
          },
          {
            name: 'Pro Plan',
            price: '$49',
            period: '/ month',
            desc: 'For senior developers & lead engineers',
            features: ['Unlimited Repositories', 'Permission-Based AI Code Agent', 'Supply Chain Dependency Matrix', 'WhatsApp Mobile Alerts', 'PDF/HTML Executive Reports'],
            buttonText: 'Start Pro Trial',
            highlighted: true
          },
          {
            name: 'Team',
            price: '$199',
            period: '/ month',
            desc: 'For growing development teams (10 Seats)',
            features: ['10 Team Member Seats', 'Circular Dependency Grapher', 'Automated Pytest Suite Generator', 'Agile Sprint Planner & CSV Export', 'Priority Slack Support'],
            buttonText: 'Upgrade to Team',
            highlighted: false
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            period: 'Billed Annually',
            desc: 'For large corporate orgs requiring SAML SSO',
            features: ['Okta & Azure AD SAML SSO', 'Dedicated VPC / On-Prem Deploy', 'Custom AST Rule Builder', 'SOC2 Compliance Audit Trail', '24/7 Dedicated Architect'],
            buttonText: 'Contact Sales',
            highlighted: false
          }
        ].map((tier, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-3xl border transition flex flex-col justify-between ${
              tier.highlighted
                ? 'bg-white border-[#6D4AFF] shadow-xl ring-2 ring-[#6D4AFF]/20 relative'
                : 'bg-white border-[#E8E5DF] shadow-md hover:border-[#D8CAFF]'
            }`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6D4AFF] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <div>
              <h3 className="text-lg font-extrabold text-[#1F2937]">{tier.name}</h3>
              <div className="flex items-baseline space-x-1 mt-2 mb-1">
                <span className="text-3xl font-extrabold text-[#1F2937]">{tier.price}</span>
                <span className="text-xs text-[#4B5563] font-mono">{tier.period}</span>
              </div>
              <p className="text-xs text-[#4B5563] mb-6 leading-relaxed">{tier.desc}</p>
              
              <ul className="space-y-2.5 text-xs text-[#1F2937] font-medium border-t border-[#F1F3F6] pt-4 mb-6">
                {tier.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#16803C] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/register"
              className={`w-full py-3 rounded-xl text-xs font-extrabold transition text-center block ${
                tier.highlighted
                  ? 'bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white shadow-md shadow-[#6D4AFF]/25'
                  : 'bg-[#F7F5F2] hover:bg-[#EEE9FF] text-[#1F2937] border border-[#E8E5DF]'
              }`}
            >
              {tier.buttonText}
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};
