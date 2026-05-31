import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import styles from './About.module.css';
import Stickers from './Stickers';
import profileImg from '../profile.png';

const API = 'https://portfolio-server-lbwm.onrender.com/api';

const TAGS_EN = [
  { title: 'Frontend', items: ['React', 'JavaScript', 'HTML', 'CSS'] },
  {
    title: 'Backend',
    items: ['Node.js', 'MongoDB', 'SQL', 'Python', 'Java'],
  },
  {
    title: 'Design',
    items: [
      'UI/UX',
      'Figma',
      'Illustrator',
      'Procreate',
      'Digital Design',
      'Affinity Designer',
    ],
  },
];

const TAGS_AR = [
  { title: 'الواجهة الأمامية', items: ['React', 'JavaScript', 'HTML', 'CSS'] },
  {
    title: 'الواجهة الخلفية',
    items: ['Node.js', 'MongoDB', 'SQL', 'Python', 'Java'],
  },
  {
    title: 'التصميم',
    items: [
      'UI/UX',
      'Figma',
      'Illustrator',
      'Procreate',
      'Digital Design',
      'Affinity Designer',
    ],
  },
];

export default function About() {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const TAGS = lang === 'ar' ? TAGS_AR : TAGS_EN;

  const [certificates, setCertificates] = useState([]);
  const [activeCert, setActiveCert] = useState(0);

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

  useEffect(() => {
    fetch(`${API}/certificates`)
      .then((res) => res.json())
      .then((data) => setCertificates(Array.isArray(data) ? data : []))
      .catch(() => setCertificates([]));
  }, []);

  useEffect(() => {
    if (activeCert >= certificates.length) {
      setActiveCert(0);
    }
  }, [certificates, activeCert]);

  const nextCert = () => {
    if (!certificates.length) return;
    setActiveCert((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };

  const currentCert = certificates[activeCert];

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={`${styles.photoWrap} fade-up`}>
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
            <>
              طالبة هندسة برمجيات تعشق <em>بناء تجارب رقمية حديثة</em>
            </>
          ) : (
            <>
              Software Engineering student who loves{' '}
              <em>building modern digital experiences</em>
            </>
          )}
        </h2>

        <p className={styles.bio}>{t.about.bio1}</p>

        <div className={styles.stats}>
          {[
            ['30+', lang === 'ar' ? 'مشروع وتصميم منجز' : 'Projects & designs completed'],
            ['5+', lang === 'ar' ? 'سنوات خبرة' : 'Years of experience'],
            ['100%', lang === 'ar' ? 'شغف بالتعلم' : 'Passion for learning'],
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
          style={{
            display: 'flex',
            gap: '3rem',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          {TAGS.map((group) => (
            <div key={group.title} style={{ minWidth: '180px' }}>
              <div
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                  marginBottom: '0.75rem',
                  fontWeight: 600,
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

        <div style={{ marginTop: '3rem' }}>
          <div className="section-eyebrow">Certificates</div>
          <h3 className="section-title" style={{ fontSize: '1.8rem' }}>
            My <em>certificates</em>
          </h3>

          {currentCert ? (
            <div
              style={{
                position: 'relative',
                width: 'min(460px, 100%)',
                height: '560px',
                margin: '2rem auto 0',
              }}
            >
              <article
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: 'min(420px, calc(100% - 2rem))',
                  height: '540px',
                  margin: 'auto',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.14)',
                  transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                  cursor: 'pointer',
                }}
                onClick={nextCert}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') nextCert();
                }}
              >
                <img
                  src={currentCert.image}
                  alt={currentCert.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    cursor: 'pointer',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0) 70%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '1.4rem',
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{ color: '#fff', maxWidth: '70%' }}>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.45rem',
                        fontWeight: 600,
                        lineHeight: 1.1,
                        marginBottom: '0.35rem',
                      }}
                    >
                      {currentCert.title}
                    </div>

                    <div
                      style={{
                        fontSize: '0.78rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        opacity: 0.9,
                        marginBottom: '0.2rem',
                      }}
                    >
                      {currentCert.issuer}
                    </div>

                    <div
                      style={{
                        fontSize: '0.85rem',
                        opacity: 0.82,
                        marginBottom: '0.8rem',
                      }}
                    >
                      {currentCert.year}
                    </div>

                    {currentCert.url && (
                      <a
                        href={currentCert.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-block',
                          fontSize: '0.78rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#fff',
                          textDecoration: 'none',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.55)',
                          paddingBottom: '0.15rem',
                          pointerEvents: 'auto',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Certificate →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                color: 'var(--text3)',
                paddingTop: '3rem',
              }}
            >
              {lang === 'ar' ? 'لا توجد شهادات بعد.' : 'No certificates added yet.'}
            </div>
          )}
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
