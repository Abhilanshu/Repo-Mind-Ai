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
  ChatMessage 
} from '../types/repomind';

export const mockRepository: RepositoryMetadata = {
  name: 'facefusion/facefusion',
  branch: 'master',
  url: 'https://github.com/facefusion/facefusion',
  totalFiles: 183,
  totalLoc: 18912,
  totalSloc: 15315,
  healthScore: 78,
  healthBreakdown: {
    codeQuality: 82,
    architecture: 74,
    security: 91,
    testing: 63,
    dependencies: 86,
    documentation: 58,
  },
  totalIssues: 147,
  issuesBreakdown: {
    critical: 8,
    high: 27,
    medium: 64,
    low: 48,
  },
  totalDebtHours: 184,
  debtHoursTrendDelta: -12,
  aiSummary: "Your repository has a healthy foundation, but the authentication, process execution, and UI manager layers contain significant complexity and duplicated logic. The largest maintainability risk comes from tightly coupled worker routines and insufficient automated testing in pipeline processors.",
  lastAnalyzed: '2026-09-28 23:45',
  repositoryType: 'Python/Gradio'
};

export const mockTechnicalDebtIssues: TechnicalDebtIssue[] = [
  {
    id: 'DEBT-001',
    title: 'High Cyclomatic Complexity & Tight Coupling in Core Execution Routine',
    severity: 'critical',
    category: 'architecture',
    file: 'facefusion/core.py',
    line: 142,
    impact: 'High risk of pipeline deadlocks, process stalling, and unhandled exception loops during inference runs.',
    effortHours: 8,
    recommendation: 'Decompose core execution steps into isolated pipeline workers with explicit async state transitions.',
    status: 'open',
    author: 'henry-g',
    updatedAt: '2 days ago',
    codeSnippet: `def process_step(step_index: int) -> bool:
    if state_manager.get_state() == 'running':
        for processor in get_processors():
            if not processor.pre_process():
                logger.error("Pre-process failed")
                return False
            try:
                processor.process_frame()
            except Exception:
                pass # Swallowing error without clean teardown`,
    aiFixPatch: `def process_step(step_index: int) -> bool:
    if state_manager.get_state() != 'running':
        return False
    for processor in get_processors():
        result = processor.execute_safe()
        if not result.success:
            logger.error(f"Processor {processor.name} failed: {result.error}")
            return False
    return True`
  },
  {
    id: 'DEBT-002',
    title: 'Duplicate Job Dispatcher & Queue Sync Logic',
    severity: 'critical',
    category: 'code_quality',
    file: 'facefusion/uis/components/job_manager.py',
    line: 88,
    impact: 'Redundant state mutations across Gradio components cause UI latency spikes and race conditions.',
    effortHours: 6,
    recommendation: 'Refactor job state synchronization into centralized ProcessManager event listener pattern.',
    status: 'open',
    author: 'dev-team',
    updatedAt: '1 day ago',
    codeSnippet: `def update_job_status(job_id, status):
    job = job_store.get(job_id)
    job.status = status
    job_list.render()
    job_runner.sync_state() # Duplicated call across 4 components`,
  },
  {
    id: 'DEBT-003',
    title: 'Bare Exception Handler Swallowing Runtime Crashes',
    severity: 'high',
    category: 'code_quality',
    file: 'facefusion/conda.py',
    line: 24,
    impact: 'Makes environment setup diagnostics silent, hiding missing package dependencies on Windows systems.',
    effortHours: 3,
    recommendation: 'Replace bare except with specific SubprocessError and FileNotFoundError handling.',
    status: 'open',
    author: 'vittolia',
    updatedAt: '3 days ago',
    codeSnippet: `try:
    subprocess.check_output(['conda', 'info'])
except:
    pass`,
    aiFixPatch: `try:
    subprocess.check_output(['conda', 'info'], stderr=subprocess.STDOUT)
except (subprocess.CalledProcessError, FileNotFoundError) as err:
    logger.warning(f"Conda environment detection failed: {err}")`
  },
  {
    id: 'DEBT-004',
    title: 'Hardcoded Stream Buffer Offsets in Video Streamer',
    severity: 'high',
    category: 'performance',
    file: 'facefusion/streamer.py',
    line: 67,
    impact: 'Causes frame dropping and memory leaks on high-framerate 4K streams.',
    effortHours: 5,
    recommendation: 'Use dynamic frame boundary calculations derived from OpenCV capture parameters.',
    status: 'in_progress',
    author: 'alex-m',
    updatedAt: '4 hours ago'
  },
  {
    id: 'DEBT-005',
    title: 'Missing Type Annotations in Model Helper Interface',
    severity: 'medium',
    category: 'documentation',
    file: 'facefusion/model_helper.py',
    line: 35,
    impact: 'Reduces IDE autocomplete accuracy and increases chance of type error propagation in inference runners.',
    effortHours: 2,
    recommendation: 'Add strict Python 3.12 type hints to model loading signatures.',
    status: 'open',
    author: 'vittolia',
    updatedAt: '5 days ago'
  },
  {
    id: 'DEBT-006',
    title: 'Untested Processor Fallback Routines',
    severity: 'medium',
    category: 'testing',
    file: 'tests/test_processors.py',
    line: 12,
    impact: 'Live portrait and pixel boost fallback paths lack automated test verification.',
    effortHours: 4,
    recommendation: 'Add unit tests using pytest fixture mocks for CUDA OOM scenarios.',
    status: 'open',
    author: 'qa-agent',
    updatedAt: '1 week ago'
  },
  {
    id: 'DEBT-007',
    title: 'Unused Import References in Normalizer',
    severity: 'low',
    category: 'code_quality',
    file: 'facefusion/normalizer.py',
    line: 4,
    impact: 'Minor clutter in module loading namespace.',
    effortHours: 1,
    recommendation: 'Clean up unused math and sys imports.',
    status: 'resolved',
    author: 'bot-auto',
    updatedAt: 'Yesterday'
  }
];

