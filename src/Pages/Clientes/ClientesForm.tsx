import {
  TextInput,
  Button,
  Box,
  Container,
  Group,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { insertCliente, updateCliente } from "../../services/Clientes";
import useFormActions from "../../hooks/useFormActions";
import { ClientesFormData } from "../../services/Types";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import apiBuscaCep from "../../services/buscaCep/apiBuscaCep";
import { useLocation, useOutletContext, useParams } from "react-router-dom";

type enderco = {
  bairro: string;
  cep: string;
  localidade: string;
  logradouro: string;
};

const ClientesForm = () => {
  const context: {
    cliente: ClientesFormData[];
  } = useOutletContext();

  const { clienteId } = useParams();

  const { pathname } = useLocation();

  const viewTrue = pathname === "/clientes/1/view";

  const [cep, setCep] = useState<enderco>();
  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { handleSubmit, setValue, register, watch } = useForm<ClientesFormData>(
    { defaultValues: context.cliente ? context?.cliente[0] : {} }
  );

  const cepWatch = watch("cep");

  const _onSubmit = async (form: ClientesFormData) => {
    if (clienteId) {
      return await updateCliente(form, clienteId).then(onSave).catch(onError);
    }

    await insertCliente(form).then(onSave).catch(onError);
  };

  const cepSearch = async () => {
    try {
      const response = await apiBuscaCep.get(`${cepWatch}/json`);
      setCep(response.data);
    } catch {
      alert("Opa! Tem algum erro aí");
    }

    setValue("logradouro", cep?.logradouro as string);
    setValue("cidade", cep?.localidade as string);
    setValue("bairro", cep?.bairro as string);
  };

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit(_onSubmit)}>
          <TextInput mt="md" required label="Nome" {...register("name")} />
          <Group spacing="xl" grow>
            <TextInput
              type={"email"}
              required
              label="E-mail"
              mt="md"
              {...register("email")}
            />
            <TextInput
              type={"text"}
              label="Telefone"
              mt="md"
              {...register("telefone")}
            />
          </Group>

          <Group spacing="xs">
            <TextInput
              type={"text"}
              label="CEP"
              mt="md"
              {...register("cep")}
            ></TextInput>

            <Button onClick={cepSearch} mt="40px" compact disabled={viewTrue}>
              {<IconSearch size="1rem" stroke={1.5} />}
            </Button>
          </Group>

          <TextInput
            defaultValue={cep?.logradouro}
            type={"text"}
            label="Logradouro"
            mt="md"
            {...register("logradouro")}
          />

          <Group spacing="xl" grow>
            <TextInput
              type={"text"}
              label="Numero"
              mt="md"
              {...register("numero")}
            />
            <TextInput
              type={"text"}
              label="Complemento"
              mt="md"
              {...register("complemento")}
            />
          </Group>

          <Group spacing="xl" grow>
            <TextInput
              defaultValue={cep?.bairro}
              type={"text"}
              label="Bairro"
              mt="md"
              {...register("bairro")}
            />
            <TextInput
              defaultValue={cep?.localidade}
              type={"text"}
              label="Cidade"
              mt="md"
              {...register("cidade")}
            />
          </Group>

          <Button.Group mt={"lg"}>
            <div>
              <Button type="submit" mt="md" disabled={viewTrue}>
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

export default ClientesForm;
