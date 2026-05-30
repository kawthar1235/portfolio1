import { useLang } from '../context/LanguageContext';
import styles from './LangToggle.module.css';

export default function LangToggle() {
  const { lang, toggleLang } = useLang();
  return (
    <button
      className={styles.toggle}
      onClick={toggleLang}
      aria-label="Toggle language"
      title={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <span className={lang === 'en' ? styles.active : styles.inactive}>EN</span>
      <span className={styles.divider}>|</span>
      <span className={lang === 'ar' ? styles.active : styles.inactive}>عر</span>
    </button>
  );
}
