import { PaymentMethodsData } from "./Types/suiteOS";
import { supabase } from "./supabase/supabaseClient";

export const PaymentMethods = async (
  paymentMethods: PaymentMethodsData,
  paymentMethodsid: number
) => {
  const responseUpsert = await supabase
    .from("PaymentMethods")
    .upsert({
      id: paymentMethodsid ? paymentMethodsid : undefined,
      name: paymentMethods.name,
    })
    .select();

  return responseUpsert;
};

export const deletePaymentMethods = async (id: string) => {
  const responseDelete = supabase.from("PaymentMethods").delete().eq("id", id);

  return responseDelete;
};
