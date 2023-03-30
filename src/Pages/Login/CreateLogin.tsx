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
import { insertUser } from "../../services/Users";

const CreateLogin = () => {
  const {
    form: { onError, onSave },
  } = useFormActions();

  const navigate = useNavigate();

  const { handleSubmit, setValue, register, watch } = useForm<LoginForm>();

  const _onSubmit = async (form: LoginForm) => {
    const { data } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (data.session) {
      return await insertUser(form).then(onSave).catch(onError);
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
        Welcome New User!
      </Title>

      <form onSubmit={handleSubmit(_onSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Name"
            placeholder="Your name"
            required
            {...register("name")}
          />
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
          <Button type="submit" fullWidth mt="xl">
            Creat Acount
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default CreateLogin;
