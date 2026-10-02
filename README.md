# 🧠 RepoMind AI — AI Software Repository Intelligence & Technical Debt Analyzer

> **Turn complex software codebases into actionable engineering intelligence.**

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE.md)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8.svg)](https://tailwindcss.com/)
[![Python AST Engine](https://img.shields.io/badge/Python_AST-3.12-3776ab.svg)](https://docs.python.org/3/library/ast.html)

---

## 📌 Executive Overview

**RepoMind AI** is a modern, production-grade SaaS engineering intelligence platform designed for software engineers, tech leads, engineering managers, and dev teams. It transforms thousands of lines of code into clear, prioritized technical debt remediations and architectural insights.

It systematically evaluates five critical dimensions of any software repository:
1. **What is wrong** with the codebase?
2. **Why does it matter** (business & engineering impact)?
3. **How serious is it** (critical, high, medium, low risk)?
4. **What should the team fix first** (algorithmic ROI ranking)?
5. **How much effort will it take** (estimated payback engineering hours)?

---

## ✨ Core Features & Platform Modules

```
Repository ➔ Code Intelligence Engine ➔ AST & Security Scan ➔ Debt Detection ➔ ROI Ranking ➔ Action Plan
```

* 🟣 **Futuristic AI Preloader**: Cyberpunk HUD neural core animation with real-time telemetry loading.
* 🏆 **Repository Health Scorecard**: 0–100 stability index with 6-pillar breakdown (*Code Quality, Architecture, Security, Testing, Dependencies, Documentation*).
* ⚠️ **Technical Debt Explorer**: Searchable 147-issue catalog with severity pills, category filters, and effort estimates.
* 🔥 **AI Prioritization Engine**: Algorithmic ranking formula:
  $$\text{ROI Score} = \frac{(\text{Impact} \times 0.35) + (\text{Risk} \times 0.35) + (\text{Frequency} \times 0.15)}{\text{Effort}}$$
* 🏗️ **Architecture Intelligence**: Interactive layer topology diagram featuring circular dependency detection.
* 🕸️ **Codebase Dependency Graph**: Interactive file call graph and maintainability cluster matrix.
* 🔐 **Security Center**: Static vulnerability scanner (e.g. command injection patterns) with automated AI fix patch generator.
* 🤖 **Ask Your Codebase (AI Assistant)**: Senior AI Architect chat UI with prompt chips, code snippet responses, and copy blocks.
* 📅 **AI Sprint Planner**: Backlog task board with effort indicators and export to Jira / GitHub Issues.
* 📄 **Executive Health Report Generator**: Exportable PDF, JSON, and Markdown report generator for stakeholders.
* ⌘ **Global Command Palette**: Instant `Ctrl+K` / `⌘K` keyboard search modal.

---

## 🏗️ System Architecture & Data Flow

```
+-------------------------------------------------------------------------+
|                  Vite + React 19 Glassmorphic Dashboard                 |
|       (Header, Sidebar, Preloader, Health Scorecard, Command Palette)   |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                Python REST API Server (repomind_server.py)               |
|            Serves endpoints: /api/repositories, /api/ai/chat            |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                AST Static Parsing Engine (analyze_repo.py)              |
|        Computes: LOC, Cyclomatic Complexity, Maintainability Index      |
+-------------------------------------------------------------------------+
```

---

## ⚡ Local Installation & Usage Guide

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

### 4. Build for Production
```bash
npm run build
```

### 5. Start Python REST API Backend (Optional)
```bash
python repomind_server.py
```
Backend API will listen on **[http://localhost:5000](http://localhost:5000)**.

---

## 👥 Group Project Team Work Distribution (4 Members)

| Team Member | Role / Domain | Primary Files Owned | Core Responsibilities |
| :--- | :--- | :--- | :--- |
| **Member 1** | **Frontend Architect & UI Lead** | `Preloader.tsx`, `LandingPage.tsx`, `Header.tsx`, `Sidebar.tsx`, `CommandPalette.tsx`, `HealthScoreCard.tsx` | Design system, AI Preloader, responsive glassmorphism layout & dashboard navigation |
| **Member 2** | **Static Analysis Lead** | `analyze_repo.py`, `CodeQualityView.tsx`, `DependencyGraphView.tsx`, `FileIntelligenceModal.tsx` | Python AST parser, cyclomatic complexity metrics & Maintainability Index |
| **Member 3** | **Security & Debt Lead** | `SecurityDashboard.tsx`, `TechnicalDebtExplorer.tsx`, `PrioritizationEngine.tsx`, `SprintPlannerView.tsx` | Static vulnerability scanner, ROI prioritization formula & sprint planning |
| **Member 4** | **AI & Backend Lead** | `ArchitectureView.tsx`, `AICodebaseAssistant.tsx`, `ReportGeneratorModal.tsx`, `repomind_server.py` | Architecture topology graph, Senior AI Assistant chat & REST API server |

---

## 📄 License & Author

Developed by **Abhilanshu Vittolia & Team**.  
Licensed under the [MIT License](LICENSE.md).
