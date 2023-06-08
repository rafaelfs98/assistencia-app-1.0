import { Outlet, useParams } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import { ServicosData } from "../../../services/Types/suiteOS";

const PaymentMethodOutlet = () => {
  const { paymentmethodId } = useParams<{ paymentmethodId: string }>();

  const { data: paymentMethod, mutate: mutatePaymentMethod } =
    useSupabase<ServicosData>({
      uri: `/PaymentMethods?id=eq.${paymentmethodId}`,
    });

  if (paymentMethod) {
    return (
      <Outlet
        context={{
          paymentMethod,
          mutatePaymentMethod,
        }}
      />
    );
  }

  return null;
};

export default PaymentMethodOutlet;
