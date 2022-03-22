import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Modal,
  ModalProps,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React, { useState } from 'react';
import { z } from 'zod';

import { loginUser } from '../../utils/api';

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .nonempty({ message: "Email can't be empty" }),
  password: z
    .string()
    .min(5, { message: 'Minimum lenght is 5' })
    .nonempty({ message: "Password can't be empty" }),
});

const errorTimeout = 5 * 1000;

export interface LoginProps {
  modalProps: ModalProps;
  dispatchers: {
    toDisable: React.Dispatch<React.SetStateAction<boolean>>;
    toEnable: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export function LoginModal({
  modalProps: props,
  dispatchers: { toDisable, toEnable },
}: LoginProps) {
  const [globalFormErrors, setGlobalFormErrors] = useState<string[]>();
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  return (
    <Modal
      {...props}
      onClose={() => {
        setGlobalFormErrors([]);
        form.reset();

        toDisable(false);
      }}
    >
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor<'a'>
            href="#"
            size="sm"
            onClick={(event) => {
              event.preventDefault();

              toDisable(false);
              toEnable(true);
            }}
          >
            Create account
          </Anchor>
        </Text>

        <form
          onSubmit={form.onSubmit(async (formData) => {
            loginUser({
              email: formData.email,
              password: formData.password,
              rememberMe: formData.rememberMe,
            })
              .then((res) => {
                localStorage.setItem('access_token', res.data.access_token);

                toDisable(false);
                form.reset();
              })
              .catch((err) => {
                switch (err.response.status as number) {
                  case 400:
                    // eslint-disable-next-line no-case-declarations
                    setGlobalFormErrors(
                      err.response.data.message.map(
                        (errMapped: string) =>
                          errMapped.toString().charAt(0).toUpperCase() +
                          errMapped.toString().slice(1)
                      )
                    );

                    setTimeout(() => setGlobalFormErrors([]), errorTimeout);
                    break;
                  default:
                    setGlobalFormErrors(['Invalid login credentials']);
                    setTimeout(() => setGlobalFormErrors([]), errorTimeout);
                }
              });
          })}
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
            <Group position="apart" mt="md">
              <Checkbox
                label="Remember me"
                {...form.getInputProps('rememberMe', { type: 'checkbox' })}
              />
              <Anchor<'a'>
                onClick={(event) => event.preventDefault()}
                href="#"
                size="sm"
              >
                Forgot password?
              </Anchor>
            </Group>
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
    </Modal>
  );
}
