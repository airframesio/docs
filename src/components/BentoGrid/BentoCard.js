import React from 'react';
import Link from '@docusaurus/Link';
import styles from './BentoGrid.module.css';

export default function BentoCard({ area, icon: Icon, title, description, link, badges }) {
  const content = (
    <div className={`${styles.card} ${styles[`card_${area}`]}`}>
      <div className={styles.cardIcon}>
        <Icon size={28} />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      {badges && (
        <div className={styles.badges}>
          {badges.map((badge) => (
            <span key={badge} className={styles.badge}>{badge}</span>
          ))}
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <Link to={link} className={styles.cardLink} style={{ gridArea: area }}>
        {content}
      </Link>
    );
  }

  return <div style={{ gridArea: area }}>{content}</div>;
}
