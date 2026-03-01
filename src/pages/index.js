import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import BentoGrid from '../components/BentoGrid/BentoGrid';
import StatsStrip from '../components/StatsStrip/StatsStrip';
import EcosystemSection from '../components/EcosystemSection/EcosystemSection';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroInner}>
        <img
          src="/img/logo.svg"
          alt="Airframes Logo"
          className={styles.heroLogo}
        />
        <h1 className={styles.heroTitle}>Airframes</h1>
        <p className={styles.heroSubtitle}>
          The open, community-driven aviation data network. Capture, decode, and
          explore aircraft messages from around the world.
        </p>
        <div className={styles.buttons}>
          <Link className={styles.btnPrimary} to="/docs/feeding/what">
            Start Feeding
          </Link>
          <Link className={styles.btnOutline} to="https://app.airframes.io">
            View Live Messages
          </Link>
          <Link className={styles.btnOutline} to="/docs/intro">
            Read the Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="The open, community-driven aviation data network. Capture, decode, and explore aircraft messages from around the world."
    >
      <HomepageHeader />
      <main>
        <BentoGrid />
        <StatsStrip />
        <EcosystemSection />
      </main>
    </Layout>
  );
}
