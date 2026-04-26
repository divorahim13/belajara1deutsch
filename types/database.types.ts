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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_events: {
        Row: {
          class_id: string | null
          created_at: string | null
          event_type: string
          id: string
          institution_id: string | null
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          event_type: string
          id?: string
          institution_id?: string | null
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          event_type?: string
          id?: string
          institution_id?: string | null
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_events_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_events_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_grading_results: {
        Row: {
          a2_level: number | null
          answer_hash: string
          chapter_id: number | null
          class_id: string | null
          coherence: number | null
          corrected_text: string | null
          created_at: string | null
          feedback_indonesian: string | null
          grammar: number | null
          id: string
          is_acceptable_a2: boolean | null
          mistakes: Json | null
          module_id: string | null
          prompt_type: string | null
          question_id: string
          raw_result: Json | null
          reviewed_at: string | null
          reviewed_by: string | null
          score: number | null
          strengths: Json | null
          suggestions: Json | null
          task_completion: number | null
          teacher_feedback: string | null
          teacher_override_score: number | null
          user_id: string | null
          vocabulary: number | null
        }
        Insert: {
          a2_level?: number | null
          answer_hash: string
          chapter_id?: number | null
          class_id?: string | null
          coherence?: number | null
          corrected_text?: string | null
          created_at?: string | null
          feedback_indonesian?: string | null
          grammar?: number | null
          id?: string
          is_acceptable_a2?: boolean | null
          mistakes?: Json | null
          module_id?: string | null
          prompt_type?: string | null
          question_id: string
          raw_result?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          score?: number | null
          strengths?: Json | null
          suggestions?: Json | null
          task_completion?: number | null
          teacher_feedback?: string | null
          teacher_override_score?: number | null
          user_id?: string | null
          vocabulary?: number | null
        }
        Update: {
          a2_level?: number | null
          answer_hash?: string
          chapter_id?: number | null
          class_id?: string | null
          coherence?: number | null
          corrected_text?: string | null
          created_at?: string | null
          feedback_indonesian?: string | null
          grammar?: number | null
          id?: string
          is_acceptable_a2?: boolean | null
          mistakes?: Json | null
          module_id?: string | null
          prompt_type?: string | null
          question_id?: string
          raw_result?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          score?: number | null
          strengths?: Json | null
          suggestions?: Json | null
          task_completion?: number | null
          teacher_feedback?: string | null
          teacher_override_score?: number | null
          user_id?: string | null
          vocabulary?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_grading_results_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_grading_results_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_grading_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_usage_logs: {
        Row: {
          class_id: string | null
          created_at: string | null
          estimated_cost: number | null
          feature: string
          id: string
          input_tokens: number | null
          institution_id: string | null
          model: string
          output_tokens: number | null
          provider: string | null
          request_hash: string | null
          user_id: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          estimated_cost?: number | null
          feature: string
          id?: string
          input_tokens?: number | null
          institution_id?: string | null
          model: string
          output_tokens?: number | null
          provider?: string | null
          request_hash?: string | null
          user_id?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          estimated_cost?: number | null
          feature?: string
          id?: string
          input_tokens?: number | null
          institution_id?: string | null
          model?: string
          output_tokens?: number | null
          provider?: string | null
          request_hash?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_logs_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_usage_logs_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_usage_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_submissions: {
        Row: {
          ai_grading_result_id: string | null
          answer_text: string | null
          assignment_id: string | null
          attachment_url: string | null
          class_id: string | null
          created_at: string | null
          graded_at: string | null
          id: string
          status: string | null
          submitted_at: string | null
          teacher_feedback: string | null
          teacher_score: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          ai_grading_result_id?: string | null
          answer_text?: string | null
          assignment_id?: string | null
          attachment_url?: string | null
          class_id?: string | null
          created_at?: string | null
          graded_at?: string | null
          id?: string
          status?: string | null
          submitted_at?: string | null
          teacher_feedback?: string | null
          teacher_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          ai_grading_result_id?: string | null
          answer_text?: string | null
          assignment_id?: string | null
          attachment_url?: string | null
          class_id?: string | null
          created_at?: string | null
          graded_at?: string | null
          id?: string
          status?: string | null
          submitted_at?: string | null
          teacher_feedback?: string | null
          teacher_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_ai_grading_result_id_fkey"
            columns: ["ai_grading_result_id"]
            isOneToOne: false
            referencedRelation: "ai_grading_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          ai_grading_enabled: boolean | null
          assignment_type: string
          chapter_id: number | null
          class_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          institution_id: string | null
          module_id: string | null
          rubric: Json | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          ai_grading_enabled?: boolean | null
          assignment_type: string
          chapter_id?: number | null
          class_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          institution_id?: string | null
          module_id?: string | null
          rubric?: Json | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          ai_grading_enabled?: boolean | null
          assignment_type?: string
          chapter_id?: number | null
          class_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          institution_id?: string | null
          module_id?: string | null
          rubric?: Json | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      class_memberships: {
        Row: {
          class_id: string | null
          created_at: string | null
          id: string
          joined_at: string | null
          role_in_class: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          id?: string
          joined_at?: string | null
          role_in_class?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          id?: string
          joined_at?: string | null
          role_in_class?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_memberships_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_memberships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          institution_id: string | null
          level: string
          name: string
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          institution_id?: string | null
          level: string
          name: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          institution_id?: string | null
          level?: string
          name?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      kapitel_progress: {
        Row: {
          chapter_id: number
          class_id: string | null
          completed_at: string | null
          completed_modules: number | null
          created_at: string | null
          id: string
          last_opened_at: string | null
          mastery_score: number | null
          progress_percent: number | null
          total_modules: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          chapter_id: number
          class_id?: string | null
          completed_at?: string | null
          completed_modules?: number | null
          created_at?: string | null
          id?: string
          last_opened_at?: string | null
          mastery_score?: number | null
          progress_percent?: number | null
          total_modules?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          chapter_id?: number
          class_id?: string | null
          completed_at?: string | null
          completed_modules?: number | null
          created_at?: string | null
          id?: string
          last_opened_at?: string | null
          mastery_score?: number | null
          progress_percent?: number | null
          total_modules?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kapitel_progress_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kapitel_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      license_keys: {
        Row: {
          activated_at: string | null
          batch_id: string | null
          code: string
          created_at: string | null
          id: string
          status: string | null
          used_by: string | null
        }
        Insert: {
          activated_at?: string | null
          batch_id?: string | null
          code: string
          created_at?: string | null
          id?: string
          status?: string | null
          used_by?: string | null
        }
        Update: {
          activated_at?: string | null
          batch_id?: string | null
          code?: string
          created_at?: string | null
          id?: string
          status?: string | null
          used_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          institution_id: string | null
          role: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          institution_id?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          institution_id?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      question_attempts: {
        Row: {
          ai_feedback_id: string | null
          category: string
          chapter_id: number
          class_id: string | null
          correct_answer: Json | null
          correction_mode: string
          created_at: string | null
          id: string
          is_correct: boolean | null
          max_score: number | null
          module_id: string | null
          question_id: string
          question_type: string
          quiz_attempt_id: string | null
          score: number | null
          skill: string
          user_answer: Json | null
          user_id: string | null
        }
        Insert: {
          ai_feedback_id?: string | null
          category: string
          chapter_id: number
          class_id?: string | null
          correct_answer?: Json | null
          correction_mode: string
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          max_score?: number | null
          module_id?: string | null
          question_id: string
          question_type: string
          quiz_attempt_id?: string | null
          score?: number | null
          skill: string
          user_answer?: Json | null
          user_id?: string | null
        }
        Update: {
          ai_feedback_id?: string | null
          category?: string
          chapter_id?: number
          class_id?: string | null
          correct_answer?: Json | null
          correction_mode?: string
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          max_score?: number | null
          module_id?: string | null
          question_id?: string
          question_type?: string
          quiz_attempt_id?: string | null
          score?: number | null
          skill?: string
          user_answer?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_ai_feedback"
            columns: ["ai_feedback_id"]
            isOneToOne: false
            referencedRelation: "ai_grading_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_attempts_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_attempts_quiz_attempt_id_fkey"
            columns: ["quiz_attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          chapter_id: number
          class_id: string | null
          completed_at: string | null
          created_at: string | null
          duration_seconds: number | null
          id: string
          max_score: number | null
          passed: boolean | null
          percentage: number | null
          quiz_id: string
          score: number | null
          started_at: string | null
          user_id: string | null
        }
        Insert: {
          chapter_id: number
          class_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          max_score?: number | null
          passed?: boolean | null
          percentage?: number | null
          quiz_id: string
          score?: number | null
          started_at?: string | null
          user_id?: string | null
        }
        Update: {
          chapter_id?: number
          class_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          max_score?: number | null
          passed?: boolean | null
          percentage?: number | null
          quiz_id?: string
          score?: number | null
          started_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_company_id: { Args: never; Returns: string }
      get_user_institution: { Args: never; Returns: string }
      get_user_role: { Args: never; Returns: string }
      is_admin_of_institution: {
        Args: { target_inst_id: string }
        Returns: boolean
      }
      is_teacher_of_class: {
        Args: { target_class_id: string }
        Returns: boolean
      }
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
