import { useForm } from "react-hook-form";
import { useOutletContext, useParams } from "react-router-dom";
import { Box, Button, Container, TextInput, Title } from "@mantine/core";
import { StatusData } from "../../../services/Types";
import useFormActions from "../../../hooks/useFormActions";

import { insertStatus, updateStatus } from "../../../services/Status";
import { KeyedMutator } from "swr";
import { useEffect, useState } from "react";

const StatussForm = () => {
  const { StatusId } = useParams();
  const [title, setTitle] = useState<String>("Adicionar Status");
  const context = useOutletContext<{
    status: StatusData[];
    mutateStatus: KeyedMutator<StatusData>;
  }>();

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { handleSubmit, register } = useForm<StatusData>({
    defaultValues: context ? context?.status[0] : {},
  });

  const onSubmit = async (form: StatusData) => {
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

  useEffect(() => {
    if (context.status) {
      document.title = `${context.status?.map((item) => item.name)}`;
      setTitle("Editar Status");
    }
  }, []);

  return (
    <Container>
      <Box>
        <Title order={4}>{title}</Title>
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
