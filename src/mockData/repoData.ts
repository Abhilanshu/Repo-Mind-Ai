import { 
  RepositoryMetadata, 
  TechnicalDebtIssue, 
  SecurityFinding, 
  DependencyItem, 
  CodeQualityFile, 
  ArchNode, 
  ArchEdge, 
  PrioritizedAction, 
  SprintTask, 
  ChatMessage,
  FullRepoAnalysisData
} from '../types/repomind';

// Helper to extract clean owner/repo from URL or string
export function parseRepoName(input: string): { owner: string; repo: string; fullName: string } {
  let cleaned = input.trim().replace(/\/$/, '');
  cleaned = cleaned.replace(/^https?:\/\/github\.com\//i, '');
  cleaned = cleaned.replace(/\.git$/i, '');
  
  if (cleaned.includes('/')) {
    const parts = cleaned.split('/');
    return { owner: parts[0], repo: parts[1], fullName: `${parts[0]}/${parts[1]}` };
  }
  
  if (cleaned.toLowerCase().includes('.zip') || cleaned.toLowerCase().includes('upload')) {
    return { owner: 'workspace', repo: 'uploaded-codebase', fullName: 'workspace/uploaded-codebase' };
  }

  return { owner: 'developer', repo: cleaned || 'custom-repository', fullName: `developer/${cleaned || 'custom-repository'}` };
}

export function generateDynamicRepoData(inputUrlOrName: string): FullRepoAnalysisData {
  const parsed = parseRepoName(inputUrlOrName);
  const fullName = parsed.fullName;

  // Preset 1: Abhilanshu/Repo-Mind-Ai
  if (fullName.toLowerCase() === 'abhilanshu/repo-mind-ai') {
    return getRepoMindAiDataset();
  }

  // Preset 2: facebook/react
  if (fullName.toLowerCase() === 'facebook/react') {
    return getReactDataset();
  }

  // Preset 3: expressjs/express
  if (fullName.toLowerCase() === 'expressjs/express') {
    return getExpressDataset();
  }

  // Dynamic Generator for any arbitrary GitHub Repo or uploaded code!
  return getGenericDynamicDataset(parsed.owner, parsed.repo);
}

// 1. RepoMind AI Dataset
function getRepoMindAiDataset(): FullRepoAnalysisData {
  const metadata: RepositoryMetadata = {
    name: 'Abhilanshu/Repo-Mind-Ai',
    branch: 'main',
    url: 'https://github.com/Abhilanshu/Repo-Mind-Ai',
    totalFiles: 35,
    totalLoc: 6773,
    totalSloc: 5820,
    healthScore: 89,
    healthBreakdown: {
      codeQuality: 92,
      architecture: 88,
      security: 95,
      testing: 78,
      dependencies: 90,
      documentation: 92,
    },
    totalIssues: 18,
    issuesBreakdown: { critical: 0, high: 3, medium: 8, low: 7 },
    totalDebtHours: 24,
    debtHoursTrendDelta: -18,
    aiSummary: "Abhilanshu/Repo-Mind-Ai has a modular React 19 + TypeScript architecture with clean separation between UI views, static AST analysis engine, and REST backend API. The main area for optimization is expanding unit test coverage for mock generators.",
    lastAnalyzed: '2026-10-04 23:20',
    repositoryType: 'React/TypeScript'
  };

  const debtIssues: TechnicalDebtIssue[] = [
    {
      id: 'DEBT-001',
      title: 'Missing Unit Tests for Dynamic Data Generator',
      severity: 'high',
      category: 'testing',
      file: 'src/mockData/repoData.ts',
      line: 42,
      impact: 'Dynamic fallback generation for custom GitHub repos relies on inline logic without isolated unit specs.',
      effortHours: 4,
      recommendation: 'Add Jest/Vitest unit test cases verifying parseRepoName and dynamic score calculation.',
      status: 'open',
      author: 'vittolia',
      updatedAt: '1 day ago'
    },
    {
      id: 'DEBT-002',
      title: 'Monolithic App Component State Handlers',
      severity: 'high',
      category: 'architecture',
      file: 'src/App.tsx',
      line: 78,
      impact: 'App.tsx manages modals, navigation tabs, and toast state directly instead of using a global context hook.',
      effortHours: 5,
      recommendation: 'Refactor modal state management into a lightweight React Context provider.',
      status: 'open',
      author: 'vittolia',
      updatedAt: '2 days ago'
    },
    {
      id: 'DEBT-003',
      title: 'Single-Threaded HTTP Server Execution',
      severity: 'medium',
      category: 'performance',
      file: 'repomind_server.py',
      line: 110,
      impact: 'Python socketserver TCPServer processes incoming requests sequentially.',
      effortHours: 3,
      recommendation: 'Wrap server in ThreadingMixIn or migrate to FastAPI / Uvicorn runner.',
      status: 'open',
      author: 'vittolia',
      updatedAt: '3 days ago'
    }
  ];

  const securityFindings: SecurityFinding[] = [
    {
      id: 'SEC-101',
      title: 'CORS Wildcard Configuration in Backend Handler',
      severity: 'medium',
      file: 'repomind_server.py',
      line: 14,
      explanation: 'Access-Control-Allow-Origin header set to * allows requests from arbitrary cross-origin domains.',
      impact: 'Potential cross-origin request forgery if deployed on public network.',
      recommendedFix: 'Restrict CORS origins to explicit localhost or domain whitelist.',
    }
  ];

  const dependencies: DependencyItem[] = [
    { id: 'd-1', package: 'react', current: '19.0.0', latest: '19.0.0', vulnerabilities: 0, status: 'up_to_date', risk: 'low' },
    { id: 'd-2', package: 'vite', current: '6.2.0', latest: '6.2.0', vulnerabilities: 0, status: 'up_to_date', risk: 'low' },
    { id: 'd-3', package: 'tailwindcss', current: '4.0.9', latest: '4.0.9', vulnerabilities: 0, status: 'up_to_date', risk: 'low' },
    { id: 'd-4', package: 'lucide-react', current: '1.16.0', latest: '1.16.0', vulnerabilities: 0, status: 'up_to_date', risk: 'low' },
  ];

  const codeQualityFiles: CodeQualityFile[] = [
    { file: 'src/App.tsx', loc: 280, sloc: 240, functions: 8, classes: 0, avgComplexity: 4.2, maintainabilityIndex: 82, smellsCount: 2, hasBareExcepts: false, missingDocstrings: 0 },
    { file: 'src/components/Preloader.tsx', loc: 140, sloc: 115, functions: 5, classes: 0, avgComplexity: 3.1, maintainabilityIndex: 88, smellsCount: 1, hasBareExcepts: false, missingDocstrings: 0 },
    { file: 'repomind_server.py', loc: 118, sloc: 95, functions: 4, classes: 1, avgComplexity: 4.5, maintainabilityIndex: 84, smellsCount: 2, hasBareExcepts: false, missingDocstrings: 0 },
    { file: 'src/mockData/repoData.ts', loc: 210, sloc: 180, functions: 6, classes: 0, avgComplexity: 3.8, maintainabilityIndex: 86, smellsCount: 1, hasBareExcepts: false, missingDocstrings: 0 },
  ];

  const archNodes: ArchNode[] = [
    { id: 'ui', name: 'React 19 Dashboard UI', type: 'frontend', fileCount: 22, dependenciesCount: 4, complexity: 'Low', debtCount: 2, risk: 'Low', status: 'healthy' },
    { id: 'data', name: 'Dynamic Repo Engine', type: 'module', fileCount: 4, dependenciesCount: 2, complexity: 'Low', debtCount: 1, risk: 'Low', status: 'healthy' },
    { id: 'server', name: 'Python REST Server', type: 'api', fileCount: 2, dependenciesCount: 1, complexity: 'Medium', debtCount: 1, risk: 'Low', status: 'healthy' },
  ];

  const archEdges: ArchEdge[] = [
    { source: 'ui', target: 'data' },
    { source: 'ui', target: 'server' },
  ];

  const prioritizedActions: PrioritizedAction[] = [
    {
      id: 'ACT-1',
      rank: 1,
      title: 'Restrict CORS Whitelist in repomind_server.py',
      impact: 'High',
      risk: 'Medium',
      effort: '1 hour',
      effortHours: 1,
      roiScore: 94,
      issueId: 'SEC-101',
      description: 'Replaces wildcard CORS origin header with explicit domain validation.'
    },
    {
      id: 'ACT-2',
      rank: 2,
      title: 'Add Unit Tests for Repo Parser',
      impact: 'Medium',
      risk: 'High',
      effort: '4 hours',
      effortHours: 4,
      roiScore: 88,
      issueId: 'DEBT-001',
      description: 'Adds automated Vitest specs for parseRepoName and dynamic score calculation.'
    }
  ];

  const sprintTasks: SprintTask[] = [
    { id: 's-1', title: 'Restrict CORS headers in repomind_server.py', issueId: 'SEC-101', category: 'security', severity: 'medium', effortHours: 1, completed: true, assignee: 'vittolia' },
    { id: 's-2', title: 'Add Vitest unit specs for repo parser', issueId: 'DEBT-001', category: 'testing', severity: 'high', effortHours: 4, completed: false, assignee: 'vittolia' },
  ];

  const initialMessages: ChatMessage[] = [
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello! I am **RepoMind AI**. I have analyzed `Abhilanshu/Repo-Mind-Ai` (6,773 LOC across 35 TypeScript/Python files).\n\nThe repository has an excellent **89 / 100** stability index. What would you like to explore?",
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'Explain the React + Python architecture', action: 'explain_arch' },
        { label: 'What are the top refactoring priorities?', action: 'refactor_priority' },
      ]
    }
  ];

  return {
    metadata,
    debtIssues,
    securityFindings,
    dependencies,
    codeQualityFiles,
    archNodes,
    archEdges,
    prioritizedActions,
    sprintTasks,
    initialMessages
  };
}

