import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Home";
import OutletBridge from "./OutletBridge";
import Clientes from "./Pages/Clientes";
import ClientesForm from "./Pages/Clientes/ClientesForm";
import ClientesOutlet from "./Pages/Clientes/ClientesOutlet";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} index />
          <Route element={<OutletBridge />} path="clientes">
            <Route element={<Clientes />} index />
            <Route element={<ClientesForm />} path="create" />
            <Route element={<ClientesOutlet />} path=":clienteId">
              <Route element={<ClientesForm />} path="update" />
              <Route element={<ClientesForm />} path="view" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
