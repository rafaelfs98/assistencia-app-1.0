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
export type StatusFormData = {
  id?: number;
  name: string;
};
export type apiData = {
  [x: string]: any;
}[];

export type LoginForm = {
  name: string;
  email: string;
  password: string;
};
