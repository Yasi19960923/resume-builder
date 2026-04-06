import { useState } from 'react';
import { useResume } from '../context/ResumeContext';

export default function SaveLoadModal({ onClose }) {
  const { state, dispatch } = useResume();
  const [saveName, setSaveName] = useState(state.resume.personalInfo?.fullName || '');

  const handleSave = () => {
    dispatch({ type: 'SAVE_RESUME', payload: saveName });
    setSaveName('');
  };

  const handleLoad = (resume) => {
    dispatch({ type: 'LOAD_RESUME', payload: resume });
    onClose();
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_SAVED_RESUME', payload: id });
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content save-load-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Saved Resumes</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {/* Save Current */}
          <div className="save-current-section">
            <h4>Save Current Resume</h4>
            <div className="save-row">
              <input
                type="text"
                className="form-input"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="Resume name..."
              />
              <button className="ai-generate-btn" onClick={handleSave}>Save</button>
            </div>
          </div>

          {/* Saved List */}
          <div className="saved-list-section">
            <h4>Your Resumes ({state.savedResumes.length})</h4>
            {state.savedResumes.length === 0 ? (
              <p className="empty-state-text">No saved resumes yet.</p>
            ) : (
              <div className="saved-resumes-list">
                {state.savedResumes.map((saved) => (
                  <div key={saved.id} className="saved-resume-item">
                    <div className="saved-resume-info">
                      <strong>{saved.name}</strong>
                      <span className="saved-resume-date">{formatDate(saved.savedAt)}</span>
                    </div>
                    <div className="saved-resume-actions">
                      <button className="icon-btn" onClick={() => handleLoad(saved.resume)} title="Load">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                      <button className="icon-btn danger" onClick={() => handleDelete(saved.id)} title="Delete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
