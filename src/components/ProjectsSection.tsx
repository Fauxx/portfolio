import React, { useState } from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { ArrowRight, ExternalLink, CheckCircle2, Eye, Sparkles, ChevronLeft, ChevronRight, Radio } from 'lucide-react';
import { Icons } from './BrandIcons';

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioConfig;
  const { flagship, secondaryCards } = projects;

  const [flagshipSlide, setFlagshipSlide] = useState<number>(0);
  const [jobflowSlide, setJobflowSlide] = useState<number>(0);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const currentFlagshipSlide = flagship.slides[flagshipSlide];
  const jobflowProject = secondaryCards.find(c => c.id === 'jobflow')!;
  const currentJobflowSlide = jobflowProject.slides[jobflowSlide];
  const emailAgentProject = secondaryCards.find(c => c.id === 'ai-email-agent')!;

  const handleNextFlagship = () => {
    setFlagshipSlide((prev) => (prev + 1) % flagship.slides.length);
  };
  const handlePrevFlagship = () => {
    setFlagshipSlide((prev) => (prev - 1 + flagship.slides.length) % flagship.slides.length);
  };

  const handleNextJobflow = () => {
    setJobflowSlide((prev) => (prev + 1) % jobflowProject.slides.length);
  };
  const handlePrevJobflow = () => {
    setJobflowSlide((prev) => (prev - 1 + jobflowProject.slides.length) % jobflowProject.slides.length);
  };

  return (
    <section id="projects" style={{ padding: '4.5rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div className="section-tag">{projects.tag}</div>
            <h2 className="section-title">{projects.title}</h2>
          </div>

          <a
            href={projects.allProjectsUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--primary-blue)',
              fontSize: '0.875rem',
              fontWeight: 600
            }}
          >
            View All Projects <ArrowRight size={15} />
          </a>
        </div>

        {/* =========================================================================
            1. FLAGSHIP CARD: FireMonitoringSystem (Cloud Architecture, Logs & GIF)
           ========================================================================= */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2.5rem'
        }}>
          {/* Left Column: Interactive Multi-Slide Viewport */}
          <div style={{
            backgroundColor: '#090d16',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid var(--border)'
          }}>
            {/* Top Window Bar with Slide Tabs */}
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#0c111d',
              borderBottom: '1px solid #1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {/* Window Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)', marginLeft: '0.5rem' }}>
                  dev.fires.systems
                </span>
              </div>

              {/* Slide Buttons */}
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                {flagship.slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setFlagshipSlide(idx)}
                    style={{
                      background: flagshipSlide === idx ? '#1e293b' : 'transparent',
                      color: flagshipSlide === idx ? '#38bdf8' : '#94a3b8',
                      border: flagshipSlide === idx ? '1px solid #334155' : '1px solid transparent',
                      borderRadius: '4px',
                      fontSize: '0.675rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.2rem 0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Media Canvas with Carousel Arrows */}
            <div
              style={{
                position: 'relative',
                flex: 1,
                minHeight: '360px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#05070d',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onClick={() => currentFlagshipSlide.src && setModalImage(currentFlagshipSlide.src)}
              title="Click to view full-resolution image"
            >
              {currentFlagshipSlide.src ? (
                <img
                  src={currentFlagshipSlide.src}
                  alt={currentFlagshipSlide.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '440px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              ) : null}

              {/* Prev / Next Carousel Controls */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevFlagship(); }}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid #334155',
                  color: '#ffffff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                aria-label="Previous Slide"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleNextFlagship(); }}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid #334155',
                  color: '#ffffff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                aria-label="Next Slide"
              >
                <ChevronRight size={16} />
              </button>

              {/* Floating Slide Badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(4px)',
                border: '1px solid #334155',
                color: '#38bdf8',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontWeight: 600
              }}>
                {currentFlagshipSlide.badge}
              </div>

              {/* Floating Zoom Hint */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(4px)',
                border: '1px solid #334155',
                color: '#f8fafc',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.25rem 0.55rem',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                pointerEvents: 'none'
              }}>
                <Eye size={12} /> Click to expand
              </div>
            </div>

            {/* Sub-caption bar with Slide Index Indicator */}
            <div style={{
              padding: '0.65rem 1rem',
              backgroundColor: '#090d16',
              borderTop: '1px solid #1e293b',
              fontSize: '0.75rem',
              color: '#94a3b8',
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden' }}>
                <span style={{ color: '#38bdf8' }}>●</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentFlagshipSlide.title}: {currentFlagshipSlide.caption}
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#64748b', flexShrink: 0 }}>
                {flagshipSlide + 1} / {flagship.slides.length}
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Narrative & Actions */}
          <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <span style={{
                fontSize: '0.725rem',
                fontWeight: 700,
                color: '#2563eb',
                backgroundColor: '#eff6ff',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)'
              }}>
                {flagship.badge}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                {flagship.pillar}
              </span>
            </div>

            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              {flagship.title}
            </h3>

            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              {flagship.description}
            </p>

            {/* Architectural Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {flagship.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                  <CheckCircle2 size={15} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
              {flagship.tags.map((tag, idx) => (
                <span key={idx} className="tag-badge">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={flagship.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Launch Live App <ExternalLink size={14} />
              </a>

              {flagship.githubUrl && (
                <a
                  href={flagship.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  <Icons.Github width={15} height={15} /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. SECONDARY GRID: Jobflow (Multi-Slide Carousel) & AI Email Agent
           ========================================================================= */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.75rem'
        }}>
          {/* A. JOBFLOW CARD (Pipeline Studio + ATS Resume Preview Slides) */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {/* Multi-Slide Media Viewport for Jobflow */}
            <div style={{ backgroundColor: '#0b1120', borderBottom: '1px solid var(--border)', position: 'relative' }}>
              {/* Header Tab Bar */}
              <div style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: '#0f172a',
                borderBottom: '1px solid #1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  {jobflowProject.slides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setJobflowSlide(idx)}
                      style={{
                        background: jobflowSlide === idx ? '#1e293b' : 'transparent',
                        color: jobflowSlide === idx ? '#38bdf8' : '#94a3b8',
                        border: jobflowSlide === idx ? '1px solid #334155' : '1px solid transparent',
                        borderRadius: '4px',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.15rem 0.45rem',
                        cursor: 'pointer'
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <span style={{ fontSize: '0.65rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                  {jobflowSlide + 1} / {jobflowProject.slides.length}
                </span>
              </div>

              {/* Image Viewport */}
              <div
                style={{
                  height: '220px',
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#060a12'
                }}
                onClick={() => setModalImage(currentJobflowSlide.src!)}
                title="Click to view full resolution"
              >
                <img
                  src={currentJobflowSlide.src}
                  alt={currentJobflowSlide.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: jobflowSlide === 1 ? 'contain' : 'cover',
                    objectPosition: 'top left',
                    display: 'block'
                  }}
                />

                {/* Left/Right controls */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevJobflow(); }}
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid #334155',
                    color: '#ffffff',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={14} />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); handleNextJobflow(); }}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid #334155',
                    color: '#ffffff',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={14} />
                </button>

                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid #334155',
                  color: '#38bdf8',
                  fontSize: '0.625rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px',
                  fontWeight: 600
                }}>
                  {currentJobflowSlide.badge}
                </div>
              </div>

              {/* Sub-caption */}
              <div style={{
                padding: '0.4rem 0.75rem',
                backgroundColor: '#0c111d',
                borderTop: '1px solid #1e293b',
                fontSize: '0.7rem',
                color: '#94a3b8',
                fontFamily: 'var(--font-mono)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {currentJobflowSlide.caption}
              </div>
            </div>

            {/* Jobflow Card Content */}
            <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <Sparkles size={13} color="#2563eb" />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563eb', fontFamily: 'var(--font-mono)' }}>
                  {jobflowProject.pillar}
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                {jobflowProject.title}
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                {jobflowProject.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
                {jobflowProject.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag-badge">
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <a
                  href={jobflowProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  <Icons.Github width={14} height={14} /> Repository <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* B. AI EMAIL AGENT CARD (Dedicated Clean Placeholder) */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {/* Sleek Editorial Placeholder for Serverless AI Email Agent */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                borderBottom: '1px dashed var(--border)',
                height: '260px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.85rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <Radio size={20} color="#64748b" />
              </div>

              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                Telegram Bot & Event Pipeline
              </span>

              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', maxWidth: '280px', margin: 0, lineHeight: 1.5 }}>
                {emailAgentProject.slides[0].caption}
              </p>

              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                color: 'var(--text-dim)',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px'
              }}>
                {emailAgentProject.slides[0].badge}
              </div>
            </div>

            {/* Email Agent Card Body */}
            <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <Sparkles size={13} color="#2563eb" />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563eb', fontFamily: 'var(--font-mono)' }}>
                  {emailAgentProject.pillar}
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                {emailAgentProject.title}
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                {emailAgentProject.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
                {emailAgentProject.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag-badge">
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <a
                  href={emailAgentProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  <Icons.Github width={14} height={14} /> Repository <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. LIGHTBOX MODAL: Crisp Full-Resolution Image Viewer
           ========================================================================= */}
        {modalImage && (
          <div
            onClick={() => setModalImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'zoom-out'
            }}
          >
            <div style={{ maxWidth: '95vw', maxHeight: '90vh', position: 'relative' }}>
              <img
                src={modalImage}
                alt="Enlarged view"
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
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
                fontFamily: 'var(--font-mono)'
              }}>
                [ Click anywhere to close ]
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
