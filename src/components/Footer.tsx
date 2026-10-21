import React from 'react';
import { profileData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer style={{ padding: '3rem 0 4rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          © {new Date().getFullYear()} {profileData.name}. All rights reserved.
        </p>

        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <a href={profileData.socials.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profileData.socials.email}`}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};
