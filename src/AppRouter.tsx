import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Home";
import OutletBridge from "./OutletBridge";
import Clientes from "./Pages/Cadastro/Clientes";
import ClientesForm from "./Pages/Cadastro/Clientes/ClientesForm";
import ClientesOutlet from "./Pages/Cadastro/Clientes/ClientesOutlet";
import Equipamentos from "./Pages/Cadastro/Equipamentos";
import EquipamentosForm from "./Pages/Cadastro/Equipamentos/EquipamentosForm";
import EquipamentosOutlet from "./Pages/Cadastro/Equipamentos/EquipamentosOutlet";
import Servicos from "./Pages/Cadastro/Servicos";
import ServicosForm from "./Pages/Cadastro/Servicos/ServicosForm";
import ServicosOutlet from "./Pages/Cadastro/Servicos/ServicosOutlet";
import StatusForm from "./Pages/Cadastro/Status/StatusForm";
import StatusOutlet from "./Pages/Cadastro/Status/StatusOutlet";
import Status from "./Pages/Cadastro/Status/index";
import Login from "./Pages/Login/LoginPage";
import NewUserForm from "./Pages/Login/NewUserForm";
import OrdemServicos from "./Pages/OrdemServicos";
import OrdemServicosForm from "./Pages/OrdemServicos/OrdemServicoForm";
import OrdemServicosOutlet from "./Pages/OrdemServicos/OrdemServicoOutlet";
import PaymentService from "./Pages/OrdemServicos/PaymentService";
import CloseOrderService from "./Pages/OrdemServicos/FecharOrdemServico";
import printOrderServico from "./Pages/OrdemServicos/OrdeServicoReports/ImprimirOrdemServico";
import PrintOrderServico from "./Pages/OrdemServicos/OrdeServicoReports/ImprimirOrdemServico";
import PaymentMethods from "./Pages/Cadastro/FormasDePagamentos";
import PaymentMethodsForm from "./Pages/Cadastro/FormasDePagamentos/paymentMethodsForm";
import PaymentMethodOutlet from "./Pages/Cadastro/FormasDePagamentos/paymentMethodsOutlet";

const AppRouter = () => {
  return (
    <HashRouter>
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
            <Route element={<StatusForm />} path="create" />
            <Route element={<StatusOutlet />} path=":statusId">
              <Route element={<StatusForm />} path="update" />
            </Route>
          </Route>
          <Route element={<OutletBridge />} path="servicos">
            <Route element={<Servicos />} index />
            <Route element={<ServicosForm />} path="create" />
            <Route element={<ServicosOutlet />} path=":servicoId">
              <Route element={<ServicosForm />} path="update" />
            </Route>
          </Route>
          <Route element={<OutletBridge />} path="equipamentos">
            <Route element={<Equipamentos />} index />
            <Route element={<EquipamentosForm />} path="create" />
            <Route element={<EquipamentosOutlet />} path=":equipamentoId">
              <Route element={<EquipamentosForm />} path="update" />
              <Route element={<EquipamentosForm />} path="view" />
            </Route>
          </Route>
          <Route element={<OutletBridge />} path="paymentmethods">
            <Route element={<PaymentMethods />} index />
            <Route element={<PaymentMethodsForm />} path="create" />
            <Route element={<PaymentMethodOutlet />} path=":paymentmethodId">
              <Route element={<PaymentMethodsForm />} path="update" />
            </Route>
          </Route>
          <Route element={<OutletBridge />} path="os">
            <Route element={<OrdemServicos />} index />
            <Route element={<OrdemServicosForm />} path="create" />
            <Route element={<OrdemServicosOutlet />} path=":osId">
              <Route element={<OrdemServicosForm />} path="update" />
              <Route element={<CloseOrderService />} path="encerrar" />
              <Route element={<PaymentService />} path="pagamento" />
              <Route element={<PrintOrderServico />} path="view" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
