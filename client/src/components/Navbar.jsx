import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LanguageContext';
import LangToggle from './LangToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const navLinks = [
    { label: t.nav.about,   href: '/#about'   },
    { label: t.nav.code,    href: '/#code'    },
    { label: t.nav.design,  href: '/#design'  },
    { label: t.nav.contact, href: '/#contact' },
  ];

  return (
    <nav className={`${styles.nav}${scrolled ? ' ' + styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>
        Kawthar Alkhawajah<span>.</span>
      </Link>
      <ul className={`${styles.links}${menuOpen ? ' ' + styles.open : ''}`}>
        {navLinks.map(l => (
          <li key={l.label}>
            <a href={l.href} className={styles.link}>{l.label}</a>
          </li>
        ))}
      </ul>
      <div className={styles.right}>
        <LangToggle />
        <button
          className={styles.toggle}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <a href="/#contact" className={styles.cta}>{t.nav.hello}</a>
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
