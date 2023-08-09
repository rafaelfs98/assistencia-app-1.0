import { ClientesData } from "./Types/suiteOS";
import axios from "axios";

export const insertOrUpdateClient = async (
  cliente: ClientesData,
  clienteId?: string
) => {
  try {
    const data = cliente;

    console.log(data);

    if (clienteId) {
      return await axios.put(
        `${import.meta.env.VITE_BACKEND}/cliente/${clienteId}`,
        data
      );
    } else {
      return await axios.post(`${import.meta.env.VITE_BACKEND}/cliente`, data);
    }
  } catch (error) {
    throw Error(error as any);
  }
};

export const deleteCliente = async (clienteId: string) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND}/cliente/${clienteId}`);
  } catch (error) {
    throw Error(error as any);
  }
};
