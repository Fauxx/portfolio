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
    <section id="projects" style={{ padding: '5rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2.75rem',
          flexWrap: 'wrap',
          gap: '1.25rem'
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
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            View All Projects <ArrowRight size={15} />
          </a>
        </div>

        {/* =========================================================================
            1. FLAGSHIP CARD: FireMonitoringSystem (Dynamic Wide Responsive Viewport)
           ========================================================================= */}
        <div className="flagship-grid">
          {/* Left Column: Interactive Multi-Slide Viewport */}
          <div style={{
            backgroundColor: '#090d16',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid var(--border)'
          }}>
            {/* Top Window Bar with Slide Tabs */}
            <div style={{
              padding: '0.85rem 1.25rem',
              backgroundColor: '#0c111d',
              borderBottom: '1px solid #1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              {/* Window Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)', marginLeft: '0.5rem' }}>
                  dev.fires.systems
                </span>
              </div>

              {/* Slide Buttons */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {flagship.slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setFlagshipSlide(idx)}
                    style={{
                      background: flagshipSlide === idx ? '#1e293b' : 'transparent',
                      color: flagshipSlide === idx ? '#38bdf8' : '#94a3b8',
                      border: flagshipSlide === idx ? '1px solid #334155' : '1px solid transparent',
                      borderRadius: '4px',
                      fontSize: '0.725rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.25rem 0.6rem',
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
                minHeight: '420px',
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
                    maxHeight: '520px',
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
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid #334155',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'background 0.2s ease'
                }}
                aria-label="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleNextFlagship(); }}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid #334155',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'background 0.2s ease'
                }}
                aria-label="Next Slide"
              >
                <ChevronRight size={18} />
              </button>

              {/* Floating Slide Badge */}
              <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(4px)',
                border: '1px solid #334155',
                color: '#38bdf8',
                fontSize: '0.675rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.25rem 0.6rem',
                borderRadius: '4px',
                fontWeight: 600
              }}>
                {currentFlagshipSlide.badge}
              </div>

              {/* Floating Zoom Hint */}
              <div style={{
                position: 'absolute',
                bottom: '14px',
                right: '14px',
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(4px)',
                border: '1px solid #334155',
                color: '#f8fafc',
                fontSize: '0.725rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.3rem 0.65rem',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                pointerEvents: 'none'
              }}>
                <Eye size={13} /> Click to expand
              </div>
            </div>

            {/* Sub-caption bar with Slide Index Indicator */}
            <div style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: '#090d16',
              borderTop: '1px solid #1e293b',
              fontSize: '0.775rem',
              color: '#94a3b8',
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                <span style={{ color: '#38bdf8' }}>●</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentFlagshipSlide.title}: {currentFlagshipSlide.caption}
                </span>
              </div>
              <span style={{ fontSize: '0.725rem', color: '#64748b', flexShrink: 0 }}>
                {flagshipSlide + 1} / {flagship.slides.length}
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Narrative & Actions */}
          <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#2563eb',
                backgroundColor: '#eff6ff',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)'
              }}>
                {flagship.badge}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                {flagship.pillar}
              </span>
            </div>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.85rem', letterSpacing: '-0.02em' }}>
              {flagship.title}
            </h3>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {flagship.description}
            </p>

            {/* Architectural Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.75rem' }}>
              {flagship.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-body)' }}>
                  <CheckCircle2 size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2.25rem' }}>
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
            2. SECONDARY GRID: Jobflow (4-Slide Studio) & AI Email Agent
           ========================================================================= */}
        <div className="secondary-grid">
          {/* A. JOBFLOW CARD (4-Slide Studio) */}
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
                padding: '0.6rem 0.85rem',
                backgroundColor: '#0f172a',
                borderBottom: '1px solid #1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.4rem'
              }}>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {jobflowProject.slides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setJobflowSlide(idx)}
                      style={{
                        background: jobflowSlide === idx ? '#1e293b' : 'transparent',
                        color: jobflowSlide === idx ? '#38bdf8' : '#94a3b8',
                        border: jobflowSlide === idx ? '1px solid #334155' : '1px solid transparent',
                        borderRadius: '4px',
                        fontSize: '0.675rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.2rem 0.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <span style={{ fontSize: '0.675rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                  {jobflowSlide + 1} / {jobflowProject.slides.length}
                </span>
              </div>

              {/* Image Viewport */}
              <div
                style={{
                  height: '280px',
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
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />

                {/* Left/Right controls */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevJobflow(); }}
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid #334155',
                    color: '#ffffff',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); handleNextJobflow(); }}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid #334155',
                    color: '#ffffff',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid #334155',
                  color: '#38bdf8',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontWeight: 600
                }}>
                  {currentJobflowSlide.badge}
                </div>
              </div>

              {/* Sub-caption */}
              <div style={{
                padding: '0.55rem 0.85rem',
                backgroundColor: '#0c111d',
                borderTop: '1px solid #1e293b',
                fontSize: '0.725rem',
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
            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                <Sparkles size={14} color="#2563eb" />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563eb', fontFamily: 'var(--font-mono)' }}>
                  {jobflowProject.pillar}
                </span>
              </div>

              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                {jobflowProject.title}
              </h3>

              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
                {jobflowProject.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.75rem' }}>
                {jobflowProject.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag-badge">
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                <a
                  href={jobflowProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: 'var(--text-main)',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}
                >
                  <Icons.Github width={15} height={15} /> Repository <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* B. AI EMAIL AGENT CARD (Clean Pipeline Placeholder) */}
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
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <Radio size={24} color="#64748b" />
              </div>

              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Telegram Bot & Event Pipeline
              </span>

              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', maxWidth: '320px', margin: 0, lineHeight: 1.6 }}>
                {emailAgentProject.slides[0].caption}
              </p>

              <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                color: 'var(--text-dim)',
                fontSize: '0.675rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.25rem 0.55rem',
                borderRadius: '4px'
              }}>
                {emailAgentProject.slides[0].badge}
              </div>
            </div>

            {/* Email Agent Card Body */}
            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                <Sparkles size={14} color="#2563eb" />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563eb', fontFamily: 'var(--font-mono)' }}>
                  {emailAgentProject.pillar}
                </span>
              </div>

              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                {emailAgentProject.title}
              </h3>

              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
                {emailAgentProject.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.75rem' }}>
                {emailAgentProject.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag-badge">
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                <a
                  href={emailAgentProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: 'var(--text-main)',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}
                >
                  <Icons.Github width={15} height={15} /> Repository <ArrowRight size={14} />
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
