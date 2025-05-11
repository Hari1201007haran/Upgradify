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
      careers: {
        Row: {
          description: string
          education: string[]
          id: string
          interests: string[]
          job_outlook: string
          salary: string
          skills: string[]
          streams: string[]
          title: string
        }
        Insert: {
          description: string
          education: string[]
          id: string
          interests: string[]
          job_outlook: string
          salary: string
          skills: string[]
          streams: string[]
          title: string
        }
        Update: {
          description?: string
          education?: string[]
          id?: string
          interests?: string[]
          job_outlook?: string
          salary?: string
          skills?: string[]
          streams?: string[]
          title?: string
        }
        Relationships: []
      }
      colleges: {
        Row: {
          category: string | null
          courses: string[]
          description: string
          id: string
          location: string
          name: string
          ranking: number
        }
        Insert: {
          category?: string | null
          courses: string[]
          description: string
          id: string
          location: string
          name: string
          ranking: number
        }
        Update: {
          category?: string | null
          courses?: string[]
          description?: string
          id?: string
          location?: string
          name?: string
          ranking?: number
        }
        Relationships: []
      }
      courses: {
        Row: {
          description: string
          duration: string
          id: string
          streams: string[]
          title: string
        }
        Insert: {
          description: string
          duration: string
          id: string
          streams: string[]
          title: string
        }
        Update: {
          description?: string
          duration?: string
          id?: string
          streams?: string[]
          title?: string
        }
        Relationships: []
      }
      expert_consultations: {
        Row: {
          consultation_date: string
          created_at: string
          expert_id: string
          id: string
          status: string
          time_slot: string
          user_id: string
        }
        Insert: {
          consultation_date: string
          created_at?: string
          expert_id: string
          id?: string
          status?: string
          time_slot: string
          user_id: string
        }
        Update: {
          consultation_date?: string
          created_at?: string
          expert_id?: string
          id?: string
          status?: string
          time_slot?: string
          user_id?: string
        }
        Relationships: []
      }
      expert_messages: {
        Row: {
          created_at: string
          expert_id: string
          id: string
          message: string
          status: string
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expert_id: string
          id?: string
          message: string
          status?: string
          subject: string
          user_id: string
        }
        Update: {
          created_at?: string
          expert_id?: string
          id?: string
          message?: string
          status?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      government_exams: {
        Row: {
          description: string
          eligibility: string[]
          id: string
          preparation_time: string
          streams: string[]
          title: string
        }
        Insert: {
          description: string
          eligibility: string[]
          id: string
          preparation_time: string
          streams: string[]
          title: string
        }
        Update: {
          description?: string
          eligibility?: string[]
          id?: string
          preparation_time?: string
          streams?: string[]
          title?: string
        }
        Relationships: []
      }
      nirf_rankings: {
        Row: {
          category: string
          description: string
          id: string
          location: string
          name: string
          rank: number
          score: number
        }
        Insert: {
          category: string
          description: string
          id: string
          location: string
          name: string
          rank: number
          score: number
        }
        Update: {
          category?: string
          description?: string
          id?: string
          location?: string
          name?: string
          rank?: number
          score?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          grade: string | null
          id: string
          interests: string[] | null
          mobile: string | null
          stream: string | null
          updated_at: string
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          grade?: string | null
          id: string
          interests?: string[] | null
          mobile?: string | null
          stream?: string | null
          updated_at?: string
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          grade?: string | null
          id?: string
          interests?: string[] | null
          mobile?: string | null
          stream?: string | null
          updated_at?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
