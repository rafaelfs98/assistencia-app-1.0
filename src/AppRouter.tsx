import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Home";
import OutletBridge from "./OutletBridge";
import Clientes from "./Pages/Clientes";
import ClientesForm from "./Pages/Clientes/ClientesForm";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} index />
          <Route element={<OutletBridge />} path="clientes">
            <Route element={<Clientes />} index />
            <Route element={<ClientesForm />} path="create" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
