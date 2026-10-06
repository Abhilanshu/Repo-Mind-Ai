import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ArchitectureView } from '../../components/ArchitectureView';
import { DependencyGraphView } from '../../components/DependencyGraphView';

export const ArchitecturePage: React.FC = () => {
  const { analysisData, setSelectedFileForModal } = useOutletContext<any>();
  return (
    <div className="space-y-8 font-sans">
      <ArchitectureView 
        nodes={analysisData.archNodes}
        edges={analysisData.archEdges}
        onSelectFile={(f) => setSelectedFileForModal(f)}
      />
      <DependencyGraphView 
        files={analysisData.codeQualityFiles}
        onSelectFile={(f) => setSelectedFileForModal(f)}
      />
    </div>
  );
};
