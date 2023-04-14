/// <reference types="react-imask" />

import { useLocation, useOutletContext, useParams } from "react-router-dom";
import useFormActions from "../../../hooks/useFormActions";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import {
  Box,
  Button,
  Container,
  Group,
  InputBase,
  TextInput,
} from "@mantine/core";
import { ServicosFormData } from "../../../services/Types";
import { KeyedMutator } from "swr";
import IMask from "imask";

interface BlocksConfig {
  num: {
    mask: NumberConstructor;
    scale: number;
    thousandsSeparator: string;
    radix: string;
  };
}

const ServicosForm = () => {
  const { servicoId } = useParams();
  const { pathname } = useLocation();
  const viewTrue = pathname.includes("view");
  const context = useOutletContext<{
    servicos: ServicosFormData[];
    mutateCliente: KeyedMutator<ServicosFormData>;
  }>();

  const options = {
    blocks: {
      num: {
        mask: Number,
        scale: 2,
        thousandsSeparator: ".",
        radix: ",",
      },
    },
    radix: ",",
    unmask: true,
    normalizeZeros: true,
  };

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ServicosFormData>({
    defaultValues: context ? context?.servicos[0] : {},
  });

  const onSubmit = async (form: ServicosFormData) => {
    console.log(form);
    // try {
    //   if (servicoId) {
    //     await updateServicos(form, servicoId);
    //   } else {
    //     await insertServicos(form);
    //   }
    //   onSave();
    // } catch (error) {
    //   onError(error);
    // }
  };

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput mt="md" required label="Nome" {...register("name")} />
          <Group spacing="xl" grow>
            <InputBase label="Preço" component={IMaskInput} />
          </Group>

          <Button.Group mt="lg">
            <div>
              <Button type="submit" mt="md" disabled={viewTrue}>
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
export default ServicosForm;
