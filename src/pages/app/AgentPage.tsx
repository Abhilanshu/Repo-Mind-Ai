import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { AICodebaseAssistant } from '../../components/AICodebaseAssistant';

export const AgentPage: React.FC = () => {
  const { analysisData, triggerToast, dispatchWhatsAppAlert } = useOutletContext<any>();
  return (
    <AICodebaseAssistant 
      initialMessages={analysisData.initialMessages}
      onApplyFixSuccess={(issueTitle) => {
        triggerToast(`✅ RepoMind AI applied fix: ${issueTitle}`);
        if (dispatchWhatsAppAlert) {
          dispatchWhatsAppAlert(`🧹 RepoMind AI Alert: Refactor Patch applied cleanly to codebase for '${issueTitle}'.`);
        }
      }}
    />
  );
};
