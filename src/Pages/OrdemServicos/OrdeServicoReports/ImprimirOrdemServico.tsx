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

import { jsPDF } from "jspdf";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import {
  OrdemServicoType,
  RecebimentoData,
  ServicoToOrdemServico,
} from "../../../services/Types/suiteOS";
import html2canvas from "html2canvas";

type State = {
  type: "print" | "dawload";
};

const PrintOrderServico = () => {
  const { osId } = useParams();

  const { data: ordemServico } = useSupabase<OrdemServicoType>({
    uri: `/ordem_servico?documento=eq.${osId}`,
    select: `
    documento,
    status,
    data_entrada,
    data_saida,   
    defeito,
    observacao,
    acessorios,
    equipamento_id,
    equipamentos (
      id,
      modelo,
      cor,
      marca,
      serie,
     clientes (
      name,
      bairro,
      cep,
      cidade,
      complemento,
      email,
      id,
      logradouro,
      name,
      numero,
      telefone
     )
    )
  `,
  });
  const { data: ordemServicoXServico, mutate } =
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
  const { data: recebimento } = useSupabase<RecebimentoData>({
    uri: `/recebimento?ordem_servico_id=eq.${osId}`,
  });

  const handleArquive = async (type: "print" | "dawload") => {
    const content = document.getElementById("content");

    const canvas = await html2canvas(content as HTMLElement);
    const imgData = canvas.toDataURL("image/png");

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;

    doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    position -= pageHeight;

    while (position > -canvas.height) {
      doc.addPage();
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      position -= pageHeight;

      doc.deletePage(2);
      doc.deletePage(3);
      doc.deletePage(4);
    }

    if (type === "print") {
      return window.open(doc.output("bloburl"));
    }

    doc.save(`OS # ${osId}`);
  };

  const tableHeaders = (
    <tr>
      <th className="print-order-servico__table-header">Servico</th>
      <th className="print-order-servico__table-header">Valor</th>
    </tr>
  );

  const tableRows = ordemServicoXServico?.map((item, index) => (
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

  const tableRowsRecebimento = recebimento?.map((item, index) => (
    <tr key={index}>
      <td>{item.data_pagamento}</td>
      <td>{item.forma_pagamento}</td>
      <td>{`R$ ${item?.valor_pago.toFixed(2).replace(".", ",")}`}</td>
    </tr>
  ));

  return (
    <>
      <Group mt={50} mb={50} spacing="xl" position="right">
        <Button variant="gradient" onClick={() => handleArquive("dawload")}>
          Gerar PDF
        </Button>
        <Button variant="white" onClick={() => handleArquive("print")}>
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
            <Image width={200} height={80} fit="contain" src="./SuiteOS.png" />
            <Title
              className="print-order-servico__title"
              order={2}
            >{`Ordem de Servico # ${osId}`}</Title>
            {ordemServico && (
              <Stack align="flex-end">
                <Text className="print-order-servico__date">{`Entrada : ${ordemServico[0]?.data_entrada}`}</Text>
                <Text className="print-order-servico__date">{`Saida : ${
                  ordemServico[0]?.data_saida ||
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

              {ordemServico?.map(({ equipamentos }, index) => {
                return (
                  <>
                    <Text className="print-order-servico__text">{`Nome : ${equipamentos?.clientes?.name}`}</Text>
                    <Text className="print-order-servico__text">{`Cep : ${equipamentos?.clientes?.cep}`}</Text>
                    <Text className="print-order-servico__text">{`Rua : ${equipamentos?.clientes?.logradouro},${equipamentos?.clientes?.numero}`}</Text>
                    <Text className="print-order-servico__text">{`Bairo/Cidade :  ${equipamentos?.clientes?.bairro},${equipamentos?.clientes?.cidade}`}</Text>
                    <Text className="print-order-servico__text">
                      {`Telefone : ${equipamentos?.clientes?.telefone}`}
                    </Text>
                  </>
                );
              })}
            </Grid.Col>
            <Grid.Col className="print-order-servico__col" span={4}>
              <Title className="print-order-servico__subtitle" order={4}>
                Dados do Equipamento
              </Title>
              {ordemServico && (
                <>
                  <Text className="print-order-servico__text">{`Numero de Serie/IMEI : ${ordemServico[0].equipamentos?.serie}`}</Text>
                  <Text className="print-order-servico__text">{`Modelo : ${ordemServico[0].equipamentos?.modelo}`}</Text>
                  <Text className="print-order-servico__text">{`Marca : ${ordemServico[0].equipamentos?.marca}`}</Text>
                  <Text className="print-order-servico__text">{`Cor :  ${ordemServico[0].equipamentos?.cor}`}</Text>
                  <Text className="print-order-servico__text">{` Defeito: ${
                    ordemServico[0]?.defeito || "Ainda não foi constatado"
                  }`}</Text>
                  <Text className="print-order-servico__text">{`Obs :  ${
                    ordemServico[0].observacao || ""
                  }`}</Text>
                  <Text className="print-order-servico__text">{`Acessorios :  ${
                    ordemServico[0].acessorios || ""
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
