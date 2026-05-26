import { useEffect, useRef } from 'react';
import styles from './About.module.css';
import Stickers from './Stickers';

const TAGS = [
  {
    title: 'Frontend',
    items: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'MongoDB', 'SQL', 'Python', 'Java'],
  },
  {
    title: 'Design',
    items: ['UI/UX', 'Figma', 'Illustrator', 'Procreate', 'Digital Design', 'Affinity Designer'],
  },
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
          I'm Kawthar Alkhawajah — I started with design because I couldn't stop making things pretty,
          then learned to code because I couldn't stop wondering how things worked.
          Now I do both, and honestly it's the best decision I've ever made.
        </p>

        <div className={styles.stats}>
          {[
            ['30+', 'Projects & designs completed'],
            ['5+', 'Years of experience'],
            ['100%', 'Passion for learning'],
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

        <div
          className={styles.tags}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'flex-start',
          }}
        >
          {TAGS.map((group) => (
            <div
              key={group.title}
              style={{
                minWidth: '160px',
              }}
            >
              <div
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                  marginBottom: '0.75rem',
                }}
              >
                {group.title}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.7rem',
                }}
              >
                {group.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
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

      <Stickers section="about" />
    </section>
  );
}
