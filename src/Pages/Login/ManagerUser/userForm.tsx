import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useOutletContext, useParams } from "react-router-dom";
import useFormActions from "../../../hooks/useFormActions";
import { RolesData, UserInfo } from "../../../services/Types/suiteOS";

import classNames from "classnames";
import { useEffect, useState } from "react";
import { KeyedMutator } from "swr";
import { useSupabase } from "../../../hooks/useSupabase";
import { upsertUser } from "../../../services/Users";

const UserForm = () => {
  const { userId } = useParams();
  const [title, setTitle] = useState<String>("Adicionar Usuario");
  const context = useOutletContext<{
    user: UserInfo[];
    roles: RolesData[];
    mutateUser: KeyedMutator<UserInfo[]>;
  }>();

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { handleSubmit, register, setValue } = useForm<UserInfo>({
    defaultValues: context ? context?.user[0] : {},
  });

  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  const handleCheckboxChange = (roleId: number) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
    }
  };

  const disabledCheckBox = (id: number) =>
    (selectedRoles.length > 0 && !selectedRoles.includes(id)) ||
    !!context?.user;

  const onSubmit = async (form: UserInfo) => {
    try {
      const response = await upsertUser(form, Number(userId));

      context?.mutateUser(response as UserInfo[]);
      return onSave();
    } catch (error) {
      return onError(error);
    }
  };

  const { data: roles } = useSupabase<RolesData>({
    uri: `/Roles`,
  });

  useEffect(() => {
    if (context?.user) {
      document.title = `${context.user?.map((item) => item.name)}`;
      setTitle("Editar Usuario");
    }
  }, []);

  return (
    <Container>
      <Box>
        <Title order={4}>{title}</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Group spacing="xl" grow>
            <TextInput {...register("name")} label="Nome" mt="md" required />
            <TextInput
              {...register("email")}
              label="E-mail"
              mt="md"
              required
              type="email"
            />
          </Group>
          <Group spacing="xl" grow>
            <TextInput
              {...register("usuario")}
              label="Usuario"
              mt="md"
              required
              type="text"
            />
            <PasswordInput
              label="Nova Senha"
              placeholder="Digite a senha..."
              required
              mt="md"
              {...register("password")}
            />
          </Group>
          <Stack mt="xs">
            <Divider />
            <Title order={4}>Roles</Title>
            {roles?.map(({ Role, id }, index) => (
              <Checkbox
                className={classNames({
                  disabled: disabledCheckBox(id),
                })}
                defaultChecked={id === context?.user[0]?.roleId}
                label={Role}
                value={id}
                key={index}
                disabled={disabledCheckBox(id)}
                onChange={() => {
                  setValue("roleId", id);
                  handleCheckboxChange(id);
                }}
              />
            ))}
          </Stack>

          <Button.Group mt="lg">
            <div>
              <Button type="submit" mt="md">
                Submit
              </Button>
            </div>
            <Button mt="md" ml="sm" color="gray" onClick={onClose}>
              Close
            </Button>
          </Button.Group>
        </form>
      </Box>
    </Container>
  );
};

export default UserForm;
