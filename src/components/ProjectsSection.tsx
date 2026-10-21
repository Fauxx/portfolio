import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { ArrowRight, Play } from 'lucide-react';
import { Icons } from './BrandIcons';

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioConfig;
  const { featured, cards } = projects;

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

        {/* 1. Large Featured Showcase Card (FireMonitoringSystem) */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}>
          {/* Left Preview Canvas: Dark Dashboard UI Mockup Preview */}
          <div style={{
            backgroundColor: '#090d16',
            minHeight: '280px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)', marginLeft: '0.5rem' }}>
                live-telemetry.maplibre.3d
              </span>
            </div>

            {/* Stylized Telemetry / Radar Grid Graphic */}
            <div style={{
              height: '140px',
              border: '1px dashed #1e293b',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: '#0d131f'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '1px solid #2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#38bdf8' }} />
              </div>
              <span style={{ position: 'absolute', bottom: '8px', left: '12px', fontSize: '0.65rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                NCR_CLUSTER_ACTIVE: 99.8%
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#475569', fontFamily: 'var(--font-mono)' }}>
              <span>PROMETHEUS / GRAFANA</span>
              <span>K8S AKS 4-LAYER</span>
            </div>
          </div>

          {/* Right Details */}
          <div style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'inline-block', marginBottom: '0.75rem' }}>
              <span style={{
                fontSize: '0.725rem',
                fontWeight: 700,
                color: '#2563eb',
                backgroundColor: '#eff6ff',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)'
              }}>
                {featured.badge}
              </span>
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              {featured.title}
            </h3>

            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {featured.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
              {featured.tags.map((tag, idx) => (
                <span key={idx} className="tag-badge">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={featured.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                {featured.viewLinkText} <ArrowRight size={14} />
              </a>

              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                color: 'var(--text-light)',
                cursor: 'default'
              }}>
                <Play size={13} /> Watch Demo (optional)
              </span>

              {featured.githubUrl && (
                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    fontWeight: 500
                  }}
                >
                  <Icons.Github width={15} height={15} /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 2. Secondary Two-Column Grid (Jobflow & AI Email Agent) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {cards.map((project) => (
            <div
              key={project.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tag-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--primary-blue)',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}
                >
                  {project.viewLinkText} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
