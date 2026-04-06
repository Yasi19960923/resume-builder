import { bulletTemplates, allActionVerbs } from '../data/actionVerbs';

const summaryTemplates = {
  entry: [
    'Motivated {jobTitle} with {years} year{s} of experience in {field}. Skilled in {skills}. Passionate about delivering high-quality solutions and contributing to team success through strong {softSkill} and attention to detail.',
    'Detail-oriented {jobTitle} with {years} year{s} of hands-on experience. Proficient in {skills} with a proven ability to {achievement}. Eager to leverage technical expertise to drive impactful results.',
  ],
  mid: [
    'Results-driven {jobTitle} with {years}+ years of experience building {deliverable}. Proficient in {skills}. Proven track record of {achievement} and collaborating with cross-functional teams to deliver high-impact solutions on time and within budget.',
    'Experienced {jobTitle} with {years}+ years specializing in {field}. Expert in {skills} with demonstrated ability to {achievement}. Strong communicator who thrives in fast-paced environments and mentors junior team members.',
  ],
  senior: [
    'Senior {jobTitle} with {years}+ years of experience leading engineering teams and architecting {deliverable}. Expert in {skills}. Track record of {achievement}, mentoring developers, and driving technical strategy aligned with business objectives.',
    'Accomplished {jobTitle} with over {years} years of experience delivering {deliverable} at scale. Deep expertise in {skills}. Recognized for {achievement} and fostering a culture of engineering excellence and continuous improvement.',
  ]
};

const fieldMap = {
  'Software Engineer': 'software development and system design',
  'Frontend Developer': 'frontend development and user interface engineering',
  'Backend Developer': 'backend systems and API development',
  'Full Stack Developer': 'full-stack web application development',
  'Data Scientist': 'data science and machine learning',
  'DevOps Engineer': 'cloud infrastructure and DevOps practices',
  'Product Manager': 'product strategy and development lifecycle',
  'Project Manager': 'project management and team coordination',
  'Designer': 'user experience and interface design',
  'Marketing Manager': 'digital marketing and growth strategy',
};

const achievementMap = {
  'Software Engineer': 'improving system performance by 40% and reducing deployment time by 50%',
  'Frontend Developer': 'improving user engagement by 35% and reducing load times by 50%',
  'Backend Developer': 'scaling systems to handle 10x traffic growth and optimizing database performance',
  'Data Scientist': 'building predictive models that increased revenue by 25%',
  'DevOps Engineer': 'achieving 99.9% uptime and reducing infrastructure costs by 30%',
  'Product Manager': 'launching products used by 1M+ users and increasing retention by 20%',
  'Project Manager': 'delivering projects on time and 15% under budget',
  'Designer': 'increasing user satisfaction by 40% through data-driven design',
  'Marketing Manager': 'generating 200% ROI on marketing campaigns',
};

const deliverableMap = {
  'Software Engineer': 'scalable distributed systems and web applications',
  'Frontend Developer': 'responsive web applications and component libraries',
  'Backend Developer': 'high-performance APIs and microservices',
  'Full Stack Developer': 'end-to-end web applications',
  'Data Scientist': 'machine learning models and data pipelines',
  'DevOps Engineer': 'cloud infrastructure and CI/CD pipelines',
  'Product Manager': 'data-driven product roadmaps',
  'Designer': 'intuitive user experiences',
  'Marketing Manager': 'multi-channel marketing strategies',
};

export function generateSummary(jobTitle, years, skills = []) {
  const level = years <= 2 ? 'entry' : years <= 5 ? 'mid' : 'senior';
  const templates = summaryTemplates[level];
  const template = templates[Math.floor(Math.random() * templates.length)];

  const closestTitle = findClosestTitle(jobTitle);
  const field = fieldMap[closestTitle] || 'technology and innovation';
  const achievement = achievementMap[closestTitle] || 'driving efficiency and delivering impactful results';
  const deliverable = deliverableMap[closestTitle] || 'innovative software solutions';
  const skillsList = skills.length > 0
    ? skills.slice(0, 4).join(', ')
    : 'modern technologies and best practices';
  const softSkill = level === 'entry' ? 'collaboration' : 'leadership';

  return template
    .replace('{jobTitle}', jobTitle)
    .replace('{years}', years)
    .replace('{s}', years === 1 ? '' : 's')
    .replace('{field}', field)
    .replace('{skills}', skillsList)
    .replace('{achievement}', achievement)
    .replace('{deliverable}', deliverable)
    .replace('{softSkill}', softSkill);
}

