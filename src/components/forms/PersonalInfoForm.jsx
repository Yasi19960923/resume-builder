import { useResume } from '../../context/ResumeContext';

export default function PersonalInfoForm() {
  const { state, dispatch } = useResume();
  const info = state.resume.personalInfo;

  const handleChange = (field, value) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: { [field]: value } });
  };

  const fields = [
    { key: 'fullName', label: 'Full Name', placeholder: 'John Smith', type: 'text' },
    { key: 'jobTitle', label: 'Job Title', placeholder: 'Senior Software Engineer', type: 'text' },
    { key: 'email', label: 'Email', placeholder: 'john@email.com', type: 'email' },
    { key: 'phone', label: 'Phone', placeholder: '+1 (555) 123-4567', type: 'tel' },
    { key: 'location', label: 'Location', placeholder: 'San Francisco, CA', type: 'text' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/johnsmith', type: 'text' },
    { key: 'portfolio', label: 'Portfolio', placeholder: 'johnsmith.dev', type: 'text' },
  ];

  return (
    <div className="form-section" id="personal-info-form">
      <h3 className="form-section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Personal Information
      </h3>
      <div className="form-grid">
        {fields.map(field => (
          <div key={field.key} className={`form-group ${field.key === 'fullName' || field.key === 'jobTitle' ? 'full-width' : ''}`}>
            <label className="form-label" htmlFor={`personal-${field.key}`}>{field.label}</label>
            <input
              type={field.type}
              id={`personal-${field.key}`}
              className="form-input"
              value={info[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
