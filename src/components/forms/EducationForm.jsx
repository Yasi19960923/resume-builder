import { useResume } from '../../context/ResumeContext';

export default function EducationForm() {
  const { state, dispatch } = useResume();
  const education = state.resume.education || [];

  const addEducation = () => {
    dispatch({
      type: 'ADD_EDUCATION',
      payload: { id: Date.now().toString(), degree: '', university: '', year: '', gpa: '' }
    });
  };

  const updateField = (id, field, value) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: { id, [field]: value } });
  };

  return (
    <div className="form-section" id="education-form">
      <div className="form-section-header">
        <h3 className="form-section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 6 3 6 3s3 0 6-3v-5" />
          </svg>
          Education
        </h3>
        <button className="add-section-btn" onClick={addEducation}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Education
        </button>
      </div>

      {education.map((edu, index) => (
        <div key={edu.id} className="experience-card">
          <div className="experience-card-header">
            <span className="experience-number">#{index + 1}</span>
            <button className="icon-btn danger" onClick={() => dispatch({ type: 'DELETE_EDUCATION', payload: edu.id })} title="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">Degree</label>
              <input type="text" className="form-input" value={edu.degree || ''} onChange={(e) => updateField(edu.id, 'degree', e.target.value)} placeholder="B.S. Computer Science" />
            </div>
            <div className="form-group full-width">
              <label className="form-label">University / Institution</label>
              <input type="text" className="form-input" value={edu.university || ''} onChange={(e) => updateField(edu.id, 'university', e.target.value)} placeholder="University of California, Berkeley" />
            </div>
            <div className="form-group">
              <label className="form-label">Year</label>
              <input type="text" className="form-input" value={edu.year || ''} onChange={(e) => updateField(edu.id, 'year', e.target.value)} placeholder="2020" />
            </div>
            <div className="form-group">
              <label className="form-label">GPA (Optional)</label>
              <input type="text" className="form-input" value={edu.gpa || ''} onChange={(e) => updateField(edu.id, 'gpa', e.target.value)} placeholder="3.8" />
            </div>
          </div>
        </div>
      ))}

      {education.length === 0 && (
        <div className="empty-state">
          <p>No education added yet.</p>
          <button className="add-section-btn" onClick={addEducation}>Add Education</button>
        </div>
      )}
    </div>
  );
}
