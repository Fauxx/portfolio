import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { ArrowRight, Mail } from 'lucide-react';
import { Icons } from './BrandIcons';

export const Hero: React.FC = () => {
  const { hero } = portfolioConfig;

  return (
    <section id="home" style={{ padding: '4.5rem 0 4rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '3rem',
        flexWrap: 'wrap-reverse'
      }}>
        {/* Left Column: Intro */}
        <div style={{ flex: '1 1 500px', maxWidth: '580px' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>
            {hero.greeting}
          </p>

          <h1 style={{
            fontSize: '2.75rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-main)',
            lineHeight: 1.15,
            marginBottom: '0.75rem'
          }}>
            {hero.name}
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-body)',
            fontWeight: 500,
            marginBottom: '1.25rem'
          }}>
            {hero.role}
          </p>

          <p style={{
            fontSize: '0.975rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '2rem',
            maxWidth: '500px'
          }}>
            {hero.summary}
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn-primary">
              Explore Projects <ArrowRight size={15} />
            </a>
            <a href={hero.links.github} target="_blank" rel="noreferrer" className="btn-outline">
              <Icons.Github width={16} height={16} /> GitHub
            </a>
          </div>

          {/* Mini Social Link Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <a href={hero.links.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Icons.Github width={15} height={15} /> GitHub
            </a>
            <a href={hero.links.linkedin} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Icons.Linkedin width={15} height={15} /> LinkedIn
            </a>
            <a href={`mailto:${hero.links.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mail size={15} /> Email
            </a>
          </div>
        </div>

        {/* Right Column: Circular Badge + Dots Grid + Mantra */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
          position: 'relative'
        }}>
          {/* Subtle dot matrix background */}
          <div style={{
            position: 'absolute',
            left: '-20px',
            bottom: '-20px',
            width: '120px',
            height: '100px',
            backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
            backgroundSize: '12px 12px',
            zIndex: 0,
            opacity: 0.8
          }} />

          {/* Circular Initials Avatar with Blue Accent Ring */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: '175px',
            height: '175px',
            borderRadius: '50%',
            backgroundColor: '#0f172a',
            border: '4px solid #3b82f6',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{
              color: '#ffffff',
              fontSize: '2.5rem',
              fontWeight: 800,
              letterSpacing: '0.04em'
            }}>
              {hero.avatarInitials}
            </span>
          </div>

          {/* Side Vertical Mantra (BUILD DEPLOY IMPROVE) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            borderLeft: '1px solid var(--border)',
            paddingLeft: '1.25rem',
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
