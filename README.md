# 🧠 RepoMind — Repository Intelligence & Engineering Productivity Platform

> **Turn complex software codebases into actionable engineering intelligence with RepoMind AI, Enterprise SAML SSO, Dual GitHub Engine Integration, and Real Mobile WhatsApp Alerts.**

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE.md)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8.svg)](https://tailwindcss.com/)
[![Express & Mongoose](https://img.shields.io/badge/Node--Express-Mongoose_8.0-green.svg)](server/server.js)
[![WhatsApp API](https://img.shields.io/badge/WhatsApp_Notifier-CallMeBot-25D366.svg)](src/components/WhatsAppNotificationModal.tsx)

---

## 📌 Executive Overview

**RepoMind** is a modern, commercial-grade SaaS engineering intelligence platform designed for software architects, lead developers, engineering managers, and security auditors. It transforms thousands of lines of code across multi-language repositories into clear, prioritized technical debt remediations, architectural topology graphs, automated Pytest suites, and permission-based AI code refactoring.

---

## 🎨 Warm Premium SaaS Design System

The application features a warm, modern off-white commercial SaaS visual system:
* **Main Background**: `#F7F5F2` (warm ivory)
* **Primary Cards**: `#FFFFFF` (layered elevation with soft shadows)
* **Brand Primary Accent**: `#6D4AFF` (soft violet/lavender)
* **Domain Indicators**: Soft Red (Security), Soft Blue (Testing), Soft Amber (Dependencies), Soft Green (Health).

---

## ✅ COMPLETE FEATURES & CAPABILITIES (Up to Date)

### 1. 🔑 Enterprise Authentication & SAML SSO (`AuthModal.tsx`)
- [x] **Sign In & Sign Up**: Developer authentication supporting user roles (*Senior Architect, Full Stack Developer, Security Specialist, Engineering Manager*).
- [x] **Enterprise SAML SSO**: Single Sign-On support for enterprise providers (*Okta, Azure AD, SAML 2.0*).
- [x] **Social OAuth**: GitHub and Google Workspace authentication shortcuts.
- [x] **Session Persistence**: User profile and entitlement state saved across browser sessions via `localStorage` (`repomind_user`).

### 2. 🐙 Dual GitHub Engine Integrations
Integrated features synthesized from leading open-source repositories:
- [x] **`repowise-dev / repowise` (AST Static Analysis Engine)**:
  - Multi-language AST static analysis (Python, TypeScript, React, Node.js).
  - Cyclomatic complexity & Halstead maintainability markers.
  - Interactive circular dependency grapher (`job_manager ⇄ core_engine`).
  - Technical debt hour payback estimation.
- [x] **`Oussamcsc / codebase-intelligence` (AI Code Agent & Testing Engine)**:
  - Permission-gated AI refactoring agent (`[✅ Approve & Apply Fix]`).
  - Automated Pytest & Jest test path generator (76%+ target coverage).
  - OWASP Top 10 security vulnerability scanner.
  - Agile sprint task backlog generator with CSV export.

### 3. 🍃 Express & Mongoose ODM Backend (`server/server.js`)
- [x] **MongoDB & Mongoose Models**:
  - `Repository.js`: Repository metadata, health scores, LOC, maintainability index.
  - `TechnicalDebtIssue.js`: Debt taxonomy, effort hours, category, file locations.
  - `SecurityFinding.js`: Vulnerability scanner records and fix recommendations.
  - `WhatsAppConfig.js`: Phone notification preferences and dispatch logs.
- [x] **Express REST Endpoints**: `/api/health`, `/api/repositories`, `/api/repositories/analyze`, `/api/debt-issues`, `/api/whatsapp/send`, `/api/ai/chat`.

### 4. 📱 Real Mobile WhatsApp AI Chatbot Notifier (`WhatsAppNotificationModal.tsx`)
- [x] **CallMeBot API & Deep-Link Dispatch**: Sends instant WhatsApp alert notifications directly to mobile phones (`+91 ...`).
- [x] **Automated Trigger Conditions**:
  - 🟢 Repository analysis completed
  - 🔴 Critical security vulnerabilities detected
  - 🧹 Code refactor patch applied by AI Agent
  - 📅 Sprint Action Plan generated.

### 5. 📊 Interactive Dashboard & Tools
- [x] **Overview & Health Scorecard**: 0–100 stability index with 6-pillar breakdown (*Code Quality, Architecture, Security, Testing, Dependencies, Documentation*).
- [x] **Technical Debt Explorer**: Filterable issue catalog with ROI ranking formula:
  $$\text{ROI Score} = \frac{(\text{Impact} \times 0.35) + (\text{Risk} \times 0.35) + (\text{Frequency} \times 0.15)}{\text{Effort}}$$
- [x] **Supply Chain Dependency Intelligence**: Outdated & vulnerable package audits with 1-click CLI upgrade commands (`pip install --upgrade ...`).
- [x] **Report Generator**: Stakeholder report export to downloadable PDF/HTML, JSON, and Markdown formats.
- [x] **Global Command Palette**: Instant modal search triggered via `Ctrl+K` / `⌘K`.

---

## 🏗️ System Architecture & Data Flow

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   Vite + React 19 SaaS Web Dashboard                   │
│          (#F7F5F2 Warm Theme, Header, Sidebar, Health Scorecard)       │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 Express & Mongoose ODM Backend (server.js)              │
│    Endpoints: /api/repositories, /api/debt-issues, /api/whatsapp/send │
└────────────────────────────────────────────────────────────────────────┘
                 │                                       │
                 ▼                                       ▼
┌─────────────────────────────────┐     ┌────────────────────────────────┐
│   MongoDB Database Instance     │     │  CallMeBot WhatsApp Push API   │
│   (Mongoose Schemas & Data)     │     │  Sends alerts to Mobile Phone  │
└─────────────────────────────────┘     └────────────────────────────────┘
```

---

## ⚡ Local Installation & Run Commands

### Prerequisites
- **Node.js**: `>= 18.0.0`
- **npm**: `>= 9.0.0`

### 1. Clone the Repository
```bash
git clone https://github.com/Abhilanshu/Repo-Mind-Ai.git
cd Repo-Mind-Ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Web Dashboard (Vite Frontend)
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Run Express & Mongoose Server (Backend API)
```bash
npm run server
```
Backend API will listen on **[http://localhost:5000](http://localhost:5000)**.

---

## 👥 Group Project Team Work Distribution (4 Members)

| Team Member | Role / Domain | Primary Files Owned | Core Responsibilities |
| :--- | :--- | :--- | :--- |
| **Member 1** | **Frontend Architect & UI Lead** | `ProjectsView.tsx`, `LandingPage.tsx`, `Header.tsx`, `Sidebar.tsx`, `CommandPalette.tsx`, `HealthScoreCard.tsx` | Design system (#F7F5F2), responsive layout, Projects Registry & dashboard navigation |
| **Member 2** | **Static Analysis Lead** | `CodeQualityView.tsx`, `DependencyGraphView.tsx`, `FileIntelligenceModal.tsx`, `DependencyIntelligence.tsx` | AST parser algorithms, cyclomatic complexity metrics & Repowise dependency graphing |
| **Member 3** | **Security & Debt Lead** | `SecurityDashboard.tsx`, `TechnicalDebtExplorer.tsx`, `PrioritizationEngine.tsx`, `SprintPlannerView.tsx` | Static vulnerability scanner, ROI debt prioritization formula & sprint planning |
| **Member 4** | **AI & Backend Lead** | `AuthModal.tsx`, `ArchitectureView.tsx`, `AICodebaseAssistant.tsx`, `WhatsAppNotificationModal.tsx`, `server/server.js`, `server/models/` | Enterprise AuthModal, Mongoose ODM backend, RepoMind Code Agent permission system & WhatsApp API |

---

## 📄 License & Author

Developed by **Abhilanshu Vittolia & Group Project Team**.  
Licensed under the [MIT License](LICENSE.md).
