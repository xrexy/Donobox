import { Badge, Button, Group, Modal, Progress, Text } from '@mantine/core';
import React, { useMemo, useState } from 'react';

interface Props {
  fundraiser: Fundraiser | undefined;
  goalCompleted: number;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DonateModal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => (
  <Modal opened={isOpen} onClose={() => setIsOpen(false)}>
    wow
  </Modal>
);

export const GoalStatus: React.FC<Props> = ({ fundraiser, goalCompleted }) => {
  const isComplete = useMemo(
    () => (fundraiser?.raised || 0) >= (fundraiser?.goal || 0),
    [fundraiser?.goal, fundraiser?.raised]
  );

  const [donateModalIsOpen, setDonateModalIsOpen] = useState(false);

  return (
    <>
      <DonateModal
        isOpen={donateModalIsOpen}
        setIsOpen={setDonateModalIsOpen}
      />

      {/* Gonna be wrapped with Paper in 'ViewFundraiser' */}
      <Text align="center" weight={700} style={{ lineHeight: 1 }}>
        {fundraiser?.title}
      </Text>
      <Text color="dimmed" align="center" size="sm">
        Posted by {fundraiser?.createdBy}
      </Text>

      <Group position="apart" mt="xs">
        <Text size="sm" color="dimmed">
          Goal: {fundraiser?.goal} BGN
        </Text>
        <Text size="sm" color="dimmed">
          {Math.min(100, goalCompleted)}%
        </Text>
      </Group>

      <Progress
        value={goalCompleted}
        mt={5}
        color={isComplete ? 'lime' : 'red'}
      />

      <Group position="apart" mt="md">
        {isComplete ? (
          <Badge size="sm" color="lime">
            Goal raised
          </Badge>
        ) : (
          <>
            <Button size="xs" onClick={() => setDonateModalIsOpen(true)}>
              Donate
            </Button>
            <Badge size="sm">
              {fundraiser?.raised
                ? // eslint-disable-next-line no-unsafe-optional-chaining
                  fundraiser?.goal - fundraiser?.raised
                : fundraiser?.goal}{' '}
              left
            </Badge>
          </>
        )}
      </Group>
    </>
  );
};
