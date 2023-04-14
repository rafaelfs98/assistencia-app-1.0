import { Outlet, useParams } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import { ServicosFormData } from "../../../services/Types";

const ServicosOutlet = () => {
  const { servicoId } = useParams<{ servicoId: string }>();

  const { data: servicos, mutate: mutateStatus } =
    useSupabase<ServicosFormData>({
      uri: `/servicos?id=eq.${servicoId}`,
    });

  if (servicos) {
    return (
      <Outlet
        context={{
          servicos,
          mutateStatus,
        }}
      />
    );
  }

  return null;
};

export default ServicosOutlet;
