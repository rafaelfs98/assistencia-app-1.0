export type ClientesData = {
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
export type EquipamentosData = {
  id?: number;
  marca: string;
  modelo: string;
  cor: string;
  serie: string;
  clienteId: number;
  cliente_name: string;
};
export type StatusData = {
  id?: number;
  name: string;
};
export type ServicosData = {
  id: number;
  name: string;
  valor: string;
};
export type apiData = {
  [x: string]: any;
}[];

export type LoginType = {
  name: string;
  email: string;
  password: string;
};
