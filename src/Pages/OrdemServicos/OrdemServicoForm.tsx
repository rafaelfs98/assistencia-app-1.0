import {
  Box,
  Button,
  Container,
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
import useFormActions from "../../hooks/useFormActions";
import { useSupabase } from "../../hooks/useSupabase";
import { upsertOrdemServicos } from "../../services/OrdemServicos";

import {
  ClientesData,
  EquipamentosData,
  OrdemServicoType,
  ServicosData,
} from "../../services/Types/suiteOS";
import ServicoToOrdemServicoForm from "./ServicoToOrdemServico";

const OrderServicosForm = () => {
  const navigate = useNavigate();
  const { osId } = useParams();
  const { pathname } = useLocation();

  const context = useOutletContext<{
    ordemServico: OrdemServicoType[];
  }>();

  const [equipamentosByCliente, setEquipamentosByCliente] =
    useState<EquipamentosData[]>();

  const [title, setTitle] = useState<string>("Abrir Ordem de Servico");
  const [clienteId, setClienteId] = useState<string>("");

  const isViewMode = pathname.includes("view");

  const {
    form: { onError, onSuccess, onSave, onClose },
  } = useFormActions();

  const { setValue, handleSubmit, register } = useForm<OrdemServicoType>({
    defaultValues: context ? context?.ordemServico[0] : {},
  });

  const { data: status } = useSupabase<ServicosData>({
    uri: `/status`,
  });

  const { data: equipamentos } = useSupabase<EquipamentosData>({
    uri: `/equipamentos`,
  });

  const { data: clientes } = useSupabase<ClientesData>({
    uri: `/clientes`,
    select: `
    id,
    name,
    telefone,
    equipamentos (
     modelo
    )
  `,
  });

  const disableTabs = !!context?.ordemServico;

  const onSubmit = async (form: OrdemServicoType) => {
    const response = await upsertOrdemServicos(form, Number(osId));

    if (!response.error) {
      if (!window.confirm("Desejar imprimir a OS ?")) {
        return onSave();
      }

      onSuccess();

      return navigate(`/os/${response?.data[0]?.documento}/view`);
    }

    return onError(response?.error?.message);
  };

  useEffect(() => {
    const equipamentosFiltered = equipamentos?.filter(
      ({ cliente_id }) => cliente_id === Number(clienteId)
    );

    setEquipamentosByCliente(equipamentosFiltered as EquipamentosData[]);
  }, [clienteId]);

  useEffect(() => {
    if (context?.ordemServico) {
      document.title = `${context?.ordemServico?.map(
        (item) => item.documento
      )}`;
      setTitle("Editar Ordem de Servico");

      setEquipamentosByCliente(
        context?.ordemServico.map(
          ({ equipamentos }) => equipamentos
        ) as EquipamentosData[]
      );
    } else {
      document.title = "Ordem de Servicos";
    }
  }, []);

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title order={4}>{title}</Title>
          <Tabs defaultValue="info" mt={25}>
            <Tabs.List>
              <Tabs.Tab value="info" icon={<IconInfoCircle size="0.8rem" />}>
                Info
              </Tabs.Tab>
              {disableTabs && (
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
                  defaultValue={context?.ordemServico[0]?.status}
                  disabled={isViewMode}
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

              <Select
                data={
                  clientes
                    ? clientes?.map((item) => ({
                        label: item.name + " - " + item.telefone,
                        value: String(item.id),
                      }))
                    : []
                }
                disabled={isViewMode}
                label="Cliente(Nome, Telefone)"
                mt="md"
                nothingFound={
                  <UnstyledButton onClick={() => navigate("/cliente/create")}>
                    <Group>
                      <IconPlus size="1rem" />
                      <Text>Criar Cliente</Text>
                    </Group>
                  </UnstyledButton>
                }
                onChange={(value) => {
                  setClienteId(String(value));
                }}
                defaultValue={String(
                  context?.ordemServico[0]?.equipamentos?.clientes?.id
                )}
                required
                searchable
              />

              <Select
                data={
                  equipamentosByCliente
                    ? equipamentosByCliente?.map((item) => ({
                        label:
                          item.marca + " - " + item.modelo + " - " + item.cor,
                        value: String(item.id),
                      }))
                    : []
                }
                disabled={isViewMode}
                label="Equipamento (Marca, Modelo, Cor)"
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
                }}
                defaultValue={String(
                  context?.ordemServico[0]?.equipamentos?.id
                )}
                required
                searchable
              />
              <Textarea
                mt="md"
                label="Acessorios"
                autosize
                {...register("acessorios")}
              />
              <Textarea
                mt="md"
                label="Obs."
                autosize
                {...register("observacao")}
              />
            </Tabs.Panel>

            {disableTabs && (
              <>
                <Tabs.Panel value="servicos" pt="xs">
                  <ServicoToOrdemServicoForm
                    ordem_servico_id={context?.ordemServico[0]?.documento}
                  />
                </Tabs.Panel>

                <Tabs.Panel value="laudo" pt="xs">
                  Settings tab content
                </Tabs.Panel>
              </>
            )}
          </Tabs>
          <Button.Group mt="lg">
            <div>
              <Button type="submit" mt="md" disabled={isViewMode}>
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

export default OrderServicosForm;
