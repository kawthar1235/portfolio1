import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, type = 'design' }) {
  const { title, category, year, description, techStack, liveUrl, githubUrl, image } = project;

  if (type === 'code') {
    return (
      <div className={`${styles.cCard}${project.featured ? ' ' + styles.featured : ''}`}>
        {image && (
  <div
    className={styles.cImage}
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />
)}
        <div className={styles.cTop}>
          {project.featured && <span className={styles.featuredBadge}>Featured</span>}
          <div className={styles.cIcon}>◈</div>
          <h3 className={styles.cTitle}>{title}</h3>
          <p className={styles.cDesc}>{description}</p>
        </div>
        <div className={styles.cFooter}>
          <div className={styles.stackPills}>
            {(techStack || []).map(t => (
              <span key={t} className={styles.spill}>{t}</span>
            ))}
          </div>
          <div className={styles.cLinks}>
            {liveUrl   && <a href={liveUrl}   target="_blank" rel="kawtharferrer" className={styles.cLink}>Live →</a>}
            {githubUrl && <a href={githubUrl} target="_blank" rel="kawtharferrer" className={styles.cLink}>GitHub →</a>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dCard}>
      <div className={styles.dThumb} style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover' } : {}}>
        {!image && <div className={styles.mockScreen} />}
        <div className={styles.hoverOverlay}>
          <span className={styles.hoverBtn}>View Project →</span>
        </div>
      </div>
      <div className={styles.dInfo}>
        <div className={styles.dTag}>{category}</div>
        <div className={styles.dTitle}>{title}</div>
        <div className={styles.dYear}>{year}</div>
      </div>
    </div>
  );
}
