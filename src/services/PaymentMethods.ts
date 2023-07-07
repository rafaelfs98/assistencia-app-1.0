import { PaymentMethodData } from "./Types/suiteOS";
import { supabase } from "./supabase/supabaseClient";

export const paymentMethodsUpsert = async (
  paymentMethod: PaymentMethodData,
  paymentMethodsid: number
) => {
  const { data, error } = await supabase
    .from("PaymentMethods")
    .upsert({
      id: paymentMethodsid ? paymentMethodsid : undefined,
      name: paymentMethod.name,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as PaymentMethodData[];
};

export const deletePaymentMethods = async (id: string) => {
  const responseDelete = supabase.from("PaymentMethods").delete().eq("id", id);

  return responseDelete;
};
