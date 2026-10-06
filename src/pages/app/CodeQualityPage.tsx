import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { CodeQualityView } from '../../components/CodeQualityView';

export const CodeQualityPage: React.FC = () => {
  const { analysisData, setSelectedFileForModal } = useOutletContext<any>();
  return (
    <CodeQualityView
      files={analysisData.codeQualityFiles}
      onSelectFile={(f) => setSelectedFileForModal(f)}
    />
  );
};
