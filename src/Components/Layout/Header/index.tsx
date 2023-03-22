import { useContext } from "react";

import { Alert } from "@mantine/core";

const HeaderApp: React.FC = () => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  };

  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <>
      <div style={style}>
        <div>Assistencia Tecnica</div>
      </div>
    </>
  );
};
export default HeaderApp;
