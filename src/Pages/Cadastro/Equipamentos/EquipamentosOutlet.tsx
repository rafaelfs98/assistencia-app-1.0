import { Outlet, useParams } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import { ServicosData } from "../../../services/Types/suiteOS";

const EquipamentosOutlet = () => {
  const { equipamentoId } = useParams<{ equipamentoId: string }>();

  const { data: equipamentos, mutate: mutateEquipamentos } =
    useSupabase<ServicosData>({
      uri: `/equipamentos?id=eq.${equipamentoId}`,
    });

  if (equipamentos) {
    return (
      <Outlet
        context={{
          equipamentos,
          mutateEquipamentos,
        }}
      />
    );
  }

  return null;
};

export default EquipamentosOutlet;
