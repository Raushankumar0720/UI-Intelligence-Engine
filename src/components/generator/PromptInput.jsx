/**
 * PromptInput — Main prompt input area for UI generation.
 * Supports keyboard shortcuts (Enter to submit, Ctrl+Enter for newline).
 */
import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Sparkles, CornerDownLeft, X, RefreshCw, Camera, Image as ImageIcon, Layers, Component } from 'lucide-react';
import Button from '../ui/Button';
import useGeneratorStore from '../../store/generatorStore';
import { createRateLimiter } from '../../utils/security';
import './PromptInput.css';

const rateLimiter = createRateLimiter(2000);

const SUGGESTIONS = [
  'A modern product card with hover effects',
  'Dark dashboard with analytics stats',
  'Glassmorphism signup form',
  'Hero section with gradient CTA',
  'Pricing table with 3 tiers',
  'Responsive navbar with dropdown',
];

export default function PromptInput() {
  const { 
    prompt, setPrompt, generate, isGenerating,
    isRefining, parentGenerationId, clearRefineMode, history,
    isFlowMode, setFlowMode
  } = useGeneratorStore();
  const [uploadedImage, setUploadedImage] = React.useState(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  
  const parentComponent = parentGenerationId 
    ? history.find(h => h.id === parentGenerationId)
    : null;

  useEffect(() => {
    if (!isGenerating && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isGenerating]);

  const handleSubmit = useCallback(() => {
    if (!prompt.trim() || isGenerating) return;
    if (!rateLimiter()) return;
    generate();
  }, [prompt, isGenerating, generate]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (text) => {
    setPrompt(text);
    if (textareaRef.current) textareaRef.current.focus();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (prev) => setUploadedImage(prev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <motion.div
      className="prompt-input"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="prompt-input__header">
        <Sparkles size={20} className="prompt-input__icon" />
        <h2 className="prompt-input__title">
          {isRefining ? `Refining ${parentComponent?.componentType || 'Component'}` : 'What would you like to generate?'}
        </h2>
        {isRefining && (
          <button className="prompt-input__cancel-refine" onClick={clearRefineMode} title="Cancel refinement">
            <X size={14} /> Cancel
          </button>
        )}
      </div>

      <div className="prompt-input__area glass-card">
        {uploadedImage && (
          <div className="prompt-input__image-preview">
            <img src={uploadedImage} alt="Uploaded source" />
            <button className="prompt-input__image-clear" onClick={clearImage} title="Remove image">
              <X size={12} />
            </button>
            <div className="prompt-input__image-badge">Vision Active</div>
          </div>
        )}
        <textarea
          ref={textareaRef}
          className={`prompt-input__textarea ${isRefining ? 'prompt-input__textarea--refine' : ''} ${uploadedImage ? 'prompt-input__textarea--vision' : ''}`}
          placeholder={isRefining 
            ? `How should we refine this ${parentComponent?.componentType || 'UI'}? (e.g., 'Make it dark mode', 'Add more padding')`
            : uploadedImage 
              ? "Describe any specific changes to this screenshot..."
              : "Describe the UI component you want to generate... (e.g., 'A modern pricing table with dark theme')"
          }
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isGenerating}
          rows={uploadedImage ? 2 : 3}
          maxLength={1000}
          aria-label="UI generation prompt"
        />
        <div className="prompt-input__footer">
          <div className="prompt-input__footer-left">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
              id="vision-upload"
            />
            <label htmlFor="vision-upload" className="prompt-input__vision-btn" title="Screenshot-to-Code (Vision)">
              <Camera size={16} />
              <span>Vision</span>
            </label>

            {/* Elite Architecture Toggle */}
            {!isRefining && (
              <div className="prompt-input__mode-toggle">
                <button 
                  className={`prompt-input__mode-btn ${!isFlowMode ? 'active' : ''}`}
                  onClick={() => setFlowMode(false)}
                  title="Generate single component"
                >
                  <Component size={14} />
                  <span>Single</span>
                </button>
                <button 
                  className={`prompt-input__mode-btn ${isFlowMode ? 'active' : ''}`}
                  onClick={() => setFlowMode(true)}
                  title="Generate multi-screen flow"
                >
                  <Layers size={14} />
                  <span>Flow</span>
                </button>
              </div>
            )}

            <span className="prompt-input__hint">
              <CornerDownLeft size={12} />
              Enter to generate
            </span>
          </div>
          <span className="prompt-input__count">{prompt.length}/1000</span>
        </div>
      </div>

      <div className="prompt-input__actions">
        <Button
          variant={isRefining ? 'secondary' : 'primary'}
          size="lg"
          icon={isRefining ? RefreshCw : Wand2}
          onClick={handleSubmit}
          isLoading={isGenerating}
          disabled={!prompt.trim()}
        >
          {isGenerating ? 'Generating...' : isRefining ? 'Refine UI' : 'Generate UI'}
        </Button>
      </div>

      {!prompt && (
        <div className="prompt-input__suggestions">
          <p className="prompt-input__suggestions-label">Try these prompts:</p>
          <div className="prompt-input__suggestions-list">
            {SUGGESTIONS.map((s, i) => (
              <motion.button
                key={i}
                className="prompt-input__suggestion"
                onClick={() => handleSuggestion(s)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
