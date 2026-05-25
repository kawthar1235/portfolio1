import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const MARQUEE_ITEMS = [
  'Brand Identity','React','UI Design','Python',
  'Illustration','JavaScript','Typography','Figma',
];

export default function Hero() {
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
          <div className={styles.eyebrow}>Hi there, I'm Nour</div>
          <h1 className={styles.heading}>
            I design, I <em>code</em>,<br />
            I make things<br />
            <span className={styles.blush}>beautiful</span>
          </h1>
          <p className={styles.bio}>
            A creative who lives at the intersection of{' '}
            <strong>design and code</strong>. I build things that look good
            and work well — because why settle for just one?
          </p>
          <div className={styles.actions}>
            <a href="#about" className="btn-primary">About Me</a>
            <a href="https://drive.google.com/file/d/10KEp84NphFAmx6q5I2okaAemH5UkKtHT/view?usp=sharing" className="btn-ghost" target="_blank" rel="kawtharferrer">Download Resume</a>
          </div>
          <div className={styles.socials}>
            <span>Find me</span>
            {['Be','GH','Ig','Li'].map(s => (
              <a key={s} href="#" className={styles.sPill}>{s}</a>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.photoFrame}>Your Photo</div>
          <div className={`${styles.floatTag} ${styles.ft1}`}>
            <div className={styles.ftNum}>3+</div>
            <div className={styles.ftLabel}>Years creating</div>
          </div>
          <div className={`${styles.floatTag} ${styles.ft2}`}>
            <div className={styles.ftNum}>40+</div>
            <div className={styles.ftLabel}>Projects done</div>
          </div>
        </div>
      </section>

      {/* Marquee */}
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
