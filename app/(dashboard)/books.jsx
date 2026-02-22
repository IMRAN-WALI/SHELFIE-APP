import React from "react";
import { StyleSheet, FlatList, Pressable, Alert } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { useBooks } from "../../hooks/useBooks";
import ThemedCard from "../../components/ThemedCard";
import { Colors } from "../../constants/Colors";

const Books = () => {
  const { books, loading, deleteBook } = useBooks();

  const handleLongPress = (id) => {
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

      <ThemedText title style={styles.heading}>
        Your Reading List
      </ThemedText>

      <Spacer />

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>
            No books added yet 📚
          </ThemedText>
        }
        renderItem={({ item }) => (
          <Pressable
            onLongPress={() => handleLongPress(item.id)}
            android_ripple={{ color: "#ccc" }}
          >
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText>Written By {item.author}</ThemedText>
            </ThemedCard>
          </Pressable>
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
  },
  heading: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  list: {
    marginTop: 30,
    paddingBottom: 40,
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    padding: 18,
    marginBottom: 15,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
