export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string
          date: string | null
          displayName: string | null
          duration: number | null
          endTime: string | null
          id: number
          lineId: string | null
          observations: string | null
          optionId: number | null
          optionPrice: number | null
          phone: string | null
          serviceId: number | null
          servicePrice: number | null
          startTime: string | null
          status: string | null
          totalPrice: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          displayName?: string | null
          duration?: number | null
          endTime?: string | null
          id?: number
          lineId?: string | null
          observations?: string | null
          optionId?: number | null
          optionPrice?: number | null
          phone?: string | null
          serviceId?: number | null
          servicePrice?: number | null
          startTime?: string | null
          status?: string | null
          totalPrice?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          displayName?: string | null
          duration?: number | null
          endTime?: string | null
          id?: number
          lineId?: string | null
          observations?: string | null
          optionId?: number | null
          optionPrice?: number | null
          phone?: string | null
          serviceId?: number | null
          servicePrice?: number | null
          startTime?: string | null
          status?: string | null
          totalPrice?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_optionId_fkey"
            columns: ["optionId"]
            isOneToOne: false
            referencedRelation: "options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_serviceId_fkey"
            columns: ["serviceId"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      options: {
        Row: {
          created_at: string
          description: string | null
          duration: number | null
          id: number
          name: string | null
          price: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: number
          name?: string | null
          price?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: number
          name?: string | null
          price?: number | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          discount: number | null
          duration: number | null
          id: number
          image: string | null
          name: string | null
          regularPrice: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount?: number | null
          duration?: number | null
          id?: number
          image?: string | null
          name?: string | null
          regularPrice?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          discount?: number | null
          duration?: number | null
          id?: number
          image?: string | null
          name?: string | null
          regularPrice?: number | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          closeTime: string | null
          created_at: string
          id: number
          nonBusinessDates: string[] | null
          openTime: string | null
        }
        Insert: {
          closeTime?: string | null
          created_at?: string
          id?: number
          nonBusinessDates?: string[] | null
          openTime?: string | null
        }
        Update: {
          closeTime?: string | null
          created_at?: string
          id?: number
          nonBusinessDates?: string[] | null
          openTime?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
