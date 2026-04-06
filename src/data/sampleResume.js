export const sampleResume = {
  personalInfo: {
    fullName: 'John Smith',
    jobTitle: 'Senior Software Engineer',
    phone: '+1 (555) 123-4567',
    email: 'john.smith@email.com',
    linkedin: 'linkedin.com/in/johnsmith',
    portfolio: 'johnsmith.dev',
    location: 'San Francisco, CA'
  },
  summary: 'Results-driven Senior Software Engineer with 6+ years of experience building scalable web applications and distributed systems. Proficient in React, Node.js, Python, and cloud infrastructure (AWS/GCP). Led cross-functional teams to deliver high-impact products, improving system performance by 40% and reducing operational costs by 25%. Passionate about clean code, mentoring developers, and driving engineering excellence.',
  skills: {
    technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
    tools: ['Git', 'Jenkins', 'Jira', 'Figma', 'VS Code', 'Postman', 'Kubernetes', 'Terraform'],
    soft: ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Mentoring']
  },
  experience: [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      startDate: '2021',
      endDate: 'Present',
      bullets: [
        'Architected and deployed microservices platform processing 2M+ daily requests with 99.9% uptime',
        'Led team of 8 engineers to deliver real-time analytics dashboard reducing decision time by 60%',
        'Improved CI/CD pipeline efficiency by 45% through automated testing and deployment strategies',
        'Mentored 5 junior developers resulting in 3 promotions within 18 months'
      ]
    },
    {
      id: '2',
      jobTitle: 'Software Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      startDate: '2019',
      endDate: '2021',
      bullets: [
        'Built scalable React applications serving 500K+ monthly active users',
        'Reduced page load time by 35% through code splitting and lazy loading optimizations',
        'Designed RESTful APIs handling 10K+ requests per second with sub-100ms latency',
        'Implemented automated testing framework increasing code coverage from 45% to 92%'
      ]
    },
    {
      id: '3',
      jobTitle: 'Junior Software Engineer',
      company: 'Startup Inc.',
      location: 'San Francisco, CA',
      startDate: '2017',
      endDate: '2019',
      bullets: [
        'Developed full-stack features using React and Node.js for SaaS platform with 50K+ users',
        'Created automated data pipeline reducing manual processing time by 80%',
        'Collaborated with product team to ship 15+ features in agile 2-week sprints'
      ]
    }
  ],
  education: [
    {
      id: '1',
      degree: 'B.S. Computer Science',
      university: 'University of California, Berkeley',
      year: '2017',
      gpa: '3.8'
    }
  ],
  certifications: [
    { id: '1', name: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services', year: '2022' },
    { id: '2', name: 'Google Cloud Professional Data Engineer', issuer: 'Google', year: '2023' }
  ],
  projects: [
    {
      id: '1',
      name: 'Open Source CLI Tool',
      description: 'Built a developer productivity CLI tool with 2K+ GitHub stars',
      technologies: 'Node.js, TypeScript, GitHub Actions',
      link: 'github.com/johnsmith/cli-tool'
    }
  ],
  languages: [
    { id: '1', language: 'English', proficiency: 'Native' },
    { id: '2', language: 'Spanish', proficiency: 'Professional' }
  ]
};

export const emptyResume = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    phone: '',
    email: '',
    linkedin: '',
    portfolio: '',
    location: ''
  },
  summary: '',
  skills: {
    technical: [],
    tools: [],
    soft: []
  },
  experience: [],
  education: [],
  certifications: [],
  projects: [],
  languages: []
};
