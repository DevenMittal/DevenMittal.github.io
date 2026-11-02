// Public professional details supplied in Deven's resume, November 2026.
// Do not add the source PDF, phone number, or private contact details to public/.
export const experience = [
  {
    role: 'Machine Learning Undergraduate Researcher',
    organization: 'Lawrence Berkeley National Laboratory',
    team: 'ATLAS Computing',
    dates: 'Sep 2026 - Present',
    description: 'I develop and benchmark distance-based GNN edge filters for HL-LHC particle tracking in GNN4ITk / ACORN. I also evaluate the tracking pipeline on NERSC Perlmutter.',
  },
  {
    role: 'Machine Learning Intern',
    organization: 'DoorDash',
    team: 'Core Pay ML / Optimal Tips',
    dates: 'May - Aug 2026',
    description: 'I retrained the Optimal Tips V2 LightGBM model on more than 35 million orders and validated it on more than 6 million holdout examples. I worked on regional features and pre-production inference validation.',
  },
  {
    role: 'Contract Software Developer',
    organization: 'Google',
    team: 'Kubernetes Observability & Monitoring',
    dates: 'Oct 2025 - Jan 2026',
    description: 'I built a Helm chart for AlloyDB Omni monitoring, with Grafana dashboards, Prometheus alerts, and log collection.',
  },
  {
    role: 'Contract Software Developer',
    organization: 'Lotus Bloom Family Resource Center',
    team: '',
    dates: 'Feb - Jul 2025',
    description: 'I built a discussion board with Next.js, PostgreSQL, and Auth0, including posts, comments, and role-based permissions.',
  },
  {
    role: 'Machine Learning Intern',
    organization: 'Bamboo Technology',
    team: 'Audio Processing',
    dates: 'Sep - Dec 2024',
    description: 'I trained an audio emotion classifier using pitch, energy, and spectral features in Python, with Librosa and scikit-learn.',
  },
  {
    role: 'Software Engineer Intern',
    organization: 'Syntiant',
    team: '',
    dates: 'Jun - Aug 2024',
    description: 'I trained and deployed a CNN voice-command model on the Syntiant Nicla chip. I connected it to an ESP32 and a motor driver to control a robot with voice commands.',
  },
].filter((entry) => entry.role && entry.organization && entry.description);

export const education = {
  school: 'University of California, Berkeley',
  degree: 'B.S. in Electrical Engineering and Computer Sciences',
  dates: 'Expected May 2028',
  activities: 'Codebase; Eta Kappa Nu',
};

// Curated from the source and README review. Dates stay empty when unconfirmed.
// Public team repositories keep their original ownership and explicit role credit.
export const archive = [
  {
    title: 'Neural Network from Scratch',
    description: 'I implemented a feedforward network in C# with backpropagation. It includes an XOR console example and a separate Windows sine-wave visualizer.',
    tags: ['C#', 'Neural networks'],
    group: 'Machine learning and search',
    role: '',
    date: '',
    href: 'https://github.com/DevenMittal/NeuralNetwork',
  },
  {
    title: 'Genetic Art',
    description: 'I built an image-approximation experiment that mutates translucent triangles and keeps candidates with lower pixel error.',
    tags: ['C#', 'Optimization'],
    group: 'Machine learning and search',
    role: '',
    date: '',
    href: 'https://github.com/DevenMittal/Genetic-Art',
  },
  {
    title: 'Flappy Bird AI',
    description: 'I built a MonoGame simulation with a small neural network for each bird and experiments with crossover and mutation.',
    tags: ['C#', 'Neural networks'],
    group: 'Machine learning and search',
    role: '',
    date: '',
    href: 'https://github.com/DevenMittal/Flappy-Bird',
  },
  {
    title: 'Monte Carlo Checkers',
    description: 'I explored Monte Carlo tree search in a console checkers game, using UCT selection, random rollouts, and backpropagated outcomes.',
    tags: ['C#', 'Tree search'],
    group: 'Machine learning and search',
    role: '',
    date: '',
    href: 'https://github.com/DevenMittal/Monte-Carlo-Tree---Checkers',
  },
  {
    title: 'A* Algorithm',
    description: 'I implemented weighted graph search with a Manhattan heuristic and printed the selected path through an ASCII map.',
    tags: ['C#', 'Graph search'],
    group: 'Machine learning and search',
    role: '',
    date: '',
    href: 'https://github.com/DevenMittal/AStar-Algorithm',
  },
  {
    title: 'Minimax Tic-Tac-Toe',
    description: 'I built a console Tic-Tac-Toe game that uses minimax with alpha-beta pruning to choose the computer move.',
    tags: ['C#', 'Game trees'],
    group: 'Machine learning and search',
    role: '',
    date: '',
    href: 'https://github.com/DevenMittal/MiniMaxTree',
  },
  {
    title: 'PlatformerCore',
    description: 'I built a MonoGame platformer with animated movement, collectible gems, JSON-backed levels, and a separate visual map editor.',
    tags: ['C#', 'MonoGame', 'Level editor'],
    group: 'Earlier games',
    role: '',
    date: '',
    href: 'https://github.com/DevenMittal/PlatformerCore',
  },
  {
    title: 'Aim Trainer',
    description: 'I built a small MonoGame aim trainer with timed targets and separate challenge modes.',
    tags: ['C#', 'MonoGame'],
    group: 'Earlier games',
    role: '',
    date: '',
    href: 'https://github.com/DevenMittal/Aim-Trainer',
  },
  {
    title: 'Food Stacker',
    description: 'I built a small arcade experiment where falling burger ingredients are caught and stacked by the player.',
    tags: ['C#', 'MonoGame'],
    group: 'Earlier games',
    role: '',
    date: '',
    href: 'https://github.com/DevenMittal/Food-Stacker',
  },
  {
    title: 'Asteroids',
    description: 'I built an arcade game with ship rotation and thrust, projectiles, asteroid collisions, and a life counter.',
    tags: ['C#', 'MonoGame'],
    group: 'Earlier games',
    role: '',
    date: '',
    href: 'https://github.com/DevenMittal/Asteroids',
  },
  {
    title: 'Brick Breaker',
    description: 'I built a paddle-and-ball game with brick collisions, lives, and a restart state.',
    tags: ['C#', 'MonoGame'],
    group: 'Earlier games',
    role: '',
    date: '',
    href: 'https://github.com/DevenMittal/Brick-Breaker',
  },
  {
    title: 'Space Invader',
    description: 'I built a fixed-screen shooter with an alien formation, projectiles, and shields that take damage.',
    tags: ['C#', 'MonoGame'],
    group: 'Earlier games',
    role: '',
    date: '',
    href: 'https://github.com/DevenMittal/Space-Invader',
  },
  {
    title: 'AlloyFinance AI',
    description: 'I served as project manager for a Codebase team project with Google. The team built a transaction-analysis app with natural-language questions about spending.',
    tags: ['AlloyDB', 'React', 'FastAPI'],
    group: 'Team projects',
    role: 'Project Manager · Codebase',
    date: '',
    href: 'https://github.com/diyahasteer/alloyfinance-ai',
  },
  {
    title: 'LLM Inference Energy Analysis',
    description: 'I contributed to a team notebook exploring existing inference-energy measurements through plots, PCA, and a decision-tree regressor.',
    tags: ['Python', 'Data analysis'],
    group: 'Team projects',
    role: 'Team contributor · KPMG AI Studio',
    date: '',
    href: 'https://github.com/DevenMittal/KPMG-LLM-Energy-Consumption-and-Sustainabiility',
  },
];

