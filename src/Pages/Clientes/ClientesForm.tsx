import {
  TextInput,
  Button,
  Box,
  Container,
  Group,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { insertClientes } from "../../services/Clientes";
import useFormActions from "../../hooks/useFormActions";
import { ClientesFormData } from "../../services/Types";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import apiBuscaCep from "../../services/buscaCep/apiBuscaCep";

type enderco = {
  bairro: string;
  cep: string;
  localidade: string;
  logradouro: string;
};

const ClientesForm = () => {
  const [cep, setCep] = useState<enderco>();
  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { handleSubmit, register, watch } = useForm<ClientesFormData>();

  const cepWatch = watch("cep");

  const _onSubmit = async (form: ClientesFormData) => {
    await insertClientes(form).then(onSave).catch(onError);
  };

  const cepSearch = async () => {
    try {
      const response = await apiBuscaCep.get(`${cepWatch}/json`);
      setCep(response.data);
    } catch {
      alert("Opa! Tem algum erro aí");
    }
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

          <Group>
            <TextInput type={"text"} label="CEP" mt="md" {...register("cep")} />

            <Button onClick={cepSearch} mt="lg" ml="sm">
              {<IconSearch />}
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

export default ClientesForm;
