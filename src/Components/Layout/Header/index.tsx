import { useContext } from "react";

import { Alert, Header } from "@mantine/core";
import Breadcrumb from "../Breadcrumb";

const HeaderApp: React.FC = () => {
  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Breadcrumb />
      </div>
    </Header>
  );
};
export default HeaderApp;
