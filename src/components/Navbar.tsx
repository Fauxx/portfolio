import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Icons } from './BrandIcons';

export const Navbar: React.FC = () => {
  return (
    <nav style={{
      borderBottom: '1px solid var(--border)',
      backgroundColor: '#ffffff',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
            {portfolioConfig.brand.name}
          </span>
          <span style={{ color: 'var(--text-light)', fontWeight: 300, fontSize: '1rem' }}>/</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
            {portfolioConfig.brand.tagline}
          </span>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <a href="#home" style={{ color: 'var(--primary-blue)', fontWeight: 600, position: 'relative', paddingBottom: '4px', borderBottom: '2px solid var(--primary-blue)' }}>
            Home
          </a>
          <a href="#projects" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
            Projects
          </a>
          <a href="#engineering" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
            Engineering
          </a>
          <a href="#about" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
            About
          </a>
          <a href="#contact" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
            Contact
          </a>

          <a
            href={portfolioConfig.hero.links.github}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}
            aria-label="GitHub Profile"
          >
            <Icons.Github width={18} height={18} />
          </a>
        </div>
      </div>
    </nav>
  );
};