export const mockSecurityFindings: SecurityFinding[] = [
  {
    id: 'SEC-101',
    title: 'Unsafe Subprocess Shell Execution Pattern',
    severity: 'critical',
    file: 'facefusion/program_helper.py',
    line: 42,
    explanation: 'User input parameters passed to external shell commands without sanitize validation.',
    impact: 'Potential arbitrary command injection on host workstation if CLI flags contain shell metastring sequences.',
    recommendedFix: 'Use list-based arguments in subprocess.run(args, shell=False) with strict sanitizer.validate_path().',
    codeSnippet: `os.system(f"ffmpeg -i {user_input_path} -vf scale=1280:-1 {output_path}")`,
  },
  {
    id: 'SEC-102',
    title: 'Insecure Model File Checksum Verification',
    severity: 'high',
    file: 'facefusion/inference_manager.py',
    line: 89,
    explanation: 'Model weight files downloaded from external mirror URLs are verified using MD5 instead of SHA-256.',
    impact: 'Risk of spoofed model weights execution via collision attack.',
    recommendedFix: 'Enforce SHA-256 hash validation for ONNX weight artifacts.',
    cve: 'CWE-328'
  },
  {
    id: 'SEC-103',
    title: 'Exposed Temporary Directory File Permissions',
    severity: 'medium',
    file: 'facefusion/temp_helper.py',
    line: 18,
    explanation: 'Temporary frame cache directory created with default system umask (world readable).',
    impact: 'Local users could inspect sensitive image frames processed in multi-user environment.',
    recommendedFix: 'Specify 0o700 permission mode when initializing temp directory storage.',
  },
  {
    id: 'SEC-104',
    title: 'Outdated ONNX Runtime Dependency',
    severity: 'low',
    file: 'requirements.txt',
    line: 8,
    explanation: 'onnxruntime package version 1.16 has known buffer boundary warning in legacy GPU execution provider.',
    impact: 'Low probability memory instability on specific CUDA drivers.',
    recommendedFix: 'Bump onnxruntime-gpu >= 1.18.0 in requirements.txt',
    cve: 'CVE-2024-21650'
  }
];

