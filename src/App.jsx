import { useState, useEffect } from 'react';
import Logo from './components/Logo';
import LavaLamp from './components/LavaLamp';
import CertCard from './components/CertCard';
import CertModal from './components/CertModal';
import { CERTS, VENDORS } from './data/certs';

const ACCENT = '#10B981';
const HERO_BG = '#0C1520';
const HERO_GLOW = 'rgba(0,188,212,0.22)';
const FONT = "'IBM Plex Sans', sans-serif";

function Btn({ href, primary, large, children }) {
  const base = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: large ? 15 : 14,
    padding: large ? '13px 28px' : '9px 20px',
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    transition: 'all 0.2s',
    textDecoration: 'none',
  };
  if (primary) {
    return (
      <a href={href} style={{...base, background: ACCENT, color: '#fff'}}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} style={{...base, background:'rgba(255,255,255,0.08)', color:'#fff', border:'1px solid rgba(255,255,255,0.15)'}}>
      {children}
    </a>
  );
}

export default function App() {
  const [activeVendor, setActiveVendor] = useState('All');
  const [navScrolled, setNavScrolled] = useState(false);
  const [navHovered, setNavHovered] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const navActive = navScrolled || navHovered;

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filtered = activeVendor === 'All' ? CERTS : CERTS.filter(c => c.vendor === activeVendor);

  return (
    <div style={{fontFamily: "'DM Sans', sans-serif", color: '#0C1033', background: '#fff'}}>

      {selectedCert && (
        <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}

      {/* NAV */}
      <nav
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
        style={{
          background: navActive ? `${HERO_BG}F2` : 'transparent',
          borderBottomColor: navActive ? 'rgba(255,255,255,0.07)' : 'transparent',
          boxShadow: navActive ? '0 2px 24px rgba(0,0,0,0.3)' : 'none',
          transition: 'background 0.4s, box-shadow 0.4s, border-color 0.4s',
        }}
      >
        <a href="#" className="nav-logo">
          <Logo size={44} darkBg={true} showText={true} />
        </a>
        <div className="nav-links" style={{fontFamily: FONT}}>
          <a href="#certifications">Certifications</a>
          <a href="#how-it-works">How It Works</a>
          <a href="https://train.llmcerts.com">Training Portal</a>
        </div>
        <div className="nav-actions">
          <a
            href="https://train.llmcerts.com"
            style={{fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500, color:'rgba(255,255,255,0.8)', textDecoration:'none', padding:'8px 16px', borderRadius:8, transition:'all 0.2s'}}
          >
            Log in
          </a>
          <Btn href="https://train.llmcerts.com" primary>Get Started →</Btn>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" style={{background: HERO_BG}}>
        <LavaLamp />
        <div className="hero-grid" />
        <div style={{position:'absolute', inset:0, background:`radial-gradient(ellipse 70% 50% at 50% -10%, ${HERO_GLOW} 0%, transparent 65%)`, pointerEvents:'none'}} />
        <div className="hero-content">
          <div
            className="hero-badge"
            style={{background: ACCENT+'22', borderColor: ACCENT+'55', color: ACCENT}}
          >
            <span className="hero-dot" style={{background: ACCENT, boxShadow:`0 0 8px ${ACCENT}`}} />
            Wave 1 Now Live — 21 Certifications Across 14 Vendors
          </div>
          <style>{`.hero-accent { color: ${ACCENT}; }`}</style>
          <h1 style={{fontFamily: FONT}}>
            Learn. Practice.<br/><span className="hero-accent">Get Certified.</span>
          </h1>
          <p className="hero-sub">
            Structured training, practice exams, and study materials for AI certifications from OpenAI
            and Anthropic, to AWS, Google, Microsoft, and beyond.
          </p>
          <div className="hero-ctas">
            <Btn href="https://train.llmcerts.com" primary large>Start Training Free</Btn>
            <Btn href="#certifications" large>Browse Certifications</Btn>
          </div>
        </div>
      </section>

      {/* VENDOR MARQUEE */}
      <div
        className="vendor-strip"
        style={{background: '#F5F6FF', borderTopColor: 'rgba(0,0,0,0.06)', borderBottomColor: 'rgba(0,0,0,0.06)'}}
      >
        <span className="vendor-strip-label" style={{color: '#bbb'}}>Covering</span>
        <div style={{overflow:'hidden', flex:1}}>
          <div style={{
            display:'flex', gap:40, alignItems:'center',
            animation:'scrollVendors 28s linear infinite',
            whiteSpace:'nowrap',
          }}>
            {[...VENDORS.slice(1), ...VENDORS.slice(1)].map((v, i) => (
              <span key={i} style={{display:'inline-flex', alignItems:'center', gap:40}}>
                <span style={{fontFamily: FONT, fontSize:13, fontWeight:600, color:'#888', letterSpacing:'0.04em'}}>{v}</span>
                <span style={{color:'rgba(0,0,0,0.12)', fontSize:10}}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <section className="certs-section" id="certifications" style={{background: '#F5F6FF'}}>
        <div className="section-header">
          <div className="section-eyebrow" style={{color: ACCENT, fontFamily: FONT}}>Wave 1 Catalog</div>
          <h2 className="section-title" style={{fontFamily: FONT, color:'#0C1033'}}>Official AI Certifications,<br/>All in One Place</h2>
          <p className="section-sub" style={{color:'#3B3F5C'}}>Every certification track is based on official vendor offerings. Filter by vendor to find your path.</p>
        </div>

        <div className="vendor-filter">
          {VENDORS.map(v => (
            <button
              key={v}
              className="filter-btn"
              style={activeVendor === v
                ? {background: ACCENT, color:'#fff', borderColor: ACCENT}
                : {}}
              onClick={() => setActiveVendor(v)}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="certs-grid">
          {filtered.map((cert, i) => (
            <CertCard key={i} cert={cert} onLearnMore={setSelectedCert} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">
        <div className="section-header">
          <div className="section-eyebrow" style={{color: ACCENT, fontFamily: FONT}}>How It Works</div>
          <h2 className="section-title" style={{fontFamily: FONT, color:'#0C1033'}}>Your Path to LLM Certification Mastery</h2>
        </div>
        <div className="steps-grid">
          <style>{`.steps-grid::before{background:linear-gradient(90deg,${ACCENT},${ACCENT}88)}`}</style>
          {[
            {n:'1', h:'Confirm Your Cert', p:'Browse the catalog to identify a certification that aligns with your goals.'},
            {n:'2', h:'Train on the Platform', p:'Access training which grows with you using flashcards, practice exams, and spaced-repetition learning on the Elite Recall engine.'},
            {n:'3', h:'Get Certified', p:'Sit the official vendor exam with confidence. Earn your credential and prove your expertise in the fastest-moving field in tech.'},
          ].map((s, i) => (
            <div className="step" key={i}>
              <div className="step-num" style={{background: '#fff', border:`2px solid ${ACCENT}`, color: ACCENT}}>
                {s.n}
              </div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" style={{background: HERO_BG}}>
        <div style={{position:'absolute', inset:0, background:`radial-gradient(ellipse 60% 70% at 50% 50%, ${ACCENT}22 0%, transparent 70%)`, pointerEvents:'none'}} />
        <h2>Your trusted path to<br/>LLM mastery starts here.</h2>
        <p>Train smarter. Get certified faster.</p>
        <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
          <Btn href="https://train.llmcerts.com" primary large>Go to Training Portal</Btn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: '#F5F6FF',
        borderTop: '1px solid rgba(0,0,0,0.08)',
        padding: '48px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16}}>
          <Logo size={44} darkBg={false} showText={true} />
          <div className="footer-links">
            <a href="#" style={{color: '#888'}}>Privacy</a>
            <a href="#" style={{color: '#888'}}>Terms</a>
            <a href="https://train.llmcerts.com" style={{color: '#888'}}>Training Portal</a>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:4}}>
          <span style={{fontSize:13, color:'#888'}}>© 2026 LLMCerts. Powered by Elite Recall.</span>
          <span style={{fontSize:13, color:'#888'}}>LLMCerts is a product of Stella Viae, LLC.</span>
        </div>

        <p style={{
          fontSize: 11, lineHeight: 1.65, color: '#aaa',
          maxWidth: 820, margin: 0,
        }}>
          All vendor names, trademarks, logos, and certification programs referenced on this site —
          including but not limited to OpenAI, Anthropic, Google, Amazon Web Services (AWS), Microsoft,
          GitHub, NVIDIA, Databricks, Snowflake, IBM, Oracle, SAP, Salesforce, and UiPath — are the
          property of their respective owners. LLMCerts and Stella Viae, LLC are not affiliated with,
          endorsed by, sponsored by, or in any way officially connected with any of these companies or
          their certification programs. All certification names, exam titles, and program details are
          referenced solely for informational and descriptive purposes. Use of any trade name or trademark
          is for identification and reference purposes only and does not imply any association with the
          trademark holder.
        </p>
      </footer>

    </div>
  );
}
