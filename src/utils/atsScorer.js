import { allActionVerbs } from '../data/actionVerbs';
import { allKeywords } from '../data/keywords';

export function calculateATSScore(resume, jobDescription = '') {
  const scores = {
    sectionCompleteness: calculateSectionCompleteness(resume),
    skillsCount: calculateSkillsScore(resume),
    experienceFormatting: calculateExperienceScore(resume),
    actionVerbs: calculateActionVerbScore(resume),
    resumeLength: calculateLengthScore(resume),
    keywordsMatch: jobDescription ? calculateKeywordMatch(resume, jobDescription) : null
  };

  const weights = {
    sectionCompleteness: 25,
    skillsCount: 20,
    experienceFormatting: 25,
    actionVerbs: 15,
    resumeLength: 15,
    keywordsMatch: 0
  };

  if (jobDescription) {
    weights.keywordsMatch = 20;
    weights.sectionCompleteness = 20;
    weights.skillsCount = 15;
    weights.experienceFormatting = 20;
    weights.actionVerbs = 12;
    weights.resumeLength = 13;
  }

  let totalScore = 0;
  for (const [key, weight] of Object.entries(weights)) {
    if (scores[key] !== null) {
      totalScore += (scores[key] / 100) * weight;
    }
  }

  return {
    totalScore: Math.round(totalScore),
    breakdown: scores,
    suggestions: generateSuggestions(resume, scores, jobDescription)
  };
}

function calculateSectionCompleteness(resume) {
  let score = 0;
  const sections = [
    { check: resume.personalInfo?.fullName, weight: 10 },
    { check: resume.personalInfo?.email, weight: 10 },
    { check: resume.personalInfo?.phone, weight: 5 },
    { check: resume.personalInfo?.jobTitle, weight: 10 },
    { check: resume.personalInfo?.location, weight: 5 },
    { check: resume.summary?.length > 50, weight: 15 },
    { check: resume.skills?.technical?.length > 0, weight: 15 },
    { check: resume.experience?.length > 0, weight: 15 },
    { check: resume.education?.length > 0, weight: 10 },
    { check: resume.personalInfo?.linkedin, weight: 5 },
  ];

  sections.forEach(s => {
    if (s.check) score += s.weight;
  });

  return score;
}

function calculateSkillsScore(resume) {
  const totalSkills = [
    ...(resume.skills?.technical || []),
    ...(resume.skills?.tools || []),
    ...(resume.skills?.soft || [])
  ].length;

  if (totalSkills >= 12) return 100;
  if (totalSkills >= 8) return 85;
  if (totalSkills >= 5) return 65;
  if (totalSkills >= 3) return 40;
  if (totalSkills >= 1) return 20;
  return 0;
}

function calculateExperienceScore(resume) {
  if (!resume.experience?.length) return 0;

  let score = 0;
  const totalEntries = resume.experience.length;

  resume.experience.forEach(exp => {
    let entryScore = 0;
    if (exp.jobTitle) entryScore += 15;
    if (exp.company) entryScore += 15;
    if (exp.startDate) entryScore += 10;
    if (exp.endDate) entryScore += 10;

    const bullets = exp.bullets?.filter(b => b.trim()) || [];
    if (bullets.length >= 3) entryScore += 30;
    else if (bullets.length >= 2) entryScore += 20;
    else if (bullets.length >= 1) entryScore += 10;

    const hasNumbers = bullets.some(b => /\d+%?/.test(b));
    if (hasNumbers) entryScore += 20;

    score += entryScore;
  });

  return Math.min(100, Math.round(score / totalEntries));
}

function calculateActionVerbScore(resume) {
  if (!resume.experience?.length) return 0;

  const allBullets = resume.experience
    .flatMap(exp => exp.bullets || [])
    .filter(b => b.trim());

  if (allBullets.length === 0) return 0;

  const lowerVerbs = allActionVerbs.map(v => v.toLowerCase());
  let verbCount = 0;

  allBullets.forEach(bullet => {
    const firstWord = bullet.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
    if (lowerVerbs.includes(firstWord)) verbCount++;
  });

  const ratio = verbCount / allBullets.length;
  return Math.round(ratio * 100);
}

