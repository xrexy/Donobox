import { Grid, Paper, Text, useMantineTheme } from '@mantine/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FundraiserContent } from '../components/fundraisers/FundraiserContent';
import { GoalStatus } from '../components/fundraisers/GoalStatus';
import { Shell } from '../components/Shell';
import { getFundraiser } from '../utils/api';

interface Props {}

const Column: React.FC<{ xs: number }> = ({ xs, children }) => {
  const theme = useMantineTheme();
  return (
    <Grid.Col xs={xs}>
      <Paper radius="md" withBorder style={{ padding: theme.spacing.xl }}>
        {children}
      </Paper>
    </Grid.Col>
  );
};

export const ViewFundraiser: React.FC<Props> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [fundraiser, setFundraiser] = useState<Fundraiser>();

  const goalCompleted = useMemo(() => {
    if (!fundraiser?.goal) return 100;

    return fundraiser?.raised && fundraiser?.goal
      ? (fundraiser.raised / fundraiser.goal) * 100
      : 0;
  }, [fundraiser?.goal, fundraiser?.raised]);

  useEffect(() => {
    if (!params.fundraiserId) {
      navigate('/');
      return;
    }

    getFundraiser(params.fundraiserId).then((res) => {
      if (!res.data) {
        navigate('/');
        return;
      }
      setFundraiser(res.data);
    });
  }, [navigate, params.fundraiserId]);

  return (
    <Shell>
      <Grid>
        <Column xs={8}>
          {fundraiser ? (
            <FundraiserContent content={fundraiser.content} />
          ) : (
            <Text>There is no fundraiser with that ID</Text>
          )}
        </Column>
        <Column xs={4}>
          <GoalStatus fundraiser={fundraiser} goalCompleted={goalCompleted} />
        </Column>
      </Grid>
    </Shell>
  );
};
