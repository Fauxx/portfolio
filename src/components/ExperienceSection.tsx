import React from 'react';
import { profileData } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section style={{ padding: '3rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
          Experience & Background
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {profileData.experienceList.map((exp) => (
            <div
              key={exp.id}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {exp.role} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>@ {exp.company}</span>
                </h3>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                  {exp.period}
                </span>
              </div>

              <p style={{ fontSize: '0.825rem', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
                {exp.location}
              </p>

              {/* High-level summary placeholder without full resume bullets */}
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                {exp.summary}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {exp.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.15rem 0.45rem',
                      backgroundColor: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      color: 'var(--text-dim)'
                    }}
                  >
                    {tech}
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
