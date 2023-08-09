import { useEffect, useState } from "react";

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
import { LoginInfo } from "../../services/Types/suiteOS";
import { loginUser } from "../../services/Users";

const Login = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { handleSubmit, register } = useForm<LoginInfo>();
  const [error, setError] = useState<string>("");

  const handleThemeChange = () => {
    const logoSrc =
      theme.colorScheme === "dark" ? "./SuiteOSBack.png" : "./SuiteOSBack.png";

    return logoSrc;
  };

  const _onSubmit = async (form: LoginInfo) => {
    try {
      const response = await loginUser(form.email, form.password);

      if (response.error) {
        setError("Erro ao fazer login");
      } else {
        sessionStorage.setItem("user", JSON.stringify(response));

        navigate("/");
      }
    } catch (error) {
      setError("Erro ao fazer login");
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
              label="Email"
              placeholder="Digite o Email do usuario..."
              type="email"
              required
              {...register("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Digite a senha..."
              required
              mt="md"
              {...register("password")}
            />
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
