import { Button, Group, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../services/supabase/supabaseClient";
import { CategoriasFormData } from "../../../services/Types";
import CategoriasActions from "./CategoriasActions";

const Categorias: React.FC = () => {
  const navigate = useNavigate();

  const [itemList, setItemList] = useState<CategoriasFormData[]>();

  useEffect(() => {
    supabase
      .from("categorias")
      .select()
      .order("id", { ascending: true })
      .then((response) => setItemList(response?.data as any));
  }, []);

  const ths = (
    <tr>
      <th>Categoria</th>
      <th></th>
    </tr>
  );

  const rows = itemList?.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>
        <CategoriasActions categoriaId={String(item?.id)} />
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

export default Categorias;
