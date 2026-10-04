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
  
  if (cleaned.toLowerCase().includes('demo') || cleaned.toLowerCase().includes('store') || cleaned.length === 0) {
    return { owner: 'repomind', repo: 'demo-store', fullName: 'RepoMind Demo Store' };
  }

  if (cleaned.includes('/')) {
    const parts = cleaned.split('/');
    return { owner: parts[0], repo: parts[1], fullName: `${parts[0]}/${parts[1]}` };
  }
  
  if (cleaned.toLowerCase().includes('.zip') || cleaned.toLowerCase().includes('upload')) {
    return { owner: 'workspace', repo: 'uploaded-codebase', fullName: 'workspace/uploaded-codebase' };
  }

  return { owner: 'developer', repo: cleaned || 'custom-repository', fullName: `developer/${cleaned || 'custom-repository'}` };
}

export function generateDynamicRepoData(inputUrlOrName?: string): FullRepoAnalysisData {
  if (!inputUrlOrName || inputUrlOrName.trim() === '' || inputUrlOrName.toLowerCase().includes('demo')) {
    return getDemoStoreDataset();
  }

  const parsed = parseRepoName(inputUrlOrName);
  const fullName = parsed.fullName;

  // Preset 1: facebook/react
  if (fullName.toLowerCase() === 'facebook/react') {
    return getReactDataset();
  }

  // Preset 2: expressjs/express
  if (fullName.toLowerCase() === 'expressjs/express') {
    return getExpressDataset();
  }

  // Dynamic Generator for any arbitrary GitHub Repo or uploaded code!
  return getGenericDynamicDataset(parsed.owner, parsed.repo);
}

