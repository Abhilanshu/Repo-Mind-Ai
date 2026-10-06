import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { TechnicalDebtExplorer } from '../../components/TechnicalDebtExplorer';

export const TechnicalDebtPage: React.FC = () => {
  const { analysisData, setSelectedFileForModal } = useOutletContext<any>();
  return (
    <TechnicalDebtExplorer
      issues={analysisData.debtIssues}
      onSelectIssue={(issue) => setSelectedFileForModal(issue.file)}
    />
  );
};
