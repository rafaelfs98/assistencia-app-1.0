import { Outlet, useParams } from "react-router-dom";
import { StatusData } from "../../../services/Types/suiteOS";
import { useSupabase } from "../../../hooks/useSupabase";
import { useEffect } from "react";

const StatussOutlet = () => {
  const { statusId } = useParams<{ statusId: string }>();

  const { data: status, mutate: mutateStatus } = useSupabase<StatusData>({
    uri: `/status?id=eq.${statusId}`,
  });

  if (status) {
    return (
      <Outlet
        context={{
          status,
          mutateStatus,
        }}
      />
    );
  }

  return null;
};

export default StatussOutlet;
