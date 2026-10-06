import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { SecurityDashboard } from '../../components/SecurityDashboard';

export const SecurityPage: React.FC = () => {
  const { analysisData, triggerToast } = useOutletContext<any>();
  const navigate = useNavigate();

  return (
    <SecurityDashboard
      findings={analysisData.securityFindings}
      onGenerateFix={(finding) => {
        navigate('/app/agent');
        triggerToast(`✨ prepared refactoring patch for ${finding.id}! Asking permission...`);
      }}
    />
  );
};
