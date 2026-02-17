import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pehle current user check karo
    checkUser();

    // Auth changes suno
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", session?.user?.email);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      console.log("Current user:", user?.email);
      setUser(user);
    } catch (error) {
      console.log("Error checking user:", error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    try {
      setLoading(true);
      console.log("Logging in with:", email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("Login successful:", data.user?.email);
      setUser(data.user);
      return { success: true, data };
    } catch (error) {
      console.log("Login error:", error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  async function register(email, password, name = "") {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) throw error;

      console.log("Register successful:", data.user?.email);
      setUser(data.user);
      return { success: true, data };
    } catch (error) {
      console.log("Register error:", error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      console.log("Logout successful");
      setUser(null);
      return { success: true };
    } catch (error) {
      console.log("Logout error:", error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
