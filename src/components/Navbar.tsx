import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Icons } from './BrandIcons';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = ['home', 'projects', 'engineering', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemStyle = (id: string) => {
    const isActive = activeSection === id;
    return {
      color: isActive ? 'var(--primary-blue)' : 'var(--text-muted)',
      fontWeight: isActive ? 600 : 500,
      position: 'relative' as const,
      paddingBottom: '4px',
      borderBottom: isActive ? '2px solid var(--primary-blue)' : '2px solid transparent',
      transition: 'all 0.2s ease'
    };
  };

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

        {/* Navigation Links with dynamic Scrollspy */}
        <div className="nav-links">
          <a href="#home" style={navItemStyle('home')}>
            Home
          </a>
          <a href="#projects" style={navItemStyle('projects')}>
            Projects
          </a>
          <a href="#engineering" style={navItemStyle('engineering')}>
            Engineering
          </a>
          <a href="#about" style={navItemStyle('about')}>
            About
          </a>
          <a href="#contact" style={navItemStyle('contact')}>
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
