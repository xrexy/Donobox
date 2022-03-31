import {
  Button,
  Container,
  createStyles,
  InputWrapper,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useNotifications } from '@mantine/notifications';
import RichTextEditor from '@mantine/rte';
import { CheckIcon } from '@modulz/radix-icons';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Shell } from '../../components/Shell';
import { registerFundraiser, updateFundraiser } from '../../utils/api';
import { AppContext } from '../../utils/AppContext';
import { handleApi400Error } from '../../utils/helpers';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },
}));

interface Props {}

type LocationState = {
  title: string;
  content: string;
  fundraiserId: string;
};

const schema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title can't be empty" })
    .min(10, { message: 'Title must be at least 10 characters' })
    .max(50, { message: "Title can't be longer than 50 characters" }),
  content: z
    .string()
    .nonempty({ message: "Content can't be empty" })
    .max(500, { message: "Content can't be longer than 500 characters" }),
});

export const ModifyFundraiserPage: React.FC<Props> = () => {
  const { accessToken } = useContext(AppContext);
  const { classes } = useStyles();
  const { state } = useLocation();

  const theme = useMantineTheme();
  const navigate = useNavigate();
  const notiManager = useNotifications();

  const [globalFormErrors, setGlobalFormErrors] = useState<string[]>();

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      title: (state as LocationState)?.title || '',
      content: (state as LocationState)?.content || '',
    },
  });

  return (
    <Shell>
      <Container className={classes.wrapper} size={1400}>
        {form.values.title ? (
          <Title className={classes.title} color={theme.primaryColor}>
            Wow!{' '}
            <Text component="span" color={theme.primaryColor} inherit>
              {form.values.title}
            </Text>{' '}
            sounds amazing!
          </Title>
        ) : (
          <Title className={classes.title} color={theme.primaryColor}>
            Creating a new fundraiser?
          </Title>
        )}

        <form
          onSubmit={form.onSubmit(async (formData) => {
            if (formData.content.length < 50) {
              form.setFieldError(
                'content',
                'Content must be at least 50 characters'
              );
              return;
            }
            if (state) {
              updateFundraiser({
                ...formData,
                accessToken: accessToken || '',
                fundraiserId: (state as LocationState)?.fundraiserId,
              })
                .then(() => {
                  notiManager.showNotification({
                    message: `Your fundraiser "${formData.title}" is fresh new!`,
                    title: 'Updated!',
                    color: 'green',
                    icon: <CheckIcon />,
                  });
                  navigate('/');
                })
                .catch((err) => {
                  handleApi400Error(err, setGlobalFormErrors);
                });
            } else {
              registerFundraiser({
                ...formData,
                accessToken: accessToken || '',
              })
                .then(() => {
                  notiManager.showNotification({
                    message: `Your fundraiser "${formData.title}" is online!`,
                    title: '🎉 Hooray!',
                    color: 'lime',
                    icon: <CheckIcon />,
                  });
                  navigate('/');
                })
                .catch((err) => {
                  handleApi400Error(err, setGlobalFormErrors);
                });
            }
          })}
        >
          <TextInput
            label="Title"
            placeholder="Your awesome fundraiser"
            minLength={10}
            maxLength={50}
            {...form.getInputProps('title')}
            required
          />

          <InputWrapper
            label="Content"
            {...form.getInputProps('content')}
            mt="lg"
            required
          >
            <RichTextEditor
              controls={[
                ['bold', 'italic', 'underline', 'link', 'image'],
                ['unorderedList', 'h1', 'h2', 'h3'],
                ['sup', 'sub'],
                ['alignLeft', 'alignCenter', 'alignRight'],
              ]}
              {...form.getInputProps('content')}
            />
          </InputWrapper>
          <ul>
            {globalFormErrors?.map((err) => (
              <li key={err}>
                <Text mt="md" color="red">
                  {err}
                </Text>
              </li>
            ))}
          </ul>

          <Button fullWidth mt="md" type="submit">
            {`${state ? 'Update' : 'Fundraise!'}`}
          </Button>
        </form>
      </Container>
    </Shell>
  );
};