// Titles confirmed by Deven. Dates are deliberately omitted until confirmed.
export const teaching = [{
  role: 'CS 61B Tutor', organization: 'UC Berkeley', dates: 'Spring 2026',
  href: 'https://sp25.datastructur.es/',
  description: 'I tutored CS 61B, Data Structures.',
}];
export const community = [
  { role: 'VP of Projects', organization: 'Codebase', dates: 'Jun 2026 - Present', href: 'https://codebase.berkeley.edu/', description: 'I source client projects with Google, NVIDIA, and Sony and oversee four student developer teams.' },
  { role: 'Project Manager', organization: 'Codebase', dates: 'Jan - May 2026', href: 'https://github.com/diyahasteer/alloyfinance-ai', description: 'I managed the AlloyFinance AI team project with Google. I scoped work and broke down engineering tasks.' },
  { role: 'Software Developer', organization: 'Codebase', dates: 'Jan 2025 - Jan 2026', href: 'https://codebase.berkeley.edu/', description: '' },
  { role: 'Fellow', organization: 'Break Through Tech', dates: 'May 2025 - May 2026', href: 'https://www.breakthroughtech.org/', description: 'I completed machine learning coursework through Cornell University and worked on an industry-sponsored AI project with technical mentors.' },
];
export const organizationLinks: Record<string, { href: string; logo?: string }> = {
  'Lawrence Berkeley National Laboratory': { href: 'https://www.lbl.gov/', logo: 'logos/berkeley-lab.png' },
  DoorDash: { href: 'https://www.doordash.com/', logo: 'logos/doordash.ico' },
  Google: { href: 'https://www.google.com/', logo: 'logos/google.ico' },
  'Lotus Bloom Family Resource Center': { href: 'https://www.lotusbloomfamily.org/', logo: 'logos/lotus-bloom.png' },
  'Bamboo Technology': { href: 'https://www.bamboodd.com/', logo: 'logos/bamboo.png' },
  Syntiant: { href: 'https://www.syntiant.com/', logo: 'logos/syntiant.ico' },
  Codebase: { href: 'https://codebase.studentorg.berkeley.edu/', logo: 'logos/codebase.png' },
  'Break Through Tech': { href: 'https://www.breakthroughtech.org/', logo: 'logos/break-through-tech.png' },
  'UC Berkeley': { href: 'https://www.berkeley.edu/', logo: 'logos/berkeley.svg' },
};

export const projectResources: Record<string, { label: string; href: string }[]> = {
  'Neural Network from Scratch': [
    { label: 'Recorded learning run', href: 'https://github.com/DevenMittal/NeuralNetwork#recorded-learning-run' },
  ],
  'AlloyFinance AI': [
    { label: 'Team demo', href: 'https://www.youtube.com/watch?v=lq5N6Gwwk_g' },
    { label: 'Team writeup', href: 'https://medium.com/berkeley-codebase/codebase-x-google-project-spotlight-series-alloy-finance-e6e2e64e22cc' },
    { label: 'Google Cloud sample', href: 'https://github.com/GoogleCloudPlatform/alloydb-omni-samples/tree/main/experimental/alloydb-finance-ai' },
  ],
};
