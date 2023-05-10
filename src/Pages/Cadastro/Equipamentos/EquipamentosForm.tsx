import {
  Box,
  Button,
  Container,
  Group,
  Select,
  TextInput,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { KeyedMutator } from "swr";
import useFormActions from "../../../hooks/useFormActions";
import { upsertEquipamento } from "../../../services/Equipamentos";
import {
  ClientesData,
  EquipamentosData,
  ServicosData,
} from "../../../services/Types/suiteOS";
import { useSupabase } from "../../../hooks/useSupabase";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const EquipamentosForm = () => {
  const navigate = useNavigate();
  const { servicoId } = useParams();
  const { pathname } = useLocation();

  const [title, setTitle] = useState<String>("Adicionar Servicos");
  const viewTrue = pathname.includes("view");
  const context = useOutletContext<{
    equipamentos: EquipamentosData[];
    mutateServicos: KeyedMutator<ServicosData>;
  }>();

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { setValue, handleSubmit, register } = useForm<EquipamentosData>({
    defaultValues: context ? context?.equipamentos[0] : {},
  });

  const { data: clientes, mutate: mutateEquipamentos } =
    useSupabase<ClientesData>({
      uri: `/clientes`,
    });

  const onSubmit = async (form: EquipamentosData) => {
    const { error } = await upsertEquipamento(form, Number(servicoId));

    if (!error) {
      return onSave();
    }

    return onError(error.message);
  };

  useEffect(() => {
    if (context?.equipamentos) {
      document.title = `${context?.equipamentos?.map((item) => item.modelo)}`;
      setTitle("Editar Equipamento");
    }
  }, []);

  return (
    <Container>
      <Box>
        <Title order={4}>{title}</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Group grow>
            <TextInput
              {...register("modelo")}
              label="Modelo"
              mt="md"
              readOnly={viewTrue}
              required
            />
            <TextInput
              {...register("marca")}
              label="Marca"
              mt="md"
              readOnly={viewTrue}
              required
            />
            <TextInput
              {...register("cor")}
              label="Cor"
              mt="md"
              readOnly={viewTrue}
              required
            />
          </Group>
          <Group grow>
            <TextInput
              {...register("serie")}
              label="Numero de Serie"
              mt="md"
              readOnly={viewTrue}
              required
            />
            <Select
              defaultValue={String(context?.equipamentos[0]?.clienteId)}
              data={
                clientes
                  ? clientes?.map((item) => ({
                      label: item.telefone + " - " + item.name,
                      value: String(item.id),
                    }))
                  : []
              }
              disabled={viewTrue}
              label="Cliente"
              mt="md"
              nothingFound={
                <UnstyledButton onClick={() => navigate("/clientes/create")}>
                  <Group>
                    <IconPlus size="1rem" />
                    <Text>Criar Cliente</Text>
                  </Group>
                </UnstyledButton>
              }
              onChange={(value) => setValue("clienteId", Number(value))}
              required
              searchable
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
export default EquipamentosForm;
