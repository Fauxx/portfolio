import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { ArrowRight, Mail } from 'lucide-react';
import { Icons } from './BrandIcons';

export const Hero: React.FC = () => {
  const { hero } = portfolioConfig;

  return (
    <section id="home" style={{ padding: '5rem 0 4.5rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '3.5rem',
        flexWrap: 'wrap-reverse'
      }}>
        {/* Left Column: Intro */}
        <div style={{ flex: '1 1 540px', maxWidth: '620px' }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>
            {hero.greeting}
          </p>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.25rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: 'var(--text-main)',
            lineHeight: 1.15,
            marginBottom: '0.85rem'
          }}>
            {hero.name}
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-body)',
            fontWeight: 500,
            marginBottom: '1.35rem'
          }}>
            {hero.role}
          </p>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            lineHeight: 1.75,
            marginBottom: '2.25rem',
            maxWidth: '540px'
          }}>
            {hero.summary}
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.75rem', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn-primary">
              Explore Projects <ArrowRight size={15} />
            </a>
            <a href={hero.links.github} target="_blank" rel="noreferrer" className="btn-outline">
              <Icons.Github width={16} height={16} /> GitHub
            </a>
          </div>

          {/* Mini Social Link Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <a href={hero.links.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Icons.Github width={16} height={16} /> GitHub
            </a>
            <a href={hero.links.linkedin} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Icons.Linkedin width={16} height={16} /> LinkedIn
            </a>
            <a href={`mailto:${hero.links.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Mail size={16} /> Email
            </a>
          </div>
        </div>

        {/* Right Column: Graduation Photo Avatar + Ring + Dots Grid + Mantra */}
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
