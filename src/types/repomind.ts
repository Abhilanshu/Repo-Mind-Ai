export type NavigationTab = 
  | 'overview' 
  | 'architecture' 
  | 'debt' 
  | 'security' 
  | 'dependencies' 
  | 'quality' 
  | 'testing' 
  | 'ai_assistant' 
  | 'sprint' 
  | 'reports' 
  | 'settings';

export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type IssueCategory = 'architecture' | 'code_quality' | 'security' | 'testing' | 'performance' | 'dependencies' | 'documentation';
export type IssueStatus = 'open' | 'in_progress' | 'resolved';

export interface HealthBreakdown {
  codeQuality: number;
  architecture: number;
  security: number;
  testing: number;
  dependencies: number;
  documentation: number;
}

export interface TechnicalDebtIssue {
  id: string;
  title: string;
  severity: Severity;
  category: IssueCategory;
  file: string;
  line: number;
  impact: string;
  effortHours: number;
  recommendation: string;
  status: IssueStatus;
  codeSnippet?: string;
  aiFixPatch?: string;
  author?: string;
  updatedAt: string;
}

export interface SecurityFinding {
  id: string;
  title: string;
  severity: Severity;
  file: string;
  line: number;
  explanation: string;
  impact: string;
  recommendedFix: string;
  cve?: string;
  codeSnippet?: string;
}

export interface DependencyItem {
  id: string;
  package: string;
  current: string;
  latest: string;
  vulnerabilities: number;
  status: 'up_to_date' | 'outdated' | 'vulnerable' | 'unused';
  risk: Severity;
}

export interface CodeQualityFile {
  file: string;
  loc: number;
  sloc: number;
  functions: number;
  classes: number;
  avgComplexity: number;
  maintainabilityIndex: number;
  smellsCount: number;
  hasBareExcepts: boolean;
  missingDocstrings: number;
}

export interface ArchNode {
  id: string;
  name: string;
  type: 'frontend' | 'api' | 'service' | 'module' | 'database' | 'external';
  fileCount: number;
  dependenciesCount: number;
  complexity: 'Low' | 'Medium' | 'High' | 'Critical';
  debtCount: number;
  risk: 'Low' | 'Medium' | 'High';
  status: 'healthy' | 'warning' | 'critical';
}

export interface ArchEdge {
  source: string;
  target: string;
  isCircular?: boolean;
}

export interface PrioritizedAction {
  id: string;
  rank: number;
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  effort: string;
  effortHours: number;
  roiScore: number;
  issueId: string;
  description: string;
}

export interface SprintTask {
  id: string;
  title: string;
  issueId: string;
  category: IssueCategory;
  severity: Severity;
  effortHours: number;
  completed: boolean;
  assignee?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  suggestedActions?: { label: string; action: string }[];
}

export interface RepositoryMetadata {
  name: string;
  branch: string;
  url: string;
  totalFiles: number;
  totalLoc: number;
  totalSloc: number;
  healthScore: number;
  healthBreakdown: HealthBreakdown;
  totalIssues: number;
  issuesBreakdown: Record<Severity, number>;
  totalDebtHours: number;
  debtHoursTrendDelta: number; // e.g. -12 for -12%
  aiSummary: string;
  lastAnalyzed: string;
  repositoryType: 'Python/Gradio' | 'React/TypeScript' | 'Node/Express' | 'Multi-Module';
}
