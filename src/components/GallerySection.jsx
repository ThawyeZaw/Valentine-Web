import React, { useState } from 'react';
import { galleryImages, galleryGifs, galleryTexts, colorCombos } from '../data/galleryData';

const GallerySection = ({ currentOccasion, onUseImage, onUseText, onUseColor }) => {
  const [activeTab, setActiveTab] = useState('gifs');

  const occasion = currentOccasion || 'valentine';
  const images = galleryImages[occasion] || galleryImages['custom'] || [];
  const gifs = galleryGifs[occasion] || galleryGifs['custom'] || [];
  const texts = galleryTexts[occasion] || galleryTexts['custom'] || [];
  
  return (
    <section className="gallery-section" id="gallerySection">
      <div className="gallery-header">
        <h2>Gallery</h2>
        <p>Explore images, GIFs, texts, and color palettes for {occasion}. Copy what you love or tap Use.</p>
      </div>
      
      <div className="gallery-nav">
        <button 
          className={`secondary-btn ${activeTab === 'gifs' ? 'is-active' : ''}`} 
          onClick={() => setActiveTab('gifs')}
        >
          GIFs
        </button>
        <button 
          className={`secondary-btn ${activeTab === 'images' ? 'is-active' : ''}`} 
          onClick={() => setActiveTab('images')}
        >
          Images
        </button>
        <button 
          className={`secondary-btn ${activeTab === 'texts' ? 'is-active' : ''}`} 
          onClick={() => setActiveTab('texts')}
        >
          Texts
        </button>
        <button 
          className={`secondary-btn ${activeTab === 'colors' ? 'is-active' : ''}`} 
          onClick={() => setActiveTab('colors')}
        >
          Color Combos
        </button>
      </div>

      {activeTab === 'gifs' && (
        <div className="gallery-block">
          <h3>GIFs</h3>
          <div className="gallery-strip">
            {gifs.map((url, i) => (
              <div key={i} className="gallery-card">
                <img src={url} alt="GIF" />
                <div className="gallery-copy-row">
                  <input readOnly value={url} />
                  <button className="secondary-btn" onClick={() => onUseImage('imageBefore', url)}>Use Before Yes</button>
                  <button className="secondary-btn" onClick={() => onUseImage('imageAfter', url)}>Use After Yes</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'images' && (
        <div className="gallery-block">
          <h3>Images</h3>
          <div className="gallery-strip">
            {images.map((url, i) => (
              <div key={i} className="gallery-card">
                <img src={url} alt="Image" />
                <div className="gallery-copy-row">
                  <input readOnly value={url} />
                  <button className="secondary-btn" onClick={() => onUseImage('imageBefore', url)}>Use Before Yes</button>
                  <button className="secondary-btn" onClick={() => onUseImage('imageAfter', url)}>Use After Yes</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'texts' && (
        <div className="gallery-block">
          <h3>Texts</h3>
          <div className="gallery-strip">
            {texts.map((text, i) => (
              <div key={i} className="gallery-card">
                <div className="gallery-text">{text}</div>
                <button className="secondary-btn" onClick={() => onUseText('title', text)}>Use as Headline</button>
                <button className="secondary-btn" onClick={() => onUseText('celebrate', text)}>Use After Yes</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'colors' && (
        <div className="gallery-block">
          <h3>Color Combinations</h3>
          <div className="gallery-strip">
            {colorCombos.map((combo, i) => (
              <div key={i} className="gallery-card color-card">
                <div className="color-swatches">
                  <div className="color-swatch" style={{ background: combo.bg }}></div>
                  <div className="color-swatch" style={{ background: combo.card }}></div>
                  <div className="color-swatch" style={{ background: combo.text }}></div>
                </div>
                <div className="color-label">{combo.label}</div>
                <button 
                  className="secondary-btn" 
                  onClick={() => onUseColor({ bg: combo.bg, card: combo.card, text: combo.text })}
                >
                  Use Colors
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
