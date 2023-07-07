import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Box,
  Title,
  Divider,
  Group,
  Select,
  TextInput,
  Button,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import useFormActions from "../../hooks/useFormActions";
import { useSupabase } from "../../hooks/useSupabase";
import { upsertOrdemServicos } from "../../services/OrdemServicos";
import {
  OrdemServicoType,
  RecebimentoData,
  ServicoToOrdemServico,
  ServicosData,
} from "../../services/Types/suiteOS";
import { KeyedMutator } from "swr";

const CloseOrderService = () => {
  const navigate = useNavigate();
  const { osId } = useParams();
  const [paymentPaid, setPaymentPaid] = useState<Boolean>();

  const context = useOutletContext<{
    ordemServico: OrdemServicoType[];
    mutateOrdemServico: KeyedMutator<OrdemServicoType[]>;
  }>();

  const [title, setTitle] = useState<string>("Abrir Ordem de Servico");

  const {
    form: { onError, onSuccess, onClose, onSave },
  } = useFormActions();

  const { setValue, handleSubmit, register } = useForm<OrdemServicoType>({
    defaultValues: context ? context?.ordemServico[0] : {},
  });

  const { data: status } = useSupabase<ServicosData>({
    uri: "/Status",
  });

  const { data: recebimento } = useSupabase<RecebimentoData>({
    uri: `/PaymentReceived?ordem_servico_id=eq.${osId}`,
    select: `
   valor_pago
  `,
  });

  const { data: servicoToOrdemServico } = useSupabase<ServicoToOrdemServico>({
    uri: `/ServiceToServiceOrder?ordem_servico_id=eq.${osId}`,
    select: `
          Service (
            valor
          )
        `,
  });

  const totalValues = servicoToOrdemServico?.map(({ Service }) =>
    Number(Service?.valor)
  );

  const currentValues = recebimento?.map(({ valor_pago }) => valor_pago);

  const getTotalAmount = useCallback(() => {
    const paidValue = currentValues?.reduce((prev, valor) => prev + valor, 0);
    const previousTotal = totalValues?.reduce((prev, valor) => prev + valor, 0);

    const currentTotal = Number(previousTotal) - Number(paidValue);

    return isNaN(currentTotal as number)
      ? null
      : currentTotal?.toFixed(2).replace(".", ",");
  }, [recebimento]);

  useEffect(() => {
    const total = getTotalAmount();

    if (total !== null) {
      setPaymentPaid(total === "0,00");
    }
  }, [getTotalAmount]);

  const onSubmit = async (form: OrdemServicoType) => {
    try {
      const response = await upsertOrdemServicos(form, Number(osId));

      context?.mutateOrdemServico(response as OrdemServicoType[]);

      if (!paymentPaid) {
        if (
          !window.confirm(
            "Existem pagamentos pendentes. Deseja ir para a página de pagamentos?"
          )
        ) {
          return onSave();
        }

        onSuccess();

        return navigate("../pagamento");
      }

      return onSave();
    } catch (error) {
      return onError(error);
    }
  };

  useEffect(() => {
    if (context?.ordemServico) {
      document.title = context?.ordemServico
        .map((item) => item.documento)
        .toString();
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
                <Button onClick={() => navigate("/servicos/create")} size="xs">
                  <IconPlus size="1rem" />
                  <span>Criar Serviços</span>
                </Button>
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

export default CloseOrderService;
