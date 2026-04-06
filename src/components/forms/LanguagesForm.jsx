import { useResume } from '../../context/ResumeContext';

export default function LanguagesForm() {
  const { state, dispatch } = useResume();
  const languages = state.resume.languages || [];

  const addLanguage = () => {
    dispatch({
      type: 'ADD_LANGUAGE',
      payload: { id: Date.now().toString(), language: '', proficiency: 'Professional' }
    });
  };

  const updateField = (id, field, value) => {
    dispatch({ type: 'UPDATE_LANGUAGE', payload: { id, [field]: value } });
  };

  const proficiencyLevels = ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic'];

  return (
    <div className="form-section" id="languages-form">
      <div className="form-section-header">
        <h3 className="form-section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Languages
        </h3>
        <button className="add-section-btn" onClick={addLanguage}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Language
        </button>
      </div>

      {languages.map((lang, index) => (
        <div key={lang.id} className="language-row">
          <input
            type="text"
            className="form-input"
            value={lang.language || ''}
            onChange={(e) => updateField(lang.id, 'language', e.target.value)}
            placeholder="English"
          />
          <select
            className="form-select"
            value={lang.proficiency || 'Professional'}
            onChange={(e) => updateField(lang.id, 'proficiency', e.target.value)}
          >
            {proficiencyLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <button className="icon-btn danger" onClick={() => dispatch({ type: 'DELETE_LANGUAGE', payload: lang.id })}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      ))}

      {languages.length === 0 && (
        <div className="empty-state">
          <p>No languages added yet.</p>
          <button className="add-section-btn" onClick={addLanguage}>Add a Language</button>
        </div>
      )}
    </div>
  );
}
