import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase/supabaseClient";
import { LoginType } from "../../services/Types";

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<LoginType>();
  const [error, setError] = useState<string>("");

  const _onSubmit = async (form: LoginType) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/");
  };

  const handleCreateAccountClick = () => {
    navigate("/createLogin");
  };

  return (
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
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button" onClick={handleCreateAccountClick}>
          Create account
        </Anchor>
      </Text>
      <form onSubmit={handleSubmit(_onSubmit)}>
        {error && (
          <Paper withBorder shadow="md" p={20} mt={20} radius="md" color="red">
            {error}
          </Paper>
        )}
        <Paper withBorder shadow="md" p={30} mt={error ? 10 : 30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...register("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...register("password")}
          />
          <Group position="apart" mt="lg">
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default Login;
