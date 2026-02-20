import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { BooksContext } from "../../contexts/BooksContext";

const Books = () => {
  // Context se sab kuch le rahe hain
  const { books, loading, fetchBooks, createBook, deleteBook } =
    useContext(BooksContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  // ➕ Add Book
  const handleAddBook = async () => {
    if (!title.trim() || !author.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setSubmitting(true);
    const success = await createBook({
      title: title.trim(),
      author: author.trim(),
    });

    if (success) {
      setTitle("");
      setAuthor("");
    }
    setSubmitting(false);
  };

  // ❌ Delete Book with confirmation
  const handleDeleteBook = (id, bookTitle) => {
    Alert.alert(
      "Delete Book",
      `Are you sure you want to delete "${bookTitle}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteBook(id),
          style: "destructive",
        },
      ],
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText title={true} style={styles.heading}>
        Your Books
      </ThemedText>

      <Spacer />

      {/* Input Fields */}
      <TextInput
        placeholder="Book Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        editable={!submitting}
      />
      <TextInput
        placeholder="Author Name"
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        editable={!submitting}
      />

      <TouchableOpacity
        style={[styles.addButton, submitting && styles.disabledButton]}
        onPress={handleAddBook}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <ThemedText style={styles.buttonText}>Add Book</ThemedText>
        )}
      </TouchableOpacity>

      <Spacer />

      {loading ? (
        <ActivityIndicator size="large" color="#6849a7" />
      ) : books.length === 0 ? (
        <ThemedText style={styles.emptyText}>No books added yet 📚</ThemedText>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookItem}
              onPress={() => handleDeleteBook(item.id, item.title)}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.bookTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.bookAuthor}>{item.author}</ThemedText>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#6849a7",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  disabledButton: {
    backgroundColor: "#a58bd1",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  bookItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  bookTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
