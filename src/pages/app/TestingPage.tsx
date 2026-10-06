import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { TestingIntelligenceView } from '../../components/TestingIntelligenceView';

export const TestingPage: React.FC = () => {
  const { setSelectedFileForModal } = useOutletContext<any>();
  return <TestingIntelligenceView onSelectFile={(f) => setSelectedFileForModal(f)} />;
};
