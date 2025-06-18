import { createClient, SupabaseClient } from "@supabase/supabase-js";
import path from "path";

// Debug environment loading
console.log("Current working directory:", process.cwd());
// console.log("Environment variables loaded:", {
//   SUPABASE_URL: process.env.SUPABASE_URL,
//   SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? "exists" : "missing",
//   NODE_ENV: process.env.NODE_ENV,
// });

const supabaseUrl = "https://sxxhrbmncmonoaohmgnv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4eGhyYm1uY21vbm9hb2htZ252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNTQxMDQsImV4cCI6MjA2NTczMDEwNH0.Qg-aFKteqtY0GnlI9IvyirYGAtEOlnn70V1_Zf4Hhnk";
const supabaseServiceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4eGhyYm1uY21vbm9hb2htZ252Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDE1NDEwNCwiZXhwIjoyMDY1NzMwMTA0fQ.yfIkaUQwpQ3_uvKbesUecih4Fl7guF_mk2cxF4MqxSI";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}
// Client for regular operations (respects Row Level Security)
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Admin client for server-side operations (bypasses Row Level Security)
export const supabaseAdmin: SupabaseClient = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Test connection function
export const testConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("count")
      .limit(1);
    if (error) {
      console.error("Supabase connection error:", error.message);
      return false;
    }
    console.log("✅ Supabase connected successfully");
    return true;
  } catch (error) {
    console.error("❌ Supabase connection failed:", error);
    return false;
  }
};
