import { Outlet, useParams } from "react-router-dom";
import Loading from "../../Components/Loader";
import { useSupabase } from "../../hooks/useSupabase";
import {
  OrdemServicoType,
  RecebimentoData,
  ServicoToOrdemServico,
} from "../../services/Types/suiteOS";

const OrdemServicosOutlet = () => {
  const { osId } = useParams<{ osId: string }>();

  const { data: ordemServico, isLoading } = useSupabase<OrdemServicoType>({
    uri: `/ServiceOrder?documento=eq.${osId}`,
    select: `
    documento,
    status,
    data_entrada,
    data_saida,   
    defeito,
    observacao,
    acessorios,
    solucao,
    equipamento_id,
    Equipment (
      id,
      modelo,
      cor,
      marca,
      serie,
     Client (
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
    uri: `/ServiceToServiceOrder?ordem_servico_id=eq.${osId}`,
    select: `
        id,
        Service (
          name,
          valor
        )
      `,
  });
  const { data: recebimentoToOrdemServico } = useSupabase<RecebimentoData>({
    uri: `/PaymentReceived?ordem_servico_id=eq.${osId}`,
  });

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
