import React from 'react';
import styles from './StatsStrip.module.css';

const stats = [
  { value: '635+', label: 'Active Feeders' },
  { value: '2M+', label: 'Messages / Day' },
  { value: '30+', label: 'Countries' },
  { value: '6', label: 'Continents' },
];

export default function StatsStrip() {
  return (
    <section className={styles.strip}>
      <div className={`container ${styles.inner}`}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
