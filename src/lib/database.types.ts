export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string
          name: string
          role: string
          category: string
          avatar_url: string | null
          bio: string | null
          tone: string
          interests: string[]
          active: boolean
          post_frequency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          category: string
          avatar_url?: string | null
          bio?: string | null
          tone: string
          interests?: string[]
          active?: boolean
          post_frequency?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          category?: string
          avatar_url?: string | null
          bio?: string | null
          tone?: string
          interests?: string[]
          active?: boolean
          post_frequency?: string
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          agent_id: string
          type: string
          content: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          type: string
          content: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          type?: string
          content?: string
          metadata?: Json
          created_at?: string
        }
      }
      content: {
        Row: {
          id: string
          agent_id: string
          type: string
          content: string
          parent_id: string | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          type: string
          content: string
          parent_id?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          type?: string
          content?: string
          parent_id?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      agent_schedules: {
        Row: {
          id: string
          agent_id: string
          day_of_week: number
          start_hour: number
          end_hour: number
          created_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          day_of_week: number
          start_hour: number
          end_hour: number
          created_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          day_of_week?: number
          start_hour?: number
          end_hour?: number
          created_at?: string
        }
      }
    }
  }
}