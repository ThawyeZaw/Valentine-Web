import React, { useState, useEffect } from 'react';
import HeroStage from './components/HeroStage';
import CreatePanel from './components/CreatePanel';
import PreviewPanel from './components/PreviewPanel';
import GallerySection from './components/GallerySection';
import { defaultContent } from './data/galleryData';
import { encodeConfigObject, decodeConfigObject } from './utils/urlEncoder';

function App() {
  const [isShareMode, setIsShareMode] = useState(false);
  
  const [config, setConfig] = useState({
    occasion: 'valentine',
    title: defaultContent.valentine.question,
    celebrate: defaultContent.valentine.celebration,
    imageBefore: defaultContent.valentine.imageBefore,
    imageAfter: defaultContent.valentine.imageAfter,
    bg: '#fff1f5',
    card: '#ffffff',
    text: '#2a0e13'
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if ([...params.keys()].length > 0) {
      setIsShareMode(true);
      document.body.classList.add('share-mode');
      
      const paramConfig = {};
      for (const [key, value] of params.entries()) {
        if (value) paramConfig[key] = value;
      }
      
      const decodedConfig = decodeConfigObject(paramConfig);
      setConfig(prev => ({ ...prev, ...decodedConfig }));
      
      // Update CSS variables for full body background
      if (decodedConfig.bg) {
        document.documentElement.style.setProperty('--bg-1', decodedConfig.bg);
        document.documentElement.style.setProperty('--bg-2', decodedConfig.bg);
      }
      if (decodedConfig.card) {
        document.documentElement.style.setProperty('--card', decodedConfig.card);
      }
      if (decodedConfig.text) {
        document.documentElement.style.setProperty('--ink', decodedConfig.text);
      }
    } else {
      document.body.style.background = config.bg;
      document.body.style.color = config.text;
    }
  }, []);

  // Sync background and text dynamically in Creator Mode
  useEffect(() => {
    if (!isShareMode) {
      document.documentElement.style.setProperty('--bg-1', config.bg);
      document.documentElement.style.setProperty('--bg-2', config.bg);
      document.documentElement.style.setProperty('--ink', config.text);
    }
  }, [config.bg, config.text, isShareMode]);

  const handleConfigChange = (updates) => {
    setConfig(prev => {
      const next = { ...prev, ...updates };
      // If occasion changed, optionally prefill defaults
      if (updates.occasion && updates.occasion !== prev.occasion) {
        const defaults = defaultContent[updates.occasion] || defaultContent.custom;
        next.title = defaults.question;
        next.celebrate = defaults.celebration;
        next.imageBefore = defaults.imageBefore;
        next.imageAfter = defaults.imageAfter;
      }
      return next;
    });
  };

  const generateLink = () => {
    const encodedData = encodeConfigObject(config);
    const params = new URLSearchParams(encodedData);
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };

  if (isShareMode) {
    return (
      <>
        <a id="homeBtn" className="home-btn" href="/">
          Create Your Own
        </a>
        <section className="hero">
          <HeroStage config={config} isPreview={false} isShareMode={true} />
        </section>
      </>
    );
  }

  return (
    <>
      <header>
        <div className="brand">Celebration Studio</div>
      </header>

      <section className="hero">
        <HeroStage config={config} isPreview={false} />

        <div>
          <h1>Create a sharable moment</h1>
          <p>Customize the text, colors, and image for any occasion. Save your favorite version and share it instantly.</p>
          <div className="button-row" style={{ justifyContent: 'flex-start' }}>
            <button className="secondary-btn" onClick={() => document.getElementById('createPanel').scrollIntoView({ behavior: 'smooth' })}>
              Start Creating
            </button>
            <button className="secondary-btn" onClick={() => document.getElementById('gallerySection').scrollIntoView({ behavior: 'smooth' })}>
              Explore Gallery
            </button>
          </div>
        </div>
      </section>

      <section className="panel-grid">
        <CreatePanel 
          config={config} 
          onChange={handleConfigChange} 
          onGenerateLink={generateLink}
        />
        <PreviewPanel config={config} />
      </section>

      <GallerySection 
        currentOccasion={config.occasion}
        onUseImage={(key, url) => {
          handleConfigChange({ [key]: url });
          document.getElementById('createPanel').scrollIntoView({ behavior: 'smooth' });
        }}
        onUseText={(key, text) => {
          handleConfigChange({ [key]: text });
          document.getElementById('createPanel').scrollIntoView({ behavior: 'smooth' });
        }}
        onUseColor={(colors) => {
          handleConfigChange(colors);
          document.getElementById('createPanel').scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <footer>Built for sweet moments. Customize, save, and share.</footer>
    </>
  );
}

export default App;
