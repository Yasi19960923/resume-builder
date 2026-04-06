import { useResume } from '../../context/ResumeContext';

export default function ProjectsForm() {
  const { state, dispatch } = useResume();
  const projects = state.resume.projects || [];

  const addProject = () => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: { id: Date.now().toString(), name: '', description: '', technologies: '', link: '' }
    });
  };

  const updateField = (id, field, value) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: { id, [field]: value } });
  };

  return (
    <div className="form-section" id="projects-form">
      <div className="form-section-header">
        <h3 className="form-section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          Projects
        </h3>
        <button className="add-section-btn" onClick={addProject}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Project
        </button>
      </div>

      {projects.map((proj, index) => (
        <div key={proj.id} className="experience-card compact">
          <div className="experience-card-header">
            <span className="experience-number">#{index + 1}</span>
            <button className="icon-btn danger" onClick={() => dispatch({ type: 'DELETE_PROJECT', payload: proj.id })}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">Project Name</label>
              <input type="text" className="form-input" value={proj.name || ''} onChange={(e) => updateField(proj.id, 'name', e.target.value)} placeholder="Open Source CLI Tool" />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Description</label>
              <input type="text" className="form-input" value={proj.description || ''} onChange={(e) => updateField(proj.id, 'description', e.target.value)} placeholder="Built a productivity tool with 2K+ GitHub stars" />
            </div>
            <div className="form-group">
              <label className="form-label">Technologies</label>
              <input type="text" className="form-input" value={proj.technologies || ''} onChange={(e) => updateField(proj.id, 'technologies', e.target.value)} placeholder="React, Node.js, TypeScript" />
            </div>
            <div className="form-group">
              <label className="form-label">Link (Optional)</label>
              <input type="text" className="form-input" value={proj.link || ''} onChange={(e) => updateField(proj.id, 'link', e.target.value)} placeholder="github.com/user/project" />
            </div>
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <div className="empty-state">
          <p>No projects added yet.</p>
          <button className="add-section-btn" onClick={addProject}>Add a Project</button>
        </div>
      )}
    </div>
  );
}
