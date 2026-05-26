import { useEffect, useRef } from 'react';
import styles from './Stickers.module.css';

export default function Stickers({ section = 'hero' }) {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-sticker]');
    if (!els) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add(styles.visible); }),
      { threshold: 0.1 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (section === 'hero') return (
    <div ref={ref} className={styles.wrap} aria-hidden="true">

      {/* Terminal */}
      <div data-sticker className={`${styles.sticker} ${styles.terminal} ${styles.pos1} ${styles.float1}`}>
        <div className={styles.termBar}>
          <span className={`${styles.dot} ${styles.dotR}`} />
          <span className={`${styles.dot} ${styles.dotY}`} />
          <span className={`${styles.dot} ${styles.dotG}`} />
          <span className={styles.termTitle}>~/portfolio</span>
        </div>
        <div className={styles.termText}>
          $ npm run dev<br />
          <span className={styles.termGreen}>✓</span> ready on :5173
          <span className={styles.cursor} />
        </div>
      </div>

      {/* React pill */}
      <div data-sticker className={`${styles.sticker} ${styles.pill} ${styles.sBlue} ${styles.pos2} ${styles.float2}`}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="1.5">
          <circle cx="12" cy="12" r="2"/>
          <ellipse cx="12" cy="12" rx="10" ry="4"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
        </svg>
        React
      </div>

      {/* Sparkles */}
      <div data-sticker className={`${styles.sticker} ${styles.sDark} ${styles.pos3} ${styles.float3} ${styles.sparkles}`}>
        <span style={{fontSize:'16px'}}>✦</span>
        <span style={{fontSize:'10px'}}>✦</span>
        <span style={{fontSize:'14px'}}>✦</span>
        <span style={{fontSize:'8px'}}>✦</span>
      </div>

      {/* Code Design Create */}
      <div data-sticker className={`${styles.sticker} ${styles.pill} ${styles.sTeal} ${styles.pos4} ${styles.float4}`}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5dcaa5" strokeWidth="2">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
        Code • Design • Create
      </div>

      {/* Keyboard shortcut */}
      <div data-sticker className={`${styles.sticker} ${styles.sGray} ${styles.pos5} ${styles.float5}`}>
        <span className={styles.kbd}>Ctrl</span>
        <span className={styles.kbd}>+</span>
        <span className={styles.kbd}>S</span>
        <span className={styles.kbdNote}>save the world</span>
      </div>

      {/* Frontend Developer badge */}
      <div data-sticker className={`${styles.sticker} ${styles.pill} ${styles.sDark} ${styles.pos6} ${styles.float2}`}>
        <span style={{color:'#f2d478',fontSize:'13px'}}>★</span>
        Frontend Developer
      </div>

      {/* Geometric shapes */}
      <div data-sticker className={`${styles.sticker} ${styles.sTeal} ${styles.pos7} ${styles.float1} ${styles.geoWrap}`}>
        <div className={`${styles.geo} ${styles.hex}`} />
        <div className={`${styles.geo} ${styles.square}`} />
        <div className={`${styles.geo} ${styles.circle}`} />
      </div>

    </div>
  );

  if (section === 'about') return (
    <div ref={ref} className={styles.wrap} aria-hidden="true">

      {/* Coffee */}
      <div data-sticker className={`${styles.sticker} ${styles.sAmber} ${styles.apos1} ${styles.float3}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fac775" strokeWidth="1.8">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
          <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
        </svg>
        <span>debugging...</span>
      </div>

      {/* Figma */}
      <div data-sticker className={`${styles.sticker} ${styles.pill} ${styles.sPink} ${styles.apos2} ${styles.float4}`}>
        <svg width="13" height="15" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe"/>
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0acf83"/>
          <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#ff7262"/>
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e"/>
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff"/>
        </svg>
        Figma
      </div>

      {/* Code snippet */}
      <div data-sticker className={`${styles.sticker} ${styles.sDark} ${styles.apos3} ${styles.float2} ${styles.codeSnippet}`}>
        <div className={styles.termBar}>
          <span className={`${styles.dot} ${styles.dotR}`}/>
          <span className={`${styles.dot} ${styles.dotY}`}/>
          <span className={`${styles.dot} ${styles.dotG}`}/>
        </div>
        <div className={styles.codeText}>
          <span className={styles.cPurple}>const</span> me = {'{'}<br/>
          &nbsp;&nbsp;role: <span className={styles.cAmber}>"dev"</span>,<br/>
          &nbsp;&nbsp;vibe: <span className={styles.cAmber}>"cozy"</span><br/>
          {'}'}
        </div>
      </div>

      {/* 404 cute */}
      <div data-sticker className={`${styles.sticker} ${styles.pill} ${styles.sGray} ${styles.apos4} ${styles.float5}`}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a8a8c8" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        404 but still cute
      </div>

      {/* Made with love */}
      <div data-sticker className={`${styles.sticker} ${styles.pill} ${styles.sPink} ${styles.apos5} ${styles.float1}`}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f2a4c8" strokeWidth="1.8">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        made with love
      </div>

    </div>
  );

  return null;
}
