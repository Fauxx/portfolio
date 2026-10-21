import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { AboutAndTimeline } from './components/AboutAndTimeline';
import { ContactAndFooter } from './components/ContactAndFooter';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {/* 1. Hero with Status Pill & Stats */}
        <Hero />
        {/* 2. Primary Showcase: Selected Projects with Alternating Rhythm */}
        <ProjectsSection />
        {/* 3. Technical Competencies & Focus Area Cards */}
        <ExpertiseSection />
        {/* 4. Background, Education & Career Timeline */}
        <AboutAndTimeline />
        {/* 5. Contact Hub & Footer */}
        <ContactAndFooter />
      </main>
    </div>
  );
}

export default App;
