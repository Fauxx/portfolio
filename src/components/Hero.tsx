import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { ArrowRight } from 'lucide-react';
import { Icons } from './BrandIcons';

export const Hero: React.FC = () => {
  const { hero } = portfolioConfig;

  return (
    <section id="home" style={{ padding: '4.5rem 0 4rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '3.5rem',
        flexWrap: 'wrap-reverse'
      }}>
        {/* Left Column: Intro */}
        <div style={{ flex: '1 1 540px', maxWidth: '640px' }}>
          {/* Live Availability Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            marginBottom: '1.25rem'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }} />
            <span style={{ fontSize: '0.775rem', fontWeight: 600, color: '#166534', fontFamily: 'var(--font-mono)' }}>
              {hero.statusPill}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.25rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: 'var(--text-main)',
            lineHeight: 1.15,
            marginBottom: '0.65rem'
          }}>
            {hero.name}
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-body)',
            fontWeight: 500,
            marginBottom: '1.25rem'
          }}>
            {hero.role} <span style={{ color: 'var(--text-light)', margin: '0 0.4rem' }}>•</span> <span style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>{hero.location}</span>
          </p>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            lineHeight: 1.75,
            marginBottom: '2rem',
            maxWidth: '560px'
          }}>
            {hero.summary}
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn-primary">
              Explore Featured Projects <ArrowRight size={15} />
            </a>
            <a href={hero.links.github} target="_blank" rel="noreferrer" className="btn-outline">
              <Icons.Github width={16} height={16} /> GitHub
            </a>
          </div>

          {/* Impact Stats Grid (Proof of Work) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            {hero.stats.map((st, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.02em' }}>
                  {st.value}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 500 }}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Graduation Portrait Avatar + Ring + Dots Grid + Mantra */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.75rem',
          position: 'relative'
        }}>
          {/* Subtle dot matrix background */}
          <div style={{
            position: 'absolute',
            left: '-25px',
            bottom: '-25px',
            width: '140px',
            height: '120px',
            backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
            backgroundSize: '14px 14px',
            zIndex: 0,
            opacity: 0.85
          }} />

          {/* Graduation Portrait Avatar Container with Crisp Blue Accent Ring */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: '190px',
            height: '190px',
            borderRadius: '50%',
            backgroundColor: '#0f172a',
            border: '4px solid #2563eb',
            boxShadow: '0 12px 28px -4px rgba(15, 23, 42, 0.22)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {hero.avatarImage ? (
              <img
                src={hero.avatarImage}
                alt={hero.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%'
                }}
              />
            ) : (
              <span style={{
                color: '#ffffff',
                fontSize: '2.5rem',
                fontWeight: 800,
                letterSpacing: '0.04em'
              }}>
                {hero.avatarInitials}
              </span>
            )}
          </div>

          {/* Side Vertical Mantra (BUILD DEPLOY IMPROVE) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            borderLeft: '1px solid var(--border)',
            paddingLeft: '1.35rem',
            zIndex: 1
          }}>
            {hero.mantra.map((word, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.14em',
                  fontWeight: 600,
                  color: 'var(--text-light)'
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