// 2. React Dataset
function getReactDataset(): FullRepoAnalysisData {
  const metadata: RepositoryMetadata = {
    name: 'facebook/react',
    branch: 'main',
    url: 'https://github.com/facebook/react',
    totalFiles: 2450,
    totalLoc: 412000,
    totalSloc: 328000,
    healthScore: 86,
    healthBreakdown: {
      codeQuality: 88,
      architecture: 90,
      security: 94,
      testing: 82,
      dependencies: 92,
      documentation: 74,
    },
    totalIssues: 320,
    issuesBreakdown: { critical: 4, high: 42, medium: 140, low: 134 },
    totalDebtHours: 480,
    debtHoursTrendDelta: -8,
    aiSummary: "facebook/react has a world-class monorepo architecture. Primary complexity resides in the React Fiber reconciler and concurrent scheduler routines. Reconciler work loop phase transitions require careful guard validation.",
    lastAnalyzed: '2026-10-04 23:25',
    repositoryType: 'React/TypeScript'
  };

  const debtIssues: TechnicalDebtIssue[] = [
    {
      id: 'DEBT-101',
      title: 'High Cyclomatic Complexity in React Fiber Reconciler Loop',
      severity: 'critical',
      category: 'architecture',
      file: 'packages/react-reconciler/src/ReactFiberWorkLoop.js',
      line: 824,
      impact: 'Work loop phase switching requires multi-way conditional checks, increasing chance of state corruption in concurrent rendering.',
      effortHours: 12,
      recommendation: 'Decompose workLoopConcurrent into modular phase sub-dispatchers.',
      status: 'open',
      author: 'gaearon',
      updatedAt: '3 days ago'
    }
  ];

  const securityFindings: SecurityFinding[] = [
    {
      id: 'SEC-201',
      title: 'Server Action Serialization Validation Warning',
      severity: 'high',
      file: 'packages/react-server/src/ReactFlightServer.js',
      line: 142,
      explanation: 'Server reference tuples deserialized without strict type guard assertion.',
      impact: 'Potential client-side deserialization injection if custom flight payload is tampered.',
      recommendedFix: 'Assert schema integrity before invoking flight action resolver.',
      cve: 'CVE-2024-4321'
    }
  ];

  const dependencies: DependencyItem[] = [
    { id: 'rd-1', package: 'rollup', current: '4.9.0', latest: '4.22.0', vulnerabilities: 0, status: 'outdated', risk: 'low' },
    { id: 'rd-2', package: 'jest', current: '29.7.0', latest: '29.7.0', vulnerabilities: 0, status: 'up_to_date', risk: 'low' },
    { id: 'rd-3', package: 'babel', current: '7.23.0', latest: '7.25.0', vulnerabilities: 0, status: 'outdated', risk: 'low' },
  ];

  const codeQualityFiles: CodeQualityFile[] = [
    { file: 'packages/react-reconciler/src/ReactFiberWorkLoop.js', loc: 1420, sloc: 1180, functions: 42, classes: 0, avgComplexity: 8.4, maintainabilityIndex: 64, smellsCount: 18, hasBareExcepts: false, missingDocstrings: 8 },
    { file: 'packages/react-dom/src/events/DOMPluginEventSystem.js', loc: 890, sloc: 720, functions: 24, classes: 0, avgComplexity: 6.2, maintainabilityIndex: 72, smellsCount: 9, hasBareExcepts: false, missingDocstrings: 4 },
  ];

  const archNodes: ArchNode[] = [
    { id: 'core', name: 'React Core & Hooks API', type: 'frontend', fileCount: 140, dependenciesCount: 5, complexity: 'Low', debtCount: 12, risk: 'Low', status: 'healthy' },
    { id: 'reconciler', name: 'React Fiber Reconciler', type: 'service', fileCount: 380, dependenciesCount: 18, complexity: 'Critical', debtCount: 94, risk: 'High', status: 'critical' },
    { id: 'dom', name: 'ReactDOM Event Plugin System', type: 'module', fileCount: 420, dependenciesCount: 12, complexity: 'High', debtCount: 68, risk: 'Medium', status: 'warning' },
    { id: 'flight', name: 'React Server Components (Flight)', type: 'service', fileCount: 220, dependenciesCount: 9, complexity: 'Medium', debtCount: 28, risk: 'Medium', status: 'warning' },
  ];

  const archEdges: ArchEdge[] = [
    { source: 'dom', target: 'reconciler' },
    { source: 'reconciler', target: 'core' },
    { source: 'flight', target: 'reconciler' },
  ];

  const prioritizedActions: PrioritizedAction[] = [
    {
      id: 'ACT-R1',
      rank: 1,
      title: 'Refactor React Fiber Work Loop Dispatcher',
      impact: 'High',
      risk: 'Critical',
      effort: '12 hours',
      effortHours: 12,
      roiScore: 96,
      issueId: 'DEBT-101',
      description: 'Decomposes ReactFiberWorkLoop phase switching into modular sub-dispatchers.'
    }
  ];

  const sprintTasks: SprintTask[] = [
    { id: 'st-r1', title: 'Refactor React Fiber work loop dispatcher', issueId: 'DEBT-101', category: 'architecture', severity: 'critical', effortHours: 12, completed: false, assignee: 'sebmarkbage' },
  ];

  const initialMessages: ChatMessage[] = [
    {
      id: 'm-r1',
      sender: 'ai',
      text: "Hello! I am **RepoMind AI**. I have analyzed `facebook/react` (412,000 LOC across 2,450 files).\n\nWhat component or Fiber reconciler module would you like to audit?",
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'Explain React Fiber Reconciler architecture', action: 'explain_arch' },
        { label: 'Where are the concurrency performance bottlenecks?', action: 'perf_audit' },
      ]
    }
  ];

  return {
    metadata,
    debtIssues,
    securityFindings,
    dependencies,
    codeQualityFiles,
    archNodes,
    archEdges,
    prioritizedActions,
    sprintTasks,
    initialMessages
  };
}

