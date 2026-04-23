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
    transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
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
  const [tosOpen, setTosOpen] = useState(false);
  const p = {fontSize:14,lineHeight:1.7,marginTop:0,marginBottom:14,color:'#3B3F5C'};

  useEffect(() => {
    if (!tosOpen) return;
    const onKey = e => { if (e.key === 'Escape') setTosOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [tosOpen]);
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

      {tosOpen && (
        <div onClick={() => setTosOpen(false)} style={{position:'fixed',inset:0,background:'rgba(12,16,32,0.72)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
          <div onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:16,width:'100%',maxWidth:680,maxHeight:'85vh',overflowY:'auto',padding:'40px 44px',fontFamily:"'IBM Plex Sans',sans-serif",color:'#1A1D2E'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32}}>
              <h2 style={{margin:0,fontSize:22,fontWeight:700,letterSpacing:'-0.02em'}}>Terms of Service &amp; Privacy Policy</h2>
              <button onClick={() => setTosOpen(false)} aria-label="Close" style={{background:'none',border:'none',cursor:'pointer',fontSize:22,color:'#888',lineHeight:1,padding:4}}>✕</button>
            </div>

            <p style={{fontSize:12,color:'#888',marginTop:0}}>Effective date: April 23, 2026 &nbsp;·&nbsp; Stella Viae, LLC</p>

            <h3 style={{fontSize:15,fontWeight:700,marginTop:28,marginBottom:8}}>Terms of Service</h3>

            <p style={p}>By accessing or using LLMCerts ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>

            <p style={p}><strong>1. Use of Service.</strong> LLMCerts provides study materials, practice exams, and information about third-party AI certification programs for personal, non-commercial educational use. You agree not to reproduce, resell, or distribute any content from the Service without written permission.</p>

            <p style={p}><strong>2. Accounts.</strong> When you create an account, you are responsible for maintaining the confidentiality of your credentials and for all activity under your account. You must provide accurate information and notify us immediately of any unauthorized use.</p>

            <p style={p}><strong>3. No Affiliation or Guarantee.</strong> LLMCerts is not affiliated with, endorsed by, or officially connected to any vendor whose certifications are referenced. We make no guarantee that use of the Service will result in passing any certification exam.</p>

            <p style={p}><strong>4. Intellectual Property.</strong> All original content on the Service — including text, graphics, and code — is owned by Stella Viae, LLC. Vendor names, logos, and exam titles remain the property of their respective owners and are used for descriptive purposes only.</p>

            <p style={p}><strong>5. Disclaimer of Warranties.</strong> The Service is provided "as is" without warranties of any kind. We do not warrant that the Service will be uninterrupted, error-free, or that any information is accurate or complete.</p>

            <p style={p}><strong>6. Limitation of Liability.</strong> To the maximum extent permitted by law, Stella Viae, LLC shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>

            <p style={p}><strong>7. Governing Law.</strong> These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles.</p>

            <p style={p}><strong>8. Changes.</strong> We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>

            <hr style={{border:'none',borderTop:'1px solid rgba(0,0,0,0.08)',margin:'32px 0'}}/>

            <h3 style={{fontSize:15,fontWeight:700,marginTop:0,marginBottom:8}}>Privacy Policy</h3>

            <p style={p}><strong>1. Information We Collect.</strong> We collect information you provide directly (such as name and email when creating an account), usage data (pages visited, features used), and technical data (browser type, IP address, device information).</p>

            <p style={p}><strong>2. How We Use It.</strong> We use your information to operate and improve the Service, communicate with you about your account, and send optional product updates. We do not sell your personal data.</p>

            <p style={p}><strong>3. Third-Party Services.</strong> We may use third-party services (such as analytics or payment processors) that collect data subject to their own privacy policies. We require these partners to protect your data in accordance with applicable law.</p>

            <p style={p}><strong>4. Cookies.</strong> We use cookies and similar technologies to remember your preferences and analyze usage. You may disable cookies in your browser settings, though some features of the Service may not function properly as a result.</p>

            <p style={p}><strong>5. Data Retention.</strong> We retain your personal data for as long as your account is active or as needed to provide the Service, comply with legal obligations, or resolve disputes.</p>

            <p style={p}><strong>6. Your Rights.</strong> Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. To make a request, contact us at the address below.</p>

            <p style={p}><strong>7. Security.</strong> We implement reasonable technical and organizational measures to protect your data, but no method of transmission over the Internet is 100% secure.</p>

            <p style={p}><strong>8. Contact.</strong> Questions about these Terms or our Privacy Policy may be directed to: <a href="mailto:legal@llmcerts.com" style={{color:'#10B981'}}>legal@llmcerts.com</a></p>
          </div>
        </div>
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
            <button onClick={() => setTosOpen(true)}>Terms of Service</button>
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
