import React, { useState } from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { Icons } from './BrandIcons';

export const Hero: React.FC = () => {
  const { hero } = portfolioConfig;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(hero.links.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <button
              onClick={handleCopyEmail}
              className="btn-outline"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                padding: '0.65rem 1rem'
              }}
              title="Copy email to clipboard"
            >
              {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
              <span>{copied ? 'Copied Email' : 'Copy Email'}</span>
            </button>
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
                <span style={{
                  fontSize: '0.725rem',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  marginTop: '0.2rem'
                }}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Editorial System Monogram & Live Telemetry Console */}
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
            width: '140px',
            height: '120px',
            backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
            backgroundSize: '14px 14px',
            zIndex: 0,
            opacity: 0.75
          }} />

          {/* Minimalist Engineering Monogram Card (Sleek Black & White Developer Card) */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            backgroundColor: '#ffffff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            width: '350px',
            maxWidth: '100%',
            overflow: 'hidden'
          }}>
            {/* Window Top Bar (Fedora/GNOME Monochrome Header) */}
            <div style={{
              padding: '0.7rem 1rem',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.725rem', fontFamily: 'var(--font-mono)' }}>
                <Icons.Fedora width={14} height={14} fill="#51a2da" />
                <span style={{ color: '#0f172a', fontWeight: 700 }}>fauxx@fedora</span>
                <span style={{ color: '#94a3b8' }}>:</span>
                <span style={{ color: '#2563eb', fontWeight: 600 }}>~</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#16a34a', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                <span>● active</span>
              </div>
            </div>

            {/* Inner Console Content with Pixel Avatar */}
            <div style={{ padding: '1.5rem', position: 'relative' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.15rem',
                marginBottom: '1.35rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid var(--border)'
              }}>
                <div style={{
                  position: 'relative',
                  width: '84px',
                  height: '84px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  backgroundColor: '#f8fafc',
                  flexShrink: 0
                }}>
                  <img
                    src="./media/pixel-avatar.jpg"
                    alt="Zet Donaue Samson Pixel Avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      imageRendering: 'pixelated'
                    }}
                  />
                  {/* Live status dot */}
                  <span style={{
                    position: 'absolute',
                    bottom: '4px',
                    right: '4px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#16a34a',
                    border: '2px solid #ffffff'
                  }} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.01em' }}>
                    Zet Donaue Samson
                  </div>
                  <div style={{ color: 'var(--text-body)', fontSize: '0.775rem', fontFamily: 'var(--font-mono)', marginTop: '0.2rem', fontWeight: 600 }}>
                    Systems &amp; DevOps Engineer
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                    Pasig City, Metro Manila • PH
                  </div>
                </div>
              </div>

              {/* Console Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {hero.terminalSpecs.map((spec, sIdx) => (
                  <div key={sIdx} style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.675rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {spec.label}
                    </span>
                    <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Status Ticker */}
            <div style={{
              padding: '0.55rem 1rem',
              backgroundColor: '#f8fafc',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.675rem',
              fontFamily: 'var(--font-mono)',
              color: '#0f172a',
              fontWeight: 600
            }}>
              <span>IMMUTABLE IAC</span>
              <span>ZERO-TRUST PSS</span>
            </div>
          </div>

          {/* Side Vertical Mantra (BUILD DEPLOY IMPROVE) */}
          <div className="hero-mantra">
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