// 3. Express Dataset
function getExpressDataset(): FullRepoAnalysisData {
  const metadata: RepositoryMetadata = {
    name: 'expressjs/express',
    branch: 'master',
    url: 'https://github.com/expressjs/express',
    totalFiles: 48,
    totalLoc: 14200,
    totalSloc: 11400,
    healthScore: 82,
    healthBreakdown: {
      codeQuality: 84,
      architecture: 86,
      security: 88,
      testing: 80,
      dependencies: 78,
      documentation: 76,
    },
    totalIssues: 42,
    issuesBreakdown: { critical: 1, high: 8, medium: 18, low: 15 },
    totalDebtHours: 64,
    debtHoursTrendDelta: -5,
    aiSummary: "expressjs/express is a lightweight Node.js web framework. The primary technical debt resides in legacy router middleware dispatching routines and outdated prototype inheritance helper signatures.",
    lastAnalyzed: '2026-10-04 23:26',
    repositoryType: 'Node/Express'
  };

  const debtIssues: TechnicalDebtIssue[] = [
    {
      id: 'DEBT-EXP-1',
      title: 'Legacy Route Layer Next Match Callback Nesting',
      severity: 'high',
      category: 'architecture',
      file: 'lib/router/layer.js',
      line: 95,
      impact: 'Deep callback nesting in layer handling makes async middleware error stack traces difficult to debug.',
      effortHours: 6,
      recommendation: 'Refactor Layer.handle_request to return standardized promises.',
      status: 'open',
      author: 'dougwilson',
      updatedAt: '4 days ago'
    }
  ];

  const securityFindings: SecurityFinding[] = [
    {
      id: 'SEC-EXP-1',
      title: 'Path Traversal Guard Warning in Static File Server',
      severity: 'high',
      file: 'lib/response.js',
      line: 412,
      explanation: 'res.sendFile parameter normalization should enforce strict root path boundary checking.',
      impact: 'Potential path traversal if relative path string escaping is bypassed.',
      recommendedFix: 'Enforce path.resolve root restriction before disk read.',
      cve: 'CWE-22'
    }
  ];

  const dependencies: DependencyItem[] = [
    { id: 'ed-1', package: 'qs', current: '6.11.0', latest: '6.13.0', vulnerabilities: 0, status: 'outdated', risk: 'low' },
    { id: 'ed-2', package: 'send', current: '0.18.0', latest: '0.19.0', vulnerabilities: 0, status: 'outdated', risk: 'medium' },
    { id: 'ed-3', package: 'accepts', current: '1.3.8', latest: '1.3.8', vulnerabilities: 0, status: 'up_to_date', risk: 'low' },
  ];

  const codeQualityFiles: CodeQualityFile[] = [
    { file: 'lib/router/index.js', loc: 640, sloc: 520, functions: 22, classes: 0, avgComplexity: 7.1, maintainabilityIndex: 68, smellsCount: 11, hasBareExcepts: false, missingDocstrings: 4 },
    { file: 'lib/application.js', loc: 580, sloc: 460, functions: 18, classes: 0, avgComplexity: 5.4, maintainabilityIndex: 75, smellsCount: 6, hasBareExcepts: false, missingDocstrings: 2 },
  ];

  const archNodes: ArchNode[] = [
    { id: 'app', name: 'Express Application API', type: 'api', fileCount: 8, dependenciesCount: 6, complexity: 'Low', debtCount: 4, risk: 'Low', status: 'healthy' },
    { id: 'router', name: 'Router & Layer Dispatcher', type: 'service', fileCount: 14, dependenciesCount: 8, complexity: 'High', debtCount: 18, risk: 'Medium', status: 'warning' },
    { id: 'req_res', name: 'Request & Response Helpers', type: 'module', fileCount: 12, dependenciesCount: 4, complexity: 'Medium', debtCount: 12, risk: 'Low', status: 'healthy' },
  ];

  const archEdges: ArchEdge[] = [
    { source: 'app', target: 'router' },
    { source: 'router', target: 'req_res' },
  ];

  const prioritizedActions: PrioritizedAction[] = [
    {
      id: 'ACT-EXP1',
      rank: 1,
      title: 'Enforce Path Traversal Guard in response.js sendFile',
      impact: 'High',
      risk: 'High',
      effort: '2 hours',
      effortHours: 2,
      roiScore: 95,
      issueId: 'SEC-EXP-1',
      description: 'Adds strict root boundary validation for static file responses.'
    }
  ];

  const sprintTasks: SprintTask[] = [
    { id: 'st-e1', title: 'Enforce path traversal guard in response.js', issueId: 'SEC-EXP-1', category: 'security', severity: 'high', effortHours: 2, completed: false, assignee: 'dougwilson' },
  ];

  const initialMessages: ChatMessage[] = [
    {
      id: 'm-e1',
      sender: 'ai',
      text: "Hello! I am **RepoMind AI**. I have analyzed `expressjs/express` (14,200 LOC across 48 JavaScript files).\n\nWhat routing or middleware module would you like to inspect?",
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'Explain Router Layer dispatching architecture', action: 'explain_arch' },
        { label: 'Show security audit for file response handling', action: 'security_audit' },
      ]
    }
  ];

  return {
    metadata,
    debtIssues,
    securityFindings,
    dependencies,
    codeQualityFiles,
    archNodes,
    archEdges,
    prioritizedActions,
    sprintTasks,
    initialMessages
  };
}

