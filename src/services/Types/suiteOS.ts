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
  Client: ClientesData;
};

export type FormaPagmentoData = {
  id: number;
  name: string;
};
export type StatusData = {
  id?: number;
  name: string;
};
export type ServicosData = {
  id: number;
  name: string;
  valor: number;
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
  data_saida?: string;
  defeito?: string;
  documento: number;
  equipamento_id?: string;
  Equipment?: EquipamentosData;
  observacao?: string;
  solucao?: string;
  status?: string;
};
export type ServicoToOrdemServico = {
  created_at?: string;
  id?: number;
  ordem_servico_id: number;
  ServiceOrder?: OrdemServicoType;
  servico_id: number;
  Service?: ServicosData;
  pago?: boolean;
};
export type RecebimentoData = {
  data_pagamento?: string;
  forma_pagamento: string;
  id?: number;
  ordem_servico_id: number;
  pago_total?: boolean;
  valor_pago: number;
};
export type PaymentMethodsData = {
  id?: number;
  name: string;
};
