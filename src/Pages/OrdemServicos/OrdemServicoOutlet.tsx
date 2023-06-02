import { Outlet, useParams } from "react-router-dom";
import Loading from "../../Components/Layout/Loader";
import { useSupabase } from "../../hooks/useSupabase";
import {
  OrdemServicoType,
  RecebimentoData,
  ServicoToOrdemServico,
} from "../../services/Types/suiteOS";

const OrdemServicosOutlet = () => {
  const { osId } = useParams<{ osId: string }>();

  const { data: ordemServico, isLoading } = useSupabase<OrdemServicoType>({
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

  const { data: ordemServicoXServico } = useSupabase<ServicoToOrdemServico>({
    uri: `/servicoToOrdemServico?ordem_servico_id=eq.${osId}`,
    select: `
        id,
        servicos (
          name,
          valor
        )
      `,
  });
  const { data: recebimentoToOrdemServico } = useSupabase<RecebimentoData>({
    uri: `/recebimento?ordem_servico_id=eq.${osId}`,
  });

  console.table(ordemServico);

  if (isLoading) {
    return <Loading />;
  }

  if (ordemServico) {
    return (
      <Outlet
        context={{
          ordemServico,
          ordemServicoXServico,
          recebimentoToOrdemServico,
        }}
      />
    );
  }

  return null;
};

export default OrdemServicosOutlet;
