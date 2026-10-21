import { Header } from './components/Header';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
