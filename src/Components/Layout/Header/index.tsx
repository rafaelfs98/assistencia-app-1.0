import { useCallback, useContext, useEffect, useState } from "react";

import { Burger, Header, MediaQuery, useMantineTheme } from "@mantine/core";
import NavbarContext, { NavbarTypes } from "../../../Context/Navbarcontext";

const HeaderApp: React.FC = () => {
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <Header
      height={{ base: 50, md: 70 }}
      p="md"
      children={undefined}
      withBorder={false}
      style={{ backgroundColor: "#1A1B1E" }}
    />
  );
};
export default HeaderApp;
