import React from 'react';
import { profileData } from '../data/portfolioData';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  return (
    <section style={{ padding: '3rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            Selected Projects
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Overview & Architecture
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {profileData.featuredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: 'border-color 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FolderGit2 size={16} color="var(--text-muted)" />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {project.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {project.subtitle}
                  </p>
                </div>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '4px'
                    }}
                  >
                    repo <ArrowUpRight size={12} />
                  </a>
                )}
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                {project.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.15rem 0.45rem',
                      backgroundColor: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
