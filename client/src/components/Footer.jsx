import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>nour<span>.</span></div>
        <nav className={styles.nav}>
          {['About','Code','Design','Contact'].map(l => (
            <a key={l} href={`/#${l.toLowerCase()}`} className={styles.link}>{l}</a>
          ))}
        </nav>
        <div className={styles.socials}>
          {['Be','GH','Ig','Li'].map(s => (
            <a key={s} href="#" className={styles.sBtn}>{s}</a>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {year} Nour. All rights reserved.</span>
        <span>Made with <span className={styles.heart}>♥</span> and too much coffee.</span>
      </div>
    </footer>
  );
}
