import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { getProjects } from '../services/api';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';
import Stickers from './Stickers';

export default function Projects() {
  const { t } = useLang();
  const [codeProjects,   setCodeProjects]   = useState([]);
  const [designProjects, setDesignProjects] = useState([]);
  const [codeFilter,     setCodeFilter]     = useState('all');
  const [designFilter,   setDesignFilter]   = useState('all');

  const CODE_FILTERS   = ['all','web','app','tool'];
  const DESIGN_FILTERS = ['all','Branding','UI','Illustration'];

  useEffect(() => {
    getProjects()
      .then(({ data }) => {
        const code   = data.filter((p) => p.type === 'code');
        const design = data.filter((p) => p.type === 'design');
        setCodeProjects(code);
        setDesignProjects(design);
      })
      .catch(() => {
        setCodeProjects([]);
        setDesignProjects([]);
      });
  }, []);

  const filteredCode = codeFilter === 'all'
    ? codeProjects
    : codeProjects.filter(p => p.category?.toLowerCase() === codeFilter.toLowerCase());

  const filteredDesign = designFilter === 'all'
    ? designProjects
    : designProjects.filter(p => p.category?.toLowerCase() === designFilter.toLowerCase());

  return (
    <>
      {/* ── 02 CODING ── */}
      <div className="sec-divider">
        <div className="sdiv-line" />
        <div className="sdiv-pill">{t.projects.dividerCode}</div>
        <div className="sdiv-line" />
      </div>

      <section className={styles.codeSection} id="code" style={{position:'relative'}}>
        <div className={styles.sectionHeader}>
          <div>
            <div className="section-eyebrow">{t.projects.codeEyebrow}</div>
            <h2 className="section-title">
              {t.projects.codeTitle} <em>{t.projects.codeTitleEm}</em>
            </h2>
            <p className="section-sub">{t.projects.codeSub}</p>
          </div>
          <div className={styles.filters}>
            {CODE_FILTERS.map((f) => (
              <button
                key={f}
                className={`${styles.ftab}${codeFilter === f ? ' ' + styles.active : ''}`}
                onClick={() => setCodeFilter(f)}
              >
                {t.projects.filters[f]}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.codeGrid}>
          {filteredCode.map((p) => (
            <ProjectCard key={p._id} project={p} type="code" />
          ))}
        </div>
        <Stickers section="code" />
      </section>

      {/* ── 03 DESIGN ── */}
      <div className="sec-divider">
        <div className="sdiv-line" />
        <div className="sdiv-pill">{t.projects.dividerDesign}</div>
        <div className="sdiv-line" />
      </div>

      <section className={styles.designSection} id="design" style={{position:'relative'}}>
        <div className={styles.sectionHeader}>
          <div>
            <div className="section-eyebrow">{t.projects.designEyebrow}</div>
            <h2 className="section-title">
              {t.projects.designTitle} <em>{t.projects.designTitleEm}</em>
            </h2>
            <p className="section-sub">{t.projects.designSub}</p>
          </div>
          <div className={styles.filters}>
            {DESIGN_FILTERS.map((f) => (
              <button
                key={f}
                className={`${styles.ftab}${designFilter === f ? ' ' + styles.active : ''}`}
                onClick={() => setDesignFilter(f)}
              >
                {t.projects.filters[f] || f}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.designGrid}>
          {filteredDesign.map((p) => (
            <ProjectCard key={p._id} project={p} type="design" />
          ))}
        </div>
        <Stickers section="design" />
      </section>
    </>
  );
}
