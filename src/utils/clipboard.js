export function copyResumeToClipboard(resume) {
  const lines = [];

  if (resume.personalInfo?.fullName) lines.push(resume.personalInfo.fullName);
  if (resume.personalInfo?.jobTitle) lines.push(resume.personalInfo.jobTitle);

  const contact = [
    resume.personalInfo?.email,
    resume.personalInfo?.phone,
    resume.personalInfo?.location,
    resume.personalInfo?.linkedin,
    resume.personalInfo?.portfolio
  ].filter(Boolean).join(' | ');
  if (contact) lines.push(contact);

  lines.push('');

  if (resume.summary) {
    lines.push('SUMMARY');
    lines.push(resume.summary);
    lines.push('');
  }

  const allSkills = [
    ...(resume.skills?.technical || []),
    ...(resume.skills?.tools || []),
    ...(resume.skills?.soft || [])
  ];
  if (allSkills.length > 0) {
    lines.push('SKILLS');
    if (resume.skills?.technical?.length) lines.push(`Technical: ${resume.skills.technical.join(', ')}`);
    if (resume.skills?.tools?.length) lines.push(`Tools: ${resume.skills.tools.join(', ')}`);
    if (resume.skills?.soft?.length) lines.push(`Soft Skills: ${resume.skills.soft.join(', ')}`);
    lines.push('');
  }

  if (resume.experience?.length > 0) {
    lines.push('EXPERIENCE');
    resume.experience.forEach(exp => {
      lines.push(`${exp.jobTitle} | ${exp.company}${exp.location ? ' | ' + exp.location : ''}`);
      lines.push(`${exp.startDate} – ${exp.endDate}`);
      (exp.bullets || []).forEach(b => {
        if (b.trim()) lines.push(`• ${b}`);
      });
      lines.push('');
    });
  }

  if (resume.education?.length > 0) {
    lines.push('EDUCATION');
    resume.education.forEach(edu => {
      lines.push(`${edu.degree} | ${edu.university}${edu.year ? ' | ' + edu.year : ''}${edu.gpa ? ' | GPA: ' + edu.gpa : ''}`);
    });
    lines.push('');
  }

  if (resume.certifications?.length > 0) {
    lines.push('CERTIFICATIONS');
    resume.certifications.forEach(c => {
      lines.push(`• ${c.name} — ${c.issuer}${c.year ? ', ' + c.year : ''}`);
    });
    lines.push('');
  }

  if (resume.projects?.length > 0) {
    lines.push('PROJECTS');
    resume.projects.forEach(p => {
      lines.push(`${p.name}${p.technologies ? ' (' + p.technologies + ')' : ''}`);
      if (p.description) lines.push(p.description);
    });
    lines.push('');
  }

  if (resume.languages?.length > 0) {
    lines.push('LANGUAGES');
    lines.push(resume.languages.map(l => `${l.language} (${l.proficiency})`).join(' | '));
  }

  const text = lines.join('\n');
  navigator.clipboard.writeText(text);
  return text;
}
