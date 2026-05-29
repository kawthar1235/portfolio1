import { useState, useEffect } from 'react';
import { getProjects } from '../services/api';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';
import Stickers from './Stickers';

const DESIGN_FILTERS = ['All', 'Branding', 'UI', 'Illustration'];
const CODE_FILTERS = ['All', 'Web', 'App', 'Tools'];

// Fallback data shown while API loads or if API is unavailable
const FALLBACK_CODE = [
  { _id: 'c1', title: 'Palettify', description: 'Generates accessible color palettes from any image.', techStack: ['React', 'Node.js', 'Canvas API'], category: 'web', liveUrl: '#', githubUrl: '#', featured: true },
  { _id: 'c2', title: 'Moodboard AI', description: 'Enter a vibe, get a curated moodboard of images, colors, and fonts.', techStack: ['Python', 'FastAPI', 'OpenAI'], category: 'app', liveUrl: '#', githubUrl: '#' },
  { _id: 'c3', title: 'FontPair CLI', description: 'Terminal tool that suggests font pairings based on mood keywords.', techStack: ['Python', 'Click'], category: 'tool', githubUrl: '#' },
  { _id: 'c4', title: 'Portfolio v1', description: 'First portfolio site — vanilla HTML, CSS and JS.', techStack: ['HTML', 'CSS', 'JS'], category: 'web', liveUrl: '#', githubUrl: '#' },
  { _id: 'c5', title: 'Readme Generator', description: 'Auto-generates a clean README from your code structure.', techStack: ['Python', 'Jinja2'], category: 'tool', githubUrl: '#' },
  { _id: 'c6', title: 'Daily UI Logger', description: 'Tracks Daily UI challenge submissions with notes and ratings.', techStack: ['Next.js', 'Supabase'], category: 'app', liveUrl: '#', githubUrl: '#' },
];

const FALLBACK_DESIGN = [
  { _id: 'd1', title: 'Bloom — Skincare Rebrand', category: 'Branding', year: '2025' },
  { _id: 'd2', title: 'Cerise Wellness App', category: 'UI', year: '2024' },
  { _id: 'd3', title: 'Douceur Poster Series', category: 'Illustration', year: '2024' },
  { _id: 'd4', title: 'Velours Tea Collection', category: 'Branding', year: '2024' },
  { _id: 'd5', title: 'Lumière Editorial Website', category: 'UI', year: '2023' },
];

export default function Projects() {
  const [codeProjects, setCodeProjects] = useState(FALLBACK_CODE);
  const [designProjects, setDesignProjects] = useState(FALLBACK_DESIGN);
  const [codeFilter, setCodeFilter] = useState('All');
  const [designFilter, setDesignFilter] = useState('All');

  useEffect(() => {
    getProjects()
      .then(({ data }) => {
        const code = data.filter((p) => p.type === 'code');
        const design = data.filter((p) => p.type === 'design');
        setCodeProjects(code.length ? code : []);
        setDesignProjects(design.length ? design : []);
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

        <div
          className={styles.designGrid}
          style={{
            display: 'block',
            columnWidth: '280px',
            columnGap: '1.5rem',
          }}
        >
          {filteredDesign.map((p) => (
            <div
              key={p._id}
              style={{
                breakInside: 'avoid',
                WebkitColumnBreakInside: 'avoid',
                marginBottom: '1.5rem',
                display: 'inline-block',
                width: '100%',
              }}
            >
              <ProjectCard project={p} type="design" />
            </div>
          ))}
        </div>

        <Stickers section="design" />
      </section>
    </>
  );
}
