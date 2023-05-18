import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  Select,
  Tabs,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconCoin, IconPin, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import useFormActions from "../../hooks/useFormActions";
import { useSupabase } from "../../hooks/useSupabase";
import { upsertOrdemServicos } from "../../services/OrdemServicos";

import {
  OrdemServicoType,
  ServicoToOrdemServico,
  ServicosData,
} from "../../services/Types/suiteOS";

const FecharOrdemServicosForm = () => {
  const navigate = useNavigate();
  const { osId } = useParams();

  const context = useOutletContext<{
    ordemServico: OrdemServicoType[];
  }>();

  const [title, setTitle] = useState<String>("Abrir Ordem de Servico");

  const {
    form: { onError, onSuccess, onClose, onSave },
  } = useFormActions();

  const { setValue, handleSubmit, register } = useForm<OrdemServicoType>({
    defaultValues: context ? context?.ordemServico[0] : {},
  });

  const { data: status } = useSupabase<ServicosData>({
    uri: `/status`,
  });

  const { data: servicoToOrdemServico, mutate } =
    useSupabase<ServicoToOrdemServico>({
      uri: `/servicoToOrdemServico?ordem_servico_id=eq.${osId}`,
      select: `
      id,
      servicos (
        name,
        valor
      )
    `,
    });

  const valorServico = servicoToOrdemServico?.map(({ servicos }) =>
    Number(servicos?.valor)
  );

  const disabele = !!valorServico?.length;

  const getTotalServicos = () => {
    const totalServico = valorServico?.reduce((prev, valor) => prev + valor, 0);

    return totalServico?.toFixed(2).replace(".", ",");
  };

  const onSubmit = async (form: OrdemServicoType) => {
    const { error } = await upsertOrdemServicos(form, Number(osId));

    if (!error) {
      if (disabele) {
        if (
          !confirm(
            "Exite pagamentos pendentes deseja ir para pagina de pagamentos?"
          )
        ) {
          return onSave();
        }

        onSuccess();

        return navigate(`../pagamento`);
      }
      return onSave();
    }

    return onError(error.message);
  };

  useEffect(() => {
    if (context?.ordemServico) {
      document.title = `${context?.ordemServico?.map(
        (item) => item.documento
      )}`;
      setTitle(`Encerrar OS  #${context?.ordemServico[0].documento}`);
    }

    document.title = "Ordem de Servicos";
  }, []);

  return (
    <Container>
      <Box>
        <Title order={4}>{title}</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Divider mt={20} />

          <Group grow>
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
              label="Encerrar Como"
              mt="md"
              nothingFound={
                <UnstyledButton onClick={() => navigate("/servicos/create")}>
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
            <TextInput
              mt="md"
              type="date"
              required
              label="Saida"
              {...register("data_saida")}
            />
          </Group>

          <Button.Group mt="lg">
            <div>
              <Button type={"submit"} mt="md">
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
export default FecharOrdemServicosForm;
