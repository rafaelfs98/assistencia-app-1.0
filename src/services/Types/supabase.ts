export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Client: {
        Row: {
          bairro: string;
          cep: string;
          cidade: string;
          complemento: string;
          created_at: string | null;
          email: string | null;
          id: number;
          logradouro: string;
          name: string | null;
          numero: number;
          telefone: string | null;
        };
        Insert: {
          bairro: string;
          cep: string;
          cidade: string;
          complemento: string;
          created_at?: string | null;
          email?: string | null;
          id?: number;
          logradouro: string;
          name?: string | null;
          numero: number;
          telefone?: string | null;
        };
        Update: {
          bairro?: string;
          cep?: string;
          cidade?: string;
          complemento?: string;
          created_at?: string | null;
          email?: string | null;
          id?: number;
          logradouro?: string;
          name?: string | null;
          numero?: number;
          telefone?: string | null;
        };
      };
      Equipment: {
        Row: {
          cliente_id: number | null;
          cor: string | null;
          created_at: string | null;
          id: number;
          marca: string | null;
          modelo: string | null;
          serie: string | null;
        };
        Insert: {
          cliente_id?: number | null;
          cor?: string | null;
          created_at?: string | null;
          id?: number;
          marca?: string | null;
          modelo?: string | null;
          serie?: string | null;
        };
        Update: {
          cliente_id?: number | null;
          cor?: string | null;
          created_at?: string | null;
          id?: number;
          marca?: string | null;
          modelo?: string | null;
          serie?: string | null;
        };
      };
      PaymentMethods: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
      };
      PaymentReceived: {
        Row: {
          data_pagamento: string | null;
          forma_pagamento: string | null;
          id: number;
          ordem_servico_id: number | null;
          pago_total: boolean | null;
          valor_pago: number | null;
        };
        Insert: {
          data_pagamento?: string | null;
          forma_pagamento?: string | null;
          id?: number;
          ordem_servico_id?: number | null;
          pago_total?: boolean | null;
          valor_pago?: number | null;
        };
        Update: {
          data_pagamento?: string | null;
          forma_pagamento?: string | null;
          id?: number;
          ordem_servico_id?: number | null;
          pago_total?: boolean | null;
          valor_pago?: number | null;
        };
      };
      Service: {
        Row: {
          created_at: string | null;
          id: number;
          name: string | null;
          valor: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
          valor?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
          valor?: number | null;
        };
      };
      ServiceOrder: {
        Row: {
          acessorios: string | null;
          data_entrada: string | null;
          data_saida: string | null;
          defeito: string | null;
          documento: number;
          equipamento_id: number | null;
          observacao: string | null;
          solucao: string | null;
          status: string | null;
        };
        Insert: {
          acessorios?: string | null;
          data_entrada?: string | null;
          data_saida?: string | null;
          defeito?: string | null;
          documento?: number;
          equipamento_id?: number | null;
          observacao?: string | null;
          solucao?: string | null;
          status?: string | null;
        };
        Update: {
          acessorios?: string | null;
          data_entrada?: string | null;
          data_saida?: string | null;
          defeito?: string | null;
          documento?: number;
          equipamento_id?: number | null;
          observacao?: string | null;
          solucao?: string | null;
          status?: string | null;
        };
      };
      ServiceToServiceOrder: {
        Row: {
          created_at: string | null;
          id: number;
          ordem_servico_id: number | null;
          pago: boolean | null;
          servico_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          ordem_servico_id?: number | null;
          pago?: boolean | null;
          servico_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          ordem_servico_id?: number | null;
          pago?: boolean | null;
          servico_id?: number | null;
        };
      };
      Status: {
        Row: {
          created_at: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
        };
      };
      Users: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: number;
          name?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