function calculateLengthScore(resume) {
  let contentLength = 0;
  contentLength += (resume.summary || '').length;
  contentLength += JSON.stringify(resume.skills || {}).length;
  contentLength += JSON.stringify(resume.experience || []).length;
  contentLength += JSON.stringify(resume.education || []).length;
  contentLength += JSON.stringify(resume.certifications || []).length;
  contentLength += JSON.stringify(resume.projects || []).length;

  if (contentLength >= 800 && contentLength <= 3500) return 100;
  if (contentLength >= 500 && contentLength <= 4500) return 75;
  if (contentLength >= 200) return 50;
  return 20;
}

function calculateKeywordMatch(resume, jobDescription) {
  const jdLower = jobDescription.toLowerCase();
  const resumeText = JSON.stringify(resume).toLowerCase();

  const jdKeywords = allKeywords.filter(kw => jdLower.includes(kw.toLowerCase()));
  if (jdKeywords.length === 0) return 50;

  const matchedKeywords = jdKeywords.filter(kw => resumeText.includes(kw.toLowerCase()));
  return Math.round((matchedKeywords.length / jdKeywords.length) * 100);
}

function generateSuggestions(resume, scores, jobDescription) {
  const tips = { critical: [], improvements: [], proTips: [] };

  // === CRITICAL: Missing essential sections ===
  if (!resume.personalInfo?.fullName) tips.critical.push({ text: 'Add your full name — ATS will reject resumes without a name', icon: '🚨' });
  if (!resume.personalInfo?.email) tips.critical.push({ text: 'Add your email — it\'s required for recruiter contact', icon: '🚨' });
  if (!resume.personalInfo?.phone) tips.critical.push({ text: 'Add your phone number — most ATS systems require it', icon: '🚨' });
  if (!resume.summary || resume.summary.length < 50) tips.critical.push({ text: 'Write a professional summary (3-5 lines) — 40% of recruiters reject resumes without one', icon: '🚨' });
  if (!resume.experience?.length) tips.critical.push({ text: 'Add at least one work experience entry', icon: '🚨' });
  if (!resume.education?.length) tips.critical.push({ text: 'Add your education — most ATS filter resumes without it', icon: '🚨' });

  // === IMPROVEMENTS: Score-specific advice ===
  if (scores.sectionCompleteness < 100) {
    if (!resume.personalInfo?.linkedin) tips.improvements.push({ text: 'Add your LinkedIn URL — 87% of recruiters check LinkedIn profiles', icon: '🔗' });
    if (!resume.personalInfo?.location) tips.improvements.push({ text: 'Add your location — ATS uses it for location-based filtering', icon: '📍' });
    if (!resume.personalInfo?.jobTitle) tips.improvements.push({ text: 'Add a target job title — it helps ATS match you to roles', icon: '🎯' });
  }

  if (scores.skillsCount < 100) {
    const totalSkills = [
      ...(resume.skills?.technical || []),
      ...(resume.skills?.tools || []),
      ...(resume.skills?.soft || [])
    ].length;
    if (totalSkills < 5) {
      tips.improvements.push({ text: `Only ${totalSkills} skill${totalSkills === 1 ? '' : 's'} listed — add at least 10-15 skills to pass ATS filters`, icon: '⚡' });
    } else if (totalSkills < 10) {
      tips.improvements.push({ text: `${totalSkills} skills listed — aim for 12-15 across Technical, Tools, and Soft Skills categories`, icon: '⚡' });
    }
    if ((resume.skills?.technical || []).length < 4) tips.improvements.push({ text: 'Add more technical skills — they carry the most weight in ATS scoring', icon: '💻' });
    if ((resume.skills?.soft || []).length < 2) tips.improvements.push({ text: 'Add 3-5 soft skills (Leadership, Communication, Problem Solving) — ATS looks for these', icon: '🤝' });
  }

  if (scores.experienceFormatting < 100) {
    const allBullets = (resume.experience || []).flatMap(e => e.bullets || []).filter(b => b.trim());
    const hasMetrics = allBullets.some(b => /\d+%?/.test(b));
    const hasDollar = allBullets.some(b => /\$[\d,]+/.test(b));

    if (!hasMetrics) {
      tips.improvements.push({ text: 'Add quantified achievements — "Improved performance by 35%" is 40% more effective than "Improved performance"', icon: '📊' });
    }
    if (!hasDollar && allBullets.length > 0) {
      tips.improvements.push({ text: 'Include dollar amounts where possible — "$2M in revenue" or "managed $500K budget" grabs attention', icon: '💰' });
    }

    const shortBullets = allBullets.filter(b => b.length < 30);
    if (shortBullets.length > 0) {
      tips.improvements.push({ text: `${shortBullets.length} bullet${shortBullets.length > 1 ? 's are' : ' is'} too short — aim for 1-2 lines each with specific details`, icon: '📝' });
    }

    (resume.experience || []).forEach(exp => {
      const bullets = (exp.bullets || []).filter(b => b.trim());
      if (bullets.length < 3 && exp.jobTitle) {
        tips.improvements.push({ text: `"${exp.jobTitle}" has only ${bullets.length} bullet${bullets.length === 1 ? '' : 's'} — add 3-5 achievement bullets per role`, icon: '📋' });
      }
    });
  }

  if (scores.actionVerbs < 80) {
    const allBullets = (resume.experience || []).flatMap(e => e.bullets || []).filter(b => b.trim());
    const lowerVerbs = allActionVerbs.map(v => v.toLowerCase());
    const weakStarters = allBullets.filter(b => {
      const first = b.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
      return !lowerVerbs.includes(first);
    });
    if (weakStarters.length > 0) {
      tips.improvements.push({
        text: `${weakStarters.length} bullet${weakStarters.length > 1 ? 's don\'t' : ' doesn\'t'} start with an action verb — use: Engineered, Architected, Spearheaded, Optimized, Implemented, Delivered`,
        icon: '🔤'
      });
    }
  }

  if (scores.resumeLength < 80) {
    const contentLength = (resume.summary || '').length + JSON.stringify(resume.experience || []).length;
    if (contentLength < 500) {
      tips.improvements.push({ text: 'Resume is too sparse — add more detail to your summary and experience sections', icon: '📏' });
    } else {
      tips.improvements.push({ text: 'Aim for 1-2 pages of content — too short or too long reduces ATS scoring', icon: '📏' });
    }
  }

  // === JOB DESCRIPTION KEYWORDS ===
  if (jobDescription) {
    const jdLower = jobDescription.toLowerCase();
    const resumeText = JSON.stringify(resume).toLowerCase();
    const missingKeywords = allKeywords
      .filter(kw => jdLower.includes(kw.toLowerCase()) && !resumeText.includes(kw.toLowerCase()));
    if (missingKeywords.length > 0) {
      tips.critical.push({
        text: `Missing ${missingKeywords.length} keyword${missingKeywords.length > 1 ? 's' : ''} from job description: ${missingKeywords.slice(0, 8).join(', ')}`,
        icon: '🔑'
      });
    }
    const matchedCount = allKeywords.filter(kw => jdLower.includes(kw.toLowerCase()) && resumeText.includes(kw.toLowerCase())).length;
    const totalJDKeywords = allKeywords.filter(kw => jdLower.includes(kw.toLowerCase())).length;
    if (totalJDKeywords > 0 && matchedCount < totalJDKeywords) {
      tips.improvements.push({
        text: `You match ${matchedCount}/${totalJDKeywords} keywords from the job description — incorporate missing ones naturally into your skills and experience`,
        icon: '🎯'
      });
    }
  }

  // === PRO TIPS: Always-on best practices ===
  if (!resume.certifications?.length) {
    tips.proTips.push({ text: 'Add certifications — certified candidates get 15% more interview callbacks', icon: '🏆' });
  }
  if (!resume.projects?.length) {
    tips.proTips.push({ text: 'Add projects to showcase hands-on work — especially valuable for mid-level roles', icon: '🚀' });
  }
  if (!resume.personalInfo?.portfolio) {
    tips.proTips.push({ text: 'Add a portfolio/website link — stand out by showing your work', icon: '🌐' });
  }
  if (resume.summary && resume.summary.length > 500) {
    tips.proTips.push({ text: 'Keep your summary concise (200-400 chars) — recruiters spend 7 seconds scanning', icon: '⏱️' });
  }
  if ((resume.experience || []).length === 1) {
    tips.proTips.push({ text: 'Showing 2+ positions demonstrates career progression — add internships or freelance work', icon: '📈' });
  }
  if (!(resume.languages || []).length) {
    tips.proTips.push({ text: 'Listing languages can be a differentiator — 56% of employers value multilingual candidates', icon: '🌍' });
  }

  // Keep only the top tips per category
  tips.critical = tips.critical.slice(0, 5);
  tips.improvements = tips.improvements.slice(0, 6);
  tips.proTips = tips.proTips.slice(0, 4);

  return tips;
}

