import { useEffect, useState } from 'react';
import styles from './Skills.module.css';

const API = 'https://portfolio-server-lbwm.onrender.com/api';

export default function Skills() {
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
        <div className="section-eyebrow">What I do</div>
        <h2 className="section-title">
          My creative <em>toolkit</em>
        </h2>
      </div>

      <div className={styles.grid}>
        {skills.length > 0 ? (
          skills.map((skill) => (
            <div key={skill._id} className={styles.card}>
              <span className={styles.icon}>{skill.icon}</span>
              <div className={styles.name}>{skill.name}</div>
              <div className={styles.list}>{skill.list}</div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>No skills added yet.</div>
        )}
      </div>
    </section>
  );
}
