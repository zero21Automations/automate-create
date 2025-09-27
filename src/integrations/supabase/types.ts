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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      assemblies: {
        Row: {
          created_at: string
          duration: number | null
          id: string
          idea_id: string
          platform_versions: Json | null
          script_id: string
          status: string
          thumbnail_url: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          duration?: number | null
          id?: string
          idea_id: string
          platform_versions?: Json | null
          script_id: string
          status?: string
          thumbnail_url?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          duration?: number | null
          id?: string
          idea_id?: string
          platform_versions?: Json | null
          script_id?: string
          status?: string
          thumbnail_url?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assemblies_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: true
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assemblies_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          created_at: string
          file_url: string | null
          id: string
          idea_id: string
          metadata: Json | null
          script_id: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_url?: string | null
          id?: string
          idea_id: string
          metadata?: Json | null
          script_id?: string | null
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_url?: string | null
          id?: string
          idea_id?: string
          metadata?: Json | null
          script_id?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assets_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
        ]
      }
      ideas: {
        Row: {
          call_to_action: string | null
          complexity_level: string | null
          content_pillars: string[] | null
          created_at: string
          description: string | null
          hashtags: string[] | null
          hook_type: string | null
          id: string
          metadata: Json | null
          project_id: string
          score: number | null
          source: string | null
          status: string
          target_duration: number | null
          target_platforms: string[] | null
          title: string
          tone: string | null
          updated_at: string
          video_concept: string | null
          visual_style: string | null
        }
        Insert: {
          call_to_action?: string | null
          complexity_level?: string | null
          content_pillars?: string[] | null
          created_at?: string
          description?: string | null
          hashtags?: string[] | null
          hook_type?: string | null
          id?: string
          metadata?: Json | null
          project_id: string
          score?: number | null
          source?: string | null
          status?: string
          target_duration?: number | null
          target_platforms?: string[] | null
          title: string
          tone?: string | null
          updated_at?: string
          video_concept?: string | null
          visual_style?: string | null
        }
        Update: {
          call_to_action?: string | null
          complexity_level?: string | null
          content_pillars?: string[] | null
          created_at?: string
          description?: string | null
          hashtags?: string[] | null
          hook_type?: string | null
          id?: string
          metadata?: Json | null
          project_id?: string
          score?: number | null
          source?: string | null
          status?: string
          target_duration?: number | null
          target_platforms?: string[] | null
          title?: string
          tone?: string | null
          updated_at?: string
          video_concept?: string | null
          visual_style?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ideas_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          brand_kit: Json | null
          created_at: string
          description: string | null
          emoji: string | null
          id: string
          name: string
          posting_rules: Json | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          brand_kit?: Json | null
          created_at?: string
          description?: string | null
          emoji?: string | null
          id?: string
          name: string
          posting_rules?: Json | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          brand_kit?: Json | null
          created_at?: string
          description?: string | null
          emoji?: string | null
          id?: string
          name?: string
          posting_rules?: Json | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      publications: {
        Row: {
          assembly_id: string
          caption: string | null
          created_at: string
          hashtags: string[] | null
          id: string
          metrics: Json | null
          platform: string
          platform_post_id: string | null
          published_at: string | null
          scheduled_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          assembly_id: string
          caption?: string | null
          created_at?: string
          hashtags?: string[] | null
          id?: string
          metrics?: Json | null
          platform: string
          platform_post_id?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          assembly_id?: string
          caption?: string | null
          created_at?: string
          hashtags?: string[] | null
          id?: string
          metrics?: Json | null
          platform?: string
          platform_post_id?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "publications_assembly_id_fkey"
            columns: ["assembly_id"]
            isOneToOne: false
            referencedRelation: "assemblies"
            referencedColumns: ["id"]
          },
        ]
      }
      scripts: {
        Row: {
          beats: string[] | null
          created_at: string
          cta: string | null
          hook: string | null
          id: string
          idea_id: string
          quality_scores: Json | null
          read_time: number | null
          status: string
          updated_at: string
          voice_style: string | null
        }
        Insert: {
          beats?: string[] | null
          created_at?: string
          cta?: string | null
          hook?: string | null
          id?: string
          idea_id: string
          quality_scores?: Json | null
          read_time?: number | null
          status?: string
          updated_at?: string
          voice_style?: string | null
        }
        Update: {
          beats?: string[] | null
          created_at?: string
          cta?: string | null
          hook?: string | null
          id?: string
          idea_id?: string
          quality_scores?: Json | null
          read_time?: number | null
          status?: string
          updated_at?: string
          voice_style?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scripts_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: true
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
        ]
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
