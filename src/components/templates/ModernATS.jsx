export default function ModernATS({ resume }) {
  const p = resume.personalInfo || {};
  const contactParts = [p.email, p.phone, p.location, p.linkedin, p.portfolio].filter(Boolean);

  return (
    <div className="resume-template modern-ats">
      {/* Header */}
      <div className="rt-header modern-header">
        {p.fullName && <h1 className="rt-name modern-name">{p.fullName}</h1>}
        {p.jobTitle && <p className="rt-title modern-title">{p.jobTitle}</p>}
        {contactParts.length > 0 && (
          <div className="rt-contact-row">
            {contactParts.map((part, i) => (
              <span key={i} className="rt-contact-item">{part}</span>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="rt-section">
          <h2 className="rt-section-heading modern-heading">Summary</h2>
          <p className="rt-text">{resume.summary}</p>
        </div>
      )}

      {/* Skills */}
      {hasSkills(resume.skills) && (
        <div className="rt-section">
          <h2 className="rt-section-heading modern-heading">Skills</h2>
          <div className="rt-skills-modern">
            {resume.skills?.technical?.length > 0 && (
              <div className="rt-skill-group">
                <span className="rt-skill-label">Technical</span>
                <span className="rt-skill-values">{resume.skills.technical.join(' · ')}</span>
              </div>
            )}
            {resume.skills?.tools?.length > 0 && (
              <div className="rt-skill-group">
                <span className="rt-skill-label">Tools</span>
                <span className="rt-skill-values">{resume.skills.tools.join(' · ')}</span>
              </div>
            )}
            {resume.skills?.soft?.length > 0 && (
              <div className="rt-skill-group">
                <span className="rt-skill-label">Soft Skills</span>
                <span className="rt-skill-values">{resume.skills.soft.join(' · ')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {resume.experience?.length > 0 && (
        <div className="rt-section">
          <h2 className="rt-section-heading modern-heading">Experience</h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="rt-entry modern-entry">
              <div className="rt-entry-header">
                <div>
                  <strong className="rt-entry-title">{exp.jobTitle}</strong>
                  <span className="rt-entry-company"> at {exp.company}</span>
                </div>
                <span className="rt-entry-date">{exp.startDate} – {exp.endDate}</span>
              </div>
              {exp.location && <p className="rt-entry-location">{exp.location}</p>}
              {exp.bullets?.filter(b => b.trim()).length > 0 && (
                <ul className="rt-bullets">
                  {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <div className="rt-section">
          <h2 className="rt-section-heading modern-heading">Education</h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="rt-entry">
              <div className="rt-entry-header">
                <strong className="rt-entry-title">{edu.degree}</strong>
                <span className="rt-entry-date">{edu.year}</span>
              </div>
              <p className="rt-entry-subtitle">
                {edu.university}{edu.gpa ? ` — GPA: ${edu.gpa}` : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications?.length > 0 && (
        <div className="rt-section">
          <h2 className="rt-section-heading modern-heading">Certifications</h2>
          {resume.certifications.map((cert) => (
            <div key={cert.id} className="rt-entry-inline">
              <strong>{cert.name}</strong>
              <span> — {cert.issuer}{cert.year ? `, ${cert.year}` : ''}</span>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <div className="rt-section">
          <h2 className="rt-section-heading modern-heading">Projects</h2>
          {resume.projects.map((proj) => (
            <div key={proj.id} className="rt-entry">
              <strong className="rt-entry-title">{proj.name}</strong>
              {proj.technologies && <span className="rt-entry-tech"> ({proj.technologies})</span>}
              {proj.description && <p className="rt-text">{proj.description}</p>}
              {proj.link && <p className="rt-link">{proj.link}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {resume.languages?.length > 0 && (
        <div className="rt-section">
          <h2 className="rt-section-heading modern-heading">Languages</h2>
          <p className="rt-text">
            {resume.languages.map(l => `${l.language} (${l.proficiency})`).join(' · ')}
          </p>
        </div>
      )}
    </div>
  );
}

function hasSkills(skills) {
  return skills?.technical?.length > 0 || skills?.tools?.length > 0 || skills?.soft?.length > 0;
}
