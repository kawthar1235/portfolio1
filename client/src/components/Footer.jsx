import { useLang } from '../context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();

  const navLinks = [
    { label: t.nav.about,   href: '/#about'   },
    { label: t.nav.code,    href: '/#code'    },
    { label: t.nav.design,  href: '/#design'  },
    { label: t.nav.contact, href: '/#contact' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>kawthar<span>.</span></div>
        <nav className={styles.nav}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} className={styles.link}>{l.label}</a>
          ))}
        </nav>
        <div className={styles.socials}>
          {['Be','GH','Ig','Li'].map(s => (
            <a key={s} href="#" className={styles.sBtn}>{s}</a>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {year} Kawthar Alkhawajah. {t.footer.rights}</span>
        <span>{t.footer.tagline}</span>
      </div>
    </footer>
  );
}
