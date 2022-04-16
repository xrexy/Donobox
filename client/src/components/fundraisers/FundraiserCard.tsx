import {
  Badge,
  Button,
  createStyles,
  Group,
  Modal,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteFundraiser } from '../../utils/api';
import { AppContext } from '../../utils/AppContext';

interface Props {
  fundraiser: Fundraiser;
}

interface ModalProps extends Props {
  accessToken: string | undefined;

  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1,
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    '&:hover': {
      cursor: 'pointer',
      color: theme.colorScheme === 'dark' ? 'white' : 'black',
    },
  },

  badge: {
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.8,
    },
  },
}));

const DeleteModal: React.FC<ModalProps> = ({
  fundraiser,
  accessToken,
  isOpen,
  setIsOpen,
}) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      centered
      size="lg"
      transition="fade"
      title="Are you sure?"
    >
      <Text>
        Are you sure you want to delete {fundraiser.title}? This CAN NOT be
        undone and all of your raised money will be lost.
      </Text>

      <Group
        style={{
          borderTop: `1px solid ${
            theme.colorScheme === 'dark'
              ? theme.colors.dark[4]
              : theme.colors.gray[3]
          }`,
        }}
        mt={10}
        pt={10}
      >
        <Button
          color="red"
          onClick={() => {
            deleteFundraiser({
              accessToken: accessToken || '',
              fundraiserId: fundraiser.fundraiserId,
            }).finally(() => window.location.reload());
          }}
        >
          Yes, Delete
        </Button>
        <Button color="gray" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};
export const FundraiserCard: React.FC<Props> = ({ fundraiser }) => {
  const { accessToken, user } = useContext(AppContext);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Paper
        withBorder
        p="md"
        radius="md"
        key={fundraiser.title}
        style={{ width: 375 }}
      >
        <Group position="apart">
          <Text
            size="xs"
            color="dimmed"
            className={classes.title}
            component="a"
            href={`/fundraisers/${fundraiser.fundraiserId}`}
            style={{ maxWidth: '60%', whiteSpace: 'nowrap' }}
          >
            {fundraiser.title}
          </Text>

          <Group spacing={7}>
            {user && fundraiser.createdBy === user.userId ? (
              <>
                <Badge
                  size="sm"
                  color="red"
                  variant="gradient"
                  gradient={{ from: 'orange', to: 'red', deg: 20 }}
                  className={classes.badge}
                  onClick={() => setDeleteModalIsOpen(true)}
                >
                  Delete
                </Badge>
                <Badge
                  size="sm"
                  color="cyan"
                  variant="gradient"
                  gradient={{ from: 'cyan', to: 'teal', deg: 20 }}
                  className={classes.badge}
                  onClick={() =>
                    navigate('/fundraisers/modify', {
                      state: {
                        title: fundraiser.title,
                        content: fundraiser.content,
                        fundraiserId: fundraiser.fundraiserId,
                      },
                    })
                  }
                >
                  Edit
                </Badge>
              </>
            ) : (
              <Badge
                size="sm"
                color="cyan"
                variant="gradient"
                gradient={{ from: 'cyan', to: 'teal', deg: 20 }}
                className={classes.badge}
                onClick={() =>
                  navigate(`/fundraisers/${fundraiser.fundraiserId}`)
                }
              >
                View
              </Badge>
            )}
          </Group>
        </Group>

        <Text mt={20} className={classes.value}>
          ${fundraiser.raised || 0}
        </Text>

        <Text size="xs" color="dimmed" mt={7}>
          Posted on {fundraiser.createdOn || '... who knows'}
        </Text>
      </Paper>

      <DeleteModal
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        accessToken={accessToken}
        fundraiser={fundraiser}
      />
    </>
  );
};