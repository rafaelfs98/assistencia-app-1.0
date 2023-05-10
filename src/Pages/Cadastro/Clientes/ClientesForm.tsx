import {
  Box,
  Button,
  Container,
  Group,
  InputBase,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { KeyedMutator } from "swr";
import useFormActions from "../../../hooks/useFormActions";
import { upsertCliente } from "../../../services/Clientes";
import { ClientesData } from "../../../services/Types/suiteOS";
import apiBuscaCep from "../../../services/buscaCep/apiBuscaCep";

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
    cliente: ClientesData[];
    mutateCliente: KeyedMutator<ClientesData>;
  }>();

  const [cep, setCep] = useState<Endereco>();
  const [title, setTitle] = useState<String>("Adicionar Cliente");

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { handleSubmit, register, setValue, watch } = useForm<ClientesData>({
    defaultValues: context ? context?.cliente[0] : {},
  });

  const cepWatch = watch("cep");

  const onSubmit = async (form: ClientesData) => {
    const { error } = await upsertCliente(form, Number(clienteId));

    if (!error) {
      return onSave();
    }

    return onError(error.message);
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

  useEffect(() => {
    if (context?.cliente) {
      document.title = `${context?.cliente?.map((item) => item.name)}`;
      setTitle("Editar Cliente");
    }
  }, []);

  return (
    <Container>
      <Box>
        <Title order={4}>{title}</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            {...register("name")}
            label="Nome"
            mt="md"
            readOnly={viewTrue}
            required
          />
          <Group spacing="xl" grow>
            <TextInput
              {...register("email")}
              label="E-mail"
              mt="md"
              readOnly={viewTrue}
              required
              type="email"
            />
            <InputBase
              component={IMaskInput}
              disabled={viewTrue}
              label="Telefone"
              mask="(00) 0000-0000"
              mt="md"
              onAccept={(value) => setValue("telefone", value as string)}
              value={context?.cliente[0]?.telefone}
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
            {...register("logradouro")}
            label="Logradouro"
            mt="md"
            readOnly={viewTrue}
            type="text"
            value={cep?.logradouro}
          />

          <Group spacing="xl" grow>
            <TextInput
              {...register("numero")}
              label="Numero"
              mt="md"
              readOnly={viewTrue}
              type="text"
            />
            <TextInput
              {...register("complemento")}
              label="Complemento"
              mt="md"
              readOnly={viewTrue}
              type="text"
            />
          </Group>

          <Group spacing="xl" grow>
            <TextInput
              {...register("bairro")}
              label="Bairro"
              mt="md"
              readOnly={viewTrue}
              type="text"
              value={cep?.bairro}
            />
            <TextInput
              {...register("cidade")}
              label="Cidade"
              mt="md"
              readOnly={viewTrue}
              type="text"
              value={cep?.localidade}
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
