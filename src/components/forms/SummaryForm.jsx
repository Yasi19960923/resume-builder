import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { generateSummary } from '../../utils/aiAssistant';

export default function SummaryForm() {
  const { state, dispatch } = useResume();
  const [aiYears, setAiYears] = useState('3');
  const [showAI, setShowAI] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const jobTitle = state.resume.personalInfo?.jobTitle || 'Software Engineer';
      const skills = state.resume.skills?.technical || [];
      const summary = generateSummary(jobTitle, parseInt(aiYears) || 3, skills);
      dispatch({ type: 'UPDATE_SUMMARY', payload: summary });
      setIsGenerating(false);
      setShowAI(false);
    }, 600);
  };

  return (
    <div className="form-section" id="summary-form">
      <div className="form-section-header">
        <h3 className="form-section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          Professional Summary
        </h3>
        <button
          className="ai-btn"
          onClick={() => setShowAI(!showAI)}
          title="AI Summary Generator"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          AI Generate
        </button>
      </div>

      {showAI && (
        <div className="ai-panel">
          <p className="ai-panel-desc">Generate an ATS-optimized professional summary based on your job title and experience.</p>
          <div className="ai-panel-inputs">
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                className="form-input"
                value={state.resume.personalInfo?.jobTitle || ''}
                onChange={(e) => dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: { jobTitle: e.target.value } })}
                placeholder="Software Engineer"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Years of Experience</label>
              <input
                type="number"
                className="form-input"
                value={aiYears}
                onChange={(e) => setAiYears(e.target.value)}
                min="0"
                max="40"
              />
            </div>
          </div>
          <button className="ai-generate-btn" onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              'Generate Summary'
            )}
          </button>
        </div>
      )}

      <textarea
        className="form-textarea"
        id="summary-textarea"
        value={state.resume.summary || ''}
        onChange={(e) => dispatch({ type: 'UPDATE_SUMMARY', payload: e.target.value })}
        placeholder="Results-driven developer with 5+ years of experience..."
        rows={5}
      />
      <p className="char-count">{(state.resume.summary || '').length} characters — Aim for 200-400 for best ATS results</p>
    </div>
  );
}
