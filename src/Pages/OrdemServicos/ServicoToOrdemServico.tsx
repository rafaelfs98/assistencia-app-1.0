import { useNavigate } from "react-router-dom";
import useFormActions from "../../hooks/useFormActions";
import {
  ServicoToOrdemServico,
  ServicosData,
} from "../../services/Types/suiteOS";
import { useForm } from "react-hook-form";
import {
  deleteServicoToOrdemServicos,
  insertServicoToOrdemServico,
} from "../../services/ServicoToOrdemServico";
import { useSupabase } from "../../hooks/useSupabase";
import {
  Container,
  Box,
  Group,
  Select,
  UnstyledButton,
  Button,
  Table,
  Text,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import Loading from "../../Components/Layout/Loader";
import { useState } from "react";
import { KeyedMutator } from "swr";

type Servicos = {
  data: ServicoToOrdemServico[];
  isLoading: boolean;
  mutate: KeyedMutator<ServicoToOrdemServico[]>;
};

const ServicoToOrdemServicoForm = () => {
  const navigate = useNavigate();
  const [servicoId, setServicoId] = useState<Number>();

  const {
    form: { onError, onSubmit },
  } = useFormActions();

  const {
    data: ordeServicoXServico,
    isLoading,
    mutate,
  } = useSupabase<ServicoToOrdemServico>({
    uri: `/servicoToOrdemServico`,
    select: `
        id,
        servicos (
          name,
          valor
        )
      `,
  });

  const salvarServico = async () => {
    const { data, error } = await insertServicoToOrdemServico({
      ordem_servico_id: 1,
      servico_id: Number(servicoId),
    });

    if (!error) {
      mutate(data as ServicoToOrdemServico[]);
      return onSubmit();
    }

    return onError(error.message);
  };

  const { data: servicos } = useSupabase<ServicosData>({
    uri: `/servicos`,
  });

  return (
    <Container>
      <Box>
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
            onChange={(value) => setServicoId(Number(value))}
            required
            searchable
          />
          <Button onClick={() => salvarServico()} compact mt="40px">
            +
          </Button>
        </Group>

        <Group mt={25}>
          <ServicosTable
            data={ordeServicoXServico ? ordeServicoXServico : []}
            isLoading={isLoading}
            mutate={mutate}
          />
        </Group>
      </Box>
    </Container>
  );
};
export default ServicoToOrdemServicoForm;

const ServicosTable: React.FC<Servicos> = ({ data, isLoading, mutate }) => {
  const ths = (
    <tr>
      <th>Sevico</th>
      <th>Valor</th>
      <th></th>
    </tr>
  );

  const rows = data?.map((item, index) => (
    <tr key={index}>
      <td>{item?.servicos?.name}</td>
      <td>{item?.servicos?.valor}</td>

      <td>
        <UnstyledButton
          onClick={() =>
            deleteServicoToOrdemServicos(String(item.id)).then(() =>
              mutate(data)
            )
          }
        >
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
