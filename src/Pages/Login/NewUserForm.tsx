import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { insertUser } from "../../services/Users";
import { supabase } from "../../services/supabase/supabaseClient";
import { LoginForm } from "../../services/Types";
import useFormActions from "../../hooks/useFormActions";

const NewUserForm = () => {
  const {
    form: { onError, onSave },
  } = useFormActions();

  const { handleSubmit, register } = useForm<LoginForm>();

  const handleFormSubmit = async (form: LoginForm) => {
    try {
      const { data } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (data.session) {
        await insertUser(form);
        onSave();
      }
    } catch (error) {
      onError();
      console.error(error);
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

      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            Create Account
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default NewUserForm;
