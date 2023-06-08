import { PaymentMethodData } from "./Types/suiteOS";
import { supabase } from "./supabase/supabaseClient";

export const paymentMethodsUpsert = async (
  paymentMethod: PaymentMethodData,
  paymentMethodsid: number
) => {
  const responseUpsert = await supabase
    .from("PaymentMethods")
    .upsert({
      id: paymentMethodsid ? paymentMethodsid : undefined,
      name: paymentMethod.name,
    })
    .select();

  return responseUpsert;
};

export const deletePaymentMethods = async (id: string) => {
  const responseDelete = supabase.from("PaymentMethods").delete().eq("id", id);

  return responseDelete;
};
