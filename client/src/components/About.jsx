import { useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';
import styles from './About.module.css';
import Stickers from './Stickers';
import profileImg from '../profile.png';

const TAGS_EN = [
  { title: 'Frontend', items: ['React', 'JavaScript', 'HTML', 'CSS'] },
  { title: 'Backend',  items: ['Node.js', 'MongoDB', 'SQL', 'Python', 'Java'] },
  { title: 'Design',   items: ['UI/UX', 'Figma', 'Illustrator', 'Procreate', 'Digital Design', 'Affinity Designer'] },
];

const TAGS_AR = [
  { title: 'الواجهة الأمامية', items: ['React', 'JavaScript', 'HTML', 'CSS'] },
  { title: 'الواجهة الخلفية',  items: ['Node.js', 'MongoDB', 'SQL', 'Python', 'Java'] },
  { title: 'التصميم',          items: ['UI/UX', 'Figma', 'Illustrator', 'Procreate', 'Digital Design', 'Affinity Designer'] },
];

export default function About() {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const TAGS = lang === 'ar' ? TAGS_AR : TAGS_EN;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.about} id="about" ref={ref}>

      <div
        className={`${styles.photoWrap} fade-up`}
        style={{ transform: 'translateY(-200px)' }}
      >
        <img
          src={profileImg}
          alt="Kawthar Alkhawajah"
          className={styles.photo}
        />
        <div className={styles.badge}>
          <div className={styles.badgeBig}>{t.about.badgeTop}</div>
          <div className={styles.badgeSm}>{t.about.badgeSub}</div>
        </div>
      </div>

      <div className={`${styles.content} fade-up`}>
        <div className="section-eyebrow">{t.about.eyebrow}</div>

        <h2 className="section-title">
          {lang === 'ar' ? (
            <>طالبة هندسة برمجيات تعشق <em>بناء تجارب رقمية حديثة</em></>
          ) : (
            <>Software Engineering student who loves <em>building modern digital experiences</em></>
          )}
        </h2>

        <p className={styles.bio}>{t.about.bio1}</p>

        <div className={styles.stats}>
          {[
            ['30+',  lang === 'ar' ? 'مشروع وتصميم منجز' : 'Projects & designs completed'],
            ['5+',   lang === 'ar' ? 'سنوات خبرة'        : 'Years of experience'],
            ['100%', lang === 'ar' ? 'شغف بالتعلم'       : 'Passion for learning'],
          ].map(([n, l]) => (
            <div key={l}>
              <div className={styles.statNum}>{n}</div>
              <div className={styles.statLabel}>{l}</div>
            </div>
          ))}
        </div>

        <blockquote className={styles.quote}>
          {lang === 'ar'
            ? '"البرمجيات الرائعة هي حيث يعمل الإبداع وسهولة الاستخدام والتكنولوجيا معًا بسلاسة."'
            : '"Great software is where creativity, usability, and technology work together seamlessly."'}
        </blockquote>

        <p className={styles.extra}>
          {lang === 'ar'
            ? 'إلى جانب البرمجة والتصميم، أستمتع بالمشاركة في الأنشطة الطلابية، واستكشاف المشاريع الرقمية الإبداعية، والتحسين المستمر لمهاراتي التقنية وحل المشكلات.'
            : 'Besides coding and designing, I enjoy participating in student activities, exploring creative digital projects, and continuously improving my technical and problem-solving skills.'}
        </p>

        <div
          className={styles.tags}
          style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'flex-start' }}
        >
          {TAGS.map((group) => (
            <div key={group.title} style={{ minWidth: '180px' }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '0.75rem', fontWeight: 600 }}>
                {group.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {group.items.map((item) => (
                  <span key={item} className="tag">{item}</span>
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
            {t.about.cvBtn}
          </a>
          <a href="#contact" className="btn-ghost">
            {t.about.chatBtn}
          </a>
        </div>

      </div>

      <Stickers section="about" />

    </section>
  );
}
