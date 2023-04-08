import { useForm } from "react-hook-form";
import { useOutletContext, useParams } from "react-router-dom";
import { Box, Button, Container, TextInput } from "@mantine/core";
import { StatusFormData } from "../../../services/Types";
import useFormActions from "../../../hooks/useFormActions";

import { insertStatus, updateStatus } from "../../../services/Status";
import { KeyedMutator } from "swr";

const StatussForm = () => {
  const { StatusId } = useParams();
  const context = useOutletContext<{
    status: StatusFormData[];
    mutateStatus: KeyedMutator<StatusFormData>;
  }>();

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { handleSubmit, register } = useForm<StatusFormData>({
    defaultValues: context ? context?.status[0] : {},
  });

  const onSubmit = async (form: StatusFormData) => {
    try {
      if (StatusId) {
        await updateStatus(form, StatusId).then(context.mutateStatus as any);
      } else {
        await insertStatus(form);
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

export default StatussForm;
