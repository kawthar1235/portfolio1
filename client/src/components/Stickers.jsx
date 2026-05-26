import styles from './Stickers.module.css';
import { useEffect, useRef } from 'react';

function useVisible(ref) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-sticker]');
    if (!els) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add(styles.visible); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── shared tiny pieces ── */
const TermBar = () => (
  <div className={styles.termBar}>
    <span className={`${styles.dot} ${styles.dotR}`}/>
    <span className={`${styles.dot} ${styles.dotY}`}/>
    <span className={`${styles.dot} ${styles.dotG}`}/>
  </div>
);

/* ══════════════════════════════════════════
   HERO  —  mixed stickers
══════════════════════════════════════════ */
export function HeroStickers() {
  const ref = useRef(null);
  useVisible(ref);
  return (
    <div ref={ref} className={styles.wrap} aria-hidden="true">

      {/* terminal */}
      <div data-sticker className={`${styles.s} ${styles.sDark} ${styles.col} ${styles.f1} ${styles.h1}`} style={{animationDelay:'.1s'}}>
        <TermBar/>
        <div className={styles.termText}>
          $ npm run dev<br/>
          <span className={styles.green}>✓</span> ready :5173 <span className={styles.cursor}/>
        </div>
      </div>

      {/* react */}
      <div data-sticker className={`${styles.s} ${styles.sBlue} ${styles.pill} ${styles.f2} ${styles.h2}`} style={{animationDelay:'.2s'}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="1.5"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>
        React
      </div>

      {/* figma */}
      <div data-sticker className={`${styles.s} ${styles.sPink} ${styles.pill} ${styles.f3} ${styles.h3}`} style={{animationDelay:'.15s'}}>
        <svg width="11" height="14" viewBox="0 0 38 57" fill="none"><path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe"/><path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0acf83"/><path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#ff7262"/><path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e"/><path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff"/></svg>
        Figma
      </div>

      {/* stars */}
      <div data-sticker className={`${styles.s} ${styles.sDark} ${styles.f4} ${styles.h4} ${styles.sparkWrap}`} style={{animationDelay:'.25s'}}>
        <span style={{fontSize:'18px',color:'#f2d478'}}>★</span>
        <span style={{fontSize:'12px',color:'#c8b8f8'}}>✦</span>
        <span style={{fontSize:'15px',color:'#f2a4c8'}}>★</span>
        <span style={{fontSize:'9px', color:'#5dcaa5'}}>✦</span>
        <span style={{fontSize:'13px',color:'#f2d478'}}>★</span>
      </div>

      {/* code design create */}
      <div data-sticker className={`${styles.s} ${styles.sTeal} ${styles.pill} ${styles.f2} ${styles.h5}`} style={{animationDelay:'.3s'}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5dcaa5" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        Code • Design • Create
      </div>

      {/* frontend dev badge */}
      <div data-sticker className={`${styles.s} ${styles.sDark} ${styles.pill} ${styles.f5} ${styles.h6}`} style={{animationDelay:'.35s'}}>
        <span style={{color:'#f2d478'}}>★</span> Frontend Developer
      </div>

      {/* moon */}
      <div data-sticker className={`${styles.s} ${styles.sDark} ${styles.pill} ${styles.f1} ${styles.h7}`} style={{animationDelay:'.4s'}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8b8f8" strokeWidth="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        dark mode on
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════
   ABOUT  —  mixed stickers
══════════════════════════════════════════ */
export function AboutStickers() {
  const ref = useRef(null);
  useVisible(ref);
  return (
    <div ref={ref} className={styles.wrap} aria-hidden="true">

      {/* coffee */}
      <div data-sticker className={`${styles.s} ${styles.sAmber} ${styles.col} ${styles.f3} ${styles.a1}`} style={{animationDelay:'.1s'}}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fac775" strokeWidth="1.8"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
        <span>debugging...</span>
      </div>

      {/* made with love */}
      <div data-sticker className={`${styles.s} ${styles.sPink} ${styles.pill} ${styles.f2} ${styles.a2}`} style={{animationDelay:'.2s'}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f2a4c8" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        made with love
      </div>

      {/* stars cluster */}
      <div data-sticker className={`${styles.s} ${styles.sDark} ${styles.f4} ${styles.a3} ${styles.sparkWrap}`} style={{animationDelay:'.15s'}}>
        <span style={{fontSize:'16px',color:'#f2d478'}}>★</span>
        <span style={{fontSize:'10px',color:'#c8b8f8'}}>★</span>
        <span style={{fontSize:'14px',color:'#f2a4c8'}}>★</span>
        <span style={{fontSize:'8px', color:'#5dcaa5'}}>✦</span>
      </div>

      {/* currently building */}
      <div data-sticker className={`${styles.s} ${styles.sBlue} ${styles.pill} ${styles.f1} ${styles.a4}`} style={{animationDelay:'.3s'}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#85b7eb" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        currently building
      </div>

      {/* 404 cute */}
      <div data-sticker className={`${styles.s} ${styles.sGray} ${styles.pill} ${styles.f5} ${styles.a5}`} style={{animationDelay:'.25s'}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a8a8c8" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        404 but still cute
      </div>

      {/* geo shapes */}
      <div data-sticker className={`${styles.s} ${styles.sTeal} ${styles.f3} ${styles.a6}`} style={{animationDelay:'.35s',gap:'6px'}}>
        <div className={`${styles.geo} ${styles.hex}`}/>
        <div className={`${styles.geo} ${styles.square}`}/>
        <div className={`${styles.geo} ${styles.circle}`}/>
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════
   CODE SECTION  —  programming stickers
══════════════════════════════════════════ */
export function CodeStickers() {
  const ref = useRef(null);
  useVisible(ref);
  return (
    <div ref={ref} className={styles.wrap} aria-hidden="true">

      {/* terminal window */}
      <div data-sticker className={`${styles.s} ${styles.sDark} ${styles.col} ${styles.f2} ${styles.c1}`} style={{animationDelay:'.1s'}}>
        <TermBar/>
        <div className={styles.termText}>
          <span className={styles.purple}>const</span> code = () =&gt; {'{'}<br/>
          &nbsp;&nbsp;<span className={styles.green}>return</span> <span className={styles.amber}>"magic"</span><br/>
          {'}'}
        </div>
      </div>

      {/* github */}
      <div data-sticker className={`${styles.s} ${styles.sGray} ${styles.pill} ${styles.f1} ${styles.c2}`} style={{animationDelay:'.2s'}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a8a8c8" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        GitHub
      </div>

      {/* javascript */}
      <div data-sticker className={`${styles.s} ${styles.sAmber} ${styles.pill} ${styles.f3} ${styles.c3}`} style={{animationDelay:'.15s'}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fac775" strokeWidth="1.8"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
        JavaScript
      </div>

      {/* react */}
      <div data-sticker className={`${styles.s} ${styles.sBlue} ${styles.pill} ${styles.f4} ${styles.c4}`} style={{animationDelay:'.25s'}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="1.5"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>
        React
      </div>

      {/* python */}
      <div data-sticker className={`${styles.s} ${styles.sTeal} ${styles.pill} ${styles.f2} ${styles.c5}`} style={{animationDelay:'.3s'}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5dcaa5" strokeWidth="1.8"><path d="M12 2C8 2 8 4 8 4v4h8V6s0-4-4-4z"/><path d="M8 8H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3"/><path d="M12 22c4 0 4-2 4-2v-4H8v2s0 4 4 4z"/><path d="M16 16h3a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-3"/><circle cx="10" cy="6" r="1" fill="#5dcaa5"/><circle cx="14" cy="18" r="1" fill="#5dcaa5"/></svg>
        Python
      </div>

      {/* eat sleep code */}
      <div data-sticker className={`${styles.s} ${styles.sDark} ${styles.pill} ${styles.f5} ${styles.c6}`} style={{animationDelay:'.35s'}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8b8f8" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        eat sleep code repeat
      </div>

      {/* keyboard */}
      <div data-sticker className={`${styles.s} ${styles.sGray} ${styles.f1} ${styles.c7}`} style={{animationDelay:'.4s',flexDirection:'column',gap:'5px'}}>
        <div style={{display:'flex',gap:'4px'}}>
          <span className={styles.kbd}>Ctrl</span>
          <span className={styles.kbd}>+</span>
          <span className={styles.kbd}>Z</span>
        </div>
        <span style={{fontSize:'9px',color:'#5a5a7e',fontStyle:'italic'}}>undo everything</span>
      </div>

      {/* node */}
      <div data-sticker className={`${styles.s} ${styles.sTeal} ${styles.pill} ${styles.f3} ${styles.c8}`} style={{animationDelay:'.45s'}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5dcaa5" strokeWidth="1.8"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>
        Node.js
      </div>

      {/* stars */}
      <div data-sticker className={`${styles.s} ${styles.sDark} ${styles.f4} ${styles.c9} ${styles.sparkWrap}`} style={{animationDelay:'.5s'}}>
        <span style={{fontSize:'16px',color:'#f2d478'}}>★</span>
        <span style={{fontSize:'10px',color:'#c8b8f8'}}>★</span>
        <span style={{fontSize:'14px',color:'#5dcaa5'}}>✦</span>
        <span style={{fontSize:'8px', color:'#f2d478'}}>★</span>
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════
   DESIGN SECTION  —  design stickers
══════════════════════════════════════════ */
export function DesignStickers() {
  const ref = useRef(null);
  useVisible(ref);
  return (
    <div ref={ref} className={styles.wrap} aria-hidden="true">

      {/* figma */}
      <div data-sticker className={`${styles.s} ${styles.sPink} ${styles.pill} ${styles.f1} ${styles.d1}`} style={{animationDelay:'.1s'}}>
        <svg width="11" height="14" viewBox="0 0 38 57" fill="none"><path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe"/><path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0acf83"/><path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#ff7262"/><path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e"/><path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff"/></svg>
        Figma
      </div>

      {/* wireframe */}
      <div data-sticker className={`${styles.s} ${styles.sBlue} ${styles.col} ${styles.f2} ${styles.d2}`} style={{animationDelay:'.2s',minWidth:'140px'}}>
        <div style={{width:'100%',height:'3px',background:'#1a4f8e',borderRadius:'2px',marginBottom:'3px'}}/>
        <div style={{display:'flex',gap:'5px',width:'100%'}}>
          <div style={{flex:2,height:'24px',border:'1px solid #2a6aae',borderRadius:'4px'}}/>
          <div style={{flex:1,display:'flex',flexDirection:'column',gap:'3px'}}>
            <div style={{height:'10px',border:'1px solid #2a6aae',borderRadius:'3px'}}/>
            <div style={{height:'10px',border:'1px solid #2a6aae',borderRadius:'3px'}}/>
          </div>
        </div>
        <span style={{fontSize:'9px',color:'#5a8aab',marginTop:'2px'}}>wireframe</span>
      </div>

      {/* color palette */}
      <div data-sticker className={`${styles.s} ${styles.sDark} ${styles.col} ${styles.f3} ${styles.d3}`} style={{animationDelay:'.15s',gap:'6px'}}>
        <div style={{display:'flex',gap:'5px'}}>
          {['#F2A4A5','#E5D4C5','#3078A4','#090087','#F2FFE9'].map((c,i) => (
            <div key={i} style={{width:'18px',height:'18px',borderRadius:'50%',background:c,border:'1.5px solid rgba(255,255,255,.15)'}}/>
          ))}
        </div>
        <span style={{fontSize:'9px',color:'#6a6a9e'}}>color palette</span>
      </div>

      {/* typography */}
      <div data-sticker className={`${styles.s} ${styles.sPink} ${styles.f4} ${styles.d4}`} style={{animationDelay:'.25s',flexDirection:'column',gap:'3px',alignItems:'flex-start'}}>
        <span style={{fontFamily:'Georgia,serif',fontSize:'18px',color:'#f2a4c8',lineHeight:1}}>Aa</span>
        <span style={{fontSize:'9px',color:'#7a2a4e'}}>typography</span>
      </div>

      {/* made with love */}
      <div data-sticker className={`${styles.s} ${styles.sPink} ${styles.pill} ${styles.f2} ${styles.d5}`} style={{animationDelay:'.3s'}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f2a4c8" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        made with love
      </div>

      {/* stars */}
      <div data-sticker className={`${styles.s} ${styles.sDark} ${styles.f5} ${styles.d6} ${styles.sparkWrap}`} style={{animationDelay:'.35s'}}>
        <span style={{fontSize:'18px',color:'#f2a4c8'}}>★</span>
        <span style={{fontSize:'12px',color:'#f2d478'}}>★</span>
        <span style={{fontSize:'15px',color:'#c8b8f8'}}>✦</span>
        <span style={{fontSize:'9px', color:'#f2a4c8'}}>★</span>
        <span style={{fontSize:'13px',color:'#5dcaa5'}}>✦</span>
      </div>

      {/* procreate */}
      <div data-sticker className={`${styles.s} ${styles.sPink} ${styles.pill} ${styles.f1} ${styles.d7}`} style={{animationDelay:'.4s'}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f2a4c8" strokeWidth="1.8"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
        Procreate
      </div>

      {/* geo */}
      <div data-sticker className={`${styles.s} ${styles.sTeal} ${styles.f3} ${styles.d8}`} style={{animationDelay:'.45s',gap:'6px'}}>
        <div className={`${styles.geo} ${styles.hex}`}/>
        <div className={`${styles.geo} ${styles.square}`}/>
        <div className={`${styles.geo} ${styles.circle}`}/>
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════
   DEFAULT export (backward compat)
══════════════════════════════════════════ */
export default function Stickers({ section = 'hero' }) {
  if (section === 'hero')   return <HeroStickers />;
  if (section === 'about')  return <AboutStickers />;
  if (section === 'code')   return <CodeStickers />;
  if (section === 'design') return <DesignStickers />;
  return null;
}
