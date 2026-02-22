import React, { createContext, useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";

export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all books
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("Books") // ← Capital B
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBooks(data || []);
    } catch (error) {
      setError(error.message);
      console.error("Fetch Books Error:", error.message);
      Alert.alert("Error", "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single book by ID
  const fetchBookById = useCallback(async (id) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from("Books") // ← Capital B
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Fetch Book By ID Error:", error.message);
      Alert.alert("Error", "Failed to fetch book details");
      return null;
    }
  }, []);

  // Create new book
  const createBook = useCallback(
    async ({ title, author }) => {
      try {
        setError(null);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          Alert.alert("Error", "Please login to add books");
          throw new Error("User not logged in");
        }

        const { error } = await supabase
          .from("Books") // ← Capital B
          .insert([
            {
              title,
              author,
              user_id: user.id,
            },
          ]);

        if (error) throw error;

        Alert.alert("Success", "Book added successfully!");
        await fetchBooks(); // refresh list
        return true;
      } catch (error) {
        console.error("Create Book Error:", error.message);
        Alert.alert("Error", "Failed to add book");
        return false;
      }
    },
    [fetchBooks],
  );

  // Delete book
  const deleteBook = useCallback(
    async (id) => {
      try {
        setError(null);

        const { error } = await supabase
          .from("Books") // ← Capital B
          .delete()
          .eq("id", id);

        if (error) throw error;

        Alert.alert("Success", "Book deleted successfully!");
        await fetchBooks();
        return true;
      } catch (error) {
        console.error("Delete Book Error:", error.message);
        Alert.alert("Error", "Failed to delete book");
        return false;
      }
    },
    [fetchBooks],
  );

  // Initial fetch
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        error,
        fetchBooks,
        fetchBookById,
        createBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
