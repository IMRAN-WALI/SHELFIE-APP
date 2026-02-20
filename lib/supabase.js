import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

try {
  // Agar version 2.0+ use kar rahe hain
  ({ processLock } = require("@supabase/supabase-js"));
} catch (e) {
  // processLock available nahi hai, ignore karo
  console.log("processLock not available in this version");
}

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  "https://lbrahropzucefxulyvdy.supabase.co";
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicmFocm9wenVjZWZ4dWx5dmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTA2NTYsImV4cCI6MjA4NjYyNjY1Nn0.dtZewoK_LKrk2LHd-9OfX-QXm11joYj35ZIboqx2JaA";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase URL or Anon Key is missing! Check your .env file");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
