import {
  Button,
  Code,
  Group,
  Menu,
  Table,
  UnstyledButton,
} from "@mantine/core";

import { IconDotsVertical, IconPlus, IconTrademark } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../services/supabase/supabaseClient";
import { ClientesFormData } from "../../services/Types";
import ClientesActions from "./ClientesActions";

const Clientes: React.FC = () => {
  const navigate = useNavigate();

  const [itemList, setItemList] = useState<ClientesFormData[]>();

  useEffect(() => {
    supabase
      .from("clientes")
      .select()
      .then((response) => setItemList(response?.data as any));
  }, [itemList]);

  const ths = (
    <tr>
      <th>name.</th>
      <th>telefone.</th>
      <th>email.</th>
      <th>endereco.</th>
      <th></th>
    </tr>
  );

  const rows = itemList?.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.telefone}</td>
      <td>{item.email}</td>
      <td>
        {item.cep +
          "," +
          item.logradouro +
          "," +
          item.numero +
          "," +
          item.cidade +
          "," +
          item.bairro}
      </td>

      <td>
        <ClientesActions />
      </td>
    </tr>
  ));

  return (
    <>
      <Group position="right" mb="xl" mr="lg">
        <Button onClick={() => navigate("create")}>
          <IconPlus size="1rem" />
        </Button>
      </Group>

      <Table highlightOnHover mx={"auto"}>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default Clientes;
