import { useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';
import styles from './Hero.module.css';
import Stickers from './Stickers';

const MARQUEE_ITEMS = [
  'Brand Identity','React','UI Design','Python',
  'Illustration','JavaScript','Typography','Figma',
];

export default function Hero() {
  const { t } = useLang();
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={`${styles.left} fade-up`}>
          <div className={styles.eyebrow}>{t.hero.greeting}</div>
          <h1 className={styles.heading}>
            {t.hero.line1} <em>{t.hero.line2}</em>,<br />
            {t.hero.line3}<br />
            <span className={styles.blush}>{t.hero.line4}</span>
          </h1>
          <p className={styles.bio}>{t.hero.bio}</p>
          <div className={styles.actions}>
            <a href="#about" className="btn-primary">{t.hero.aboutBtn}</a>
            <a href="https://drive.google.com/file/d/10KEp84NphFAmx6q5I2okaAemH5UkKtHT/view?usp=sharing"
              className="btn-ghost" target="_blank" rel="noreferrer">
              {t.hero.resumeBtn}
            </a>
          </div>
          <div className={styles.socials}>
            <span>{t.hero.findMe}</span>
            {['Be','GH','Ig','Li'].map(s => (
              <a key={s} href="#" className={styles.sPill}>{s}</a>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.photoFrame}>Your Photo</div>
          <div className={`${styles.floatTag} ${styles.ft1}`}>
            <div className={styles.ftNum}>3+</div>
            <div className={styles.ftLabel}>{t.hero.yearsLabel}</div>
          </div>
          <div className={`${styles.floatTag} ${styles.ft2}`}>
            <div className={styles.ftNum}>40+</div>
            <div className={styles.ftLabel}>{t.hero.projectsLabel}</div>
          </div>
        </div>
        <Stickers section="hero" />
      </section>
      <div className="marquee-bar">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              {i < MARQUEE_ITEMS.length * 2 - 1 && (
                <span className="marquee-dot"> ✦ </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
