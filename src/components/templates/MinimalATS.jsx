export default function MinimalATS({ resume }) {
  const p = resume.personalInfo || {};
  const contactParts = [p.email, p.phone, p.location, p.linkedin, p.portfolio].filter(Boolean);

  return (
    <div className="resume-template minimal-ats">
      {/* Header */}
      <div className="rt-header minimal-header">
        {p.fullName && <h1 className="rt-name minimal-name">{p.fullName}</h1>}
        {p.jobTitle && <p className="rt-title minimal-title">{p.jobTitle}</p>}
        {contactParts.length > 0 && (
          <p className="rt-contact minimal-contact">{contactParts.join('  ·  ')}</p>
        )}
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="rt-section minimal-section">
          <h2 className="rt-section-heading minimal-heading">Summary</h2>
          <p className="rt-text">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience?.length > 0 && (
        <div className="rt-section minimal-section">
          <h2 className="rt-section-heading minimal-heading">Experience</h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="rt-entry">
              <p className="minimal-entry-line">
                <strong>{exp.jobTitle}</strong> — {exp.company}{exp.location ? `, ${exp.location}` : ''} 
                <span className="rt-entry-date"> ({exp.startDate} – {exp.endDate})</span>
              </p>
              {exp.bullets?.filter(b => b.trim()).length > 0 && (
                <ul className="rt-bullets minimal-bullets">
                  {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {hasSkills(resume.skills) && (
        <div className="rt-section minimal-section">
          <h2 className="rt-section-heading minimal-heading">Skills</h2>
          <p className="rt-text">
            {[
              ...(resume.skills?.technical || []),
              ...(resume.skills?.tools || []),
              ...(resume.skills?.soft || [])
            ].join(', ')}
          </p>
        </div>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <div className="rt-section minimal-section">
          <h2 className="rt-section-heading minimal-heading">Education</h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="rt-entry">
              <p className="minimal-entry-line">
                <strong>{edu.degree}</strong> — {edu.university}{edu.year ? `, ${edu.year}` : ''}{edu.gpa ? ` (GPA: ${edu.gpa})` : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications?.length > 0 && (
        <div className="rt-section minimal-section">
          <h2 className="rt-section-heading minimal-heading">Certifications</h2>
          {resume.certifications.map((cert) => (
            <p key={cert.id} className="minimal-entry-line">
              {cert.name} — {cert.issuer}{cert.year ? `, ${cert.year}` : ''}
            </p>
          ))}
        </div>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <div className="rt-section minimal-section">
          <h2 className="rt-section-heading minimal-heading">Projects</h2>
          {resume.projects.map((proj) => (
            <div key={proj.id} className="rt-entry">
              <p className="minimal-entry-line">
                <strong>{proj.name}</strong>{proj.technologies ? ` (${proj.technologies})` : ''}
              </p>
              {proj.description && <p className="rt-text">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {resume.languages?.length > 0 && (
        <div className="rt-section minimal-section">
          <h2 className="rt-section-heading minimal-heading">Languages</h2>
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
