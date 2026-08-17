export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      campaigns: {
        Row: {
          created_at: string
          id: string
          image: string | null
          original_price: number | null
          price: number | null
          quantity_available: number
          quantity_sold: number
          rich_text: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image?: string | null
          original_price?: number | null
          price?: number | null
          quantity_available?: number
          quantity_sold?: number
          rich_text?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image?: string | null
          original_price?: number | null
          price?: number | null
          quantity_available?: number
          quantity_sold?: number
          rich_text?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      challenges: {
        Row: {
          created_at: string
          ends_at: string
          id: string
          starts_at: string
          text_en: string
          text_fr: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          ends_at: string
          id?: string
          starts_at: string
          text_en: string
          text_fr: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          ends_at?: string
          id?: string
          starts_at?: string
          text_en?: string
          text_fr?: string
          updated_at?: string
        }
        Relationships: []
      }
      concert_analytics: {
        Row: {
          clicked_at: string
          concert_date: string
          concert_title: string
          id: string
          venue: string
        }
        Insert: {
          clicked_at?: string
          concert_date: string
          concert_title: string
          id?: string
          venue: string
        }
        Update: {
          clicked_at?: string
          concert_date?: string
          concert_title?: string
          id?: string
          venue?: string
        }
        Relationships: []
      }
      date_filter_analytics: {
        Row: {
          date: string
          filtered_at: string
          id: string
        }
        Insert: {
          date: string
          filtered_at?: string
          id?: string
        }
        Update: {
          date?: string
          filtered_at?: string
          id?: string
        }
        Relationships: []
      }
      event_settings: {
        Row: {
          id: number
          reveal_at: string
          shots_per_guest: number
          updated_at: string
        }
        Insert: {
          id?: number
          reveal_at?: string
          shots_per_guest?: number
          updated_at?: string
        }
        Update: {
          id?: number
          reveal_at?: string
          shots_per_guest?: number
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          date: string
          image: string | null
          link: string | null
          title: string
          venue: string | null
          venue_link: string | null
        }
        Insert: {
          date: string
          image?: string | null
          link?: string | null
          title: string
          venue?: string | null
          venue_link?: string | null
        }
        Update: {
          date?: string
          image?: string | null
          link?: string | null
          title?: string
          venue?: string | null
          venue_link?: string | null
        }
        Relationships: []
      }
      favorite_analytics: {
        Row: {
          action: string
          clicked_at: string
          concert_date: string
          concert_title: string
          id: string
          venue: string
        }
        Insert: {
          action: string
          clicked_at?: string
          concert_date: string
          concert_title: string
          id?: string
          venue: string
        }
        Update: {
          action?: string
          clicked_at?: string
          concert_date?: string
          concert_title?: string
          id?: string
          venue?: string
        }
        Relationships: []
      }
      host_config: {
        Row: {
          id: number
          pin_hash: string
          updated_at: string
        }
        Insert: {
          id?: number
          pin_hash: string
          updated_at?: string
        }
        Update: {
          id?: number
          pin_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      photos: {
        Row: {
          challenge: string | null
          created_at: string
          guest_id: string
          guest_name: string
          id: string
          storage_path: string
        }
        Insert: {
          challenge?: string | null
          created_at?: string
          guest_id: string
          guest_name: string
          id?: string
          storage_path: string
        }
        Update: {
          challenge?: string | null
          created_at?: string
          guest_id?: string
          guest_name?: string
          id?: string
          storage_path?: string
        }
        Relationships: []
      }
      ShowStop: {
        Row: {
          created_at: string
          email: string
          id: number
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
        }
        Relationships: []
      }
      venue_filter_analytics: {
        Row: {
          filtered_at: string
          id: string
          venue: string
        }
        Insert: {
          filtered_at?: string
          id?: string
          venue: string
        }
        Update: {
          filtered_at?: string
          id?: string
          venue?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_rows_before_today: { Args: never; Returns: undefined }
      get_random_concert: {
        Args: never
        Returns: {
          date: string
          image: string
          link: string
          title: string
          venue: string
          venue_link: string
        }[]
      }
      is_guest_name_taken: {
        Args: { _guest_id: string; _name: string }
        Returns: boolean
      }
      set_host_pin: { Args: { _new_pin: string }; Returns: undefined }
      verify_host_pin: { Args: { _pin: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
