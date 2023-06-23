import { useState } from "react";

import {
  Button,
  Checkbox,
  Container,
  Group,
  Image,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../services/Types/suiteOS";
import { supabase } from "../../services/supabase/supabaseClient";

const Login = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { handleSubmit, register } = useForm<UserInfo>();
  const [error, setError] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);

  const handleThemeChange = () => {
    const logoSrc =
      theme.colorScheme === "dark" ? "./SuiteOSBack.png" : "./SuiteOSBack.png";

    return logoSrc;
  };

  const _onSubmit = async (form: UserInfo) => {
    const { data: users, error } = await supabase
      .from("Users")
      .select()
      .eq("usuario", form.usuario)
      .eq("senha", form.senha)
      .single();

    if (error || !users) {
      setError(error.message);
      alert("Erro ao fazer login");
      return;
    } else {
      alert("Login bem-sucedido");
      if (isChecked) {
        localStorage.setItem("user", JSON.stringify(users));
        return navigate("/");
      }

      sessionStorage.setItem("user", JSON.stringify(users));
      navigate("/");
    }
  };

  return (
    <div className="login">
      <Container size={420}>
        <form onSubmit={handleSubmit(_onSubmit)}>
          {error && (
            <Paper
              withBorder
              shadow="md"
              p={20}
              mt={20}
              radius="md"
              color="red"
            >
              {error}
            </Paper>
          )}
          <Paper withBorder shadow="md" p={30} mt={error ? 10 : 30} radius="md">
            <Image
              width={300}
              height={80}
              fit="contain"
              src={handleThemeChange()}
            />
            <Group position="center">
              <Title className="login__title">Login</Title>
            </Group>
            <TextInput
              label="Usuario"
              placeholder="Digite o nome do usuario..."
              required
              {...register("usuario")}
            />
            <PasswordInput
              label="Password"
              placeholder="Digite a senha..."
              required
              mt="md"
              {...register("senha")}
            />
            <Group position="apart" mt="lg">
              <Checkbox
                label="Manter-me Logado"
                checked={isChecked}
                onChange={(event) => setIsChecked(event.currentTarget.checked)}
              />
            </Group>
            <Button type="submit" fullWidth mt="xl">
              Entrar
            </Button>
          </Paper>
        </form>
      </Container>
    </div>
  );
};

export default Login;
