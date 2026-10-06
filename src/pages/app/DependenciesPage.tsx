import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { DependencyIntelligence } from '../../components/DependencyIntelligence';

export const DependenciesPage: React.FC = () => {
  const { analysisData } = useOutletContext<any>();
  return <DependencyIntelligence dependencies={analysisData.dependencies} />;
};
