import { createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check current user
  async function checkUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

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
        email: email,
        password: password,
        options: {
          data: {
            name: name, // Extra user metadata
            // Agar kuch aur chahiye to yahan add karo
          },
        },
      });

      if (error) throw error;

      // Note: Supabase mein email confirmation enable ho sakti hai
      // Agar email confirmation on hai to user tab tak null rahega jab tak confirm na kare
      if (data.user) {
        setUser(data.user);
      }

      return { success: true, data };
    } catch (error) {
      console.log("Register error:", error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  // LOGOUT - Appwrite ke deleteSession ki jagah
  async function logout() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setUser(null);
      return { success: true };
    } catch (error) {
      console.log("Logout error:", error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  // Password Reset (optional)
  async function resetPassword(email) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "yourapp://reset-password", // Apna deep link yahan daalo
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.log("Reset password error:", error.message);
      return { success: false, error: error.message };
    }
  }

  // Update Profile (optional)
  async function updateProfile(updates) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      });

      if (error) throw error;

      setUser(data.user);
      return { success: true, data };
    } catch (error) {
      console.log("Update profile error:", error.message);
      return { success: false, error: error.message };
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
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
