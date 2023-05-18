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

const PagamentoServico = () => {
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

  console.log(disabele);

  const getTotalServicos = () => {
    const totalServico = valorServico?.reduce((prev, valor) => prev + valor, 0);

    return totalServico?.toFixed(2).replace(".", ",");
  };

  const onSubmit = async (form: OrdemServicoType) => {
    const { error } = await upsertOrdemServicos(form, Number(osId));

    if (!error) {
      if (!disabele) {
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
      setTitle(`Pagamento da OS  #${context?.ordemServico[0].documento}`);
    }

    document.title = "Ordem de Servicos";
  }, []);

  return (
    <Container>
      <Box>
        <Title order={4}>{title}</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Divider mt={20} />

          <Group mt={4} position="center">
            <Paper shadow="xl" p="md" mr={10} withBorder radius="lg">
              <Text size="xl">{`R$ ${getTotalServicos()}`}</Text>
            </Paper>
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
export default PagamentoServico;
