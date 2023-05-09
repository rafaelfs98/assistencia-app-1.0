import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import AppRouter from "./AppRouter";
import { NavbarContextProvider } from "./Context/Navbarcontext";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Notifications />
      <NavbarContextProvider>
        <AppRouter />
      </NavbarContextProvider>
    </MantineProvider>
  </StrictMode>
);
