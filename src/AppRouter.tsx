import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Home";
import OutletBridge from "./OutletBridge";
import Login from "./Pages/Login/LoginPage";
import NewUserForm from "./Pages/Login/NewUserForm";
import Clientes from "./Pages/Cadastro/Clientes";
import ClientesForm from "./Pages/Cadastro/Clientes/ClientesForm";
import ClientesOutlet from "./Pages/Cadastro/Clientes/ClientesOutlet";
import Categorias from "./Pages/Cadastro/Categorias/index";
import CategoriasForm from "./Pages/Cadastro/Categorias/CategoriasForm";
import CategoriasOutlet from "./Pages/Cadastro/Categorias/CategoriasOutlet";

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
          <Route element={<OutletBridge />} path="categorias">
            <Route element={<Categorias />} index />
            <Route element={<CategoriasForm />} path="create" />
            <Route element={<CategoriasOutlet />} path=":categoriaId">
              <Route element={<CategoriasForm />} path="update" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