// 4. Universal Dynamic Generator for ANY Repository
function getGenericDynamicDataset(owner: string, repo: string): FullRepoAnalysisData {
  const fullName = `${owner}/${repo}`;
  
  // Calculate deterministic health score based on string hash
  let hash = 0;
  for (let i = 0; i < fullName.length; i++) {
    hash = (hash << 5) - hash + fullName.charCodeAt(i);
    hash |= 0;
  }
  const posHash = Math.abs(hash);

  const healthScore = 70 + (posHash % 24); // Score between 70 and 94
  const totalFiles = 25 + (posHash % 320);
  const totalLoc = totalFiles * (110 + (posHash % 140));
  const totalSloc = Math.round(totalLoc * 0.82);
  const criticalCount = posHash % 3;
  const highCount = 3 + (posHash % 12);
  const mediumCount = 10 + (posHash % 25);
  const lowCount = 8 + (posHash % 30);
  const totalIssues = criticalCount + highCount + mediumCount + lowCount;
  const debtHours = Math.round(totalIssues * 1.8);

  const metadata: RepositoryMetadata = {
    name: fullName,
    branch: 'main',
    url: `https://github.com/${fullName}`,
    totalFiles,
    totalLoc,
    totalSloc,
    healthScore,
    healthBreakdown: {
      codeQuality: Math.min(96, healthScore + 3),
      architecture: Math.min(94, healthScore - 2),
      security: Math.min(98, healthScore + 6),
      testing: Math.max(50, healthScore - 14),
      dependencies: Math.min(95, healthScore + 2),
      documentation: Math.max(45, healthScore - 18),
    },
    totalIssues,
    issuesBreakdown: { critical: criticalCount, high: highCount, medium: mediumCount, low: lowCount },
    totalDebtHours: debtHours,
    debtHoursTrendDelta: -10,
    aiSummary: `${fullName} has a overall health index of ${healthScore}/100 across ${totalFiles} analyzed files. Primary maintainability risks involve state coupling in core service modules and insufficient automated unit test coverage in pipeline handlers.`,
    lastAnalyzed: '2026-10-04 23:28',
    repositoryType: 'Multi-Module'
  };

  const debtIssues: TechnicalDebtIssue[] = [
    {
      id: 'DEBT-GEN-001',
      title: `High Cyclomatic Complexity in ${repo} Core Controller`,
      severity: 'high',
      category: 'architecture',
      file: `src/controllers/${repo}Controller.ts`,
      line: 114,
      impact: 'Complex nested conditional branches increase regression risk during updates.',
      effortHours: 6,
      recommendation: 'Refactor main process dispatcher into strategy pattern sub-handlers.',
      status: 'open',
      author: owner,
      updatedAt: '1 day ago'
    },
    {
      id: 'DEBT-GEN-002',
      title: 'Duplicated API Request Validation Logic',
      severity: 'medium',
      category: 'code_quality',
      file: `src/utils/validator.ts`,
      line: 45,
      impact: 'Redundant schema validation calls cause minor CPU overhead on payload parsing.',
      effortHours: 3,
      recommendation: 'Extract common schema validator into centralized middleware.',
      status: 'open',
      author: 'dev-team',
      updatedAt: '2 days ago'
    }
  ];

  const securityFindings: SecurityFinding[] = [
    {
      id: 'SEC-GEN-101',
      title: 'Input Parameter Sanitization Warning',
      severity: 'high',
      file: `src/services/apiService.ts`,
      line: 78,
      explanation: 'User supplied parameters forwarded to external worker runner without type assertion.',
      impact: 'Potential parameter tampering risk in multi-tenant setup.',
      recommendedFix: 'Add strict Zod or JSON schema guard before invoking external execution context.'
    }
  ];

  const dependencies: DependencyItem[] = [
    { id: 'gd-1', package: 'typescript', current: '5.2.0', latest: '5.6.2', vulnerabilities: 0, status: 'outdated', risk: 'low' },
    { id: 'gd-2', package: 'axios', current: '1.6.0', latest: '1.7.7', vulnerabilities: 0, status: 'outdated', risk: 'medium' },
    { id: 'gd-3', package: 'lodash', current: '4.17.21', latest: '4.17.21', vulnerabilities: 0, status: 'up_to_date', risk: 'low' },
  ];

  const codeQualityFiles: CodeQualityFile[] = [
    { file: `src/controllers/${repo}Controller.ts`, loc: 420, sloc: 340, functions: 16, classes: 1, avgComplexity: 7.2, maintainabilityIndex: 66, smellsCount: 8, hasBareExcepts: false, missingDocstrings: 2 },
    { file: `src/services/apiService.ts`, loc: 290, sloc: 230, functions: 11, classes: 1, avgComplexity: 5.1, maintainabilityIndex: 78, smellsCount: 4, hasBareExcepts: false, missingDocstrings: 1 },
  ];

  const archNodes: ArchNode[] = [
    { id: 'ui', name: `${repo} Frontend Layer`, type: 'frontend', fileCount: Math.round(totalFiles * 0.4), dependenciesCount: 6, complexity: 'Medium', debtCount: Math.round(totalIssues * 0.3), risk: 'Medium', status: 'warning' },
    { id: 'api', name: 'API Gateway & Services', type: 'service', fileCount: Math.round(totalFiles * 0.35), dependenciesCount: 10, complexity: 'High', debtCount: Math.round(totalIssues * 0.5), risk: 'High', status: 'critical' },
    { id: 'utils', name: 'Core Utilities & Helpers', type: 'module', fileCount: Math.round(totalFiles * 0.25), dependenciesCount: 3, complexity: 'Low', debtCount: Math.round(totalIssues * 0.2), risk: 'Low', status: 'healthy' },
  ];

  const archEdges: ArchEdge[] = [
    { source: 'ui', target: 'api' },
    { source: 'api', target: 'utils' },
  ];

  const prioritizedActions: PrioritizedAction[] = [
    {
      id: 'ACT-GEN1',
      rank: 1,
      title: `Refactor ${repo} Core Controller Dispatcher`,
      impact: 'High',
      risk: 'High',
      effort: '6 hours',
      effortHours: 6,
      roiScore: 92,
      issueId: 'DEBT-GEN-001',
      description: 'Decomposes complex nested branches into modular sub-handlers.'
    }
  ];

  const sprintTasks: SprintTask[] = [
    { id: 'st-g1', title: `Refactor ${repo} core controller dispatcher`, issueId: 'DEBT-GEN-001', category: 'architecture', severity: 'high', effortHours: 6, completed: false, assignee: owner },
  ];

  const initialMessages: ChatMessage[] = [
    {
      id: 'm-g1',
      sender: 'ai',
      text: `Hello! I am **RepoMind AI**. I have completed the repository intelligence analysis for \`${fullName}\` (${totalLoc.toLocaleString()} LOC across ${totalFiles} files).\n\nWhat would you like to investigate today?`,
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'Explain system architecture topology', action: 'explain_arch' },
        { label: 'What are the top refactoring priorities?', action: 'refactor_priority' },
        { label: 'Show security audit overview', action: 'security_audit' },
      ]
    }
  ];

  return {
    metadata,
    debtIssues,
    securityFindings,
    dependencies,
    codeQualityFiles,
    archNodes,
    archEdges,
    prioritizedActions,
    sprintTasks,
    initialMessages
  };
}

// Fallback default repository export for backward compatibility
export const mockRepository: RepositoryMetadata = getRepoMindAiDataset().metadata;
export const mockTechnicalDebtIssues = getRepoMindAiDataset().debtIssues;
export const mockSecurityFindings = getRepoMindAiDataset().securityFindings;
export const mockDependencies = getRepoMindAiDataset().dependencies;
export const mockCodeQualityFiles = getRepoMindAiDataset().codeQualityFiles;
export const mockArchNodes = getRepoMindAiDataset().archNodes;
export const mockArchEdges = getRepoMindAiDataset().archEdges;
export const mockPrioritizedActions = getRepoMindAiDataset().prioritizedActions;
export const mockSprintTasks = getRepoMindAiDataset().sprintTasks;
export const mockInitialChatMessages = getRepoMindAiDataset().initialMessages;
