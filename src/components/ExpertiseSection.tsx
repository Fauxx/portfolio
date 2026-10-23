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

        {/* 4 Clean Minimalist Cards Grid with Interactive States */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem'
        }}>
          {expertise.cards.map((card) => (
            <div key={card.id} className="expertise-card">
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#eff6ff',
                border: '1px solid #dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.15rem'
              }}>
                {renderIcon(card.icon)}
              </div>

              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.015em', marginBottom: '0.75rem' }}>
                  {card.title}
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {card.items.map((item, itemIdx) => (
                    <span key={itemIdx} className="skill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
