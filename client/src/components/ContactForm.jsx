import { useState } from 'react';
import { sendMessage } from '../services/api';
import styles from './ContactForm.module.css';

const INITIAL = { name:'', email:'', subject:'', message:'' };

export default function ContactForm() {
  const [form,    setForm]    = useState(INITIAL);
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [errMsg,  setErrMsg]  = useState('');

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
      setErrMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className="section-eyebrow">04 — Let's make something</div>
          <h2 className={styles.title}>Got an idea?<br /><em>Let's talk.</em></h2>
          <p className={styles.sub}>
            I'm always open to fun projects, collabs, or just a conversation
            about design and code over virtual coffee.
          </p>
          <a className={styles.email} href="mailto:hello@kawthar.design">hello@kawthar.design</a>
          <div className={styles.socials}>
            {['Behance','GitHub','Instagram','LinkedIn'].map(s => (
              <a key={s} href="#" className={styles.sBtn}>{s.slice(0,2)}</a>
            ))}
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="What's this about?" value={form.subject} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="Tell me about your project..." value={form.message} onChange={handleChange} required />
          </div>

          {status === 'error'   && <p className={styles.err}>{errMsg}</p>}
          {status === 'success' && <p className={styles.ok}>Message sent! I'll get back to you soon.</p>}

          <button type="submit" className={styles.submit} disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
