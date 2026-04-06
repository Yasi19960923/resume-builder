import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

export async function exportToDOCX(resume) {
  const children = [];

  // Name
  if (resume.personalInfo?.fullName) {
    children.push(new Paragraph({
      children: [new TextRun({ text: resume.personalInfo.fullName, bold: true, size: 32, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 }
    }));
  }

  // Job Title
  if (resume.personalInfo?.jobTitle) {
    children.push(new Paragraph({
      children: [new TextRun({ text: resume.personalInfo.jobTitle, size: 24, font: 'Calibri', color: '555555' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 }
    }));
  }

  // Contact Info
  const contactParts = [
    resume.personalInfo?.email,
    resume.personalInfo?.phone,
    resume.personalInfo?.location,
    resume.personalInfo?.linkedin,
    resume.personalInfo?.portfolio
  ].filter(Boolean);

  if (contactParts.length > 0) {
    children.push(new Paragraph({
      children: [new TextRun({ text: contactParts.join('  |  '), size: 20, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }));
  }

  // Divider helper
  const addDivider = () => {
    children.push(new Paragraph({
      border: { bottom: { color: '999999', space: 1, style: BorderStyle.SINGLE, size: 6 } },
      spacing: { after: 100 }
    }));
  };

  // Summary
  if (resume.summary) {
    addDivider();
    children.push(new Paragraph({
      children: [new TextRun({ text: 'SUMMARY', bold: true, size: 24, font: 'Calibri' })],
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 100 }
    }));
    children.push(new Paragraph({
      children: [new TextRun({ text: resume.summary, size: 22, font: 'Calibri' })],
      spacing: { after: 200 }
    }));
  }

  // Skills
  const allSkills = [
    ...(resume.skills?.technical || []),
    ...(resume.skills?.tools || []),
    ...(resume.skills?.soft || [])
  ];
  if (allSkills.length > 0) {
    addDivider();
    children.push(new Paragraph({
      children: [new TextRun({ text: 'SKILLS', bold: true, size: 24, font: 'Calibri' })],
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 100 }
    }));

    if (resume.skills?.technical?.length > 0) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: 'Technical: ', bold: true, size: 22, font: 'Calibri' }),
          new TextRun({ text: resume.skills.technical.join(', '), size: 22, font: 'Calibri' })
        ],
        spacing: { after: 50 }
      }));
    }
    if (resume.skills?.tools?.length > 0) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: 'Tools: ', bold: true, size: 22, font: 'Calibri' }),
          new TextRun({ text: resume.skills.tools.join(', '), size: 22, font: 'Calibri' })
        ],
        spacing: { after: 50 }
      }));
    }
    if (resume.skills?.soft?.length > 0) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: 'Soft Skills: ', bold: true, size: 22, font: 'Calibri' }),
          new TextRun({ text: resume.skills.soft.join(', '), size: 22, font: 'Calibri' })
        ],
        spacing: { after: 50 }
      }));
    }
    children.push(new Paragraph({ spacing: { after: 100 } }));
  }

  // Experience
  if (resume.experience?.length > 0) {
    addDivider();
    children.push(new Paragraph({
      children: [new TextRun({ text: 'EXPERIENCE', bold: true, size: 24, font: 'Calibri' })],
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 100 }
    }));

    resume.experience.forEach(exp => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: exp.jobTitle || '', bold: true, size: 22, font: 'Calibri' }),
          new TextRun({ text: `  |  ${exp.company || ''}`, size: 22, font: 'Calibri' }),
          exp.location ? new TextRun({ text: `  |  ${exp.location}`, size: 22, font: 'Calibri' }) : null,
        ].filter(Boolean),
        spacing: { after: 50 }
      }));

      children.push(new Paragraph({
        children: [new TextRun({ text: `${exp.startDate || ''} – ${exp.endDate || ''}`, size: 20, font: 'Calibri', italics: true, color: '666666' })],
        spacing: { after: 50 }
      }));

      (exp.bullets || []).forEach(bullet => {
        if (bullet.trim()) {
          children.push(new Paragraph({
            children: [new TextRun({ text: bullet, size: 22, font: 'Calibri' })],
            bullet: { level: 0 },
            spacing: { after: 30 }
          }));
        }
      });

      children.push(new Paragraph({ spacing: { after: 100 } }));
    });
  }

  // Education
  if (resume.education?.length > 0) {
    addDivider();
    children.push(new Paragraph({
      children: [new TextRun({ text: 'EDUCATION', bold: true, size: 24, font: 'Calibri' })],
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 100 }
    }));

    resume.education.forEach(edu => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: edu.degree || '', bold: true, size: 22, font: 'Calibri' }),
        ],
        spacing: { after: 30 }
      }));
      children.push(new Paragraph({
        children: [
          new TextRun({ text: `${edu.university || ''}${edu.year ? ' | ' + edu.year : ''}${edu.gpa ? ' | GPA: ' + edu.gpa : ''}`, size: 22, font: 'Calibri' }),
        ],
        spacing: { after: 100 }
      }));
    });
  }

  // Certifications
  if (resume.certifications?.length > 0) {
    addDivider();
    children.push(new Paragraph({
      children: [new TextRun({ text: 'CERTIFICATIONS', bold: true, size: 24, font: 'Calibri' })],
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 100 }
    }));

    resume.certifications.forEach(cert => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: cert.name || '', bold: true, size: 22, font: 'Calibri' }),
          new TextRun({ text: ` — ${cert.issuer || ''}${cert.year ? ', ' + cert.year : ''}`, size: 22, font: 'Calibri' }),
        ],
        bullet: { level: 0 },
        spacing: { after: 50 }
      }));
    });
  }

  // Projects
  if (resume.projects?.length > 0) {
    addDivider();
    children.push(new Paragraph({
      children: [new TextRun({ text: 'PROJECTS', bold: true, size: 24, font: 'Calibri' })],
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 100 }
    }));

    resume.projects.forEach(proj => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: proj.name || '', bold: true, size: 22, font: 'Calibri' }),
          proj.technologies ? new TextRun({ text: ` (${proj.technologies})`, size: 20, font: 'Calibri', italics: true }) : null,
        ].filter(Boolean),
        spacing: { after: 30 }
      }));
      if (proj.description) {
        children.push(new Paragraph({
          children: [new TextRun({ text: proj.description, size: 22, font: 'Calibri' })],
          spacing: { after: 50 }
        }));
      }
    });
  }

  // Languages
  if (resume.languages?.length > 0) {
    addDivider();
    children.push(new Paragraph({
      children: [new TextRun({ text: 'LANGUAGES', bold: true, size: 24, font: 'Calibri' })],
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 100 }
    }));

    children.push(new Paragraph({
      children: [
        new TextRun({
          text: resume.languages.map(l => `${l.language} (${l.proficiency})`).join('  |  '),
          size: 22,
          font: 'Calibri'
        })
      ],
      spacing: { after: 100 }
    }));
  }

  const doc = new Document({
    sections: [{ properties: {}, children }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'resume.docx');
}
