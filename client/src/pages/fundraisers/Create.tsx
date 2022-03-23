import {
  Container,
  createStyles,
  TextInput,
  Title,
  useMantineTheme,
  Text,
  Button,
  InputWrapper,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useNotifications } from '@mantine/notifications';
import RichTextEditor from '@mantine/rte';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Shell } from '../../components/Shell';
import { registerFundraiser } from '../../utils/api';
import { AppContext } from '../../utils/AppContext';

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

export const CreateFundraiserPage: React.FC<Props> = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { accessToken } = useContext(AppContext);
  const notiManager = useNotifications();
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      title: '',
      content: '',
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
          onSubmit={form.onSubmit(async (data) => {
            if (data.content.length < 50) {
              form.setFieldError(
                'content',
                'Content must be at least 50 characters'
              );
              return;
            }

            console.log(data);
            registerFundraiser({
              ...data,
              accessToken: accessToken || '',
            })
              .then(() => {
                console.log('kur');
                notiManager.showNotification({
                  message: `Your fundraiser ${data.title} is online!`,
                  color: 'lime',
                  title: '🎉 Hooray!',
                });
                navigate('/');
              })
              .catch((err) => console.log(err, 'kur'));
          })}
        >
          <TextInput
            label="Title"
            placeholder="Your awesome fundraiser"
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
          <Button fullWidth mt="md" type="submit">
            Fundraise!
          </Button>
        </form>
      </Container>
    </Shell>
  );
};
