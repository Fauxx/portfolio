import React, { useState } from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Mail, FileText, Copy, Check, ArrowUpRight } from 'lucide-react';
import { Icons } from './BrandIcons';

export const ContactAndFooter: React.FC = () => {
  const { contact, brand } = portfolioConfig;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div style={{ flex: '1 1 340px', maxWidth: '460px' }}>
            <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>
              {contact.heading}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {contact.subheading}
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              marginTop: '1.1rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#f8fafc',
              border: '1px solid var(--border)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)'
            }}>
              <span className="pulse-dot" />
              <span>Pasig City, Metro Manila • Open to On-site &amp; Remote</span>
            </div>
          </div>

          {/* Right Social & Connect Hub */}
          <div style={{ flex: '1 1 480px', maxWidth: '580px' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.1rem'
            }}>
              {/* GitHub */}
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="contact-action-card"
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--bg-subtle)',
                  flexShrink: 0
                }}>
                  <Icons.Github width={18} height={18} fill="var(--text-main)" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>GitHub</span>
                    <ArrowUpRight size={13} color="var(--text-light)" />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>View repositories</span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="contact-action-card"
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--bg-subtle)',
                  flexShrink: 0
                }}>
                  <Icons.Linkedin width={18} height={18} fill="#0077b5" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>LinkedIn</span>
                    <ArrowUpRight size={13} color="var(--text-light)" />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Connect with me</span>
                </div>
              </a>

              {/* Email */}
              <div className="contact-action-card">
                <a
                  href={`mailto:${contact.email}`}
                  title="Send email"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--bg-subtle)',
                    flexShrink: 0,
                    textDecoration: 'none'
                  }}
                >
                  <Mail size={18} color="#ea4335" />
                </a>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <a
                      href={`mailto:${contact.email}`}
                      style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', textDecoration: 'none' }}
                    >
                      Email
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      style={{
                        backgroundColor: copied ? '#ecfdf5' : 'var(--surface-alt)',
                        border: copied ? '1px solid #a7f3d0' : '1px solid var(--border)',
                        color: copied ? '#059669' : 'var(--text-muted)',
                        padding: '2px 8px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        borderRadius: 'var(--radius-full)',
                        transition: 'all 0.15s ease'
                      }}
                      title="Copy email to clipboard"
                      aria-label="Copy email address"
                    >
                      {copied ? <Check size={11} color="#059669" /> : <Copy size={11} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <a
                    href={`mailto:${contact.email}`}
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-light)',
                      textDecoration: 'none',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              {/* Résumé */}
              <a
                href={contact.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Resume_Zet_Donaue_Samson.pdf"
                className="contact-action-card"
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--bg-subtle)',
                  flexShrink: 0
                }}>
                  <FileText size={18} color="var(--primary-blue)" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Résumé</span>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'var(--badge-bg)',
                      color: 'var(--badge-text)',
                      padding: '1px 5px',
                      borderRadius: '4px'
                    }}>PDF</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Download CV</span>
                </div>
              </a>
            </div>

            {/* Response Time Trust Signal */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.76rem',
              color: 'var(--text-light)',
              fontFamily: 'var(--font-mono)',
              paddingLeft: '0.25rem'
            }}>
              <span>⚡ Typically responds within a few hours • Best reached via LinkedIn or Email</span>
            </div>
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
