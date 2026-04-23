const ACCENT = '#10B981';
const FONT = "'IBM Plex Sans', sans-serif";

function adjColor(hex, amt) {
  const c = v => Math.max(0, Math.min(255, v));
  return `rgb(${c(parseInt(hex.slice(1,3),16)+amt)},${c(parseInt(hex.slice(3,5),16)+amt)},${c(parseInt(hex.slice(5,7),16)+amt)})`;
}

export default function LLMCertsLogo({ size = 36, darkBg = true, showText = true }) {
  const dark = darkBg ? '#ffffff' : '#1A1D2E';
  const textClr = darkBg ? '#ffffff' : '#1A1D2E';
  const tagClr = darkBg ? 'rgba(255,255,255,0.45)' : '#888';

  const cx = 50, cy = 50, Ro = 42, Ri = 22;
  const outerR = 6.5, innerR = 3.8;
  const d2r = d => d * Math.PI / 180;

  const O = [90, 30, -30, -90, -150, 150].map(d => ({
    x: cx + Ro * Math.cos(d2r(d)),
    y: cy - Ro * Math.sin(d2r(d)),
  }));
  const I = [90, 30, -30, -150, 150].map(d => ({
    x: cx + Ri * Math.cos(d2r(d)),
    y: cy - Ri * Math.sin(d2r(d)),
  }));

  const short = (x1,y1,x2,y2,stop) => {
    const dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy);
    if (len <= stop) return {x:x1, y:y1};
    const t = (len-stop)/len;
    return {x: x1+dx*t, y: y1+dy*t};
  };
  const outerGap = outerR + 2;

  const bT={x:50,y:33}, bTR={x:64,y:41}, bMC={x:50,y:49}, bTL={x:36,y:41};
  const bBC={x:50,y:65}, bBR={x:64,y:57}, bBL={x:36,y:57};

  const spokes = [
    [I[0], O[0]], [I[1], O[1]], [I[2], O[2]], [I[3], O[4]], [I[4], O[5]]
  ];

  return (
    <div style={{display:'flex', alignItems:'center', gap: showText ? 10 : 0}}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {/* Outer hex edges */}
        <line x1={O[0].x} y1={O[0].y} x2={O[1].x} y2={O[1].y} stroke={dark} strokeWidth="2.2" strokeLinecap="round"/>
        {(() => { const e=short(O[1].x,O[1].y,O[2].x,O[2].y,outerGap); return <line x1={O[1].x} y1={O[1].y} x2={e.x} y2={e.y} stroke={dark} strokeWidth="2.2" strokeLinecap="round"/>; })()}
        {(() => { const e=short(O[2].x,O[2].y,O[3].x,O[3].y,outerGap); return <line x1={O[2].x} y1={O[2].y} x2={e.x} y2={e.y} stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round"/>; })()}
        <line x1={O[3].x} y1={O[3].y} x2={O[4].x} y2={O[4].y} stroke={dark} strokeWidth="2.2" strokeLinecap="round"/>
        <line x1={O[4].x} y1={O[4].y} x2={O[5].x} y2={O[5].y} stroke={dark} strokeWidth="2.2" strokeLinecap="round"/>
        <line x1={O[5].x} y1={O[5].y} x2={O[0].x} y2={O[0].y} stroke={dark} strokeWidth="2.2" strokeLinecap="round"/>

        {/* Spokes */}
        {spokes.map(([from, to], i) => {
          if (i === 2) return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={ACCENT} strokeWidth="1.7" strokeLinecap="round"/>;
          const e = short(from.x,from.y,to.x,to.y,outerGap);
          return <line key={i} x1={from.x} y1={from.y} x2={e.x} y2={e.y} stroke={ACCENT} strokeWidth="1.7" strokeLinecap="round"/>;
        })}

        {/* Inner connections */}
        <line x1={I[0].x} y1={I[0].y} x2={I[1].x} y2={I[1].y} stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1={I[0].x} y1={I[0].y} x2={I[4].x} y2={I[4].y} stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1={I[1].x} y1={I[1].y} x2={I[2].x} y2={I[2].y} stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1={I[3].x} y1={I[3].y} x2={I[4].x} y2={I[4].y} stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round"/>

        {/* Open book */}
        <polygon points={`${bT.x},${bT.y} ${bTR.x},${bTR.y} ${bMC.x},${bMC.y} ${bTL.x},${bTL.y}`} fill={adjColor(ACCENT,55)}/>
        <polygon points={`${bTL.x},${bTL.y} ${bMC.x},${bMC.y} ${bBC.x},${bBC.y} ${bBL.x},${bBL.y}`} fill={ACCENT}/>
        <polygon points={`${bMC.x},${bMC.y} ${bTR.x},${bTR.y} ${bBR.x},${bBR.y} ${bBC.x},${bBC.y}`} fill={adjColor(ACCENT,-35)}/>
        <line x1={bT.x} y1={bT.y} x2={bMC.x} y2={bMC.y} stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>

        {/* Inner nodes */}
        {I.map((p,i) => <circle key={`in${i}`} cx={p.x} cy={p.y} r={innerR} fill={ACCENT}/>)}
        {/* Outer nodes */}
        {O.map((p,i) => <circle key={`on${i}`} cx={p.x} cy={p.y} r={outerR} fill={i===2 ? ACCENT : dark}/>)}
      </svg>

      {showText && (
        <div style={{display:'flex', flexDirection:'column', lineHeight:1}}>
          <span style={{fontFamily:FONT, fontWeight:700, fontSize:size*0.62, letterSpacing:'-0.02em', lineHeight:1, color:textClr}}>
            LLM<span style={{color:ACCENT}}>Certs</span>
          </span>
          <span style={{fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:size*0.19, letterSpacing:'0.13em', color:tagClr, marginTop:4, whiteSpace:'nowrap'}}>
            LEARN · PRACTICE · CERTIFY
          </span>
        </div>
      )}
    </div>
  );
}
