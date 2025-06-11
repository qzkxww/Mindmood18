import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Database types based on your schema
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          plan_type: string | null
          subscription_status: string | null
          onboarding_completed: boolean | null
          assessment_results: any | null
          personalized_plan: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          plan_type?: string | null
          subscription_status?: string | null
          onboarding_completed?: boolean | null
          assessment_results?: any | null
          personalized_plan?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          plan_type?: string | null
          subscription_status?: string | null
          onboarding_completed?: boolean | null
          assessment_results?: any | null
          personalized_plan?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      mood_entries: {
        Row: {
          id: string
          user_id: string
          mood_value: number
          energy_value: number
          notes: string | null
          date: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          mood_value: number
          energy_value: number
          notes?: string | null
          date?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          mood_value?: number
          energy_value?: number
          notes?: string | null
          date?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      ai_conversations: {
        Row: {
          id: string
          user_id: string
          title: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      ai_messages: {
        Row: {
          id: string
          conversation_id: string
          user_id: string
          content: string
          is_user_message: boolean
          created_at: string | null
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id: string
          content: string
          is_user_message?: boolean
          created_at?: string | null
        }
        Update: {
          id?: string
          conversation_id?: string
          user_id?: string
          content?: string
          is_user_message?: boolean
          created_at?: string | null
        }
      }
      user_insights: {
        Row: {
          id: string
          user_id: string
          insight_type: string
          title: string
          description: string
          data_points: any | null
          date_generated: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          insight_type: string
          title: string
          description: string
          data_points?: any | null
          date_generated?: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          insight_type?: string
          title?: string
          description?: string
          data_points?: any | null
          date_generated?: string
          created_at?: string | null
        }
      }
      daily_tips: {
        Row: {
          id: string
          user_id: string
          tip_content: string
          tip_category: string | null
          date_shown: string
          is_personalized: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          tip_content: string
          tip_category?: string | null
          date_shown?: string
          is_personalized?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          tip_content?: string
          tip_category?: string | null
          date_shown?: string
          is_personalized?: boolean | null
          created_at?: string | null
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          notification_enabled: boolean | null
          reminder_time: string | null
          theme_preference: string | null
          language: string | null
          data_export_enabled: boolean | null
          analytics_enabled: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          notification_enabled?: boolean | null
          reminder_time?: string | null
          theme_preference?: string | null
          language?: string | null
          data_export_enabled?: boolean | null
          analytics_enabled?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          notification_enabled?: boolean | null
          reminder_time?: string | null
          theme_preference?: string | null
          language?: string | null
          data_export_enabled?: boolean | null
          analytics_enabled?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}