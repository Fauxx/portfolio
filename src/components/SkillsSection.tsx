import React from 'react';
import { profileData } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  return (
    <section style={{ padding: '3rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
          Focus & Technical Competencies
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {profileData.skillCategories.map((cat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                {cat.category}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      fontSize: '0.775rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.2rem 0.5rem',
                      backgroundColor: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {skill}
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
