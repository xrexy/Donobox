import React from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Modal,
  ModalProps,
} from '@mantine/core';

export function RegisterModal({
  modalProps: props,
  dispatchers: { toDisable, toEnable },
}: {
  modalProps: ModalProps;
  dispatchers: {
    toDisable: React.Dispatch<React.SetStateAction<boolean>>;
    toEnable: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) {
  return (
    <Modal {...props}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome to Donobox
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already a member?{' '}
          <Anchor<'a'>
            href="#"
            size="sm"
            onClick={(event) => {
              event.preventDefault();

              toDisable(false);
              toEnable(true);
            }}
          >
            Login
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor<'a'>
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign up
          </Button>
        </Paper>
      </Container>
    </Modal>
  );
}
