import React, { useState } from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { ArrowRight, ExternalLink, CheckCircle2, Eye, ChevronLeft, ChevronRight, GitBranch, X } from 'lucide-react';
import { Icons } from './BrandIcons';
import { ProjectFlowchartModal, type ProjectId } from './ProjectFlowchartModal';

interface ProjectsSectionProps {
  onOpenTerminal?: (cmd?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenTerminal }) => {
  const { showcases, allProjectsUrl } = {
    showcases: portfolioConfig.showcases,
    allProjectsUrl: portfolioConfig.hero.links.github
  };

  const [slideIndices, setSlideIndices] = useState<{ [id: string]: number }>({
    'fire-monitoring': 0,
    'jobflow': 0,
    'ai-email-agent': 0
  });

  const [modalImage, setModalImage] = useState<string | null>(null);
  const [showFlowchartModal, setShowFlowchartModal] = useState<boolean>(false);
  const [activeFlowchartProject, setActiveFlowchartProject] = useState<ProjectId>('fire-monitoring');

  const handleNext = (projectId: string, max: number) => {
    setSlideIndices((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % max
    }));
  };

  const handlePrev = (projectId: string, max: number) => {
    setSlideIndices((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + max) % max
    }));
  };

  const handleSelectSlide = (projectId: string, idx: number) => {
    setSlideIndices((prev) => ({
      ...prev,
      [projectId]: idx
    }));
  };

  return (
    <section id="projects" style={{ padding: '5rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div>
            <div className="section-tag">ENGINEERING PORTFOLIO</div>
            <h2 className="section-title">Selected Projects & System Architecture</h2>
          </div>

          <a
            href={allProjectsUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--primary-blue)',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            View GitHub Profile <ArrowRight size={15} />
          </a>
        </div>

        {/* =========================================================================
            ALTERNATING FULL-WIDTH SHOWCASE CARDS (Rhythm & Legibility)
           ========================================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {showcases.map((project) => {
            const currentIdx = slideIndices[project.id] || 0;
            const currentSlide = project.slides[currentIdx];
            const isReversed = !!project.reversed;

            return (
              <div
                key={project.id}
                className={`flagship-grid ${isReversed ? 'flagship-grid-reversed' : ''}`}
              >
                {/* 1. Media Viewport (Left if not reversed, Right if reversed) */}
                <div
                  className={`project-viewport ${isReversed ? 'project-viewport-reversed' : 'project-viewport-default'}`}
                  style={{
                    order: isReversed ? 2 : 1
                  }}
                >
                  {/* Top Window Bar with Slide Tabs */}
                  <div style={{
                    padding: '0.85rem 1.25rem',
                    backgroundColor: '#f8fafc',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {/* Window Controls (Fedora / Linux Clean Terminal Bar) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Icons.Fedora width={13} height={13} fill="#0f172a" />
                      <span style={{ fontSize: '0.725rem', color: '#0f172a', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        {project.title.toLowerCase()}
                      </span>
                      <span style={{ color: '#cbd5e1' }}>/</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                        {currentSlide.id}
                      </span>
                    </div>

                    {/* Slide Buttons (Desktop full tabs, Mobile compact dots) */}
                    <div className="carousel-tabs-desktop">
                      {project.slides.map((s, idx) => (
                        <button
                          key={s.id}
                          onClick={() => handleSelectSlide(project.id, idx)}
                          style={{
                            background: currentIdx === idx ? '#0f172a' : 'transparent',
                            color: currentIdx === idx ? '#ffffff' : '#64748b',
                            border: currentIdx === idx ? '1px solid #0f172a' : '1px solid transparent',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '0.2rem 0.55rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>

                    <div className="carousel-tabs-mobile">
                      {project.slides.map((s, idx) => (
                        <button
                          key={s.id}
                          onClick={() => handleSelectSlide(project.id, idx)}
                          className={`carousel-dot ${currentIdx === idx ? 'active' : ''}`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Media Canvas with Carousel Arrows */}
                  <div
                    className="project-canvas"
                    onClick={() => {
                      if (currentSlide.src) {
                        setModalImage(currentSlide.src);
                      }
                    }}
                    title="Click to view full-resolution image"
                  >
                    {currentSlide.src ? (
                      <img
                        src={currentSlide.src}
                        alt={currentSlide.caption}
                        style={{
                          width: '100%',
                          height: '100%',
                          maxHeight: '520px',
                          objectFit: 'contain',
                          display: 'block'
                        }}
                      />
                    ) : null}

                    {/* Prev / Next Carousel Controls */}
                    {project.slides.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handlePrev(project.id, project.slides.length); }}
                        style={{
                          position: 'absolute',
                          left: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(255, 255, 255, 0.92)',
                          border: '1px solid var(--border)',
                          color: '#0f172a',
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          zIndex: 10,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                        }}
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft size={18} />
                      </button>
                    )}

                    {project.slides.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleNext(project.id, project.slides.length); }}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(255, 255, 255, 0.92)',
                          border: '1px solid var(--border)',
                          color: '#0f172a',
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          zIndex: 10,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                        }}
                        aria-label="Next Slide"
                      >
                        <ChevronRight size={18} />
                      </button>
                    )}

                    {/* Floating Slide Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid var(--border)',
                      color: '#0f172a',
                      fontSize: '0.675rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '4px',
                      fontWeight: 600,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                      {currentSlide.badge}
                    </div>

                    {/* Floating Zoom Hint */}
                    <div style={{
                      position: 'absolute',
                      bottom: '14px',
                      right: '14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid var(--border)',
                      color: '#475569',
                      fontSize: '0.725rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      pointerEvents: 'none',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                      <Eye size={13} /> Click to expand
                    </div>
                  </div>

                  {/* Sub-caption bar */}
                  <div style={{
                    padding: '0.75rem 1.25rem',
                    backgroundColor: '#f8fafc',
                    borderTop: '1px solid var(--border)',
                    fontSize: '0.775rem',
                    color: '#475569',
                    fontFamily: 'var(--font-mono)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                      <span style={{ color: '#0f172a' }}>●</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {currentSlide.title}: {currentSlide.caption}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.725rem', color: '#64748b', flexShrink: 0 }}>
                      {currentIdx + 1} / {project.slides.length}
                    </span>
                  </div>
                </div>

                {/* 2. Narrative Column (Right if not reversed, Left if reversed) */}
                <div
                  className="project-narrative"
                  style={{
                    order: isReversed ? 1 : 2
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#2563eb',
                      backgroundColor: '#eff6ff',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {project.badge}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                      {project.pillar.split('•')[0]}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.85rem', letterSpacing: '-0.02em' }}>
                    {project.title}
                  </h3>

                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.75rem' }}>
                    {project.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-body)' }}>
                        <CheckCircle2 size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2.25rem' }}>
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="tag-badge">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                      >
                        Launch Live App <ExternalLink size={14} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-outline"
                      >
                        <Icons.Github width={15} height={15} /> Source Code
                      </a>
                    )}

                    <button
                      onClick={() => {
                        const pid = (project.id === 'fire-monitoring' || project.id === 'jobflow' || project.id === 'ai-email-agent')
                          ? (project.id as ProjectId)
                          : 'fire-monitoring';
                        setActiveFlowchartProject(pid);
                        setShowFlowchartModal(true);
                      }}
                      className="btn-outline"
                      title={`Open Interactive ${project.title} Pipeline Flowchart`}
                    >
                      <GitBranch size={15} />
                      <span>Pipeline Flowchart</span>
                    </button>

                    {onOpenTerminal && (
                      <button
                        onClick={() => {
                          const cmd = project.id === 'fire-monitoring'
                            ? 'inspect fire-monitoring'
                            : project.id === 'jobflow'
                            ? 'inspect jobflow'
                            : 'inspect email-agent';
                          onOpenTerminal(cmd);
                        }}
                        className="btn-outline"
                        title={`Open Terminal for ${project.title}`}
                      >
                        <Icons.Fedora width={15} height={15} />
                        <span>Open Terminal &gt;_</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {modalImage && (
          <div
            onClick={() => setModalImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'zoom-out'
            }}
          >
            <div style={{ maxWidth: '96vw', maxHeight: '92vh', position: 'relative' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalImage(null);
                }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid #334155',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 20
                }}
                aria-label="Close Preview"
              >
                <X size={18} />
              </button>

              <img
                src={modalImage}
                alt="Enlarged view"
                style={{
                  maxWidth: '100%',
                  maxHeight: '92vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '-35px',
                right: '0',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                {modalImage.includes('fire-architecture') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImage(null);
                      setActiveFlowchartProject('fire-monitoring');
                      setShowFlowchartModal(true);
                    }}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Open Interactive Flowchart ➔
                  </button>
                )}
                <span>[ Click anywhere to close ]</span>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Pipeline Flowchart Modal */}
        {showFlowchartModal && (
          <ProjectFlowchartModal
            isOpen={showFlowchartModal}
            initialProjectId={activeFlowchartProject}
            onClose={() => setShowFlowchartModal(false)}
            onOpenTerminal={onOpenTerminal}
          />
        )}
      </div>
    </section>
  );
};
