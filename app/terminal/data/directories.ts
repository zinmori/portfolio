export type DirectoryKey =
  | 'experience'
  | 'education'
  | 'certifications'
  | 'projects'
  | 'skills'
  | 'links'
  | 'languages'
  | 'blog';

export const directoryOrder: DirectoryKey[] = [
  'experience',
  'education',
  'certifications',
  'projects',
  'skills',
  'links',
  'languages',
  'blog',
];

export const directoryIcons: Record<DirectoryKey, string> = {
  experience: '💼',
  education: '🎓',
  certifications: '🏆',
  projects: '🚀',
  skills: '⚡',
  links: '🔗',
  languages: '🌍',
  blog: '📝',
};

export const directories: Record<DirectoryKey, string[]> = {
  blog: ['Loading posts...'],
  experience: [
    '💼 Professional Experience',
    '──────────────────────────────────────────────',
    '• Data Scientist — Ministry of the Digital Economy (Dec 2024 → Present)',
    '  Driving AI & ML initiatives for nationwide digital transformation.',
    '',
    '• Full Stack Developer — Mitsio Motu (Jul 2024 → Nov 2024)',
    '  Built scalable web applications with a modern JavaScript stack.',
    '',
    '• Content Tester — Deeplearning.AI (Apr 2025 → Present)',
    '  Ensuring high quality for AI and machine learning course material.',
  ],
  education: [
    '🎓 Education',
    '──────────────────────────────────────────────',
    '• Université de Lomé — Software Engineering (2021 → 2024)',
    '  Focus on software craftsmanship, distributed systems, and ML.',
    '',
    '• Lycée Scientifique de Lomé — Baccalauréat C4 (2018 → 2021)',
    '  Advanced mathematics and physics curriculum.',
  ],
  certifications: [
    '🏆 Certifications',
    '──────────────────────────────────────────────',
    '• Machine Learning Specialization — Coursera (Stanford)',
    '• Foundation of Generative AI Nanodegree — Udacity',
    '• AI Programming with Python Nanodegree — Udacity',
    '• Associate Data Scientist — DataCamp',
  ],
  projects: [
    '🚀 Featured Projects',
    '──────────────────────────────────────────────',
    '• Snake Game AI Agent — Reinforcement learning in action',
    '• Flower Classification — Computer vision with deep learning',
    '• Android Market Analysis — Insights from Google Play Store data',
    '• CO₂ Emission in Africa — Environmental data storytelling',
    '• Credit Card Approvals — Predictive analytics workflow',
    '• Blood Bank Management System — Full-stack web platform',
    '• Food Delivery Platform — Real-time ordering experience',
    '• Terminal Portfolio — CLI-inspired personal portfolio',
    '• Meal Discovery App — Cross-platform recipe explorer',
    '• Blood Donation Mobile App — Donor scheduling companion',
    '• Music Player App — Playlist management and audio visuals',
  ],
  skills: [
    '⚡ Technical Skills',
    '──────────────────────────────────────────────',
    'Programming: JavaScript, Java, Python, SQL, Dart',
    'Databases: MySQL, PostgreSQL, MongoDB, Firestore',
    'Frameworks: PyTorch, TensorFlow/Keras, Scikit-learn, Pandas, NumPy, Flutter, React, Next.js, Express, Django',
    'Cloud & DevOps: AWS, Docker, Git, CI/CD',
    'Data Science: Machine Learning, Deep Learning, Visualization, Statistical Analysis',
  ],
  links: [
    '🔗 Connect With Me',
    '──────────────────────────────────────────────',
    'LinkedIn: https://www.linkedin.com/in/kokou-ezechiel-agban/',
    'GitHub  : https://github.com/zinmori',
    'Website : https://bigz.dev',
  ],
  languages: [
    '🌍 Languages',
    '──────────────────────────────────────────────',
    '• French — Native speaker',
    '• English — Professional proficiency',
    '• Ewe — Native speaker',
  ],
};

export function isDirectory(value: string): value is DirectoryKey {
  return (directoryOrder as readonly string[]).includes(value);
}
