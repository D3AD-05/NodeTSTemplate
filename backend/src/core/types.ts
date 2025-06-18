// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Environment variables type
export interface EnvConfig {
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

// User types (example for Supabase)
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// Request extensions
export interface AuthenticatedRequest extends Request {
  user?: User;
}
