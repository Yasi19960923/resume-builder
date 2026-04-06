import { useResume } from '../../context/ResumeContext';

export default function CertificationsForm() {
  const { state, dispatch } = useResume();
  const certs = state.resume.certifications || [];

  const addCert = () => {
    dispatch({
      type: 'ADD_CERTIFICATION',
      payload: { id: Date.now().toString(), name: '', issuer: '', year: '' }
    });
  };

  const updateField = (id, field, value) => {
    dispatch({ type: 'UPDATE_CERTIFICATION', payload: { id, [field]: value } });
  };

  return (
    <div className="form-section" id="certifications-form">
      <div className="form-section-header">
        <h3 className="form-section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
          Certifications
        </h3>
        <button className="add-section-btn" onClick={addCert}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Certification
        </button>
      </div>

      {certs.map((cert, index) => (
        <div key={cert.id} className="experience-card compact">
          <div className="experience-card-header">
            <span className="experience-number">#{index + 1}</span>
            <button className="icon-btn danger" onClick={() => dispatch({ type: 'DELETE_CERTIFICATION', payload: cert.id })}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">Certification Name</label>
              <input type="text" className="form-input" value={cert.name || ''} onChange={(e) => updateField(cert.id, 'name', e.target.value)} placeholder="AWS Solutions Architect" />
            </div>
            <div className="form-group">
              <label className="form-label">Issuer</label>
              <input type="text" className="form-input" value={cert.issuer || ''} onChange={(e) => updateField(cert.id, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
            </div>
            <div className="form-group">
              <label className="form-label">Year</label>
              <input type="text" className="form-input" value={cert.year || ''} onChange={(e) => updateField(cert.id, 'year', e.target.value)} placeholder="2023" />
            </div>
          </div>
        </div>
      ))}

      {certs.length === 0 && (
        <div className="empty-state">
          <p>No certifications added yet.</p>
          <button className="add-section-btn" onClick={addCert}>Add a Certification</button>
        </div>
      )}
    </div>
  );
}
