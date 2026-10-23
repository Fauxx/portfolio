import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Code2, CheckCircle2 } from 'lucide-react';

export const AboutAndTimeline: React.FC = () => {
  const { about, careerEducation } = portfolioConfig;

  return (
    <section id="about" style={{ padding: '5rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '4.5rem'
      }}>
        {/* Left Column: About Me */}
        <div>
          <div className="section-tag">BACKGROUND & PHILOSOPHY</div>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
            {about.title}
          </h2>

          <p style={{
            fontSize: '0.975rem',
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            {about.paragraph}
          </p>

          {/* Highlight Quote Box */}
          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Code2 size={20} color="var(--primary-blue)" />
            </div>

            <div>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.35rem' }}>
                Core Engineering Principle
              </span>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
                "{about.highlightQuote}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Career & Education Timeline */}
        <div>
          <div className="section-tag">PROVEN EXPERIENCE</div>
          <h2 className="section-title" style={{ marginBottom: '2.25rem' }}>
            {careerEducation.title}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {careerEducation.timeline.map((item, idx) => (
              <div
                key={idx}
                className="timeline-item"
                style={{
                  paddingBottom: idx === careerEducation.timeline.length - 1 ? '0' : '2.5rem'
                }}
              >
                {/* Desktop Year Label */}
                <div className="timeline-period">
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
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2.5px solid #2563eb',
                    backgroundColor: '#ffffff',
                    zIndex: 2,
                    marginTop: '5px'
                  }} />

                  {idx !== careerEducation.timeline.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '17px',
                      bottom: '-15px',
                      width: '2px',
                      backgroundColor: 'var(--border)',
                      zIndex: 1
                    }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: '0.5rem' }}>
                  {/* Mobile-only date label */}
                  <div className="timeline-period-mobile">
                    {item.period}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {item.title}
                    </h3>
                    <span style={{
                      fontSize: '0.675rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.15rem 0.45rem',
                      backgroundColor: '#eff6ff',
                      color: '#1d4ed8',
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      {item.roleTag}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 500 }}>
                    {item.organization}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {item.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.55 }}>
                        <CheckCircle2 size={14} color="#94a3b8" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
