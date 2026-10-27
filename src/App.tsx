import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { AboutAndTimeline } from './components/AboutAndTimeline';
import { ContactAndFooter } from './components/ContactAndFooter';

// Code-split TerminalModal so initial page load bundle is tiny and instant
const TerminalModal = lazy(() =>
  import('./components/TerminalModal').then((m) => ({ default: m.TerminalModal }))
);

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalCommand, setTerminalCommand] = useState<string | undefined>(undefined);

  const openTerminal = useCallback((cmd?: string) => {
    setTerminalCommand(cmd);
    setIsTerminalOpen(true);
  }, []);

  const closeTerminal = useCallback(() => {
    setIsTerminalOpen(false);
    setTerminalCommand(undefined);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal on backtick/tilde if not actively typing in an input/textarea
      const target = e.target as HTMLElement | null;
      const isInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;

      if ((e.key === '`' || e.key === '~') && !isInput) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isTerminalOpen) {
        closeTerminal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen, closeTerminal]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {/* 1. Hero with Status Pill, Stats & Terminal Monogram Card */}
        <Hero />
        {/* 2. Primary Showcase: Selected Projects with Alternating Rhythm & CLI Inspector */}
        <ProjectsSection onOpenTerminal={openTerminal} />
        {/* 3. Technical Competencies & Focus Area Cards */}
        <ExpertiseSection />
        {/* 4. Background, Education & Career Timeline */}
        <AboutAndTimeline />
        {/* 5. Contact Hub & Footer */}
        <ContactAndFooter />
      </main>

      {/* Global Interactive Faux Terminal Modal (Lazy loaded on demand) */}
      {isTerminalOpen && (
        <Suspense fallback={null}>
          <TerminalModal
            isOpen={isTerminalOpen}
            onClose={closeTerminal}
            initialCommand={terminalCommand}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
