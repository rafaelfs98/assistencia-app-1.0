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

  const {
    data: ordemServico,
    isLoading,
    mutate: mutateOrdemServico,
  } = useSupabase<OrdemServicoType>({
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

  if (isLoading) {
    return <Loading />;
  }

  if (ordemServico) {
    return (
      <Outlet
        context={{
          mutateOrdemServico,
          ordemServico,
        }}
      />
    );
  }

  return null;
};

export default OrdemServicosOutlet;
