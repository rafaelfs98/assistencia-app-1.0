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
        Relationships: [];
      };
      Empresa: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: "Equipment_cliente_id_fkey";
            columns: ["cliente_id"];
            referencedRelation: "Client";
            referencedColumns: ["id"];
          }
        ];
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
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: "PaymentReceived_ordem_servico_id_fkey";
            columns: ["ordem_servico_id"];
            referencedRelation: "ServiceOrder";
            referencedColumns: ["documento"];
          }
        ];
      };
      Roles: {
        Row: {
          id: number;
          Role: string | null;
        };
        Insert: {
          id?: number;
          Role?: string | null;
        };
        Update: {
          id?: number;
          Role?: string | null;
        };
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: "ServiceOrder_equipamento_id_fkey";
            columns: ["equipamento_id"];
            referencedRelation: "Equipment";
            referencedColumns: ["id"];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: "ServiceToServiceOrder_ordem_servico_id_fkey";
            columns: ["ordem_servico_id"];
            referencedRelation: "ServiceOrder";
            referencedColumns: ["documento"];
          },
          {
            foreignKeyName: "ServiceToServiceOrder_servico_id_fkey";
            columns: ["servico_id"];
            referencedRelation: "Service";
            referencedColumns: ["id"];
          }
        ];
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
        Relationships: [];
      };
      Users: {
        Row: {
          email: string | null;
          empresa_id: number | null;
          id: number;
          name: string | null;
          role_id: number | null;
          senha: string;
          usuario: string;
        };
        Insert: {
          email?: string | null;
          empresa_id?: number | null;
          id?: number;
          name?: string | null;
          role_id?: number | null;
          senha?: string;
          usuario?: string;
        };
        Update: {
          email?: string | null;
          empresa_id?: number | null;
          id?: number;
          name?: string | null;
          role_id?: number | null;
          senha?: string;
          usuario?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Users_empresa_id_fkey";
            columns: ["empresa_id"];
            referencedRelation: "Empresa";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Users_role_id_fkey";
            columns: ["role_id"];
            referencedRelation: "Roles";
            referencedColumns: ["id"];
          }
        ];
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
