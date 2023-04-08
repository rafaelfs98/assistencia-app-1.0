import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Home";
import OutletBridge from "./OutletBridge";
import Login from "./Pages/Login/LoginPage";
import NewUserForm from "./Pages/Login/NewUserForm";
import Clientes from "./Pages/Cadastro/Clientes";
import ClientesForm from "./Pages/Cadastro/Clientes/ClientesForm";
import ClientesOutlet from "./Pages/Cadastro/Clientes/ClientesOutlet";
import Statuss from "./Pages/Cadastro/Status/index";
import StatussForm from "./Pages/Cadastro/Status/StatusForm";
import StatussOutlet from "./Pages/Cadastro/Status/StatusOutlet";
import Status from "./Pages/Cadastro/Status/index";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<NewUserForm />} path="/createLogin" />
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
          <Route element={<OutletBridge />} path="status">
            <Route element={<Status />} index />
            <Route element={<StatussForm />} path="create" />
            <Route element={<StatussOutlet />} path=":statusId">
              <Route element={<StatussForm />} path="update" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
