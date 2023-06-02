import {
  Button,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {
  OrdemServicoType,
  RecebimentoData,
  ServicoToOrdemServico,
} from "../../../services/Types/suiteOS";

const PrintOrderServico = () => {
  const { osId } = useParams();

  const context = useOutletContext<{
    ordemServico: OrdemServicoType[];
    ordemServicoXServico: ServicoToOrdemServico[];
    recebimentoToOrdemServico: RecebimentoData[];
  }>();

  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => document.getElementById("content"),
    documentTitle: `OS #${osId}`,
    onAfterPrint: () => navigate(-1),
  });

  const tableHeaders = (
    <tr>
      <th className="print-order-servico__table-header">Servico</th>
      <th className="print-order-servico__table-header">Valor</th>
    </tr>
  );

  const tableRows = context?.ordemServicoXServico?.map((item, index) => (
    <tr key={index}>
      <td>{item?.servicos?.name}</td>
      <td>{`R$ ${item?.servicos?.valor.toFixed(2).replace(".", ",")}`}</td>
    </tr>
  ));

  const tableHeadersRecebimento = (
    <tr>
      <th className="print-order-servico__table-header">Data Pagamento</th>
      <th className="print-order-servico__table-header">Forma de Pagamento</th>
      <th className="print-order-servico__table-header">Valor Recebido</th>
      <th></th>
    </tr>
  );

  const tableRowsRecebimento = context?.recebimentoToOrdemServico?.map(
    (item, index) => (
      <tr key={index}>
        <td>{item.data_pagamento}</td>
        <td>{item.forma_pagamento}</td>
        <td>{`R$ ${item?.valor_pago.toFixed(2).replace(".", ",")}`}</td>
      </tr>
    )
  );

  return (
    <>
      <Group mt={10} mb={50} spacing="xl" position="right">
        <Button variant="gradient" onClick={() => handlePrint()}>
          Imprimir
        </Button>
      </Group>
      <div id="content" className="print-order-servico__content">
        <Paper
          className="print-order-servico__paper"
          radius="md"
          p="md"
          withBorder
        >
          <Group className="print-order-servico__group" grow>
            <Image fit="contain" src="./SuiteOS.png" />
            <Title
              className="print-order-servico__title"
              order={3}
            >{`Ordem de Servico # ${osId}`}</Title>
            {context.ordemServico && (
              <Stack align="flex-end">
                <Text className="print-order-servico__date">{`Entrada : ${context.ordemServico[0]?.data_entrada}`}</Text>
                <Text className="print-order-servico__date">{`Saida : ${
                  context.ordemServico[0]?.data_saida ||
                  "Aparelho ainda aguarda retirada"
                }`}</Text>
              </Stack>
            )}
          </Group>
        </Paper>
        <Paper
          className="print-order-servico__paper"
          radius="md"
          p="md"
          withBorder
        >
          <Grid justify="center" className="print-order-servico__grid" grow>
            <Grid.Col className="print-order-servico__col" span={4}>
              <Title className="print-order-servico__subtitle" order={4}>
                Dados do Cliente
              </Title>
              {context.ordemServico && (
                <>
                  <Text className="print-order-servico__text">{`Nome : ${context.ordemServico[0].equipamentos?.clientes?.name}`}</Text>
                  <Text className="print-order-servico__text">{`Cep : ${context.ordemServico[0].equipamentos?.clientes?.cep}`}</Text>
                  <Text className="print-order-servico__text">{`Rua : ${context.ordemServico[0].equipamentos?.clientes?.logradouro},${context.ordemServico[0].equipamentos?.clientes?.numero}`}</Text>
                  <Text className="print-order-servico__text">{`Bairo/Cidade :  ${context.ordemServico[0].equipamentos?.clientes?.bairro},${context.ordemServico[0].equipamentos?.clientes?.cidade}`}</Text>
                  <Text className="print-order-servico__text">
                    {`Telefone : ${context.ordemServico[0].equipamentos?.clientes?.telefone}`}
                  </Text>
                </>
              )}
            </Grid.Col>
            <Grid.Col className="print-order-servico__col" span={4}>
              <Title className="print-order-servico__subtitle" order={4}>
                Dados do Equipamento
              </Title>
              {context.ordemServico && (
                <>
                  <Text className="print-order-servico__text">{`Numero de Serie/IMEI : ${context.ordemServico[0].equipamentos?.serie}`}</Text>
                  <Text className="print-order-servico__text">{`Modelo : ${context.ordemServico[0].equipamentos?.modelo}`}</Text>
                  <Text className="print-order-servico__text">{`Marca : ${context.ordemServico[0].equipamentos?.marca}`}</Text>
                  <Text className="print-order-servico__text">{`Cor :  ${context.ordemServico[0].equipamentos?.cor}`}</Text>
                  <Text className="print-order-servico__text">{` Defeito: ${
                    context.ordemServico[0]?.defeito ||
                    "Ainda não foi constatado"
                  }`}</Text>
                  <Text className="print-order-servico__text">{`Obs :  ${
                    context.ordemServico[0].observacao || ""
                  }`}</Text>
                  <Text className="print-order-servico__text">{`Acessorios :  ${
                    context.ordemServico[0].acessorios || ""
                  }`}</Text>
                </>
              )}
            </Grid.Col>
          </Grid>
        </Paper>
        <Paper
          className="print-order-servico__paper"
          radius="md"
          p="md"
          withBorder
        >
          <Title className="print-order-servico__subtitle" order={4}>
            Servicos
          </Title>
          <Group className="print-order-servico__group">
            <table className="print-order-servico__table">
              <thead>{tableHeaders}</thead>
              <tbody>{tableRows}</tbody>
            </table>
          </Group>
          <Divider className="print-order-servico__divider" />
          <Title className="print-order-servico__subtitle" order={4}>
            Informacoes de Pagamento
          </Title>
          <Group className="print-order-servico__group">
            <table className="print-order-servico__table">
              <thead>{tableHeadersRecebimento}</thead>
              <tbody>{tableRowsRecebimento}</tbody>
            </table>
          </Group>
        </Paper>
        <Paper
          className="print-order-servico__paper"
          radius="md"
          p="md"
          withBorder
        >
          <Group className="print-order-servico__group" grow>
            <Text className="print-order-servico__signature">
              {"Cliente:                         "}
            </Text>
            <Text className="print-order-servico__signature">
              {"Empresa:                         "}
            </Text>
          </Group>
        </Paper>
      </div>
    </>
  );
};

export default PrintOrderServico;
