import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Select,
  Tabs,
  Text,
  TextInput,
  Textarea,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  IconClipboardCheck,
  IconInfoCircle,
  IconPlus,
  IconTool,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { KeyedMutator } from "swr";
import useFormActions from "../../hooks/useFormActions";
import { useSupabase } from "../../hooks/useSupabase";
import { upsertOrdemServicos } from "../../services/OrdemServicos";

import {
  EquipamentosData,
  OrdemServicoType,
  ServicosData,
} from "../../services/Types/suiteOS";
import ServicoToOrdemServicoForm from "./ServicoToOrdemServico";

const OrdemServicosForm = () => {
  const navigate = useNavigate();
  const { osId } = useParams();
  const { pathname } = useLocation();
  const [equipamentoSelecionado, setEquipamentoSelecionado] =
    useState<EquipamentosData[]>();
  const [title, setTitle] = useState<String>("Abrir Ordem de Servico");
  const [equipamentoId, setEquipamentoId] = useState<String>("");

  const viewTrue = pathname.includes("view");
  const context = useOutletContext<{
    ordemServicos: OrdemServicoType[];
    mutateCliente: KeyedMutator<OrdemServicoType>;
  }>();

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { setValue, handleSubmit, register } = useForm<OrdemServicoType>({
    defaultValues: context ? context?.ordemServicos[0] : {},
  });

  const { data: status } = useSupabase<ServicosData>({
    uri: `/status`,
  });

  const { data: equipamentos } = useSupabase<EquipamentosData>({
    uri: `/equipamentos`,
    select: `
    id,
    modelo,
    serie,
    clientes (
     name
    )
  `,
  });

  const disabeleTabs = !context?.ordemServicos;

  const onSubmit = async (form: OrdemServicoType) => {
    const { error } = await upsertOrdemServicos(form, Number(osId));

    if (!error) {
      return onSave();
    }

    return onError(error.message);
  };

  useEffect(() => {
    const equipamentosFiltrado = equipamentos?.filter(
      ({ id }) => id === Number(equipamentoId)
    );

    setEquipamentoSelecionado(equipamentosFiltrado);
  }, [equipamentoId]);

  useEffect(() => {
    if (context?.ordemServicos) {
      document.title = `${context?.ordemServicos?.map(
        (item) => item.documento
      )}`;
      setTitle("Editar Ordem de Servico");
    }

    document.title = "Ordem de Servicos";
  }, []);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Title order={4}>{title}</Title>
          <Tabs defaultValue="info" mt={25}>
            <Tabs.List>
              <Tabs.Tab value="info" icon={<IconInfoCircle size="0.8rem" />}>
                Info
              </Tabs.Tab>
              {disabeleTabs && (
                <>
                  <Tabs.Tab value="servicos" icon={<IconTool size="0.8rem" />}>
                    Servicos
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="laudo"
                    icon={<IconClipboardCheck size="0.8rem" />}
                  >
                    Laudo Tecnico
                  </Tabs.Tab>
                </>
              )}
            </Tabs.List>

            <Tabs.Panel value="info" pt="xs">
              <Title mt={10} order={4}>
                O.S
              </Title>

              <Group grow>
                <TextInput
                  mt="md"
                  disabled
                  label="N° Documento"
                  {...register("documento")}
                />
                <Select
                  data={
                    status
                      ? status?.map((item) => ({
                          label: item.name,
                          value: String(item.name),
                        }))
                      : []
                  }
                  disabled={viewTrue}
                  label="Status"
                  mt="md"
                  nothingFound={
                    <UnstyledButton
                      onClick={() => navigate("/servicos/create")}
                    >
                      <Group>
                        <IconPlus size="1rem" />
                        <Text>Criar Servicos</Text>
                      </Group>
                    </UnstyledButton>
                  }
                  onChange={(value) => setValue("status", String(value))}
                  required
                  searchable
                />
              </Group>
              <Group grow>
                <TextInput
                  mt="md"
                  type="date"
                  required
                  label="Entrada"
                  {...register("data_entrada")}
                />
                <TextInput
                  mt="md"
                  type="date"
                  label="Saida"
                  {...register("data_saida")}
                />
              </Group>

              <Divider mt={20} />

              <Title mt={10} order={4}>
                Equipamento
              </Title>
              <Group grow>
                <Select
                  data={
                    equipamentos
                      ? equipamentos?.map((item) => ({
                          label: item.serie + " - " + item.modelo,
                          value: String(item.id),
                        }))
                      : []
                  }
                  disabled={viewTrue}
                  label="Equipamento"
                  mt="md"
                  nothingFound={
                    <UnstyledButton
                      onClick={() => navigate("/equipamento/create")}
                    >
                      <Group>
                        <IconPlus size="1rem" />
                        <Text>Criar Equipamento</Text>
                      </Group>
                    </UnstyledButton>
                  }
                  onChange={(value) => {
                    setValue("equipamento_id", String(value));
                    setEquipamentoId(String(value));
                  }}
                  required
                  searchable
                />
                <TextInput
                  mt="md"
                  type="text"
                  readOnly
                  label="Cliente"
                  value={equipamentoSelecionado?.map(
                    ({ clientes }) => clientes.name
                  )}
                />
              </Group>
              <Group grow>
                <Textarea mt="md" label="Acessorios" autosize />
                <Textarea mt="md" label="Obs." autosize />
              </Group>
            </Tabs.Panel>

            {disabeleTabs && (
              <>
                <Tabs.Panel value="servicos" pt="xs">
                  <ServicoToOrdemServicoForm />
                </Tabs.Panel>

                <Tabs.Panel value="laudo" pt="xs">
                  Settings tab content
                </Tabs.Panel>
              </>
            )}
          </Tabs>
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
        </Box>
      </form>
    </Container>
  );
};
export default OrdemServicosForm;
