import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ProjectsView } from '../../components/ProjectsView';

export const ProjectsPage: React.FC = () => {
  const { analysisData, handleStartAnalysis } = useOutletContext<any>();
  return (
    <ProjectsView
      currentRepo={analysisData.metadata}
      onSelectProject={(url) => handleStartAnalysis(url)}
      onOpenNewRepoModal={() => {}}
    />
  );
};
