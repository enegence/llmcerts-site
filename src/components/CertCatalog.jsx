import { useState } from 'react';
import { CERTS, VENDOR_COLORS } from '../data/certs';

const ACCENT = '#10B981';
const FONT = "'IBM Plex Sans', sans-serif";

const TRACKS = [
  {
    id: 'cloud',
    name: 'Cloud & Platform',
    desc: "Certifications from the major cloud providers. Ideal if you're building or deploying AI on enterprise infrastructure.",
    badge: '#4285F4',
    badgeText: 'Cloud',
    vendors: ['AWS', 'Google', 'Microsoft'],
  },
  {
    id: 'aidev',
    name: 'AI Labs & Development',
    desc: 'Certifications from AI-native companies and developer tools. For engineers working directly with LLMs and models.',
    badge: '#10A37F',
    badgeText: 'AI Native',
    vendors: ['OpenAI', 'Anthropic', 'NVIDIA', 'GitHub'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise & Data',
    desc: 'Certs for integrating AI into business systems, data platforms, and enterprise software ecosystems.',
    badge: '#FF3621',
    badgeText: 'Enterprise',
    vendors: ['IBM', 'Databricks', 'Snowflake', 'Oracle', 'SAP', 'Salesforce', 'UiPath'],
  },
];

function TrackView({ onLearnMore, onBrowseAll }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
      {TRACKS.map(track => {
        const certs = CERTS.filter(c => track.vendors.includes(c.vendor));
        return (
          <div key={track.id} style={{
            background: '#fff', borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.07)',
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
          }}>
            {/* Track header */}
            <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '4px 10px', borderRadius: 100,
                background: `${track.badge}18`, color: track.badge,
                marginBottom: 14,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: track.badge, display: 'inline-block' }} />
                {track.badgeText}
              </div>
              <div style={{
                fontFamily: FONT, fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em',
                color: '#0C1033', marginBottom: 8, lineHeight: 1.25,
              }}>
                {track.name}
              </div>
              <div style={{ fontSize: 13, color: '#3B3F5C', lineHeight: 1.55, marginBottom: 14 }}>
                {track.desc}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {track.vendors.map(v => {
                  const c = VENDOR_COLORS[v] || '#888';
                  return (
                    <span key={v} style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                      padding: '3px 8px', borderRadius: 4, background: `${c}18`, color: c,
                    }}>{v}</span>
                  );
                })}
              </div>
            </div>

            {/* Cert rows — fixed-width vendor column keeps cert names left-aligned */}
            <div style={{ padding: '8px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              {certs.map((cert, i) => {
                const color = VENDOR_COLORS[cert.vendor] || '#888';
                return (
                  <div
                    key={i}
                    onClick={() => onLearnMore(cert)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr',
                      alignItems: 'start',
                      gap: 10,
                      padding: '10px 0',
                      borderBottom: i < certs.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => { e.currentTarget.querySelector('.cert-row-name').style.color = ACCENT; }}
                    onMouseLeave={e => { e.currentTarget.querySelector('.cert-row-name').style.color = '#0C1033'; }}
                  >
                    <span style={{
                      fontFamily: FONT,
                      fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
                      padding: '3px 0', borderRadius: 4,
                      textAlign: 'center', display: 'block',
                      background: `${color}18`, color, marginTop: 2,
                    }}>{cert.vendor}</span>
                    <div>
                      <div className="cert-row-name" style={{
                        fontFamily: FONT, fontSize: 13, fontWeight: 600,
                        color: '#0C1033', lineHeight: 1.35, transition: 'color 0.15s',
                      }}>
                        {cert.name}
                      </div>
                      <div style={{ display: 'flex', gap: 5, marginTop: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{
                          fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 3,
                          background: cert.availability === 'Public' ? '#EDFAF3' : '#FFF7ED',
                          color: cert.availability === 'Public' ? '#1A8F5A' : '#C26A0A',
                        }}>
                          {cert.availability === 'Public' ? '✓ Public' : '⚡ ' + cert.availability}
                        </span>
                        {cert.coding && (
                          <span style={{
                            fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 3,
                            background: '#EEF0FF', color: '#4353D4',
                          }}>&lt;/&gt; Dev</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{
              padding: '14px 28px', borderTop: '1px solid rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 12, color: '#bbb', fontFamily: FONT }}>
                {certs.length} certifications
              </span>
              <button
                onClick={onBrowseAll}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12, fontWeight: 600, color: ACCENT,
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }}
              >
                Browse all →
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function VendorBoardView({ onLearnMore }) {
  const vendors = [...new Set(CERTS.map(c => c.vendor))];
  return (
    <div style={{
      maxWidth: 1100, margin: '0 auto',
      border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16,
      overflow: 'hidden', background: '#fff',
    }}>
      {vendors.map((vendor, vi) => {
        const certs = CERTS.filter(c => c.vendor === vendor);
        const color = VENDOR_COLORS[vendor] || '#888';
        return (
          <div key={vendor} style={{
            display: 'grid', gridTemplateColumns: '200px 1fr',
            borderBottom: vi < vendors.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
          }}>
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '20px 24px', borderRight: '1px solid rgba(0,0,0,0.06)',
            }}>
              <div style={{
                width: 4, minHeight: 20, borderRadius: 4,
                background: color, opacity: 0.9, flexShrink: 0, marginTop: 2,
              }} />
              <div>
                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#0C1033' }}>{vendor}</div>
                <div style={{ fontFamily: FONT, fontSize: 11, color: '#999', marginTop: 3 }}>
                  {certs.length} cert{certs.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div style={{ padding: '16px 24px', display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              {certs.map((cert, i) => (
                <VendorChip key={i} cert={cert} color={color} onClick={() => onLearnMore(cert)} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function VendorChip({ cert, color, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: FONT,
        fontSize: 12, fontWeight: 500,
        color: hovered ? '#0a6e48' : '#0C1033',
        background: hovered ? '#10B98112' : '#F2F3FA',
        border: `1px solid ${hovered ? '#10B98140' : 'rgba(0,0,0,0.07)'}`,
        padding: '7px 14px', borderRadius: 8,
        display: 'flex', alignItems: 'center', gap: 7,
        cursor: 'pointer', transition: 'all 0.15s', lineHeight: 1.3,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span>{cert.name}</span>
      {cert.coding && (
        <span style={{
          fontFamily: FONT, fontSize: 10,
          background: '#EEF0FF', color: '#4353D4',
          padding: '1px 5px', borderRadius: 3, fontWeight: 600, flexShrink: 0,
        }}>&lt;/&gt;</span>
      )}
      <span style={{ fontSize: 10, color: '#bbb', flexShrink: 0 }}>
        {cert.availability === 'Public' ? '✓' : '⚡'}
      </span>
    </div>
  );
}

export default function CertCatalog({ onLearnMore }) {
  const [view, setView] = useState('tracks');

  return (
    <section className="certs-section" id="certifications" style={{ background: '#F5F6FF' }}>
      <div className="section-header">
        <div className="section-eyebrow" style={{ color: ACCENT, fontFamily: FONT }}>Wave 1 Catalog</div>
        <h2 className="section-title" style={{ fontFamily: FONT, color: '#0C1033' }}>
          Industry AI Certifications,<br />All in One Place
        </h2>
        <p className="section-sub" style={{ color: '#3B3F5C' }}>
          {view === 'tracks'
            ? "Find your path. Every cert organized by where you work and where you're headed."
            : 'Every certification track is based on official vendor offerings. 21 certifications across 14 vendors.'}
        </p>
      </div>

      {/* View toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 44 }}>
        <div style={{
          display: 'inline-flex', background: 'rgba(0,0,0,0.06)',
          borderRadius: 10, padding: 3, gap: 2,
        }}>
          {[{ id: 'tracks', label: 'By Track' }, { id: 'vendors', label: 'By Vendor' }].map(opt => (
            <button
              key={opt.id}
              onClick={() => setView(opt.id)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, fontWeight: 600,
                padding: '7px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
                transition: 'all 0.18s',
                background: view === opt.id ? '#fff' : 'transparent',
                color: view === opt.id ? '#0C1033' : '#888',
                boxShadow: view === opt.id ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {view === 'tracks'
        ? <TrackView onLearnMore={onLearnMore} onBrowseAll={() => setView('vendors')} />
        : <VendorBoardView onLearnMore={onLearnMore} />
      }
    </section>
  );
}
