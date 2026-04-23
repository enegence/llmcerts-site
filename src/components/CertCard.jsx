import { useState } from 'react';
import { VENDOR_COLORS } from '../data/certs';

const ACCENT = '#10B981';

export default function CertCard({ cert, onLearnMore }) {
  const [hovered, setHovered] = useState(false);
  const vColor = VENDOR_COLORS[cert.vendor] || '#888';

  const cardStyle = {
    border: '1px solid transparent',
    boxShadow: hovered ? '0 12px 36px rgba(0,0,0,0.14)' : '0 4px 20px rgba(0,0,0,0.09)',
    borderColor: hovered ? `${ACCENT}30` : 'transparent',
    transform: hovered ? 'translateY(-2px)' : 'none',
  };

  return (
    <div
      className="cert-card"
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="cert-card-header">
        <span className="vendor-pill" style={{background: vColor+'18', color: vColor}}>{cert.vendor}</span>
        <span className="audience-tag">{cert.audience}</span>
      </div>
      <div className="cert-name">{cert.name}</div>
      <div className="cert-meta">
        <span className={`meta-chip ${cert.availability === 'Public' ? 'chip-public' : 'chip-limited'}`}>
          {cert.availability === 'Public' ? '✓ Public' : '⚡ ' + cert.availability}
        </span>
        {cert.coding && (
          <span className="meta-chip chip-coding">&lt;/&gt; Dev-focused</span>
        )}
        <span className="meta-chip chip-focus">{cert.focus}</span>
      </div>
      <button
        onClick={() => onLearnMore(cert)}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, fontWeight: 600,
          color: '#fff',
          background: ACCENT,
          border: 'none',
          cursor: 'pointer',
          padding: '9px 0',
          borderRadius: 8,
          width: '100%',
          textAlign: 'center',
          transition: 'opacity 0.15s',
        }}
      >
        Learn More
      </button>
    </div>
  );
}
