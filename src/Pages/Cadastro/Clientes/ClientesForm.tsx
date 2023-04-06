import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { Box, Button, Container, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ClientesFormData } from "../../../services/Types";
import { insertCliente, updateCliente } from "../../../services/Clientes";
import useFormActions from "../../../hooks/useFormActions";
import apiBuscaCep from "../../../services/buscaCep/apiBuscaCep";
import { KeyedMutator } from "swr";

type Endereco = {
  bairro: string;
  cep: string;
  localidade: string;
  logradouro: string;
};

const ClientesForm = () => {
  const { clienteId } = useParams();
  const { pathname } = useLocation();
  const viewTrue = pathname.includes("view");
  const context = useOutletContext<{
    cliente: ClientesFormData[];
    mutateCliente: KeyedMutator<ClientesFormData>;
  }>();

  const [cep, setCep] = useState<Endereco>();

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClientesFormData>({
    defaultValues: context ? context?.cliente[0] : {},
  });

  const cepWatch = watch("cep");

  const onSubmit = async (form: ClientesFormData) => {
    try {
      if (clienteId) {
        await updateCliente(form, clienteId);
      } else {
        await insertCliente(form);
      }
      onSave();
    } catch (error) {
      onError(error);
    }
  };

  const handleCepSearch = async () => {
    try {
      const response = await apiBuscaCep.get(`${cepWatch}/json`);
      setCep(response.data);
    } catch (error) {
      alert("Opa! Tem algum erro aí");
    }

    setValue("logradouro", cep?.logradouro ?? "");
    setValue("cidade", cep?.localidade ?? "");
    setValue("bairro", cep?.bairro ?? "");
  };

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput mt="md" required label="Nome" {...register("name")} />
          <Group spacing="xl" grow>
            <TextInput
              type="email"
              required
              label="E-mail"
              mt="md"
              {...register("email")}
            />
            <TextInput
              type="text"
              label="Telefone"
              mt="md"
              {...register("telefone")}
            />
          </Group>

          <Group spacing="xs">
            <TextInput type="text" label="CEP" mt="md" {...register("cep")} />
            <Button
              onClick={handleCepSearch}
              mt="40px"
              compact
              disabled={viewTrue}
            >
              {<IconSearch size="1rem" stroke={1.5} />}
            </Button>
          </Group>

          <TextInput
            defaultValue={cep?.logradouro}
            type="text"
            label="Logradouro"
            mt="md"
            {...register("logradouro")}
          />

          <Group spacing="xl" grow>
            <TextInput
              type="text"
              label="Numero"
              mt="md"
              {...register("numero")}
            />
            <TextInput
              type="text"
              label="Complemento"
              mt="md"
              {...register("complemento")}
            />
          </Group>

          <Group spacing="xl" grow>
            <TextInput
              defaultValue={cep?.bairro}
              type="text"
              label="Bairro"
              mt="md"
              {...register("bairro")}
            />
            <TextInput
              defaultValue={cep?.localidade}
              type="text"
              label="Cidade"
              mt="md"
              {...register("cidade")}
            />
          </Group>

          <Button.Group mt="lg">
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
