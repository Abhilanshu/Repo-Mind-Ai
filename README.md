# 🧠 RepoMind — Repository Intelligence & Engineering Productivity Platform

> **Turn complex software codebases into actionable engineering intelligence with RepoMind AI & Real Mobile WhatsApp Alerts.**

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE.md)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8.svg)](https://tailwindcss.com/)
[![Python REST API](https://img.shields.io/badge/Python_Backend-3.12-3776ab.svg)](repomind_server.py)
[![WhatsApp API](https://img.shields.io/badge/WhatsApp_Notifier-CallMeBot-25D366.svg)](src/components/WhatsAppNotificationModal.tsx)

---

## 📌 Executive Overview

**RepoMind** is a modern, production-grade SaaS engineering intelligence platform designed for software engineers, tech leads, engineering managers, and dev teams. It transforms thousands of lines of code into clear, prioritized technical debt remediations, architectural insights, and automated AI fix patches.

---

## ✅ WORK COMPLETED (Finished Capabilities)

Here is the complete breakdown of all completed features, modules, and infrastructure in the project:

### 1. 🧠 Dynamic Repository Intelligence & AST Parser
- [x] **Dynamic Multi-Repo Input**: Supports analyzing any custom GitHub URL or repository (`Abhilanshu/Repo-Mind-Ai`, `facebook/react`, `expressjs/express`, custom ZIP files).
- [x] **Python AST Analysis Engine (`analyze_repo.py`)**: Computes empirical metrics:
  - Lines of Code (LOC, SLOC)
  - Cyclomatic Complexity per function
  - Maintainability Index (0–100)
  - Bare exception detection & missing docstrings.

### 2. 🤖 RepoMind Permission-Based Code Agent
- [x] **Approval Workflow**: Asks for explicit engineer approval (`[✅ Approve & Apply Fix]`) before modifying codebase files.
- [x] **Empirical Error Diagnosis**: Inspects trace logs and generates refactoring patches.
- [x] **Commit History & Change Reporting**: Accurately answers query prompts like *"What changes were made to this repo?"* and lists full commit history.

### 3. 📱 Real Mobile WhatsApp AI Chatbot Notifier
- [x] **CallMeBot API Integration**: Delivers real WhatsApp notification alerts directly to the user's mobile phone number.
- [x] **WhatsApp Web Deep-Link Dispatch**: Prefills WhatsApp messages for instant 1-click delivery.
- [x] **Notification Triggers**: Instant alerts when:
  - 🟢 Repository analysis completes
  - 🔴 Critical security vulnerabilities are detected
  - 🧹 Code fix patches are applied by AI
  - 📅 Sprint Action Plan is generated.

### 4. 🎨 Commercial Engineering Intelligence Dashboard
- [x] **Software Projects Registry**: Project management grid (`ProjectsView.tsx`) displaying analyzed repositories, health scores, coverage %, and active status.
- [x] **Health Scorecard**: 0–100 stability index with 6-pillar breakdown (*Code Quality, Architecture, Security, Testing, Dependencies, Documentation*).
- [x] **Technical Debt Explorer**: Searchable issue catalog with severity filters, category selectors, and effort hours.
- [x] **AI Prioritization Engine**: Algorithmic ROI ranking formula:
  $$\text{ROI Score} = \frac{(\text{Impact} \times 0.35) + (\text{Risk} \times 0.35) + (\text{Frequency} \times 0.15)}{\text{Effort}}$$
- [x] **Architecture Topology & Call Graph**: Visual node graph featuring circular dependency detection (`job_manager ⇄ core_engine`).
- [x] **Security Center**: Static scanner for command injection & vulnerability remediation.
- [x] **Supply Chain Dependency Matrix**: Tracks outdated, vulnerable, and unused packages with 1-click upgrade commands.
- [x] **Testing Health Center**: Displays unit, integration, and E2E coverage gaps with automated Pytest mock generation.
- [x] **AI Sprint Planner**: Interactive task backlog with Jira / GitHub Issues CSV export.
- [x] **Report Generator Modal**: Instant export to downloadable PDF/HTML, JSON, and Markdown formats.
- [x] **Global Command Palette**: Keyboard search triggered via `Ctrl+K` / `⌘K`.

---

## ⏳ WHAT IS LEFT (Future Roadmap & Outstanding Tasks)

1. 🔄 **Multi-LLM Backend Provider Options**: Provider abstraction between Ollama (local offline LLM), Anthropic Claude 3.5 Sonnet, OpenAI GPT-4o, and Google Gemini.
2. 🪝 **Real-time GitHub Webhook Integration**: Auto-trigger repository analysis on `git push` or Pull Request creation via GitHub Webhooks.
3. 👥 **Role-Based Access Control (RBAC)**: Enterprise team permissions (Admin, Lead Engineer, Developer, Viewer).
4. ⚙️ **Custom Static Linting Rule Engine**: Custom AST rules and project-specific linting policies in Python/TypeScript.

---

## 🏗️ System Architecture & Data Flow

```
+-------------------------------------------------------------------------+
|                Vite + React 19 Engineering Dashboard                    |
|       (Header, Sidebar, Health Scorecard, Command Palette, Projects)    |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                Python REST API Server (repomind_server.py)               |
|    Endpoints: /api/repositories, /api/ai/chat, /api/whatsapp/send       |
+-------------------------------------------------------------------------+
                |                                       |
                v                                       v
+-------------------------------+       +-------------------------------+
|  AST Parsing Engine           |       |  CallMeBot WhatsApp Push API  |
|  (analyze_repo.py)            |       |  Sends alerts to Mobile Phone |
+-------------------------------+       +-------------------------------+
```

---

## ⚡ Local Installation & Run Commands

### Prerequisites
- **Node.js**: `>= 18.0.0`
- **Python**: `>= 3.10`

### 1. Clone the Repository
```bash
git clone https://github.com/Abhilanshu/Repo-Mind-Ai.git
cd Repo-Mind-Ai
```

### 2. Install Node Dependencies
```bash
npm install
```

### 3. Run Development Web Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Start Python REST API Backend (Includes WhatsApp Push Server)
```bash
python repomind_server.py
```
Backend API will listen on **[http://localhost:5000](http://localhost:5000)**.

---

## 👥 Group Project Team Work Distribution (4 Members)

| Team Member | Role / Domain | Primary Files Owned | Core Responsibilities |
| :--- | :--- | :--- | :--- |
| **Member 1** | **Frontend Architect & UI Lead** | `ProjectsView.tsx`, `LandingPage.tsx`, `Header.tsx`, `Sidebar.tsx`, `CommandPalette.tsx`, `HealthScoreCard.tsx` | Design system, responsive layout, Projects Registry & dashboard navigation |
| **Member 2** | **Static Analysis Lead** | `analyze_repo.py`, `CodeQualityView.tsx`, `DependencyGraphView.tsx`, `FileIntelligenceModal.tsx` | Python AST parser, cyclomatic complexity metrics & Maintainability Index |
| **Member 3** | **Security & Debt Lead** | `SecurityDashboard.tsx`, `TechnicalDebtExplorer.tsx`, `PrioritizationEngine.tsx`, `SprintPlannerView.tsx` | Static vulnerability scanner, ROI prioritization formula & sprint planning |
| **Member 4** | **AI & Backend Lead** | `ArchitectureView.tsx`, `AICodebaseAssistant.tsx`, `WhatsAppNotificationModal.tsx`, `ReportGeneratorModal.tsx`, `repomind_server.py` | RepoMind Code Agent permission system, WhatsApp Bot backend API & PDF report generator |

---

## 📄 License & Author

Developed by **Abhilanshu Vittolia & Group Project Team**.  
Licensed under the [MIT License](LICENSE.md).
