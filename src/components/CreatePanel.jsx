import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { occasions } from '../data/galleryData';

const CreatePanel = ({ config, onChange, onGenerateLink }) => {
  const [shareLink, setShareLink] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleCopy = async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      alert('Link copied!');
    } catch (err) {
      alert('Failed to copy. Please copy manually.');
    }
  };

  const handleGenerate = () => {
    const link = onGenerateLink();
    setShareLink(link);
  };

  return (
    <div className="panel" id="createPanel">
      <h2>Create</h2>
      
      <label htmlFor="occasion">Occasion Type</label>
      <select id="occasion" name="occasion" value={config.occasion} onChange={handleChange}>
        {occasions.map(opt => (
          <option key={opt.id} value={opt.id}>{opt.label}</option>
        ))}
      </select>

      <label htmlFor="title">Headline / Question</label>
      <input 
        id="title" 
        name="title"
        value={config.title} 
        onChange={handleChange}
        placeholder="Will you be my valentine?" 
      />

      <label htmlFor="celebrate">Message After Yes</label>
      <input 
        id="celebrate" 
        name="celebrate"
        value={config.celebrate} 
        onChange={handleChange}
        placeholder="Yay! You just made this day sparkly." 
      />

      <label htmlFor="imageBefore">Image/GIF Before Yes</label>
      <input 
        id="imageBefore" 
        name="imageBefore"
        value={config.imageBefore} 
        onChange={handleChange}
        placeholder="https://..." 
      />

      <label htmlFor="imageAfter">Image/GIF After Yes</label>
      <input 
        id="imageAfter" 
        name="imageAfter"
        value={config.imageAfter} 
        onChange={handleChange}
        placeholder="https://..." 
      />

      <div className="form-row">
        <div>
          <label htmlFor="bg">Background</label>
          <input id="bg" name="bg" type="color" value={config.bg} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="card">Card Color</label>
          <input id="card" name="card" type="color" value={config.card} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="text">Text Color</label>
          <input id="text" name="text" type="color" value={config.text} onChange={handleChange} />
        </div>
      </div>

      <div className="form-row" style={{ marginTop: '16px' }}>
        <button onClick={handleGenerate} className="primary-btn">Generate Link</button>
      </div>
      
      {shareLink && (
        <>
          <label htmlFor="shareOutput" style={{ marginTop: '16px' }}>Shareable Link</label>
          <input id="shareOutput" readOnly value={shareLink} />
          <button className="ghost-btn" onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Copy size={16} /> Copy Link
          </button>
        </>
      )}
    </div>
  );
};

export default CreatePanel;
