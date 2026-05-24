import styles from './Skills.module.css';

const SKILLS = [
  { icon:'✦', name:'Visual Identity',   list:'Logo design · Color systems · Typography · Brand guidelines' },
  { icon:'◈', name:'UI / Web Design',   list:'Website mockups · App screens · Prototyping · Component libraries' },
  { icon:'◇', name:'Illustration',      list:'Digital illustration · Poster art · Editorial artwork · Icon sets' },
  { icon:'✧', name:'Motion & 3D',       list:'Animated logos · Social reels · Motion pieces · 3D renders' },
  { icon:'◉', name:'Print & Packaging', list:'Packaging design · Book covers · Zines · Merchandise' },
  { icon:'⬡', name:'Art Direction',     list:'Moodboards · Photo styling · Creative concepts · Campaign visuals' },
];

export default function Skills() {
  return (
    <section className={styles.skills}>
      <div className={styles.header}>
        <div className="section-eyebrow">What I do</div>
        <h2 className="section-title">My creative <em>toolkit</em></h2>
      </div>
      <div className={styles.grid}>
        {SKILLS.map(s => (
          <div key={s.name} className={styles.card}>
            <span className={styles.icon}>{s.icon}</span>
            <div className={styles.name}>{s.name}</div>
            <div className={styles.list}>{s.list}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
