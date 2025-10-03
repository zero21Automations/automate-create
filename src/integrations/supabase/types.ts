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
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          factory_job_id: string | null
          id: string
          project_id: string
          stage: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          factory_job_id?: string | null
          id?: string
          project_id: string
          stage?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          factory_job_id?: string | null
          id?: string
          project_id?: string
          stage?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_factory_job_id_fkey"
            columns: ["factory_job_id"]
            isOneToOne: false
            referencedRelation: "factory_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          checkpoint_required: boolean | null
          checkpoint_timeout_hours: number | null
          created_at: string
          enabled: boolean | null
          fallback_action: string | null
          id: string
          project_id: string
          retry_count: number | null
          stage: string
          updated_at: string
        }
        Insert: {
          checkpoint_required?: boolean | null
          checkpoint_timeout_hours?: number | null
          created_at?: string
          enabled?: boolean | null
          fallback_action?: string | null
          id?: string
          project_id: string
          retry_count?: number | null
          stage: string
          updated_at?: string
        }
        Update: {
          checkpoint_required?: boolean | null
          checkpoint_timeout_hours?: number | null
          created_at?: string
          enabled?: boolean | null
          fallback_action?: string | null
          id?: string
          project_id?: string
          retry_count?: number | null
          stage?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_rules_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      checkpoint_overrides: {
        Row: {
          action: string
          created_at: string
          factory_job_id: string
          id: string
          modifications: Json | null
          notes: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          factory_job_id: string
          id?: string
          modifications?: Json | null
          notes?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          factory_job_id?: string
          id?: string
          modifications?: Json | null
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checkpoint_overrides_factory_job_id_fkey"
            columns: ["factory_job_id"]
            isOneToOne: false
            referencedRelation: "factory_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      copilot_suggestions: {
        Row: {
          action_payload: Json | null
          applied: boolean | null
          created_at: string
          description: string | null
          dismissed: boolean | null
          id: string
          idea_id: string | null
          priority: number | null
          project_id: string
          stage: string
          suggestion_type: string
          title: string
        }
        Insert: {
          action_payload?: Json | null
          applied?: boolean | null
          created_at?: string
          description?: string | null
          dismissed?: boolean | null
          id?: string
          idea_id?: string | null
          priority?: number | null
          project_id: string
          stage: string
          suggestion_type: string
          title: string
        }
        Update: {
          action_payload?: Json | null
          applied?: boolean | null
          created_at?: string
          description?: string | null
          dismissed?: boolean | null
          id?: string
          idea_id?: string | null
          priority?: number | null
          project_id?: string
          stage?: string
          suggestion_type?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "copilot_suggestions_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "copilot_suggestions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      factory_jobs: {
        Row: {
          checkpoint_expires_at: string | null
          checkpoint_required: boolean | null
          completed_at: string | null
          created_at: string
          current_stage: string
          error_count: number | null
          id: string
          idea_id: string | null
          last_error: string | null
          metadata: Json | null
          project_id: string
          status: string
          updated_at: string
        }
        Insert: {
          checkpoint_expires_at?: string | null
          checkpoint_required?: boolean | null
          completed_at?: string | null
          created_at?: string
          current_stage: string
          error_count?: number | null
          id?: string
          idea_id?: string | null
          last_error?: string | null
          metadata?: Json | null
          project_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          checkpoint_expires_at?: string | null
          checkpoint_required?: boolean | null
          completed_at?: string | null
          created_at?: string
          current_stage?: string
          error_count?: number | null
          id?: string
          idea_id?: string | null
          last_error?: string | null
          metadata?: Json | null
          project_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "factory_jobs_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "factory_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ideas: {
        Row: {
          banned_words: string[] | null
          call_to_action: string | null
          complexity_level: string | null
          concept: Json | null
          content_pillars: string[] | null
          created_at: string
          creative_dna: Json | null
          description: string | null
          hashtags: string[] | null
          hook_type: string | null
          id: string
          idea_references: Json | null
          metadata: Json | null
          narrator_type: string | null
          progress: Json | null
          project_id: string
          score: number | null
          seed: Json | null
          source: string | null
          status: string
          target_duration: number | null
          target_platforms: string[] | null
          targeting: Json | null
          title: string
          tone: string | null
          updated_at: string
          video_concept: string | null
          visual_style: string | null
        }
        Insert: {
          banned_words?: string[] | null
          call_to_action?: string | null
          complexity_level?: string | null
          concept?: Json | null
          content_pillars?: string[] | null
          created_at?: string
          creative_dna?: Json | null
          description?: string | null
          hashtags?: string[] | null
          hook_type?: string | null
          id?: string
          idea_references?: Json | null
          metadata?: Json | null
          narrator_type?: string | null
          progress?: Json | null
          project_id: string
          score?: number | null
          seed?: Json | null
          source?: string | null
          status?: string
          target_duration?: number | null
          target_platforms?: string[] | null
          targeting?: Json | null
          title: string
          tone?: string | null
          updated_at?: string
          video_concept?: string | null
          visual_style?: string | null
        }
        Update: {
          banned_words?: string[] | null
          call_to_action?: string | null
          complexity_level?: string | null
          concept?: Json | null
          content_pillars?: string[] | null
          created_at?: string
          creative_dna?: Json | null
          description?: string | null
          hashtags?: string[] | null
          hook_type?: string | null
          id?: string
          idea_references?: Json | null
          metadata?: Json | null
          narrator_type?: string | null
          progress?: Json | null
          project_id?: string
          score?: number | null
          seed?: Json | null
          source?: string | null
          status?: string
          target_duration?: number | null
          target_platforms?: string[] | null
          targeting?: Json | null
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
          automation_config: Json | null
          brand_kit: Json | null
          created_at: string
          description: string | null
          dna_locked: boolean | null
          dna_locked_at: string | null
          emoji: string | null
          id: string
          name: string
          posting_rules: Json | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          automation_config?: Json | null
          brand_kit?: Json | null
          created_at?: string
          description?: string | null
          dna_locked?: boolean | null
          dna_locked_at?: string | null
          emoji?: string | null
          id?: string
          name: string
          posting_rules?: Json | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          automation_config?: Json | null
          brand_kit?: Json | null
          created_at?: string
          description?: string | null
          dna_locked?: boolean | null
          dna_locked_at?: string | null
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
