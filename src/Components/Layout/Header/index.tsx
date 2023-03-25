import { useCallback, useContext, useEffect, useState } from "react";

import {
  Alert,
  Burger,
  Header,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";
import Breadcrumb from "../Breadcrumb";
import NavbarContext, { NavbarTypes } from "../../../Context/Navbarcontext";

const HeaderApp: React.FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState<boolean>(false);
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
    <Header height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={state.navBarVisible}
            onClick={() => {
              setOpened((opened: boolean) => !opened);
            }}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
      </div>
    </Header>
  );
};
export default HeaderApp;
