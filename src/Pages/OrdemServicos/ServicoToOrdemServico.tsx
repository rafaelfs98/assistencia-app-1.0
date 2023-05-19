import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  Select,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormActions from "../../hooks/useFormActions";
import { useSupabase } from "../../hooks/useSupabase";
import {
  deleteServicoToOrdemServicos,
  insertServicoToOrdemServico,
} from "../../services/ServicoToOrdemServico";
import {
  ServicoToOrdemServico,
  ServicosData,
} from "../../services/Types/suiteOS";

type ServicoToOrdemServicoProps = {
  ordem_servico_id: number;
};

const ServicoToOrdemServicoForm: React.FC<ServicoToOrdemServicoProps> = ({
  ordem_servico_id,
}) => {
  const navigate = useNavigate();
  const [selectedServicoId, setSelectedServicoId] = useState<number>();
  const [totalServico, setTotalServico] = useState<string>();

  const {
    form: { onError, onSubmit },
  } = useFormActions();

  const { data: ordemServicoXServico, mutate } =
    useSupabase<ServicoToOrdemServico>({
      uri: `/servicoToOrdemServico?ordem_servico_id=eq.${ordem_servico_id}`,
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
      ordem_servico_id,
      servico_id: Number(selectedServicoId),
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

  const tableHeaders = (
    <tr>
      <th>Servico</th>
      <th>Valor</th>
      <th></th>
    </tr>
  );

  const tableRows = ordemServicoXServico?.map((item, index) => (
    <tr key={index}>
      <td>{item?.servicos?.name}</td>
      <td>{`R$ ${item?.servicos?.valor.toFixed(2).replace(".", ",")}`}</td>
      <td>
        <UnstyledButton
          onClick={() =>
            deleteServicoToOrdemServicos(String(item.id)).then(() =>
              mutate(ordemServicoXServico)
            )
          }
        >
          <IconTrash />
        </UnstyledButton>
      </td>
    </tr>
  ));

  const getTotalServicos = useCallback(() => {
    const servicoValues = ordemServicoXServico?.map(({ servicos }) =>
      Number(servicos?.valor)
    );

    const totalServico = servicoValues?.reduce(
      (prev, valor) => prev + valor,
      0
    );

    return isNaN(totalServico as number)
      ? null
      : totalServico?.toFixed(2).replace(".", ",");
  }, [ordemServicoXServico]);

  useEffect(() => {
    const total = getTotalServicos();

    if (total !== null) {
      setTotalServico(total);
    }
  }, [getTotalServicos]);

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
            onChange={(value) => setSelectedServicoId(Number(value))}
            searchable
          />
          <Button onClick={() => salvarServico()} compact mt="40px">
            +
          </Button>
        </Group>

        <Group mt={25}>
          <Table highlightOnHover mb={50} mx={"auto"}>
            <thead>{tableHeaders}</thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </Group>

        <Group mt={4} position="right">
          <Text>Total</Text>
          <Paper shadow="xl" p="md" mr={10} withBorder radius="lg">
            <Text>{`R$ ${totalServico}`}</Text>
          </Paper>
        </Group>
      </Box>
    </Container>
  );
};

export default ServicoToOrdemServicoForm;
