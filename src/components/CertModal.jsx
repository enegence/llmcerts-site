import { useEffect } from 'react';
import { VENDOR_COLORS } from '../data/certs';

const ACCENT = '#10B981';

export default function CertModal({ cert, onClose }) {
  const vColor = VENDOR_COLORS[cert.vendor] || '#888';

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(12,16,32,0.72)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: '36px',
          maxWidth: 520,
          width: '100%',
          boxShadow: '0 24px 80px rgba(0,0,0,0.22)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: '#F3F4F8', border: 'none', borderRadius: '50%',
            width: 32, height: 32, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, color: '#888', lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Vendor pill */}
        <div style={{marginBottom: 16}}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', padding: '5px 12px',
            borderRadius: 100, background: vColor+'18', color: vColor,
          }}>
            {cert.vendor}
          </span>
        </div>

        {/* Cert name */}
        <h2 style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 22, fontWeight: 700, lineHeight: 1.25,
          color: '#0C1033', marginBottom: 24, letterSpacing: '-0.02em',
        }}>
          {cert.name}
        </h2>

        {/* Detail rows */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28}}>
          <DetailRow label="Target Audience" value={cert.audience} />
          <DetailRow
            label="Availability"
            value={
              <span style={{
                fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 4,
                background: cert.availability === 'Public' ? '#EDFAF3' : '#FFF7ED',
                color: cert.availability === 'Public' ? '#1A8F5A' : '#C26A0A',
              }}>
                {cert.availability === 'Public' ? '✓ Public' : '⚡ ' + cert.availability}
              </span>
            }
          />
          <DetailRow label="Focus Area" value={cert.focus} />
          <DetailRow
            label="Skill Type"
            value={
              cert.coding
                ? <span style={{fontSize:12,fontWeight:600,padding:'3px 10px',borderRadius:4,background:'#EEF0FF',color:'#4353D4'}}>&lt;/&gt; Developer-focused</span>
                : <span style={{color:'#888',fontSize:13}}>Conceptual / Non-coding</span>
            }
          />
        </div>

        {/* What's included note */}
        <div style={{
          background: '#F5F6FF', borderRadius: 10, padding: '14px 16px',
          marginBottom: 28, borderLeft: `3px solid ${ACCENT}`,
        }}>
          <p style={{fontSize: 13, color: '#3B3F5C', lineHeight: 1.6, margin: 0}}>
            Training materials for this certification include structured study guides, flashcards, and
            spaced-repetition practice exams on the Elite Recall engine — aligned to the official exam objectives.
          </p>
        </div>

        {/* Get Started CTA */}
        <a
          href="https://train.llmcerts.com"
          style={{
            display: 'block', textAlign: 'center',
            background: ACCENT, color: '#fff',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, fontWeight: 700,
            padding: '13px 0', borderRadius: 10,
            textDecoration: 'none', transition: 'opacity 0.15s',
          }}
        >
          Get Started →
        </a>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: '#aaa',
        minWidth: 120, paddingTop: 2,
      }}>
        {label}
      </span>
      <span style={{fontSize: 13, fontWeight: 500, color: '#0C1033', flex: 1}}>
        {value}
      </span>
    </div>
  );
}
