import { Suspense, lazy, useEffect, type ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppErrorBoundary from '@/components/AppErrorBoundary';
import Header from '@/components/Header';
import CommandPalette from '@/components/CommandPalette';
import ScrollToTop from '@/components/ScrollToTop';
import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics';
import { initGA, usePageTracking } from '@/lib/analytics';
import { initSentry } from '@/lib/sentry';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const ElectricalSystems = lazy(() => import('@/pages/ElectricalSystems'));
const AutomotiveSystems = lazy(() => import('@/pages/AutomotiveSystems'));
const DigitalSystems = lazy(() => import('@/pages/DigitalSystems'));
const ExecutiveIntelligence = lazy(() => import('@/pages/ExecutiveIntelligence'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminContacts = lazy(() => import('@/pages/admin/AdminContacts'));
const AdminBlog = lazy(() => import('@/pages/admin/AdminBlog'));
const AdminProjects = lazy(() => import('@/pages/admin/AdminProjects'));
const AdminTestimonials = lazy(() => import('@/pages/admin/AdminTestimonials'));
const AdminNewsletter = lazy(() => import('@/pages/admin/AdminNewsletter'));

function LoadingFallback() {
  return (
    <div className="app-loader" role="status" aria-label="Loading portfolio">
      <span>ER</span>
      <i />
    </div>
  );
}

function AnalyticsTracker() {
  usePageTracking();
  return null;
}

function AppProviders({ children }: { children: ReactNode }) {
  return <AppErrorBoundary>{children}</AppErrorBoundary>;
}

export default function App() {
  usePerformanceMetrics();

  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) initGA(measurementId);
  }, []);

  useEffect(() => {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (dsn) initSentry(dsn);
  }, []);

  return (
    <AppProviders>
      <BrowserRouter>
        <AnalyticsTracker />
        <Header />
        <CommandPalette />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/electrical-systems" element={<ElectricalSystems />} />
            <Route path="/automotive-systems" element={<AutomotiveSystems />} />
            <Route path="/digital-systems" element={<DigitalSystems />} />
            <Route path="/executive-intelligence" element={<ExecutiveIntelligence />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="newsletter" element={<AdminNewsletter />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <ScrollToTop />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4200,
            style: {
              background: 'var(--card-solid)',
              color: 'var(--text)',
              border: '1px solid var(--line)',
              boxShadow: 'var(--shadow-lg)',
            },
            success: { iconTheme: { primary: 'var(--success)', secondary: '#fff' } },
            error: { iconTheme: { primary: 'var(--danger)', secondary: '#fff' } },
          }}
        />
      </BrowserRouter>
    </AppProviders>
  );
}
