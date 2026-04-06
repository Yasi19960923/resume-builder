import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { generateCoverLetter } from '../utils/aiAssistant';

export default function CoverLetterModal({ onClose }) {
  const { state } = useResume();
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState(state.resume.personalInfo?.jobTitle || '');
  const [coverLetter, setCoverLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const letter = generateCoverLetter(
      state.resume,
      companyName || '[Company Name]',
      position
    );
    setCoverLetter(letter);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content cover-letter-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Cover Letter Generator</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Google"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Position</label>
              <input
                type="text"
                className="form-input"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>
          </div>

          <button className="ai-generate-btn" onClick={handleGenerate}>
            Generate Cover Letter
          </button>

          {coverLetter && (
            <div className="cover-letter-output">
              <textarea
                className="form-textarea cover-letter-text"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={16}
              />
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
