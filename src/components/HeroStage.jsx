import React, { useState, useEffect } from 'react';
import Confetti from './Confetti';
import { noButtonTexts } from '../data/galleryData';

const HeroStage = ({ 
  config, 
  isPreview = false, 
  onThemeSelect,
  isShareMode = false
}) => {
  const [noIndex, setNoIndex] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [hasSaidYes, setHasSaidYes] = useState(false);
  
  const occasion = config.occasion || 'valentine';
  const noTexts = noButtonTexts[occasion] || noButtonTexts['custom'];

  // Reset when config changes in preview
  useEffect(() => {
    if (isPreview) {
      setHasSaidYes(false);
      setYesScale(1);
      setNoIndex(0);
    }
  }, [config, isPreview]);

  const handleNoClick = () => {
    if (isPreview) return;
    setNoIndex((prev) => (prev + 1) % noTexts.length);
    setYesScale((prev) => Math.min(prev + 0.4, 6)); // Grow up to a limit
  };

  const handleYesClick = () => {
    if (isPreview) return;
    setHasSaidYes(true);
  };

  // Derived content
  const displayQuestion = hasSaidYes && !isPreview ? 'Yay! You said yes!' : config.title;
  const showBeforeImage = config.imageBefore && !hasSaidYes;
  const showAfterImage = config.imageAfter && (hasSaidYes || (!config.imageBefore && config.imageAfter));
  
  const currentNoText = noTexts[noIndex];

  return (
    <div className={`hero-card ${isPreview ? 'preview-card' : ''}`} style={{ backgroundColor: config.card }}>
      {!isPreview && hasSaidYes && <Confetti active={true} />}
      
      <div className="valentine-stage">
        <div className="question" style={{ color: config.text }}>
          {displayQuestion}
        </div>
        
        {showBeforeImage && (
          <img 
            className="hero-image" 
            src={config.imageBefore} 
            alt="Before" 
            style={{ display: 'block' }}
          />
        )}
        
        {showAfterImage && (
          <img 
            className="hero-image" 
            src={config.imageAfter} 
            alt="After" 
            style={{ display: 'block' }} 
          />
        )}
        
        {(!hasSaidYes || isPreview) && (
          <div className="button-row">
            <div className="yes-btn-wrapper" style={{ transform: `scale(${isPreview ? 1 : yesScale})` }}>
              <button 
                className={`yes-btn ${isPreview ? 'preview-yes' : ''}`} 
                onClick={handleYesClick}
              >
                Yes
              </button>
            </div>
            <button 
              className={`no-btn ${isPreview ? 'preview-no' : ''}`} 
              onClick={handleNoClick}
            >
              {isPreview ? 'No' : currentNoText}
            </button>
          </div>
        )}
        
        {(hasSaidYes || isPreview) && (
          <div className={`celebration ${hasSaidYes || isPreview ? 'active' : ''}`}>
            {config.celebrate}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroStage;
