import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const TAGS = [
  'React',
  'JavaScript',
  'HTML',
  'CSS',
  'Python',
  'Java',
  'SQL',
  'Figma',
  'UI/UX',
  'GitHub'
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
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
          <div className={styles.badgeSm}>for internships & freelance</div>
        </div>
      </div>

      <div className={`${styles.content} fade-up`}>
        <div className="section-eyebrow">01 — About Me</div>

        <h2 className="section-title">
          Software Engineering student who loves
          <em> building modern digital experiences</em>
        </h2>

        <p className={styles.bio}>
          I'm Kawthar Alkhawajah, a Software Engineering student at KFUPM
          passionate about frontend development, UI/UX design, and building
          responsive web applications. I enjoy combining creativity with code
          to create user-friendly and visually engaging experiences.
        </p>

        <div className={styles.stats}>
          {[
            ['10+', 'Projects & designs completed'],
            ['2027', 'Expected graduation'],
            ['100%', 'Passion for learning']
          ].map(([n, l]) => (
            <div key={l}>
              <div className={styles.statNum}>{n}</div>
              <div className={styles.statLabel}>{l}</div>
            </div>
          ))}
        </div>

        <blockquote className={styles.quote}>
          "Great software is where creativity, usability, and technology work
          together seamlessly."
        </blockquote>

        <p className={styles.extra}>
          Besides coding and designing, I enjoy participating in student
          activities, exploring creative digital projects, and continuously
          improving my technical and problem-solving skills.
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