// Suggest keywords based on job title
export function suggestKeywordsForRole(jobTitle) {
  if (!jobTitle) return {};

  const lower = jobTitle.toLowerCase();
  const suggestions = {};

  const roleKeywordMap = {
    'software engineer': {
      'Must-Have Skills': ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'REST API', 'AWS'],
      'Recommended': ['TypeScript', 'Docker', 'Kubernetes', 'CI/CD', 'PostgreSQL', 'Agile', 'Microservices'],
      'Bonus Keywords': ['System Design', 'TDD', 'Code Review', 'Scalability', 'Performance Optimization']
    },
    'frontend': {
      'Must-Have Skills': ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Git', 'REST API'],
      'Recommended': ['Next.js', 'Redux', 'Tailwind CSS', 'Webpack', 'Jest', 'Cypress', 'Figma'],
      'Bonus Keywords': ['Responsive Design', 'Accessibility', 'Web Performance', 'Component Library', 'Storybook']
    },
    'backend': {
      'Must-Have Skills': ['Node.js', 'Python', 'SQL', 'REST API', 'PostgreSQL', 'Git', 'Docker'],
      'Recommended': ['AWS', 'Microservices', 'Redis', 'GraphQL', 'CI/CD', 'Kubernetes', 'MongoDB'],
      'Bonus Keywords': ['System Design', 'API Gateway', 'Event-Driven', 'Message Queue', 'Caching Strategy']
    },
    'full stack': {
      'Must-Have Skills': ['React', 'Node.js', 'JavaScript', 'TypeScript', 'SQL', 'Git', 'REST API'],
      'Recommended': ['Next.js', 'PostgreSQL', 'Docker', 'AWS', 'MongoDB', 'Redis', 'CI/CD'],
      'Bonus Keywords': ['Full Stack Architecture', 'DevOps', 'Microservices', 'Agile', 'Responsive Design']
    },
    'devops': {
      'Must-Have Skills': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Git', 'Linux'],
      'Recommended': ['Jenkins', 'Ansible', 'Prometheus', 'Grafana', 'CloudFormation', 'GitHub Actions', 'Helm'],
      'Bonus Keywords': ['Infrastructure as Code', 'SRE', 'Monitoring', 'Auto-Scaling', 'Cost Optimization']
    },
    'data scientist': {
      'Must-Have Skills': ['Python', 'Machine Learning', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow'],
      'Recommended': ['Deep Learning', 'PyTorch', 'NLP', 'Computer Vision', 'Tableau', 'Apache Spark', 'R'],
      'Bonus Keywords': ['Statistical Modeling', 'A/B Testing', 'Feature Engineering', 'Model Deployment', 'MLOps']
    },
    'data engineer': {
      'Must-Have Skills': ['Python', 'SQL', 'AWS', 'Apache Spark', 'ETL', 'Data Pipeline', 'PostgreSQL'],
      'Recommended': ['Airflow', 'Kafka', 'Snowflake', 'dbt', 'Docker', 'Kubernetes', 'Terraform'],
      'Bonus Keywords': ['Data Warehousing', 'Data Governance', 'Stream Processing', 'Data Quality', 'Lakehouse']
    },
    'product manager': {
      'Must-Have Skills': ['Agile', 'Scrum', 'Jira', 'SQL', 'Figma', 'Communication', 'Leadership'],
      'Recommended': ['Data Analysis', 'A/B Testing', 'Stakeholder Management', 'Product Strategy', 'OKRs'],
      'Bonus Keywords': ['Revenue Growth', 'User Research', 'Go-to-Market', 'Pricing Strategy', 'KPIs']
    },
    'project manager': {
      'Must-Have Skills': ['Agile', 'Scrum', 'Jira', 'Project Management', 'Leadership', 'Communication', 'Confluence'],
      'Recommended': ['Risk Management', 'Budget Management', 'Stakeholder Management', 'Kanban', 'MS Project'],
      'Bonus Keywords': ['PMP', 'Critical Path', 'Resource Planning', 'Change Management', 'PRINCE2']
    },
    'design': {
      'Must-Have Skills': ['Figma', 'UI/UX', 'User Research', 'Prototyping', 'Design Systems', 'Communication'],
      'Recommended': ['Adobe XD', 'Sketch', 'Usability Testing', 'Information Architecture', 'Accessibility'],
      'Bonus Keywords': ['Design Thinking', 'Interaction Design', 'Visual Design', 'Motion Design', 'Brand Identity']
    },
    'mobile': {
      'Must-Have Skills': ['React Native', 'iOS', 'Android', 'JavaScript', 'TypeScript', 'Git', 'REST API'],
      'Recommended': ['Flutter', 'Swift', 'Kotlin', 'Firebase', 'Redux', 'CI/CD', 'App Store'],
      'Bonus Keywords': ['Offline-First', 'Push Notifications', 'Deep Linking', 'App Performance', 'Native Modules']
    },
    'cloud architect': {
      'Must-Have Skills': ['AWS', 'Azure', 'GCP', 'Terraform', 'Docker', 'Kubernetes', 'Microservices'],
      'Recommended': ['Serverless', 'CloudFormation', 'Networking', 'Security', 'Cost Optimization', 'Multi-Cloud'],
      'Bonus Keywords': ['Well-Architected Framework', 'Disaster Recovery', 'High Availability', 'Zero Trust', 'FinOps']
    },
    'marketing': {
      'Must-Have Skills': ['SEO', 'Google Analytics', 'Content Strategy', 'Social Media', 'Communication', 'Leadership'],
      'Recommended': ['HubSpot', 'Paid Ads', 'Email Marketing', 'A/B Testing', 'CRM', 'Copywriting'],
      'Bonus Keywords': ['Growth Hacking', 'Conversion Optimization', 'Brand Strategy', 'Marketing Automation', 'ROI']
    }
  };

  // Find best matching role
  for (const [role, keywords] of Object.entries(roleKeywordMap)) {
    if (lower.includes(role) || (role.includes(lower) && lower.length > 3)) {
      // Check which ones are already in the resume
      return keywords;
    }
  }

  // Generic fallback
  if (lower.includes('engineer') || lower.includes('developer') || lower.includes('programmer')) {
    return roleKeywordMap['software engineer'];
  }

  return roleKeywordMap['software engineer']; // safe default
}

export function extractKeywordsFromJD(jobDescription) {
  const jdLower = jobDescription.toLowerCase();
  const found = [];

  allKeywords.forEach(keyword => {
    if (jdLower.includes(keyword.toLowerCase())) {
      found.push(keyword);
    }
  });

  // Also extract common phrases
  const patterns = [
    /(\d+)\+?\s*years?\s*(of\s+)?experience/gi,
    /bachelor'?s?|master'?s?|phd|doctorate/gi,
    /remote|hybrid|on-?site/gi,
    /full[- ]?time|part[- ]?time|contract/gi
  ];

  const additionalInfo = [];
  patterns.forEach(pattern => {
    const matches = jobDescription.match(pattern);
    if (matches) additionalInfo.push(...matches);
  });

  return { keywords: [...new Set(found)], additionalInfo: [...new Set(additionalInfo)] };
}
