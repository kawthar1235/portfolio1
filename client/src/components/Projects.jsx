import { useState, useEffect } from 'react';
import { getProjects } from '../services/api';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';
import Stickers from './Stickers';

const DESIGN_FILTERS = ['All', 'Branding', 'UI', 'Illustration'];
const CODE_FILTERS = ['All', 'Web', 'App', 'Tools'];

export default function Projects() {
  const [codeProjects, setCodeProjects] = useState([]);
  const [designProjects, setDesignProjects] = useState([]);
  const [codeFilter, setCodeFilter] = useState('All');
  const [designFilter, setDesignFilter] = useState('All');

  useEffect(() => {
    getProjects()
      .then(({ data }) => {
        const code = data.filter((p) => p.type === 'code');
        const design = data.filter((p) => p.type === 'design');
        setCodeProjects(code);
        setDesignProjects(design);
      })
      .catch(() => {
        setCodeProjects([]);
        setDesignProjects([]);
      });
  }, []);

  const filteredCode =
    codeFilter === 'All'
      ? codeProjects
      : codeProjects.filter(
          (p) => p.category?.toLowerCase() === codeFilter.toLowerCase()
        );

  const filteredDesign =
    designFilter === 'All'
      ? designProjects
      : designProjects.filter(
          (p) => p.category?.toLowerCase() === designFilter.toLowerCase()
        );

  return (
    <>
      {/* ── 02 CODING ── */}
      <div className="sec-divider">
        <div className="sdiv-line" />
        <div className="sdiv-pill">02 — coding projects ✦</div>
        <div className="sdiv-line" />
      </div>

      <section className={styles.codeSection} id="code">
        <div className={styles.sectionHeader}>
          <div>
            <div className="section-eyebrow">◈ Built from scratch</div>
            <h2 className="section-title">
              Coding <em>Projects</em>
            </h2>
            <p className="section-sub">
              Apps, tools, and experiments — real things that actually run.
            </p>
          </div>

          <div className={styles.filters}>
            {CODE_FILTERS.map((f) => (
              <button
                key={f}
                className={`${styles.ftab}${codeFilter === f ? ' ' + styles.active : ''}`}
                onClick={() => setCodeFilter(f)}
              >
                {f}
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
        <div className="sdiv-pill">03 — design projects ✦</div>
        <div className="sdiv-line" />
      </div>

      <section className={styles.designSection} id="design">
        <div className={styles.sectionHeader}>
          <div>
            <div className="section-eyebrow">✦ Creative Work</div>
            <h2 className="section-title">
              Design <em>Projects</em>
            </h2>
            <p className="section-sub">
              Visual identities, interfaces, illustrations — things made to be felt.
            </p>
          </div>

          <div className={styles.filters}>
            {DESIGN_FILTERS.map((f) => (
              <button
                key={f}
                className={`${styles.ftab}${designFilter === f ? ' ' + styles.active : ''}`}
                onClick={() => setDesignFilter(f)}
              >
                {f}
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
