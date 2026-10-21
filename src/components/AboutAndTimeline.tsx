import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Code2 } from 'lucide-react';

export const AboutAndTimeline: React.FC = () => {
  const { about, careerEducation } = portfolioConfig;

  return (
    <section id="about" style={{ padding: '4.5rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem'
      }}>
        {/* Left Column: About Me */}
        <div>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
            {about.title}
          </h2>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            lineHeight: 1.75,
            marginBottom: '2rem'
          }}>
            {about.paragraph}
          </p>

          {/* Highlight Quote Box */}
          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Code2 size={18} color="var(--primary-blue)" />
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
              {about.highlightQuote}
            </p>
          </div>
        </div>

        {/* Right Column: Career & Education Timeline */}
        <div>
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>
            {careerEducation.title}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {careerEducation.timeline.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  paddingBottom: idx === careerEducation.timeline.length - 1 ? '0' : '2rem',
                  position: 'relative'
                }}
              >
                {/* Year Label */}
                <div style={{
                  width: '95px',
                  flexShrink: 0,
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  textAlign: 'right',
                  paddingTop: '2px'
                }}>
                  {item.period}
                </div>

                {/* Timeline Dot & Vertical Connector Line */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    border: '2px solid #2563eb',
                    backgroundColor: '#ffffff',
                    zIndex: 2,
                    marginTop: '5px'
                  }} />

                  {idx !== careerEducation.timeline.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      bottom: '-15px',
                      width: '2px',
                      backgroundColor: 'var(--border)',
                      zIndex: 1
                    }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                    {item.organization}
                  </p>

                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} style={{ marginBottom: '0.25rem', lineHeight: 1.5 }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
