import { useLocation, useOutletContext, useParams } from "react-router-dom";
import useFormActions from "../../../hooks/useFormActions";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { InputBase, Title, TextInput } from "@mantine/core";
import IMask from "imask";

import { Box, Button, Container, Group } from "@mantine/core";
import { ServicosFormData } from "../../../services/Types";
import { KeyedMutator } from "swr";
import { insertServicos, updateServicos } from "../../../services/Servicos";
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";

const ServicosForm = () => {
  const { servicoId } = useParams();
  const { pathname } = useLocation();
  const [title, setTitle] = useState<String>("Adicionar Servicos");
  const viewTrue = pathname.includes("view");
  const context = useOutletContext<{
    servicos: ServicosFormData[];
    mutateCliente: KeyedMutator<ServicosFormData>;
  }>();

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

  useEffect(() => {
    if (context?.servicos) {
      document.title = `${context?.servicos?.map((item) => item.name)}`;
      setTitle("Editar Servico");
    }
  }, []);

  return (
    <Container>
      <Box>
        <Title order={4}>{title}</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput mt="md" required label="Nome" {...register("name")} />
          <Group grow>
            <InputBase
              mt="lg"
              label="Valor"
              component={() => (
                <NumericFormat
                  style={{
                    backgroundColor: "#25262b",
                    borderRadius: "4px",
                    padding: "1px  12px",
                    color: "#c1c2c5",
                    fontSize: "14px",
                    lineHeight: "34px",
                    textAlign: "left",
                    width: "50%",
                  }}
                  value={context?.servicos[0]?.valor}
                  allowLeadingZeros
                  decimalSeparator=","
                  thousandSeparator="."
                  decimalScale={2}
                  prefix="R$ "
                  onValueChange={(values) => {
                    setValue("valor", values.formattedValue);
                  }}
                />
              )}
              required
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
