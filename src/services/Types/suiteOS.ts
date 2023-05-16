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
  cliente_id: number;
  clientes: ClientesData;
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

export type OrdemServicoType = {
  acessorios: string;
  data_entrada: string;
  data_saida: string;
  defeito: string;
  documento: number;
  equipamento_id: string;
  equipamentos: EquipamentosData;
  observacao: string;
  solucao: string;
  status: string;
};
