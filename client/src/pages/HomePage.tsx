import React from 'react';

import { HeroText } from '../components/HeroText';
import { Shell } from '../components/Shell';

interface Props {}

export const HomePage: React.FC<Props> = () => (
  <Shell>
    <HeroText />
  </Shell>
);
