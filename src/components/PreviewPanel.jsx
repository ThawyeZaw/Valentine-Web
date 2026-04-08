import React from 'react';
import HeroStage from './HeroStage';

const PreviewPanel = ({ config }) => {
  return (
    <div className="panel" id="previewPanel" style={{ backgroundColor: config.bg }}>
      <h2 style={{ color: config.text }}>Preview</h2>
      <HeroStage config={config} isPreview={true} />
    </div>
  );
};

export default PreviewPanel;
