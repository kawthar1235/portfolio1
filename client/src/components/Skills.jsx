import { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import styles from './Skills.module.css';

const API = 'https://portfolio-server-lbwm.onrender.com/api';

export default function Skills() {
  const { t, lang } = useLang();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch(`${API}/skills`)
      .then((res) => res.json())
      .then((data) => setSkills(Array.isArray(data) ? data : []))
      .catch(() => setSkills([]));
  }, []);

  return (
    <section className={styles.skills}>
      <div className={styles.header}>
        <div className="section-eyebrow">{t.skills.eyebrow}</div>
        <h2 className="section-title">
          {t.skills.title} <em>{t.skills.titleEm}</em>
        </h2>
      </div>
      <div className={styles.grid}>
        {skills.length > 0 ? (
          skills.map((skill) => (
            <div key={skill._id} className={styles.card}>
              <span className={styles.icon}>{skill.icon}</span>
              <div className={styles.name}>
                {lang === 'ar' && skill.nameAr ? skill.nameAr : skill.name}
              </div>
              <div className={styles.list}>
                {lang === 'ar' && skill.listAr ? skill.listAr : skill.list}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            {lang === 'ar' ? 'لا توجد مهارات بعد.' : 'No skills added yet.'}
          </div>
        )}
      </div>
    </section>
  );
}
