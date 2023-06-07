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
    onAfterPrint: () => navigate("/os"),
  });

  const tableHeaders = (
    <tr>
      <th className="print-order-servico__table-header">Servico</th>
      <th className="print-order-servico__table-header">Valor</th>
    </tr>
  );

  const tableRows = context?.ordemServicoXServico?.map((item, index) => (
    <tr key={index}>
      <td>{item?.Service?.name}</td>
      <td>{`R$ ${item?.Service?.valor.toFixed(2).replace(".", ",")}`}</td>
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

  const isVisibleLaudo =
    !!context?.ordemServico[0]?.defeito || !!context?.ordemServico[0]?.solucao;

  return (
    <>
      <Group mt={10} mb={50} spacing="xl" position="right">
        <Button variant="gradient" onClick={() => handlePrint()}>
          Imprimir
        </Button>
        <Button variant="white" onClick={() => navigate("/os")}>
          Cancelar
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
            <Image width={200} height={80} fit="contain" src="./SuiteOS.png" />
            <Title
              className="print-order-servico__title"
              order={3}
            >{`Ordem de Servico # ${osId}`}</Title>
            {context.ordemServico && (
              <Stack align="flex-end">
                <Text className="print-order-servico__date">{`Status : ${context.ordemServico[0]?.status}`}</Text>
                <Text className="print-order-servico__date">{`Entrada : ${context.ordemServico[0]?.data_entrada}`}</Text>
                {context.ordemServico[0]?.data_saida && (
                  <Text className="print-order-servico__date">{`Saida : ${
                    context.ordemServico[0]?.data_saida || " "
                  }`}</Text>
                )}
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
                  <Text className="print-order-servico__text">{`Nome : ${context.ordemServico[0].Equipment?.Client.name}`}</Text>
                  <Text className="print-order-servico__text">{`Cep : ${context.ordemServico[0].Equipment?.Client.cep}`}</Text>
                  <Text className="print-order-servico__text">{`Rua : ${context.ordemServico[0].Equipment?.Client.logradouro},${context.ordemServico[0].Equipment?.Client.numero}`}</Text>
                  <Text className="print-order-servico__text">{`Bairo/Cidade :  ${context.ordemServico[0].Equipment?.Client.bairro},${context.ordemServico[0].Equipment?.Client.cidade}`}</Text>
                  <Text className="print-order-servico__text">
                    {`Telefone : ${context.ordemServico[0].Equipment?.Client.telefone}`}
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
                  <Text className="print-order-servico__text">{`Numero de Serie/IMEI : ${context.ordemServico[0].Equipment?.serie}`}</Text>
                  <Text className="print-order-servico__text">{`Modelo : ${context.ordemServico[0].Equipment?.modelo}`}</Text>
                  <Text className="print-order-servico__text">{`Marca : ${context.ordemServico[0].Equipment?.marca}`}</Text>
                  <Text className="print-order-servico__text">{`Cor :  ${context.ordemServico[0].Equipment?.cor}`}</Text>
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
        {isVisibleLaudo && (
          <Paper
            className="print-order-servico__paper"
            radius="md"
            p="md"
            withBorder
          >
            <Title className="print-order-servico__subtitle" order={4}>
              Laudo Tecnico
            </Title>
            <Grid justify="center" className="print-order-servico__grid" grow>
              <Grid.Col className="print-order-servico__col" span={4}>
                <Title className="print-order-servico__subtitle" order={4}>
                  Defeito
                </Title>
                {context.ordemServico && (
                  <Text className="print-order-servico__text">{`${
                    context.ordemServico[0].defeito || ""
                  }`}</Text>
                )}
              </Grid.Col>
              <Grid.Col className="print-order-servico__col" span={4}>
                <Title className="print-order-servico__subtitle" order={4}>
                  Solucao
                </Title>
                {context.ordemServico && (
                  <Text className="print-order-servico__text">{`${
                    context.ordemServico[0].solucao || ""
                  }`}</Text>
                )}
              </Grid.Col>
            </Grid>
          </Paper>
        )}
        {context?.ordemServicoXServico?.length > 0 && (
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
            {context?.recebimentoToOrdemServico.length > 0 && (
              <>
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
              </>
            )}
          </Paper>
        )}
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