export function generateBullets(jobTitle, count = 4) {
  const closestTitle = findClosestTitle(jobTitle);
  const templates = bulletTemplates[closestTitle] || bulletTemplates['General'];

  const shuffled = [...templates].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  return selected.map(template =>
    template.replace(/\{number\}/g, () => {
      const ranges = [
        [15, 45],
        [20, 60],
        [100, 500],
        [3, 12],
        [1000, 5000],
      ];
      const range = ranges[Math.floor(Math.random() * ranges.length)];
      return Math.floor(Math.random() * (range[1] - range[0]) + range[0]).toString();
    }).replace(/\{technology\}/g, () => {
      const techs = ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TypeScript'];
      return techs[Math.floor(Math.random() * techs.length)];
    }).replace(/\{metric\}/g, () => {
      return (99 + Math.random() * 0.9).toFixed(1);
    })
  );
}

export function generateCoverLetter(resume, companyName = '[Company Name]', position = '') {
  const name = resume.personalInfo?.fullName || '[Your Name]';
  const title = position || resume.personalInfo?.jobTitle || '[Position]';
  const skills = [
    ...(resume.skills?.technical || []).slice(0, 3),
    ...(resume.skills?.tools || []).slice(0, 2)
  ].join(', ') || 'relevant technologies';

  const latestExp = resume.experience?.[0];
  const expSnippet = latestExp
    ? `In my current role as ${latestExp.jobTitle} at ${latestExp.company}, I have ${latestExp.bullets?.[0]?.toLowerCase() || 'delivered impactful results'}.`
    : 'Throughout my career, I have consistently delivered high-quality work and exceeded expectations.';

  return `Dear Hiring Manager,

I am writing to express my strong interest in the ${title} position at ${companyName}. With my background in ${resume.personalInfo?.jobTitle || 'software development'} and expertise in ${skills}, I am confident in my ability to contribute meaningfully to your team.

${expSnippet}

${resume.summary || `I am a dedicated professional passionate about leveraging technology to solve complex problems and drive business value.`}

I am particularly drawn to ${companyName}'s mission and would welcome the opportunity to bring my skills in ${skills} to your organization. I am eager to contribute to your team's success and grow alongside talented colleagues.

Thank you for considering my application. I look forward to the opportunity to discuss how my experience and skills align with your needs.

Sincerely,
${name}
${resume.personalInfo?.email || ''}
${resume.personalInfo?.phone || ''}`;
}

function findClosestTitle(jobTitle) {
  const titles = Object.keys(bulletTemplates);
  const lower = jobTitle.toLowerCase();

  for (const title of titles) {
    if (lower.includes(title.toLowerCase()) || title.toLowerCase().includes(lower)) {
      return title;
    }
  }

  if (lower.includes('fullstack') || lower.includes('full stack') || lower.includes('full-stack')) return 'Software Engineer';
  if (lower.includes('front')) return 'Frontend Developer';
  if (lower.includes('back')) return 'Backend Developer';
  if (lower.includes('data')) return 'Data Scientist';
  if (lower.includes('devops') || lower.includes('cloud') || lower.includes('sre')) return 'Software Engineer';
  if (lower.includes('product')) return 'Product Manager';
  if (lower.includes('project')) return 'Project Manager';
  if (lower.includes('design') || lower.includes('ux') || lower.includes('ui')) return 'Designer';
  if (lower.includes('market')) return 'Marketing Manager';

  return 'General';
}
