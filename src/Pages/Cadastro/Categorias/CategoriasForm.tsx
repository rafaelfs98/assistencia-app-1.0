import { useForm } from "react-hook-form";
import { useOutletContext, useParams } from "react-router-dom";
import { Box, Button, Container, TextInput } from "@mantine/core";
import { CategoriasFormData, ClientesFormData } from "../../../services/Types";
import useFormActions from "../../../hooks/useFormActions";

import { insertCategoria, updateCategoria } from "../../../services/Categorias";
import { KeyedMutator } from "swr";

const CategoriasForm = () => {
  const { categoriaId } = useParams();
  const context = useOutletContext<{
    categoria: ClientesFormData[];
    mutateCategoria: KeyedMutator<CategoriasFormData>;
  }>();

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { handleSubmit, register } = useForm<ClientesFormData>({
    defaultValues: context ? context?.categoria[0] : {},
  });

  const onSubmit = async (form: ClientesFormData) => {
    try {
      if (categoriaId) {
        await updateCategoria(form, categoriaId).then(
          context.mutateCategoria as any
        );
      } else {
        await insertCategoria(form);
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

export default CategoriasForm;
