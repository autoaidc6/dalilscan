
import React, { useEffect, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Scan from './pages/Scan';
import History from './pages/History';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';
import { UserProvider } from './context/UserContext';
import { LogProvider } from './context/LogContext';

const pageVariants = {
  initial: { opacity: 0, x: '-100vw' },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: '100vw' },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const AnimatedRoutes = () => {
    const location = useLocation();
    const showNav = !['/'].includes(location.pathname);

    return (
        <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <main className="flex-grow pb-20">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Onboarding />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/scan" element={<Scan />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </AnimatePresence>
            </main>
            {showNav && <BottomNav />}
        </div>
    );
};

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, i18n.language]);

  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center bg-gray-100">Loading...</div>}>
      <UserProvider>
        <LogProvider>
            <HashRouter>
                <AnimatedRoutes />
            </HashRouter>
        </LogProvider>
      </UserProvider>
    </Suspense>
  );
};

export default App;
