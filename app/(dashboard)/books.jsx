import React from "react";
import { StyleSheet, FlatList, Alert, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThemedCard from "../../components/ThemedCard";
import { useBooks } from "../../hooks/useBooks";
import { Colors } from "../../constants/Colors";

const Books = () => {
  const { books, loading, deleteBook } = useBooks();

  const handleDelete = (id) => {
    Alert.alert("Delete Book", "Do you want to delete this book?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteBook(id),
      },
    ]);
  };

  if (loading) {
    return (
      <ThemedView style={styles.container} safe>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container} safe>
      <Spacer />

      <ThemedText style={styles.heading}>Your Reading List 📖</ThemedText>

      <ThemedText style={styles.subHeading}>
        Tap the 3 dots to manage a book
      </ThemedText>

      <Spacer />

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="book-open" size={50} color={Colors.primary} />
            <ThemedText style={styles.emptyText}>No books added yet</ThemedText>
            <ThemedText style={styles.emptySub}>
              Start building your library 🚀
            </ThemedText>
          </View>
        }
        renderItem={({ item }) => (
          <ThemedCard style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <ThemedText style={styles.title}>{item.title}</ThemedText>

                <Pressable onPress={() => handleDelete(item.id)} hitSlop={10}>
                  <Feather name="more-vertical" size={20} color="#666" />
                </Pressable>
              </View>

              <ThemedText style={styles.author}>
                Written by {item.author}
              </ThemedText>
            </View>
          </ThemedCard>
        )}
      />
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f1fb",
  },

  heading: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },

  subHeading: {
    textAlign: "center",
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },

  list: {
    paddingTop: 20,
    paddingBottom: 40,
  },

  card: {
    borderRadius: 18,
    backgroundColor: "#ffffff",
    marginBottom: 10,

    // Left purple border
    borderLeftWidth: 6,
    borderLeftColor: Colors.primary,

    // Regular shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,

    // Other borders subtle
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#f0f0f0",
    borderRightColor: "#f0f0f0",
    borderBottomColor: "#f0f0f0",
  },

  cardContent: {
    padding: 10,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
    color: "#333",
  },

  author: {
    fontSize: 10,
    color: "#666",
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },

  emptySub: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
  },
});
