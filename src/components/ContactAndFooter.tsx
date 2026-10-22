import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Mail, FileText } from 'lucide-react';
import { Icons } from './BrandIcons';

export const ContactAndFooter: React.FC = () => {
  const { contact, brand } = portfolioConfig;

  return (
    <div>
      {/* Contact Section */}
      <section id="contact" style={{ padding: '4.5rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2.5rem'
        }}>
          {/* Left Heading */}
          <div>
            <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>
              {contact.heading}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {contact.subheading}
            </p>
          </div>

          {/* Right Social & Connect Hub */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            {/* GitHub */}
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-subtle)'
              }}>
                <Icons.Github width={18} height={18} fill="var(--text-main)" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>GitHub</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>View my code</span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-subtle)'
              }}>
                <Icons.Linkedin width={18} height={18} fill="#0077b5" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>LinkedIn</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Connect with me</span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-subtle)'
              }}>
                <Mail size={18} color="#ea4335" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Email</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{contact.email}</span>
              </div>
            </a>

            {/* Résumé */}
            <a
              href={contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Resume_Zet_Donaue_Samson.pdf"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-subtle)'
              }}>
                <FileText size={18} color="var(--text-main)" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Résumé</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Download PDF</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Global Minimal Bottom Footer */}
      <footer style={{ padding: '2rem 0' }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
              {brand.name}
            </span>
            <span style={{ color: 'var(--text-light)', fontWeight: 300 }}>/</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
              {brand.tagline}
            </span>
          </div>

          <p style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-light)',
            margin: 0
          }}>
            Build • Deploy • Improve
          </p>
        </div>
      </footer>
    </div>
  );
};
