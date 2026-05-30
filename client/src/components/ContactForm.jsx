import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { sendMessage } from '../services/api';
import styles from './ContactForm.module.css';

const INITIAL = { name:'', email:'', subject:'', message:'' };

export default function ContactForm() {
  const { t } = useLang();
  const [form,   setForm]   = useState(INITIAL);
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');
    try {
      await sendMessage(form);
      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      setStatus('error');
      setErrMsg(err.response?.data?.message || t.contact.error);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className="section-eyebrow" style={{color:'rgba(242,164,165,.7)'}}>
            {t.contact.eyebrow}
          </div>
          <h2 className={styles.title}>
            {t.contact.title1}<br /><em>{t.contact.titleEm}</em>
          </h2>
          <p className={styles.sub}>{t.contact.sub}</p>
          <a className={styles.email} href="mailto:hello@kawthar.design">
            hello@kawthar.design
          </a>
          <div className={styles.socials}>
            {['Behance','GitHub','Instagram','LinkedIn'].map(s => (
              <a key={s} href="#" className={styles.sBtn}>{s.slice(0,2)}</a>
            ))}
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name">{t.contact.nameLabel}</label>
              <input
                id="name" name="name" type="text"
                placeholder={t.contact.namePlaceholder}
                value={form.name} onChange={handleChange} required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">{t.contact.emailLabel}</label>
              <input
                id="email" name="email" type="email"
                placeholder={t.contact.emailPlaceholder}
                value={form.email} onChange={handleChange} required
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="subject">{t.contact.subjectLabel}</label>
            <input
              id="subject" name="subject" type="text"
              placeholder={t.contact.subjectPlaceholder}
              value={form.subject} onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="message">{t.contact.messageLabel}</label>
            <textarea
              id="message" name="message" rows={5}
              placeholder={t.contact.messagePlaceholder}
              value={form.message} onChange={handleChange} required
            />
          </div>

          {status === 'error'   && <p className={styles.err}>{errMsg}</p>}
          {status === 'success' && <p className={styles.ok}>{t.contact.success}</p>}

          <button type="submit" className={styles.submit} disabled={status === 'loading'}>
            {status === 'loading' ? t.contact.sending : t.contact.sendBtn}
          </button>
        </form>
      </div>
    </section>
  );
}
