import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Cloud, Box, Server, ShieldCheck, BarChart3 } from 'lucide-react';

export const ExpertiseSection: React.FC = () => {
  const { expertise } = portfolioConfig;

  const renderIcon = (iconName: string) => {
    const props = { size: 26, color: '#2563eb', strokeWidth: 1.75 };
    switch (iconName) {
      case 'cloud':
        return <Cloud {...props} />;
      case 'box':
        return <Box {...props} />;
      case 'server':
        return <Server {...props} />;
      case 'shield':
        return <ShieldCheck {...props} />;
      case 'chart':
        return <BarChart3 {...props} />;
      default:
        return <Box {...props} />;
    }
  };

  return (
    <section id="engineering" style={{ padding: '4.5rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        {/* Header with section tag and subtitle */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <div className="section-tag">{expertise.tag}</div>
            <h2 className="section-title">{expertise.title}</h2>
          </div>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            maxWidth: '380px',
            lineHeight: 1.6
          }}>
            {expertise.subtitle}
          </p>
        </div>

        {/* 4 Clean Minimalist Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.25rem'
        }}>
          {expertise.cards.map((card) => (
            <div
              key={card.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ marginBottom: '0.25rem' }}>
                {renderIcon(card.icon)}
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
                {card.title}
              </h3>

              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                margin: 0
              }}>
                {card.items.join('  •  ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
