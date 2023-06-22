import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
import { Root, createRoot } from "react-dom/client";
import AppRouter from "./AppRouter";
import "./styles/index.scss";

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <StrictMode>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            breakpoints: {
              xs: "30em",
              sm: "48em",
              md: "64em",
              lg: "74em",
              xl: "90em",
            },
            loader: "oval",
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications />
          <AppRouter />
        </MantineProvider>
      </ColorSchemeProvider>
    </StrictMode>
  );
};

class SuiteOS extends HTMLElement {
  private root: Root | undefined;

  connectedCallback() {
    if (!this.root) {
      this.root = createRoot(this);

      this.root.render(<App />);
    }
  }
}

const ELEMENT_ID = "suite-os";

if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, SuiteOS);
}
