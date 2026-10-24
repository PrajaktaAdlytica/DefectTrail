import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Preferences, ScrollReset } from "./lib";
import { InnerPageMotion } from "./components/InnerPageMotion";
import { MotionSystem } from "./components/MotionSystem";
import { Header, Footer, ConceptStrip } from "./components/Layout";
import { DemoProvider } from "./components/Workbench";
import { Home } from "./pages/Home";
import { ProductPage, ProductsPage } from "./pages/Products";
import { DemoPage, ReportPage, EvaluationWorkspace } from "./pages/Demo";
import {
  PlatformPage,
  PricingPage,
  EvaluationPage,
  SolutionsPage,
  SolutionPage,
  ResourcesPage,
  ArticlePage,
  FormPage,
  InfoPage,
  TrustPage,
  AccessibilityPage,
  SignInPage,
  NotFound,
} from "./pages/Editorial";

function AppRoutes() {
  return (
    <>
      <MotionSystem />
      <ScrollReset />
      <InnerPageMotion />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/:solutionId" element={<SolutionPage />} />
        <Route path="/evaluation" element={<EvaluationPage />} />
        <Route path="/results" element={<EvaluationPage results />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/:slug" element={<ArticlePage />} />
        <Route
          path="/request-evaluation"
          element={<FormPage kind="evaluation" />}
        />
        <Route path="/request-demo" element={<FormPage kind="demo" />} />
        <Route path="/contact" element={<FormPage kind="contact" />} />
        <Route path="/waitlist" element={<FormPage kind="waitlist" />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/demo/evaluation" element={<EvaluationWorkspace />} />
        <Route path="/demo/cases/:caseId" element={<DemoPage />} />
        <Route path="/demo/cases/:caseId/report" element={<ReportPage />} />
        <Route path="/trust" element={<TrustPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        {[
          "/why-change",
          "/integrations",
          "/company",
          "/legal/privacy",
          "/legal/terms",
          "/access-help",
        ].map((path) => (
          <Route path={path} key={path} element={<InfoPage path={path} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
export function App() {
  return (
    <BrowserRouter>
      <Preferences>
        <DemoProvider>
          <AppRoutes />
        </DemoProvider>
      </Preferences>
    </BrowserRouter>
  );
}
