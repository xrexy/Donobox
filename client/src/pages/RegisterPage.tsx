import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Shell } from '../components/Shell';
import { registerUser } from '../utils/api';
import { AppContext } from '../utils/AppContext';
import { capitalize } from '../utils/helpers';

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .nonempty({ message: "Email can't be empty" }),
  password: z
    .string()
    .min(5, { message: 'Minimum lenght is 5' })
    .nonempty({ message: "Password can't be empty" }),
  repeatPassword: z
    .string()
    .min(5, { message: 'Minimum lenght is 5' })
    .nonempty({ message: "Password can't be empty" }),
});

const errorTimeout = 5 * 1000;

export const RegisterPage: React.FC = () => {
  const [globalFormErrors, setGlobalFormErrors] = useState<string[]>();
  const navigate = useNavigate();
  const { updateToken } = useContext(AppContext);
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: 'test@gmail.com',
      password: 'test123',
      repeatPassword: 'test123',
    },
  });

  return (
    <Shell>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
            color:
              theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[8],
          })}
        >
          Welcome to Donobox!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already a member?{' '}
          <Anchor<'a'> href="/login" size="sm">
            Login
          </Anchor>
        </Text>

        <form
          onSubmit={form.onSubmit(
            async ({ email, password, repeatPassword }) => {
              if (repeatPassword !== password) {
                form.setFieldError('repeatPassword', 'Passwords do not match');

                form.setFieldError('password', 'Passwords do not match');

                return;
              }

              registerUser({
                email,
                password,
              })
                .then((res) => {
                  localStorage.setItem('access_token', res.data.access_token);
                  updateToken(res.data.access_token);

                  form.reset();

                  navigate('/');
                })
                .catch((err) => {
                  console.log(err.response);
                  let message: string | string[];
                  switch (err.response.status as number) {
                    case 400:
                      message = err.response.data.message;
                      console.log(message);

                      if (typeof message === 'string') {
                        setGlobalFormErrors([capitalize(message)]);
                      } else {
                        setGlobalFormErrors(
                          message.map((errToMap) => capitalize(errToMap))
                        );
                      }

                      setTimeout(() => setGlobalFormErrors([]), errorTimeout);
                      break;
                    default:
                      setGlobalFormErrors(['Invalid login credentials']);
                      setTimeout(() => setGlobalFormErrors([]), errorTimeout);
                  }
                });
            }
          )}
        >
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@donobox.net"
              {...form.getInputProps('email')}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              {...form.getInputProps('password')}
              required
            />
            <PasswordInput
              label="Repeat your password"
              placeholder="Your password"
              mt="md"
              {...form.getInputProps('repeatPassword')}
              required
            />
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
              Sign in
            </Button>
          </Paper>
        </form>
      </Container>
    </Shell>
  );
};
