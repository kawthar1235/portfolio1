import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const TAGS = ['Figma','React','Python','Illustrator','JavaScript','Procreate','After Effects','Node.js'];

export default function About() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={`${styles.photoWrap} fade-up`}>
        <div className={styles.photo}>Your Photo</div>
        <div className={styles.badge}>
          <div className={styles.badgeBig}>Open</div>
          <div className={styles.badgeSm}>to freelance work</div>
        </div>
      </div>

      <div className={`${styles.content} fade-up`}>
        <div className="section-eyebrow">01 — About Me</div>
        <h2 className="section-title">
          Designer who <em>codes</em>,<br />coder who designs
        </h2>
        <p className={styles.bio}>
          I'm Nour — I started with design because I couldn't stop making things pretty,
          then learned to code because I couldn't stop wondering how things worked.
          Now I do both, and honestly it's the best decision I've ever made.
        </p>

        <div className={styles.stats}>
          {[['3+','Years of experience'],['40+','Projects delivered'],['12+','Happy clients']].map(([n,l]) => (
            <div key={l}>
              <div className={styles.statNum}>{n}</div>
              <div className={styles.statLabel}>{l}</div>
            </div>
          ))}
        </div>

        <blockquote className={styles.quote}>
          "The best products are the ones where the design and the code feel like
          they were made by the same person — because they were."
        </blockquote>

        <p className={styles.extra}>
          When I'm not at my desk I'm probably at a museum, watching Ghibli films,
          or rating coffee shops I'll never stop visiting.
        </p>

        <div className={styles.tags}>
          {TAGS.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <div className={styles.actions}>
          <a href="/resume.pdf" target="_blank">Download CV</a>
          <a href="#contact" className="btn-ghost">Let's Chat</a>
        </div>
      </div>
    </section>
  );
}
