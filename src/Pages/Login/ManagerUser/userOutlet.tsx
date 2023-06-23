import { Outlet, useParams } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import { UserInfo } from "../../../services/Types/suiteOS";

const UserOutlet = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data: user, mutate: mutateUser } = useSupabase<UserInfo>({
    uri: `/Users?id=eq.${userId}`,
  });

  if (user) {
    return (
      <Outlet
        context={{
          user,

          mutateUser,
        }}
      />
    );
  }

  return null;
};

export default UserOutlet;
