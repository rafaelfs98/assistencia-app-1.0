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
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useFormActions from "../../hooks/useFormActions";
import { supabase } from "../../services/supabase/supabaseClient";
import { LoginForm } from "../../services/Types";
import CreateLogin from "./CreateLogin";

const Login = () => {
  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const navigate = useNavigate();

  const { handleSubmit, setValue, register, watch } = useForm<LoginForm>();

  const _onSubmit = async (form: LoginForm) => {
    const { data } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (data.session) {
      navigate("/inicial");
    }
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
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate("createLogin")}
        >
          Create account
        </Anchor>
      </Text>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