export const mockDependencies: DependencyItem[] = [
  { id: 'dep-1', package: 'onnxruntime-gpu', current: '1.16.3', latest: '1.19.2', vulnerabilities: 1, status: 'vulnerable', risk: 'high' },
  { id: 'dep-2', package: 'opencv-python', current: '4.8.1.78', latest: '4.10.0.84', vulnerabilities: 0, status: 'outdated', risk: 'medium' },
  { id: 'dep-3', package: 'gradio', current: '4.20.0', latest: '4.44.0', vulnerabilities: 0, status: 'outdated', risk: 'low' },
  { id: 'dep-4', package: 'numpy', current: '1.26.4', latest: '2.1.1', vulnerabilities: 0, status: 'up_to_date', risk: 'low' },
  { id: 'dep-5', package: 'torch', current: '2.2.0', latest: '2.4.1', vulnerabilities: 0, status: 'up_to_date', risk: 'low' },
  { id: 'dep-6', package: 'scipy', current: '1.11.4', latest: '1.14.1', vulnerabilities: 0, status: 'unused', risk: 'low' },
  { id: 'dep-7', package: 'pillow', current: '10.2.0', latest: '10.4.0', vulnerabilities: 1, status: 'vulnerable', risk: 'critical' },
  { id: 'dep-8', package: 'tqdm', current: '4.66.1', latest: '4.66.5', vulnerabilities: 0, status: 'up_to_date', risk: 'low' },
];

export const mockCodeQualityFiles: CodeQualityFile[] = [
  { file: 'facefusion/core.py', loc: 339, sloc: 285, functions: 13, classes: 0, avgComplexity: 7.85, maintainabilityIndex: 63, smellsCount: 14, hasBareExcepts: false, missingDocstrings: 4 },
  { file: 'facefusion/conda.py', loc: 41, sloc: 35, functions: 1, classes: 0, avgComplexity: 9.0, maintainabilityIndex: 63, smellsCount: 5, hasBareExcepts: true, missingDocstrings: 1 },
  { file: 'facefusion/uis/components/job_manager.py', loc: 194, sloc: 160, functions: 7, classes: 0, avgComplexity: 6.86, maintainabilityIndex: 69, smellsCount: 8, hasBareExcepts: false, missingDocstrings: 2 },
  { file: 'facefusion/normalizer.py', loc: 33, sloc: 28, functions: 3, classes: 0, avgComplexity: 6.67, maintainabilityIndex: 73, smellsCount: 3, hasBareExcepts: false, missingDocstrings: 1 },
  { file: 'facefusion/inference_manager.py', loc: 121, sloc: 98, functions: 6, classes: 0, avgComplexity: 5.0, maintainabilityIndex: 78, smellsCount: 4, hasBareExcepts: false, missingDocstrings: 2 },
  { file: 'facefusion/streamer.py', loc: 99, sloc: 82, functions: 3, classes: 0, avgComplexity: 5.67, maintainabilityIndex: 76, smellsCount: 4, hasBareExcepts: false, missingDocstrings: 0 },
  { file: 'facefusion/program_helper.py', loc: 31, sloc: 26, functions: 3, classes: 0, avgComplexity: 5.33, maintainabilityIndex: 78, smellsCount: 3, hasBareExcepts: false, missingDocstrings: 1 },
  { file: 'facefusion/state_manager.py', loc: 64, sloc: 52, functions: 5, classes: 0, avgComplexity: 3.2, maintainabilityIndex: 88, smellsCount: 1, hasBareExcepts: false, missingDocstrings: 0 }
];

export const mockArchNodes: ArchNode[] = [
  { id: 'ui_layer', name: 'UI Components (Gradio)', type: 'frontend', fileCount: 42, dependenciesCount: 8, complexity: 'High', debtCount: 19, risk: 'Medium', status: 'warning' },
  { id: 'job_manager', name: 'Job Manager & Queue', type: 'service', fileCount: 12, dependenciesCount: 6, complexity: 'High', debtCount: 14, risk: 'High', status: 'critical' },
  { id: 'core_engine', name: 'Core Pipeline Execution', type: 'service', fileCount: 18, dependenciesCount: 14, complexity: 'Critical', debtCount: 28, risk: 'High', status: 'critical' },
  { id: 'processors', name: 'Frame Processors (Swapper/Enhancer)', type: 'module', fileCount: 64, dependenciesCount: 10, complexity: 'Medium', debtCount: 22, risk: 'Medium', status: 'warning' },
  { id: 'inference', name: 'ONNX/CUDA Inference Runner', type: 'module', fileCount: 15, dependenciesCount: 5, complexity: 'Medium', debtCount: 9, risk: 'Low', status: 'healthy' },
  { id: 'utils', name: 'State & Media Helpers', type: 'module', fileCount: 22, dependenciesCount: 3, complexity: 'Low', debtCount: 5, risk: 'Low', status: 'healthy' },
];

