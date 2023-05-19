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
      clientes: {
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
      equipamentos: {
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
      formasPagamento: {
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
      imagens: {
        Row: {
          dados_imagem: string | null;
          id: number;
          nome: string | null;
        };
        Insert: {
          dados_imagem?: string | null;
          id?: number;
          nome?: string | null;
        };
        Update: {
          dados_imagem?: string | null;
          id?: number;
          nome?: string | null;
        };
      };
      ordem_servico: {
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
      recebimento: {
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
      servicos: {
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
      servicoToOrdemServico: {
        Row: {
          created_at: string | null;
          id: number;
          ordem_servico_id: number | null;
          servico_id: number | null;
          pago: boolean | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          ordem_servico_id?: number | null;
          servico_id?: number | null;
          pago?: boolean | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          ordem_servico_id?: number | null;
          servico_id?: number | null;
          pago?: boolean | null;
        };
      };
      status: {
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
      users: {
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
