import { InputBase, MantineProvider, TextInput, Title } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import useFormActions from "../../../hooks/useFormActions";
import { notifications } from "@mantine/notifications";
import { Box, Button, Container, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { KeyedMutator } from "swr";
import { upsertServicos } from "../../../services/Servicos";
import { ServicosData } from "../../../services/Types/suiteOS";
import { Notifications } from "@mantine/notifications";

const ServicosForm = () => {
  const { servicoId } = useParams();
  const { pathname } = useLocation();

  const [title, setTitle] = useState<String>("Adicionar Servicos");
  const viewTrue = pathname.includes("view");
  const context = useOutletContext<{
    servicos: ServicosData[];
    mutateCliente: KeyedMutator<ServicosData>;
  }>();

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { setValue, handleSubmit, register } = useForm<ServicosData>({
    defaultValues: context ? context?.servicos[0] : {},
  });

  const onSubmit = async (form: ServicosData) => {
    const { error } = await upsertServicos(form, Number(servicoId));

    if (!error) {
      return onSave();
    }

    return onError(error.message);
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
