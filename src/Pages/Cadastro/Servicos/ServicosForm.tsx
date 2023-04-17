import { useLocation, useOutletContext, useParams } from "react-router-dom";
import useFormActions from "../../../hooks/useFormActions";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { InputBase, TextInput } from "@mantine/core";
import IMask from "imask";

import { Box, Button, Container, Group } from "@mantine/core";
import { ServicosFormData } from "../../../services/Types";
import { KeyedMutator } from "swr";
import { insertServicos, updateServicos } from "../../../services/Servicos";

const ServicosForm = () => {
  const { servicoId } = useParams();
  const { pathname } = useLocation();
  const viewTrue = pathname.includes("view");
  const context = useOutletContext<{
    servicos: ServicosFormData[];
    mutateCliente: KeyedMutator<ServicosFormData>;
  }>();

  const moneyMask = IMask.createMask({
    mask: "R$ num",
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: ".",
        radix: ",",
        scale: 2,
        signed: false,
      },
    },
  });

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { setValue, handleSubmit, register } = useForm<ServicosFormData>({
    defaultValues: context ? context?.servicos[0] : {},
  });

  const onSubmit = async (form: ServicosFormData) => {
    try {
      if (servicoId) {
        await updateServicos(form, servicoId);
      } else {
        await insertServicos(form);
      }
      onSave();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput mt="md" required label="Nome" {...register("name")} />
          <Group spacing="xl" grow>
            <InputBase
              label="Valor"
              component={IMaskInput}
              mask={moneyMask as any}
              onAccept={(value) => setValue("valor", value as string)}
            />
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
