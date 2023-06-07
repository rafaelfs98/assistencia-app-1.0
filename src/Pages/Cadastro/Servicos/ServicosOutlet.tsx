import { Outlet, useParams } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import { ServicosData } from "../../../services/Types/suiteOS";

const ServicosOutlet = () => {
  const { servicoId } = useParams<{ servicoId: string }>();

  const { data: servicos, mutate: mutateServicos } = useSupabase<ServicosData>({
    uri: `/Service?id=eq.${servicoId}`,
  });

  if (servicos) {
    return (
      <Outlet
        context={{
          servicos,
          mutateServicos,
        }}
      />
    );
  }

  return null;
};

export default ServicosOutlet;
