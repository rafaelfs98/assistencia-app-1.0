import {
  Box,
  Button,
  Container,
  Group,
  Select,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Layout/Loader";
import useFormActions from "../../../hooks/useFormActions";
import { useSupabase } from "../../../hooks/useSupabase";
import { insertOrdemServicoXServico } from "../../../services/OrdemServicoXServico";
import {
  OrdemServicoXServico,
  ServicosData,
} from "../../../services/Types/suiteOS";

interface test {
  name: string;
  id?: string;
}

const OrdemServicosXServicos = () => {
  const navigate = useNavigate();
  const { osId } = useParams();

  const {
    form: { onError, onSave, onClose },
  } = useFormActions();

  const { setValue, handleSubmit, register } = useForm<OrdemServicoXServico>({
    defaultValues: {},
  });

  const onSubmit = async (form: OrdemServicoXServico) => {
    console.log("form:", form);

    const { error } = await insertOrdemServicoXServico({
      ...form,
      ordem_servico_id: 1,
    });

    if (!error) {
      return onSave();
    }

    return onError(error.message);
  };

  const { data: servicos } = useSupabase<ServicosData>({
    uri: `/servicos`,
  });

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Group spacing="xs">
            <Select
              data={
                servicos
                  ? servicos?.map((item) => ({
                      label: item.name + " - " + item.valor,
                      value: String(item.id),
                    }))
                  : []
              }
              label="Servico"
              mt="md"
              nothingFound={
                <UnstyledButton onClick={() => navigate("/servico/create")}>
                  <Group>
                    <IconPlus size="1rem" />
                    <Text>Criar Servico</Text>
                  </Group>
                </UnstyledButton>
              }
              onChange={(value) => setValue("servico_id", Number(value))}
              required
              searchable
            />
            <Button type="submit" compact mt="40px">
              +
            </Button>
          </Group>
        </form>

        <Group mt={25}>
          <ServicosTable />
        </Group>
      </Box>
    </Container>
  );
};
export default OrdemServicosXServicos;

const ServicosTable = () => {
  const navigate = useNavigate();

  const { data: ordeServicoXServico, isLoading } =
    useSupabase<OrdemServicoXServico>({
      uri: `/ordemservicoXservico`,
      select: `
      servicos (
        name,
        valor
      )
    `,
    });

  const ths = (
    <tr>
      <th>Sevico</th>
      <th>Valor</th>
      <th></th>
    </tr>
  );

  const rows = ordeServicoXServico?.map((item, index) => (
    <tr key={index}>
      <td>{item?.servicos?.name}</td>
      <td>{item?.servicos?.valor}</td>

      <td>
        <UnstyledButton>
          <IconTrash />
        </UnstyledButton>
      </td>
    </tr>
  ));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Table highlightOnHover mb={50} mx={"auto"}>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};
