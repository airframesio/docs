import React from 'react';
import BentoCard from './BentoCard';
import AntennaIcon from '../icons/AntennaIcon';
import MessageTerminalIcon from '../icons/MessageTerminalIcon';
import FlightPathIcon from '../icons/FlightPathIcon';
import SignalWavesIcon from '../icons/SignalWavesIcon';
import OpenShieldIcon from '../icons/OpenShieldIcon';
import CommunityIcon from '../icons/CommunityIcon';
import GlobeNetworkIcon from '../icons/GlobeNetworkIcon';
import styles from './BentoGrid.module.css';

const cards = [
  {
    area: 'feed',
    icon: AntennaIcon,
    title: 'Feed ACARS Data',
    description:
      'Set up a feeder station and contribute real-time aviation messages to the global Airframes network. All you need is an SDR and an antenna.',
    link: '/docs/feeding/what',
  },
  {
    area: 'live',
    icon: MessageTerminalIcon,
    title: 'Live Messages',
    description:
      'Search and browse live ACARS, OOOI, weather, and position data from aircraft around the world in real time.',
    link: 'https://app.airframes.io',
  },
  {
    area: 'flights',
    icon: FlightPathIcon,
    title: 'Track Flights',
    description:
      'Follow aircraft routes and view decoded message history for any tracked flight.',
    link: 'https://app.airframes.io',
  },
  {
    area: 'tech',
    icon: SignalWavesIcon,
    title: 'Technology Overview',
    description:
      'Learn about the radio technologies behind aviation data collection.',
    link: '/docs/technology/acars/intro',
    badges: ['VHF', 'VDL2', 'HFDL', 'SATCOM', 'Iridium'],
  },
  {
    area: 'open',
    icon: OpenShieldIcon,
    title: 'Open & Unfiltered',
    description:
      'All data remains unfiltered and unbiased — transparent access to aircraft communications without corporate or government censorship.',
  },
  {
    area: 'community',
    icon: CommunityIcon,
    title: 'Community',
    description:
      'Join a passionate community of aviation enthusiasts, developers, and radio hobbyists.',
    link: 'https://community.airframes.io',
  },
  {
    area: 'global',
    icon: GlobeNetworkIcon,
    title: 'Global Feeder Network',
    description:
      'Feeders across 6 continents contribute data 24/7, building the most comprehensive open aviation data network.',
  },
];

export default function BentoGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {cards.map((card) => (
            <BentoCard key={card.area} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
