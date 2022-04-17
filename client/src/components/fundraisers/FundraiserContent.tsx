import { createStyles, Paper } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  card: {
    padding: theme.spacing.xs,
  },
}));

export const FundraiserContent: React.FC<{ content: string }> = ({
  content,
}) => {
  const { classes } = useStyles();
  return (
    <Paper
      radius="md"
      withBorder
      className={classes.card}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
