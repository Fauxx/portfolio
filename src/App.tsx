import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExpertiseSection } from './components/ExpertiseSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutAndTimeline } from './components/AboutAndTimeline';
import { ContactAndFooter } from './components/ContactAndFooter';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <ExpertiseSection />
        <ProjectsSection />
        <AboutAndTimeline />
        <ContactAndFooter />
      </main>
    </div>
  );
}

export default App;
