import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

export default function SkillsForm() {
  const { state, dispatch } = useResume();
  const skills = state.resume.skills || { technical: [], tools: [], soft: [] };
  const [inputs, setInputs] = useState({ technical: '', tools: '', soft: '' });

  const addSkill = (category) => {
    const value = inputs[category].trim();
    if (!value) return;
    if (skills[category]?.includes(value)) return;
    dispatch({ type: 'UPDATE_SKILLS', payload: { [category]: [...(skills[category] || []), value] } });
    setInputs(prev => ({ ...prev, [category]: '' }));
  };

  const removeSkill = (category, index) => {
    const updated = [...(skills[category] || [])];
    updated.splice(index, 1);
    dispatch({ type: 'UPDATE_SKILLS', payload: { [category]: updated } });
  };

  const handleKeyDown = (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category);
    }
  };

  const categories = [
    { key: 'technical', label: 'Technical Skills', placeholder: 'e.g., React, Python, AWS' },
    { key: 'tools', label: 'Tools & Technologies', placeholder: 'e.g., Git, Docker, Jira' },
    { key: 'soft', label: 'Soft Skills', placeholder: 'e.g., Leadership, Communication' },
  ];

  return (
    <div className="form-section" id="skills-form">
      <h3 className="form-section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        Skills
      </h3>

      {categories.map(cat => (
        <div key={cat.key} className="skills-category">
          <label className="form-label">{cat.label}</label>
          <div className="skill-input-row">
            <input
              type="text"
              className="form-input"
              value={inputs[cat.key]}
              onChange={(e) => setInputs(prev => ({ ...prev, [cat.key]: e.target.value }))}
              onKeyDown={(e) => handleKeyDown(e, cat.key)}
              placeholder={cat.placeholder}
              id={`skill-input-${cat.key}`}
            />
            <button className="add-btn" onClick={() => addSkill(cat.key)} type="button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
          <div className="skills-tags">
            {(skills[cat.key] || []).map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
                <button
                  className="skill-tag-remove"
                  onClick={() => removeSkill(cat.key, index)}
                  aria-label={`Remove ${skill}`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
