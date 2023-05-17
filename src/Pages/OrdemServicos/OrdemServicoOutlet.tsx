import { Outlet, useParams } from "react-router-dom";
import { useSupabase } from "../../hooks/useSupabase";
import { OrdemServicoType } from "../../services/Types/suiteOS";
import Loading from "../../Components/Layout/Loader";

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
     clientes (
      name,
      id
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
          ordemServico,
        }}
      />
    );
  }

  return null;
};

export default OrdemServicosOutlet;