// 1. RepoMind Demo Store Dataset (Built-in Demo Repository)
function getDemoStoreDataset(): FullRepoAnalysisData {
  const metadata: RepositoryMetadata = {
    name: 'RepoMind Demo Store',
    branch: 'main',
    url: 'https://github.com/repomind/demo-store',
    totalFiles: 42,
    totalLoc: 8420,
    totalSloc: 7100,
    healthScore: 87,
    healthBreakdown: {
      codeQuality: 90,
      architecture: 89,
      security: 92,
      testing: 76,
      dependencies: 81,
      documentation: 85,
    },
    totalIssues: 16,
    issuesBreakdown: { critical: 1, high: 3, medium: 7, low: 5 },
    totalDebtHours: 28,
    debtHoursTrendDelta: -14,
    aiSummary: "RepoMind Demo Store features a full-stack e-commerce architecture combining React frontend components, Express Node.js REST controllers, MongoDB data schemas, and Python utility processors. Codebase overall health is 87/100 with 4 areas requiring attention.",
    lastAnalyzed: '2026-10-04 23:45',
    repositoryType: 'React / Node / MongoDB / Python'
  };

  const debtIssues: TechnicalDebtIssue[] = [
    {
      id: 'DEBT-001',
      title: 'Unhandled Exception Risk in Order Payment Processing Loop',
      severity: 'critical',
      category: 'security',
      file: 'src/services/paymentService.ts',
      line: 114,
      impact: 'Payment webhook callbacks lack strict input payload schema guards, creating unhandled rejection risks.',
      effortHours: 3,
      recommendation: 'Add Zod payload schema validation before invoking payment gateway dispatcher.',
      status: 'open',
      author: 'dev-team',
      updatedAt: '1 day ago'
    },
    {
      id: 'DEBT-002',
      title: 'Untested Async Checkout State Transitions',
      severity: 'high',
      category: 'testing',
      file: 'src/controllers/cartController.js',
      line: 88,
      impact: 'Cart inventory sync logic lacks isolated unit test coverage for out-of-stock rollbacks.',
      effortHours: 4,
      recommendation: 'Generate automated Jest unit tests covering rollback exception paths.',
      status: 'open',
      author: 'qa-lead',
      updatedAt: '2 days ago'
    },
    {
      id: 'DEBT-003',
      title: 'Duplicated MongoDB Schema Validation Middlewares',
      severity: 'medium',
      category: 'code_quality',
      file: 'server/models/Product.js',
      line: 45,
      impact: 'Product document validation logic is duplicated across model pre-save hooks and route handlers.',
      effortHours: 3,
      recommendation: 'Consolidate validation assertions into a shared schema utility module.',
      status: 'open',
      author: 'backend-lead',
      updatedAt: '3 days ago'
    }
  ];

  const securityFindings: SecurityFinding[] = [
    {
      id: 'SEC-101',
      title: 'CORS Wildcard Warning in Express Server API Handler',
      severity: 'high',
      file: 'server/index.js',
      line: 22,
      explanation: 'Access-Control-Allow-Origin header set to wildcard allows cross-origin requests from arbitrary domains.',
      impact: 'Potential cross-site request forgery risks in public network deployments.',
      recommendedFix: 'Restrict CORS headers to explicit domain whitelist.',
    },
    {
      id: 'SEC-102',
      title: 'Unsanitized Order Query Parameter Warning',
      severity: 'medium',
      file: 'src/services/orderSearch.py',
      line: 64,
      explanation: 'SQL/NoSQL query parameters concatenated directly into search filter builder.',
      impact: 'Potential query injection vulnerability under malformed query strings.',
      recommendedFix: 'Use parameterized MongoDB query builders or type casts.'
    }
  ];

  const dependencies: DependencyItem[] = [
    { id: 'd-1', package: 'react', current: '19.0.0', latest: '19.0.0', vulnerabilities: 0, status: 'up_to_date', risk: 'low' },
    { id: 'd-2', package: 'express', current: '4.18.2', latest: '4.19.2', vulnerabilities: 0, status: 'outdated', risk: 'medium' },
    { id: 'd-3', package: 'mongoose', current: '7.6.3', latest: '8.4.1', vulnerabilities: 1, status: 'vulnerable', risk: 'high' },
    { id: 'd-4', package: 'axios', current: '1.6.2', latest: '1.7.7', vulnerabilities: 0, status: 'outdated', risk: 'low' },
  ];

  const codeQualityFiles: CodeQualityFile[] = [
    { file: 'src/services/paymentService.ts', loc: 380, sloc: 310, functions: 14, classes: 1, avgComplexity: 6.8, maintainabilityIndex: 72, smellsCount: 4, hasBareExcepts: false, missingDocstrings: 1 },
    { file: 'src/controllers/cartController.js', loc: 290, sloc: 240, functions: 11, classes: 0, avgComplexity: 5.2, maintainabilityIndex: 78, smellsCount: 3, hasBareExcepts: false, missingDocstrings: 0 },
    { file: 'server/models/Product.js', loc: 190, sloc: 160, functions: 6, classes: 1, avgComplexity: 3.8, maintainabilityIndex: 86, smellsCount: 1, hasBareExcepts: false, missingDocstrings: 0 },
    { file: 'src/services/orderSearch.py', loc: 240, sloc: 200, functions: 8, classes: 0, avgComplexity: 4.5, maintainabilityIndex: 82, smellsCount: 2, hasBareExcepts: false, missingDocstrings: 0 },
  ];

  const archNodes: ArchNode[] = [
    { id: 'ui', name: 'React Frontend Storefront', type: 'frontend', fileCount: 24, dependenciesCount: 5, complexity: 'Low', debtCount: 3, risk: 'Low', status: 'healthy' },
    { id: 'api', name: 'Express REST Controllers', type: 'api', fileCount: 12, dependenciesCount: 6, complexity: 'Medium', debtCount: 8, risk: 'Medium', status: 'warning' },
    { id: 'db', name: 'MongoDB Data Models', type: 'database', fileCount: 6, dependenciesCount: 2, complexity: 'Low', debtCount: 2, risk: 'Low', status: 'healthy' },
  ];

  const archEdges: ArchEdge[] = [
    { source: 'ui', target: 'api' },
    { source: 'api', target: 'db' },
  ];

  const prioritizedActions: PrioritizedAction[] = [
    {
      id: 'ACT-1',
      rank: 1,
      title: 'Fix Payment Service Payload Validation',
      impact: 'High',
      risk: 'Critical',
      effort: '3 hours',
      effortHours: 3,
      roiScore: 96,
      issueId: 'DEBT-001',
      description: 'Adds strict Zod payload guards to prevent unhandled rejection during payment webhook processing.'
    },
    {
      id: 'ACT-2',
      rank: 2,
      title: 'Restrict CORS Whitelist in server/index.js',
      impact: 'High',
      risk: 'High',
      effort: '1 hour',
      effortHours: 1,
      roiScore: 92,
      issueId: 'SEC-101',
      description: 'Replaces wildcard CORS origin header with explicit domain validation.'
    }
  ];

  const sprintTasks: SprintTask[] = [
    { id: 's-1', title: 'Fix Payment Service payload validation in paymentService.ts', issueId: 'DEBT-001', category: 'security', severity: 'critical', effortHours: 3, completed: false, assignee: 'dev-team' },
    { id: 's-2', title: 'Restrict CORS headers in server/index.js', issueId: 'SEC-101', category: 'security', severity: 'high', effortHours: 1, completed: true, assignee: 'dev-team' },
  ];

  const initialMessages: ChatMessage[] = [
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello! I am **RepoMind Code Agent**. I have analyzed `RepoMind Demo Store` (8,420 LOC across 42 files).\n\nThe codebase has an overall stability index of **87 / 100**. What would you like to investigate?",
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'Explain React + Node + MongoDB architecture', action: 'explain_arch' },
        { label: 'Show top refactoring priorities', action: 'refactor_priority' },
        { label: 'Inspect payment service vulnerability', action: 'inspect_payment' }
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
    aiSummary: "facebook/react has a world-class monorepo architecture. Primary complexity resides in the React Fiber reconciler and concurrent scheduler routines.",
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
      impact: 'Work loop phase switching requires multi-way conditional checks.',
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
      impact: 'Potential client-side deserialization injection.',
      recommendedFix: 'Assert schema integrity before invoking flight action resolver.',
      cve: 'CVE-2024-4321'
    }
  ];

  const dependencies: DependencyItem[] = [
    { id: 'rd-1', package: 'rollup', current: '4.9.0', latest: '4.22.0', vulnerabilities: 0, status: 'outdated', risk: 'low' },
    { id: 'rd-2', package: 'jest', current: '29.7.0', latest: '29.7.0', vulnerabilities: 0, status: 'up_to_date', risk: 'low' },
  ];

  const codeQualityFiles: CodeQualityFile[] = [
    { file: 'packages/react-reconciler/src/ReactFiberWorkLoop.js', loc: 1420, sloc: 1180, functions: 42, classes: 0, avgComplexity: 8.4, maintainabilityIndex: 64, smellsCount: 18, hasBareExcepts: false, missingDocstrings: 8 },
  ];

  const archNodes: ArchNode[] = [
    { id: 'core', name: 'React Core & Hooks API', type: 'frontend', fileCount: 140, dependenciesCount: 5, complexity: 'Low', debtCount: 12, risk: 'Low', status: 'healthy' },
    { id: 'reconciler', name: 'React Fiber Reconciler', type: 'service', fileCount: 380, dependenciesCount: 18, complexity: 'Critical', debtCount: 94, risk: 'High', status: 'critical' },
  ];

  const archEdges: ArchEdge[] = [
    { source: 'reconciler', target: 'core' },
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
      text: "Hello! I am **RepoMind Code Agent**. I have analyzed `facebook/react` (412,000 LOC across 2,450 files).",
      timestamp: 'Just now'
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
    aiSummary: "expressjs/express is a lightweight Node.js web framework. The primary technical debt resides in legacy router middleware dispatching routines.",
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
  ];

  const codeQualityFiles: CodeQualityFile[] = [
    { file: 'lib/router/index.js', loc: 640, sloc: 520, functions: 22, classes: 0, avgComplexity: 7.1, maintainabilityIndex: 68, smellsCount: 11, hasBareExcepts: false, missingDocstrings: 4 },
  ];

  const archNodes: ArchNode[] = [
    { id: 'app', name: 'Express Application API', type: 'api', fileCount: 8, dependenciesCount: 6, complexity: 'Low', debtCount: 4, risk: 'Low', status: 'healthy' },
  ];

  const archEdges: ArchEdge[] = [];

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
      text: "Hello! I am **RepoMind Code Agent**. I have analyzed `expressjs/express` (14,200 LOC across 48 JavaScript files).",
      timestamp: 'Just now'
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
  
  let hash = 0;
  for (let i = 0; i < fullName.length; i++) {
    hash = (hash << 5) - hash + fullName.charCodeAt(i);
    hash |= 0;
  }
  const posHash = Math.abs(hash);

  const healthScore = 70 + (posHash % 24);
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
    aiSummary: `${fullName} has an overall health index of ${healthScore}/100 across ${totalFiles} analyzed files. Primary maintainability risks involve state coupling in core service modules.`,
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
      impact: 'Complex nested conditional branches increase regression risk.',
      effortHours: 6,
      recommendation: 'Refactor main process dispatcher into strategy pattern sub-handlers.',
      status: 'open',
      author: owner,
      updatedAt: '1 day ago'
    }
  ];

  const securityFindings: SecurityFinding[] = [
    {
      id: 'SEC-GEN-101',
      title: 'Input Parameter Sanitization Warning',
      severity: 'high',
      file: `src/services/apiService.ts`,
      line: 78,
      explanation: 'User supplied parameters forwarded to worker runner without type assertion.',
      impact: 'Potential parameter tampering risk.',
      recommendedFix: 'Add strict Zod or JSON schema guard before invoking execution context.'
    }
  ];

  const dependencies: DependencyItem[] = [
    { id: 'gd-1', package: 'typescript', current: '5.2.0', latest: '5.6.2', vulnerabilities: 0, status: 'outdated', risk: 'low' },
  ];

  const codeQualityFiles: CodeQualityFile[] = [
    { file: `src/controllers/${repo}Controller.ts`, loc: 420, sloc: 340, functions: 16, classes: 1, avgComplexity: 7.2, maintainabilityIndex: 66, smellsCount: 8, hasBareExcepts: false, missingDocstrings: 2 },
  ];

  const archNodes: ArchNode[] = [
    { id: 'ui', name: `${repo} Frontend Layer`, type: 'frontend', fileCount: Math.round(totalFiles * 0.4), dependenciesCount: 6, complexity: 'Medium', debtCount: Math.round(totalIssues * 0.3), risk: 'Medium', status: 'warning' },
  ];

  const archEdges: ArchEdge[] = [];

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
      text: `Hello! I am **RepoMind Code Agent**. I have completed repository intelligence analysis for \`${fullName}\`.`,
      timestamp: 'Just now'
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

// Export fallback dataset for compatibility
export const mockRepository: RepositoryMetadata = getDemoStoreDataset().metadata;
export const mockTechnicalDebtIssues = getDemoStoreDataset().debtIssues;
export const mockSecurityFindings = getDemoStoreDataset().securityFindings;
export const mockDependencies = getDemoStoreDataset().dependencies;
export const mockCodeQualityFiles = getDemoStoreDataset().codeQualityFiles;
export const mockArchNodes = getDemoStoreDataset().archNodes;
export const mockArchEdges = getDemoStoreDataset().archEdges;
export const mockPrioritizedActions = getDemoStoreDataset().prioritizedActions;
export const mockSprintTasks = getDemoStoreDataset().sprintTasks;
export const mockInitialChatMessages = getDemoStoreDataset().initialMessages;