export const mockArchEdges: ArchEdge[] = [
  { source: 'ui_layer', target: 'job_manager' },
  { source: 'job_manager', target: 'core_engine' },
  { source: 'core_engine', target: 'processors' },
  { source: 'processors', target: 'inference' },
  { source: 'core_engine', target: 'utils' },
  { source: 'job_manager', target: 'core_engine', isCircular: true }, // Circular dependency!
];

export const mockPrioritizedActions: PrioritizedAction[] = [
  {
    id: 'ACT-1',
    rank: 1,
    title: 'Sanitize Subprocess Calls in program_helper.py',
    impact: 'High',
    risk: 'Critical',
    effort: '1 hour',
    effortHours: 1,
    roiScore: 98,
    issueId: 'SEC-101',
    description: 'Eliminates shell command injection risk across external ffmpeg and media tooling commands.'
  },
  {
    id: 'ACT-2',
    rank: 2,
    title: 'Decompose core.py Pipeline Dispatch Loop',
    impact: 'High',
    risk: 'High',
    effort: '8 hours',
    effortHours: 8,
    roiScore: 92,
    issueId: 'DEBT-001',
    description: 'Reduces cyclomatic complexity from 9.0 to < 4.0 and prevents silent pipeline thread hangs.'
  },
  {
    id: 'ACT-3',
    rank: 3,
    title: 'Centralize Job Manager State Synchronization',
    impact: 'Medium',
    risk: 'High',
    effort: '6 hours',
    effortHours: 6,
    roiScore: 86,
    issueId: 'DEBT-002',
    description: 'Removes 4x duplicated rendering sync calls, boosting UI responsiveness by ~45%.'
  },
  {
    id: 'ACT-4',
    rank: 4,
    title: 'Replace Bare Exception Blocks in conda.py',
    impact: 'Medium',
    risk: 'Medium',
    effort: '3 hours',
    effortHours: 3,
    roiScore: 81,
    issueId: 'DEBT-003',
    description: 'Surfaces explicit environment setup errors during initial installer onboarding.'
  }
];

export const mockSprintTasks: SprintTask[] = [
  { id: 'sp-1', title: 'Fix command injection in program_helper.py', issueId: 'SEC-101', category: 'security', severity: 'critical', effortHours: 1, completed: true, assignee: 'vittolia' },
  { id: 'sp-2', title: 'Refactor core.py pipeline dispatch loop', issueId: 'DEBT-001', category: 'architecture', severity: 'critical', effortHours: 8, completed: false, assignee: 'vittolia' },
  { id: 'sp-3', title: 'Centralize Job Manager state sync', issueId: 'DEBT-002', category: 'code_quality', severity: 'high', effortHours: 6, completed: false, assignee: 'alex-m' },
  { id: 'sp-4', title: 'Replace bare exception blocks in conda.py', issueId: 'DEBT-003', category: 'code_quality', severity: 'high', effortHours: 3, completed: false, assignee: 'vittolia' },
  { id: 'sp-5', title: 'Upgrade pillow and onnxruntime dependencies', issueId: 'SEC-104', category: 'dependencies', severity: 'medium', effortHours: 1, completed: false, assignee: 'bot-auto' },
];

export const mockInitialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: "Hello! I am **RepoMind AI**, your senior software architect assistant. I have performed a static analysis of `facefusion/facefusion` (18,912 lines of code across 183 Python files).\n\nWhat would you like to investigate today?",
    timestamp: 'Just now',
    suggestedActions: [
      { label: 'Why is technical debt increasing?', action: 'debt_trend' },
      { label: 'Which files should I refactor first?', action: 'refactor_priority' },
      { label: 'Explain the architecture of this project', action: 'explain_arch' },
      { label: 'Where are the security vulnerabilities?', action: 'security_audit' }
    ]
  }
];
