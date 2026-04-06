import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { generateBullets } from '../../utils/aiAssistant';

export default function ExperienceForm() {
  const { state, dispatch } = useResume();
  const experience = state.resume.experience || [];
  const [generatingId, setGeneratingId] = useState(null);

  const addExperience = () => {
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: {
        id: Date.now().toString(),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        bullets: ['']
      }
    });
  };

  const updateField = (id, field, value) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, [field]: value } });
  };

  const updateBullet = (expId, bulletIndex, value) => {
    const exp = experience.find(e => e.id === expId);
    if (!exp) return;
    const bullets = [...(exp.bullets || [])];
    bullets[bulletIndex] = value;
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id: expId, bullets } });
  };

  const addBullet = (expId) => {
    const exp = experience.find(e => e.id === expId);
    if (!exp) return;
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id: expId, bullets: [...(exp.bullets || []), ''] } });
  };

  const removeBullet = (expId, bulletIndex) => {
    const exp = experience.find(e => e.id === expId);
    if (!exp) return;
    const bullets = [...(exp.bullets || [])];
    bullets.splice(bulletIndex, 1);
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id: expId, bullets } });
  };

  const handleAIBullets = (expId) => {
    const exp = experience.find(e => e.id === expId);
    if (!exp) return;
    setGeneratingId(expId);
    setTimeout(() => {
      const title = exp.jobTitle || state.resume.personalInfo?.jobTitle || 'Software Engineer';
      const bullets = generateBullets(title, 4);
      dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id: expId, bullets } });
      setGeneratingId(null);
    }, 600);
  };

  const moveExperience = (index, direction) => {
    const newExp = [...experience];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newExp.length) return;
    [newExp[index], newExp[targetIndex]] = [newExp[targetIndex], newExp[index]];
    dispatch({ type: 'REORDER_EXPERIENCE', payload: newExp });
  };

  return (
    <div className="form-section" id="experience-form">
      <div className="form-section-header">
        <h3 className="form-section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          Work Experience
        </h3>
        <button className="add-section-btn" onClick={addExperience}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Experience
        </button>
      </div>

      {experience.map((exp, index) => (
        <div key={exp.id} className="experience-card">
          <div className="experience-card-header">
            <span className="experience-number">#{index + 1}</span>
            <div className="experience-card-actions">
              <button className="icon-btn" onClick={() => moveExperience(index, -1)} disabled={index === 0} title="Move up">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
              </button>
              <button className="icon-btn" onClick={() => moveExperience(index, 1)} disabled={index === experience.length - 1} title="Move down">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <button className="icon-btn danger" onClick={() => dispatch({ type: 'DELETE_EXPERIENCE', payload: exp.id })} title="Delete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input type="text" className="form-input" value={exp.jobTitle || ''} onChange={(e) => updateField(exp.id, 'jobTitle', e.target.value)} placeholder="Software Engineer" />
            </div>
            <div className="form-group">
              <label className="form-label">Company</label>
              <input type="text" className="form-input" value={exp.company || ''} onChange={(e) => updateField(exp.id, 'company', e.target.value)} placeholder="Google" />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input type="text" className="form-input" value={exp.location || ''} onChange={(e) => updateField(exp.id, 'location', e.target.value)} placeholder="Mountain View, CA" />
            </div>
            <div className="form-group half-width">
              <label className="form-label">Start Date</label>
              <input type="text" className="form-input" value={exp.startDate || ''} onChange={(e) => updateField(exp.id, 'startDate', e.target.value)} placeholder="2020" />
            </div>
            <div className="form-group half-width">
              <label className="form-label">End Date</label>
              <input type="text" className="form-input" value={exp.endDate || ''} onChange={(e) => updateField(exp.id, 'endDate', e.target.value)} placeholder="Present" />
            </div>
          </div>

          <div className="bullets-section">
            <div className="bullets-header">
              <label className="form-label">Achievements / Responsibilities</label>
              <button
                className="ai-btn small"
                onClick={() => handleAIBullets(exp.id)}
                disabled={generatingId === exp.id}
              >
                {generatingId === exp.id ? (
                  <><span className="spinner"></span> Generating...</>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    AI Bullets
                  </>
                )}
              </button>
            </div>
            {(exp.bullets || []).map((bullet, bIdx) => (
              <div key={bIdx} className="bullet-row">
                <span className="bullet-dot">•</span>
                <input
                  type="text"
                  className="form-input bullet-input"
                  value={bullet}
                  onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                  placeholder="Achieved X by doing Y resulting in Z"
                />
                <button className="icon-btn small danger" onClick={() => removeBullet(exp.id, bIdx)} title="Remove bullet">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            ))}
            <button className="add-bullet-btn" onClick={() => addBullet(exp.id)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Bullet Point
            </button>
          </div>
        </div>
      ))}

      {experience.length === 0 && (
        <div className="empty-state">
          <p>No work experience added yet.</p>
          <button className="add-section-btn" onClick={addExperience}>Add Your First Experience</button>
        </div>
      )}
    </div>
  );
}
