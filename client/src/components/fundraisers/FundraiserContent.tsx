import {
  Container,
  createStyles,
  Paper,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  card: {
    padding: theme.spacing.xs,
  },
  supTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 800,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 8],
    letterSpacing: 0.5,
  },
  title: {
    lineHeight: 1,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  description: {
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },
  descriptionHolder: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export const FundraiserContent: React.FC<{
  fundraiser: Fundraiser;
}> = ({ fundraiser: { title, content, description, createdBy } }) => {
  const { classes } = useStyles();
  return (
    <>
      <Text className={classes.supTitle}>{createdBy}</Text>

      <Title className={classes.title} order={2}>
        {title}
      </Title>

      <Container size={660} p={0} className={classes.descriptionHolder}>
        <Text color="dimmed" className={classes.description}>
          {description}
        </Text>
      </Container>

      <ScrollArea
        style={{
          width: '100%',
        }}
      >
        <Paper
          radius="md"
          className={classes.card}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </ScrollArea>
    </>
  );
};
