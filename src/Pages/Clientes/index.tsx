import { Button, Code, Group, Loader, Table, Text } from "@mantine/core";
import { IconArticle, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../services/supabase/supabaseClient";
import { apiData } from "../../services/Types";

type ClientesData = {
  email: string;
  endereco: string;
  name: string;
  telefone: string;
};

const Clientes: React.FC = () => {
  const navigate = useNavigate();

  const [itemList, setItemList] = useState<ClientesData[]>();

  useEffect(() => {
    supabase
      .from("clientes")
      .select()
      .then((response) => setItemList(response?.data as any));
  }, []);

  const ths = (
    <tr>
      <th>name.</th>
      <th>endereco.</th>
      <th>email.</th>
    </tr>
  );

  const rows = itemList?.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.endereco}</td>
      <td>{item.email}</td>

      <td>
        <Button color="red" radius="xl" size="xs" compact>
          X
        </Button>
      </td>
    </tr>
  ));

  const clienteString = localStorage.getItem("clientes");

  return (
    <>
      <Group position="right">
        <Button onClick={() => navigate("create")}>
          <IconPlus size="1rem" />
        </Button>
      </Group>

      <Table striped>
        {/* <caption>Some elements from periodic table</caption> */}
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
        {/* <tfoot>{ths}</tfoot> */}
      </Table>
    </>
  );
};

export default Clientes;
