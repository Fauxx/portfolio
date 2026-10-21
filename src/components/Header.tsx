import React from 'react';
import { profileData } from '../data/portfolioData';
import { Mail, ArrowUpRight, Terminal, GitBranch, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header style={{ borderBottom: '1px solid var(--border)', padding: '3.5rem 0 2.5rem 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Terminal size={18} color="#9ca3af" />
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            zet-portfolio ~ main
          </span>
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--accent)', marginBottom: '0.5rem' }}>
          {profileData.name}
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '1.25rem', fontWeight: 400 }}>
          {profileData.title} <span style={{ color: 'var(--border-light)' }}>•</span> {profileData.location}
        </p>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-dim)', maxWidth: '640px', lineHeight: 1.7, marginBottom: '1.75rem' }}>
          {profileData.bio}
        </p>

        {/* Action Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.875rem',
              padding: '0.45rem 0.85rem',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text-main)'
            }}
          >
            <GitBranch size={15} /> GitHub <ArrowUpRight size={13} color="var(--text-dim)" />
          </a>
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.875rem',
              padding: '0.45rem 0.85rem',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text-main)'
            }}
          >
            <Globe size={15} /> LinkedIn <ArrowUpRight size={13} color="var(--text-dim)" />
          </a>
          <a
            href={`mailto:${profileData.socials.email}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.875rem',
              padding: '0.45rem 0.85rem',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text-main)'
            }}
          >
            <Mail size={15} /> Contact <ArrowUpRight size={13} color="var(--text-dim)" />
          </a>
        </div>
      </div>
    </header>
  );
};
