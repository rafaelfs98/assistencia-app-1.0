export type ClientesFormData = {
  id?: number;
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  email: string;
  logradouro: string;
  name: string;
  numero: number;
  telefone: string;
};
export type EquipamentosFormData = {
  id?: number;
  marca: string;
  modelo: string;
  cor: string;
  serie: string;
  clienteId: number;
};
export type StatusFormData = {
  id?: number;
  name: string;
};
export type ServicosFormData = {
  id: number;
  name: string;
  valor: string;
};
export type apiData = {
  [x: string]: any;
}[];

export type LoginForm = {
  name: string;
  email: string;
  password: string;
};
