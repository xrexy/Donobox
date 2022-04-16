import { createStyles, Grid, Group, Text } from '@mantine/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getFundraiser } from '../../utils/api';
import { Shell } from '../Shell';
import { GoalStatus } from './GoalStatus';

interface Props {}

const useStyles = createStyles((theme) => ({
  groupRoot: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === 'light'
        ? theme.colors.dark[7]
        : theme.colors.gray[8]
    }`,

    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  raisedText: {},
}));

export const ViewFundraiser: React.FC<Props> = () => {
  const params = useParams();
  const { classes } = useStyles();
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
        <Grid.Col xs={8}>
          <Group direction="column" className={classes.groupRoot}>
            {fundraiser ? (
              <Text>{fundraiser.title}</Text>
            ) : (
              <Text>There is no fundraiser with that ID</Text>
            )}
          </Group>
        </Grid.Col>
        <Grid.Col xs={4}>
          <GoalStatus fundraiser={fundraiser} goalCompleted={goalCompleted} />

          {/* <Group className={classes.groupRoot}>
            <Group>
              <Center>
                <FundraiserRingProgress completed={goalCompleted} />

                {goalCompleted < 100 ? (

                ) : (
                  <Text color={theme.colors.green[5]}>Completed</Text>
                )}
              </Center>
            </Group>
          </Group> */}
        </Grid.Col>
      </Grid>
    </Shell>
  );
};
