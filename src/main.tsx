import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./AppRouter";
import "./styles/index.scss";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Notifications />
      <AppRouter />
    </MantineProvider>
  </StrictMode>
);
