import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Feed ACARS Data',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Learn how to get started with <a href="/docs/feeding/what">feeding your ACARS data</a> to Airframes and contribute to the global aviation data network.
      </>
    ),
  },
  {
    title: 'Search Live Messages',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Access real-time ACARS messages, OOOI reports, weather data, and aircraft communications through our <a href="https://app.airframes.io/messages">live search interface</a>.
      </>
    ),
  },
  {
    title: 'Open & Unfiltered',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        All aviation data collected remains unfiltered and unbiased by governments or corporate interests, providing transparent access to aircraft communications.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
