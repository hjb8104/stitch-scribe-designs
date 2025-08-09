import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ldbkfjhkcgkzgxcmhhrc.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkYmtmamhrY2dremN4Y21oaHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3Nzk5NTIsImV4cCI6MjA0OTM1NTk1Mn0.M2-sBGX_4eEOtL48tJVLhIoQQCTHjC-bSjvdT7QJ_HM"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)