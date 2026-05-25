import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const TAGS = [
  'React',
  'JavaScript',
  'Node.js',
  'Python',
  'UI/UX',
  'Figma',
  'MongoDB',
  'Frontend Development'
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        }),
      { threshold: 0.1 }
    );

    ref.current
      ?.querySelectorAll('.fade-up')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={`${styles.photoWrap} fade-up`}>
        <div className={styles.photo}>Kawthar</div>

        <div className={styles.badge}>
          <div className={styles.badgeBig}>Available</div>
          <div className={styles.badgeSm}>for freelance work</div>
        </div>
      </div>

      <div className={`${styles.content} fade-up`}>
        <div className="section-eyebrow">01 — About Me</div>

        <h2 className="section-title">
          Frontend developer who loves
          <em> building modern experiences</em>
        </h2>

        <p className={styles.bio}>
          I'm Kawthar — a Computer Science student passionate about frontend
          development, UI/UX design, and creating clean digital experiences.
          I enjoy turning ideas into interactive websites that feel smooth,
          modern, and user-friendly.
        </p>

        <div className={styles.stats}>
          {[
            ['10+', 'Projects built'],
            ['3+', 'Technologies mastered'],
            ['100%', 'Passion for coding']
          ].map(([n, l]) => (
            <div key={l}>
              <div className={styles.statNum}>{n}</div>
              <div className={styles.statLabel}>{l}</div>
            </div>
          ))}
        </div>

        <blockquote className={styles.quote}>
          "I believe great websites are not just functional — they should feel
          beautiful, intuitive, and memorable."
        </blockquote>

        <p className={styles.extra}>
          Outside coding, I enjoy exploring design trends, working on creative
          projects, and learning new technologies to improve my skills every day.
        </p>

        <div className={styles.tags}>
          {TAGS.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className={styles.actions}>
          <a
            href="https://drive.google.com/file/d/10KEp84NphFAmx6q5I2okaAemH5UkKtHT/view?usp=sharing"
            className="btn-ghost"
            target="_blank"
            rel="noreferrer"
          >
            Download Resume
          </a>

          <a href="#contact" className="btn-ghost">
            Let's Chat
          </a>
        </div>
      </div>
    </section>
  );
}
