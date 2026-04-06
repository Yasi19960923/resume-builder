export default function ProfessionalATS({ resume }) {
  const p = resume.personalInfo || {};
  const contactParts = [p.email, p.phone, p.location, p.linkedin, p.portfolio].filter(Boolean);

  return (
    <div className="resume-template professional-ats">
      {/* Header */}
      <div className="rt-header professional-header">
        {p.fullName && <h1 className="rt-name professional-name">{p.fullName}</h1>}
        <div className="professional-header-line"></div>
        {p.jobTitle && <p className="rt-title professional-title">{p.jobTitle}</p>}
        {contactParts.length > 0 && (
          <p className="rt-contact professional-contact">{contactParts.join('  |  ')}</p>
        )}
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="rt-section">
          <h2 className="rt-section-heading professional-heading">PROFESSIONAL SUMMARY</h2>
          <p className="rt-text">{resume.summary}</p>
        </div>
      )}

      {/* Skills */}
      {hasSkills(resume.skills) && (
        <div className="rt-section">
          <h2 className="rt-section-heading professional-heading">CORE COMPETENCIES</h2>
          {resume.skills?.technical?.length > 0 && (
            <div className="professional-skill-row">
              <span className="professional-skill-cat">Technical Skills:</span>
              <span>{resume.skills.technical.join(' | ')}</span>
            </div>
          )}
          {resume.skills?.tools?.length > 0 && (
            <div className="professional-skill-row">
              <span className="professional-skill-cat">Tools & Platforms:</span>
              <span>{resume.skills.tools.join(' | ')}</span>
            </div>
          )}
          {resume.skills?.soft?.length > 0 && (
            <div className="professional-skill-row">
              <span className="professional-skill-cat">Leadership & Soft Skills:</span>
              <span>{resume.skills.soft.join(' | ')}</span>
            </div>
          )}
        </div>
      )}

      {/* Experience */}
      {resume.experience?.length > 0 && (
        <div className="rt-section">
          <h2 className="rt-section-heading professional-heading">PROFESSIONAL EXPERIENCE</h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="rt-entry professional-entry">
              <div className="rt-entry-header">
                <strong className="rt-entry-title professional-entry-title">{exp.jobTitle}</strong>
                <span className="rt-entry-date">{exp.startDate} – {exp.endDate}</span>
              </div>
              <p className="rt-entry-subtitle professional-subtitle">
                {exp.company}{exp.location ? ` — ${exp.location}` : ''}
              </p>
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
          <h2 className="rt-section-heading professional-heading">EDUCATION</h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="rt-entry">
              <div className="rt-entry-header">
                <strong className="rt-entry-title">{edu.degree}</strong>
                <span className="rt-entry-date">{edu.year}</span>
              </div>
              <p className="rt-entry-subtitle">
                {edu.university}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications?.length > 0 && (
        <div className="rt-section">
          <h2 className="rt-section-heading professional-heading">CERTIFICATIONS</h2>
          <ul className="rt-bullets">
            {resume.certifications.map((cert) => (
              <li key={cert.id}>
                <strong>{cert.name}</strong> — {cert.issuer}{cert.year ? `, ${cert.year}` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <div className="rt-section">
          <h2 className="rt-section-heading professional-heading">KEY PROJECTS</h2>
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
          <h2 className="rt-section-heading professional-heading">LANGUAGES</h2>
          <p className="rt-text">
            {resume.languages.map(l => `${l.language} (${l.proficiency})`).join('  |  ')}
          </p>
        </div>
      )}
    </div>
  );
}

function hasSkills(skills) {
  return skills?.technical?.length > 0 || skills?.tools?.length > 0 || skills?.soft?.length > 0;
}
