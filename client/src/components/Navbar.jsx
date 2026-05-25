import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
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
    { label: 'About',   href: '/#about'   },
    { label: 'Code',    href: '/#code'    },
    { label: 'Design',  href: '/#design'  },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`${styles.nav}${scrolled ? ' ' + styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>
        nour<span>.</span>
      </Link>

      <ul className={`${styles.links}${menuOpen ? ' ' + styles.open : ''}`}>
        {navLinks.map(l => (
          <li key={l.label}>
            <a href={l.href} className={styles.link}>{l.label}</a>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <button
          className={styles.toggle}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <a href="/#contact" className={styles.cta}>Say Hello</a>
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
