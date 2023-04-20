import { useCallback, useContext, useEffect, useState } from "react";

import { Burger, Header, MediaQuery, useMantineTheme } from "@mantine/core";
import NavbarContext, { NavbarTypes } from "../../../Context/Navbarcontext";

const HeaderApp: React.FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState<boolean>(true);
  const [state, dispatch] = useContext(NavbarContext);

  const NavbarOpened = useCallback(() => {
    dispatch({
      payload: opened,
      type: NavbarTypes.SET_NAVBAR_VISIBLE,
    });
  }, []);

  useEffect(() => {
    NavbarOpened();
  }, [opened]);

  return (
    <Header
      height={{ base: 50, md: 70 }}
      p="md"
      children={undefined}
      withBorder={false}
      style={{ backgroundColor: " #141517" }}
    />
  );
};
export default HeaderApp;
