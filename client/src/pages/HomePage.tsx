import React from 'react';

import { HeroText } from '../components/HeroText';
import { Shell } from '../components/Shell';
import { useFetchUser } from '../utils/config/hooks/user/user.hooks';

interface Props {}

export const HomePage: React.FC<Props> = () => {
  const { data, isSuccess } = useFetchUser(localStorage.getItem('token'));
  return (
    <Shell>
      <HeroText />

      {isSuccess ? <h1>{data?.data}</h1> : <h1>kur</h1>}
    </Shell>
  );
};
