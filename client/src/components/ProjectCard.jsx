import { useLang } from '../context/LanguageContext';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, type = 'design' }) {
  const { t } = useLang();
  const { title, category, year, description, techStack, liveUrl, githubUrl, image } = project;

  if (type === 'code') {
    return (
      <div className={`${styles.cCard}${project.featured ? ' ' + styles.featured : ''}`}>
        <div className={styles.cTop}>
          {image && (
            <div className={styles.cImage} style={{backgroundImage:`url(${image})`,backgroundSize:'cover',backgroundPosition:'center'}} />
          )}
          <div className={styles.cContent}>
            {project.featured && (
              <span className={styles.featuredBadge}>{t.projects.featured}</span>
            )}
            <h3 className={styles.cTitle}>{title}</h3>
            <div className={styles.cDivider} />
            <p className={styles.cDesc}>{description}</p>
          </div>
        </div>
        <div className={styles.cFooter}>
          <div className={styles.stackPills}>
            {(techStack || []).map((tech) => (
              <span key={tech} className={styles.spill}>{tech}</span>
            ))}
          </div>
          <div className={styles.cLinks}>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer" className={styles.cLink}>
                {t.projects.live}
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noreferrer" className={styles.cLink}>
                {t.projects.github}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dCard}>
      <div className={styles.dThumb}>
        {image ? (
          <img src={image} alt={title} className={styles.dImage} loading="lazy" />
        ) : (
          <div className={styles.mockScreen} />
        )}
      </div>
      <div className={styles.dInfo}>
        <div className={styles.dTag}>{category}</div>
        <div className={styles.dTitle}>{title}</div>
        <div className={styles.dYear}>{year}</div>
      </div>
    </div>
  );
}
