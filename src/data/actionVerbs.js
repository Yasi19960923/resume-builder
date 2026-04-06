export const actionVerbs = {
  leadership: [
    'Spearheaded', 'Directed', 'Orchestrated', 'Championed', 'Led', 'Managed',
    'Oversaw', 'Supervised', 'Coordinated', 'Headed', 'Guided', 'Mentored',
    'Delegated', 'Mobilized', 'Pioneered', 'Steered', 'Unified'
  ],
  achievement: [
    'Achieved', 'Attained', 'Exceeded', 'Surpassed', 'Delivered', 'Accomplished',
    'Earned', 'Outperformed', 'Maximized', 'Generated', 'Boosted', 'Elevated',
    'Improved', 'Enhanced', 'Strengthened', 'Optimized', 'Accelerated'
  ],
  technical: [
    'Engineered', 'Developed', 'Architected', 'Implemented', 'Deployed',
    'Automated', 'Programmed', 'Configured', 'Integrated', 'Debugged',
    'Refactored', 'Migrated', 'Scaled', 'Built', 'Designed', 'Coded'
  ],
  communication: [
    'Presented', 'Authored', 'Documented', 'Communicated', 'Collaborated',
    'Negotiated', 'Facilitated', 'Articulated', 'Reported', 'Briefed',
    'Advised', 'Consulted', 'Liaised', 'Translated', 'Conveyed'
  ],
  analysis: [
    'Analyzed', 'Evaluated', 'Assessed', 'Researched', 'Investigated',
    'Identified', 'Diagnosed', 'Examined', 'Audited', 'Reviewed',
    'Measured', 'Quantified', 'Forecasted', 'Mapped', 'Benchmarked'
  ],
  creation: [
    'Created', 'Designed', 'Developed', 'Established', 'Formulated',
    'Initiated', 'Launched', 'Introduced', 'Founded', 'Constructed',
    'Produced', 'Crafted', 'Invented', 'Conceptualized', 'Devised'
  ],
  efficiency: [
    'Streamlined', 'Consolidated', 'Reduced', 'Eliminated', 'Decreased',
    'Simplified', 'Restructured', 'Reorganized', 'Revamped', 'Transformed',
    'Modernized', 'Upgraded', 'Standardized', 'Centralized', 'Rationalized'
  ]
};

export const allActionVerbs = Object.values(actionVerbs).flat();

export const bulletTemplates = {
  'Software Engineer': [
    'Engineered {technology} applications serving {number}+ users with {metric}% uptime',
    'Reduced application load time by {number}% through performance optimization and code refactoring',
    'Built and deployed {number}+ microservices using {technology} and containerization',
    'Implemented CI/CD pipelines reducing deployment time by {number}%',
    'Collaborated with cross-functional teams of {number}+ engineers to deliver features on schedule',
    'Designed RESTful APIs handling {number}+ requests per second',
    'Improved test coverage from {number}% to {number}% through comprehensive unit and integration testing',
    'Mentored {number} junior developers on best practices and code review standards'
  ],
  'Frontend Developer': [
    'Built responsive web applications using React, achieving {number}% improvement in user engagement',
    'Implemented component library with {number}+ reusable components reducing development time by {number}%',
    'Optimized Core Web Vitals scores improving LCP by {number}% and CLS by {number}%',
    'Migrated legacy jQuery codebase to modern React architecture serving {number}+ users',
    'Developed accessible (WCAG 2.1) interfaces increasing user accessibility by {number}%',
    'Integrated REST and GraphQL APIs with efficient state management using Redux/Context',
    'Led frontend architecture decisions for {number}+ page application with {number}+ daily active users'
  ],
  'Backend Developer': [
    'Architected scalable backend services processing {number}+ transactions daily',
    'Designed and optimized database schemas reducing query execution time by {number}%',
    'Implemented authentication and authorization systems securing {number}+ user accounts',
    'Built event-driven microservices architecture handling {number}+ events per minute',
    'Reduced server costs by {number}% through infrastructure optimization and caching strategies',
    'Developed API gateway managing {number}+ endpoints with rate limiting and monitoring'
  ],
  'Data Scientist': [
    'Developed machine learning models achieving {number}% accuracy in predictive analytics',
    'Analyzed datasets of {number}+ records to derive actionable business insights',
    'Built automated data pipelines processing {number}+ GB of data daily',
    'Reduced customer churn by {number}% through predictive modeling and targeted interventions',
    'Created interactive dashboards and visualizations for {number}+ stakeholders'
  ],
  'Product Manager': [
    'Managed product roadmap for {technology} platform serving {number}+ customers',
    'Increased product revenue by {number}% through data-driven feature prioritization',
    'Led cross-functional team of {number}+ members across engineering, design, and marketing',
    'Conducted {number}+ user interviews and A/B tests to validate product hypotheses',
    'Reduced time-to-market by {number}% through agile process improvements'
  ],
  'Project Manager': [
    'Managed {number}+ concurrent projects with budgets totaling ${number}M',
    'Delivered projects {number}% under budget and ahead of schedule',
    'Coordinated cross-functional teams of {number}+ members across {number} departments',
    'Implemented agile methodologies reducing project delivery time by {number}%',
    'Tracked and reported project KPIs to {number}+ senior stakeholders'
  ],
  'Designer': [
    'Designed user interfaces for {technology} products used by {number}+ users',
    'Increased user satisfaction scores by {number}% through UX research and iterative design',
    'Created design systems with {number}+ components ensuring brand consistency',
    'Conducted {number}+ usability tests identifying and resolving {number}+ UX issues',
    'Reduced user task completion time by {number}% through information architecture improvements'
  ],
  'Marketing Manager': [
    'Developed and executed marketing campaigns generating {number}+ qualified leads',
    'Increased organic traffic by {number}% through SEO strategy and content optimization',
    'Managed annual marketing budget of ${number}K with {number}% ROI',
    'Grew social media following by {number}% across {number} platforms',
    'Launched {number}+ successful product campaigns achieving {number}% conversion rate'
  ],
  'General': [
    'Improved team productivity by {number}% through process optimization and automation',
    'Managed cross-functional projects with teams of {number}+ members',
    'Reduced operational costs by {number}% through strategic initiatives',
    'Trained and mentored {number}+ team members on best practices',
    'Delivered quarterly presentations to {number}+ senior stakeholders',
    'Streamlined workflows reducing process completion time by {number}%'
  ]
};
