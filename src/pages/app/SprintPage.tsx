import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { SprintPlannerView } from '../../components/SprintPlannerView';

export const SprintPage: React.FC = () => {
  const { analysisData } = useOutletContext<any>();
  const navigate = useNavigate();

  return (
    <SprintPlannerView 
      initialTasks={analysisData.sprintTasks}
      onViewIssue={() => navigate('/app/issues')}
    />
  );
};
