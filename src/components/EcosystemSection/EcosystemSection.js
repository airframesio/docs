import React from 'react';
import Link from '@docusaurus/Link';
import styles from './EcosystemSection.module.css';

const ecosystem = [
  {
    title: 'App',
    description: 'Browse live messages, search flights, and explore decoded aviation data.',
    url: 'https://app.airframes.io',
  },
  {
    title: 'The Big Grey',
    description: 'View real-time aircraft positions and feeder coverage on a global map.',
    url: 'https://tbg.airframes.io',
  },
  {
    title: 'Community',
    description: 'Discuss aviation monitoring, get help, and share your feeder setup.',
    url: 'https://community.airframes.io',
  },
  {
    title: 'Shop',
    description: 'Pick up antennas, SDRs, and Airframes merchandise to support the project.',
    url: 'https://shop.airframes.io',
  },
];

export default function EcosystemSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Airframes Ecosystem</h2>
        <div className={styles.grid}>
          {ecosystem.map((item) => (
            <Link key={item.title} href={item.url} className={styles.cardLink}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
                <span className={styles.arrow}>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
