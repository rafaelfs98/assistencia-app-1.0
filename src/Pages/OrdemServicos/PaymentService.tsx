import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  InputBase,
  Paper,
  Select,
  Table,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import useFormActions from "../../hooks/useFormActions";
import { useSupabase } from "../../hooks/useSupabase";

import { NumericFormat } from "react-number-format";
import {
  deleteRecebimento,
  insertRecebimento,
} from "../../services/Recebimento";
import {
  FormaPagmentoData,
  OrdemServicoType,
  RecebimentoData,
  ServicoToOrdemServico,
} from "../../services/Types/suiteOS";

const PaymentService = () => {
  const navigate = useNavigate();
  const { osId } = useParams();
  const [totalAmount, setTotalAmount] = useState<string>();
  const [paymentPaid, setPaymentPaid] = useState<Boolean>();

  const context = useOutletContext<{
    ordemServico: OrdemServicoType[];
  }>();

  const [title, setTitle] = useState<String>("Abrir Ordem de Servico");

  const {
    form: { onError, onSubmit },
  } = useFormActions();

  const { setValue, handleSubmit } = useForm<RecebimentoData>();

  const { data: paymentMethods } = useSupabase<FormaPagmentoData>({
    uri: `/formasPagamento`,
  });

  const { data: recebimento, mutate } = useSupabase<RecebimentoData>({
    uri: `/recebimento?ordem_servico_id=eq.${osId}`,
  });

  const { data: servicoToOrdemServico } = useSupabase<ServicoToOrdemServico>({
    uri: `/servicoToOrdemServico?ordem_servico_id=eq.${osId}`,
    select: `
        servicos (
          valor
        )
      `,
  });

  const totalValues = servicoToOrdemServico?.map(({ servicos }) =>
    Number(servicos?.valor)
  );

  const currentValues = recebimento?.map(({ valor_pago }) => valor_pago);

  const getTotalAmount = useCallback(() => {
    const paidValue = currentValues?.reduce((prev, valor) => prev + valor, 0);
    const previousTotal = totalValues?.reduce((prev, valor) => prev + valor, 0);

    const currentTotal = Number(previousTotal) - Number(paidValue);

    const total = !isNaN(currentTotal)
      ? currentTotal.toFixed(2).replace(".", ",")
      : "0,00";

    setPaymentPaid(currentTotal === 0);
    setTotalAmount(total);
  }, [currentValues, totalValues, recebimento]);

  useEffect(() => {
    getTotalAmount();
  }, [getTotalAmount, recebimento, servicoToOrdemServico]);

  const savePayment = async (form: RecebimentoData) => {
    const { error } = await insertRecebimento({
      forma_pagamento: form.forma_pagamento as string,
      valor_pago: form.valor_pago as number,
      ordem_servico_id: Number(osId),
    });

    if (!error) {
      mutate(recebimento as RecebimentoData[]);
      return onSubmit();
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

  const tableHeaders = (
    <tr>
      <th>Data Pagamento</th>
      <th>Forma de Pagamento</th>
      <th>Valor Recebido</th>
      <th></th>
    </tr>
  );

  const tableRows = recebimento?.map((item, index) => (
    <tr key={index}>
      <td>{item.data_pagamento}</td>
      <td>{item.forma_pagamento}</td>
      <td>{`R$ ${item?.valor_pago.toFixed(2).replace(".", ",")}`}</td>

      <td>
        <UnstyledButton
          onClick={() =>
            deleteRecebimento(String(item.id)).then(() => mutate(recebimento))
          }
        >
          <IconTrash />
        </UnstyledButton>
      </td>
    </tr>
  ));

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit(savePayment)}>
          <Title order={4}>{title}</Title>
          <Divider mt={20} />
          <Group mt={4} mr={10} position="center">
            <Text size={30}>Valor Total</Text>
          </Group>
          <Group mt={4} position="center">
            <Paper shadow="xl" p="md" mr={10} withBorder radius="lg">
              <Text size={30}>{`R$ ${totalAmount}`}</Text>
            </Paper>
            {paymentPaid && <Text>Pagemento Quitado</Text>}
          </Group>
          <Divider mt="xl" />

          <Group grow>
            <Select
              disabled={paymentPaid as boolean}
              data={
                paymentMethods
                  ? paymentMethods?.map((item) => ({
                      label: item.name,
                      value: item.name,
                    }))
                  : []
              }
              label="Forma de Pagamentos"
              mt="md"
              required={!paymentPaid as boolean}
              onChange={(value) => setValue("forma_pagamento", value as string)}
            />

            <InputBase
              mt="md"
              label="Valor"
              component={() => (
                <NumericFormat
                  disabled={paymentPaid as boolean}
                  style={{
                    backgroundColor: "#25262b",
                    borderRadius: "4px",
                    padding: "1px  12px",
                    color: "#c1c2c5",
                    fontSize: "14px",
                    lineHeight: "34px",
                    textAlign: "left",
                    width: "100%",
                  }}
                  allowLeadingZeros
                  decimalSeparator=","
                  thousandSeparator="."
                  decimalScale={2}
                  prefix="R$ "
                  onValueChange={(values) => {
                    setValue("valor_pago", Number(values.floatValue));
                  }}
                  required={!paymentPaid as boolean}
                />
              )}
              required={!paymentPaid as boolean}
            />
          </Group>

          <Group mt={30}>
            <Table highlightOnHover mb={50} mx={"auto"}>
              <thead>{tableHeaders}</thead>
              <tbody>{tableRows}</tbody>
            </Table>
          </Group>

          <Button.Group mt="lg">
            <div>
              <Button type={"submit"} mt="md">
                Adicionar Pagamento
              </Button>
            </div>
            <Button
              mt="md"
              ml="sm"
              color="gray"
              onClick={() => navigate("/os")}
            >
              Concluido
            </Button>
          </Button.Group>
        </form>
      </Box>
    </Container>
  );
};

export default PaymentService;
