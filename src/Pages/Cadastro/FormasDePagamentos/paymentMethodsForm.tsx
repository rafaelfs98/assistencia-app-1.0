import { Box, Button, Container, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext, useParams } from "react-router-dom";
import { KeyedMutator } from "swr";
import useFormActions from "../../../hooks/useFormActions";
import { paymentMethodsUpsert } from "../../../services/PaymentMethods";
import { PaymentMethodData } from "../../../services/Types/suiteOS";

const PaymentMethodForm = () => {
  const { paymentmethodId } = useParams();

  const [title, setTitle] = useState<String>("Adicionar Forma de Pagamneto");

  const context = useOutletContext<{
    paymentMethod: PaymentMethodData[];
    mutatePaymentMethod: KeyedMutator<PaymentMethodData[]>;
  }>();

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { handleSubmit, register } = useForm<PaymentMethodData>({
    defaultValues: context ? context?.paymentMethod[0] : {},
  });

  const onSubmit = async (form: PaymentMethodData) => {
    try {
      const response = await paymentMethodsUpsert(
        form,
        Number(paymentmethodId)
      );

      context?.mutatePaymentMethod(response as PaymentMethodData[]);
      return onSave();
    } catch (error) {
      return onError(error);
    }
  };

  useEffect(() => {
    if (context?.paymentMethod) {
      document.title = `${context?.paymentMethod?.map((item) => item.name)}`;
      setTitle("Editar Forma de Pagamento");
    }
  }, []);

  return (
    <Container>
      <Box>
        <Title order={4}>{title}</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            mt="md"
            required
            label="Forma de Pagemento"
            {...register("name")}
          />
          <Button.Group mt="lg">
            <div>
              <Button type="submit" mt="md">
                Submit
              </Button>
            </div>
            <Button mt="md" ml="sm" color="gray" onClick={onClose}>
              Close
            </Button>
          </Button.Group>
        </form>
      </Box>
    </Container>
  );
};
export default PaymentMethodForm;
