import {
  Badge,
  Button,
  createStyles,
  Group,
  Modal,
  Progress,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useContext, useMemo, useState } from 'react';

import { createDonation } from '../../utils/api';
import { AppContext } from '../../utils/AppContext';
import { CurrencyInput } from '../CurrencyInput';

interface Props {
  fundraiser: Fundraiser | undefined;
  goalCompleted: number;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  fundraiser: Fundraiser | undefined;
}

const useModalStyles = createStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 20,
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 8],
    letterSpacing: 0.5,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 10,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const DonateModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  fundraiser,
}) => {
  const { classes } = useModalStyles();
  const [currencyMulti, setCurrencyMulti] = useState('1');
  const { accessToken } = useContext(AppContext);

  const form = useForm({
    initialValues: {
      donation: 1,
    },
  });

  return (
    <Modal
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      centered
      size="lg"
      transition="fade"
      withCloseButton={false}
    >
      <form
        onSubmit={form.onSubmit(async (formData) => {
          const donationAmount =
            Math.round(formData.donation * Number(currencyMulti) * 1e2) / 1e2;
          createDonation({
            accessToken: accessToken || '',
            fundraiserId: fundraiser?.fundraiserId || '',
            amount: donationAmount,
          }).then(() => window.location.reload());
        })}
      >
        <Text className={classes.title}>
          {fundraiser?.title} has raised over {fundraiser?.raised} BGN so far!
        </Text>

        <Text color="dimmed" className={classes.subTitle}>
          Want to be a part of the change? You can donate using the form below.
        </Text>

        <CurrencyInput
          inputName="donation"
          form={form}
          max={100000}
          min={1}
          multipler={currencyMulti}
          setMultiplier={setCurrencyMulti}
          placeholder="Your donation amount. At least 1 BGN"
        />

        <Group mt={10} pt={10}>
          <Button color="red" type="submit">
            Donate
          </Button>
          <Button color="gray" onClick={() => setIsOpen(false)}>
            Maybe later
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

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
        fundraiser={fundraiser}
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
