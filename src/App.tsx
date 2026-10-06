import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import { MarketingLayout } from './layouts/MarketingLayout';
import { AppLayout } from './layouts/AppLayout';

// Public Marketing Pages
import { LandingPage } from './components/LandingPage';
import { ProductPage } from './pages/marketing/ProductPage';
import { FeaturesPage } from './pages/marketing/FeaturesPage';
import { SolutionsPage } from './pages/marketing/SolutionsPage';
import { SecurityPage as PublicSecurityPage } from './pages/marketing/SecurityPage';
import { PricingPage } from './pages/marketing/PricingPage';
import { DocsPage } from './pages/marketing/DocsPage';
import { AboutPage } from './pages/marketing/AboutPage';
import { ContactPage } from './pages/marketing/ContactPage';

// Authentication Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { SsoPage } from './pages/auth/SsoPage';

// Protected Application Pages (/app/*)
import { OverviewPage } from './pages/app/OverviewPage';
import { ProjectsPage } from './pages/app/ProjectsPage';
import { TechnicalDebtPage } from './pages/app/TechnicalDebtPage';
import { SecurityPage as AppSecurityPage } from './pages/app/SecurityPage';
import { DependenciesPage } from './pages/app/DependenciesPage';
import { CodeQualityPage } from './pages/app/CodeQualityPage';
import { TestingPage } from './pages/app/TestingPage';
import { ArchitecturePage } from './pages/app/ArchitecturePage';
import { AgentPage } from './pages/app/AgentPage';
import { SprintPage } from './pages/app/SprintPage';
import { ReportsPage } from './pages/app/ReportsPage';
import { SettingsPage } from './pages/app/SettingsPage';
import { NotFoundPage } from './pages/app/NotFoundPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          {/* 1. PUBLIC MARKETING WEBSITE ROUTES */}
          <Route path="/" element={<MarketingLayout />}>
            <Route index element={<LandingPage onStartAnalysis={() => {}} onExploreDemo={() => {}} />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="solutions" element={<SolutionsPage />} />
            <Route path="security" element={<PublicSecurityPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="docs" element={<DocsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* 2. AUTHENTICATION ROUTES */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/sso" element={<SsoPage />} />

          {/* 3. PROTECTED SAAS APPLICATION ROUTES (/app/*) */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:projectId" element={<ProjectsPage />} />
            <Route path="issues" element={<TechnicalDebtPage />} />
            <Route path="technical-debt" element={<TechnicalDebtPage />} />
            <Route path="security" element={<AppSecurityPage />} />
            <Route path="dependencies" element={<DependenciesPage />} />
            <Route path="code-quality" element={<CodeQualityPage />} />
            <Route path="testing" element={<TestingPage />} />
            <Route path="architecture" element={<ArchitecturePage />} />
            <Route path="agent" element={<AgentPage />} />
            <Route path="sprint" element={<SprintPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* 4. CATCH-ALL 404 ROUTE */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
