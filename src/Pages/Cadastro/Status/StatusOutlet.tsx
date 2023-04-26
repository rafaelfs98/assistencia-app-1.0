import { Outlet, useParams } from "react-router-dom";
import { StatusFormData } from "../../../services/Types";
import { useSupabase } from "../../../hooks/useSupabase";
import { useEffect } from "react";

const StatussOutlet = () => {
  const { statusId } = useParams<{ statusId: string }>();

  const { data: status, mutate: mutateStatus } = useSupabase<StatusFormData>({
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
