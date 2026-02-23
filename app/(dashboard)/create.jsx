import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThemedTextinput from "../../components/ThemedTextinput";
import ThemedButton from "../../components/ThemedButton";

import { useBooks } from "../../hooks/useBooks";
import { Colors } from "../../constants/Colors";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { createBook } = useBooks();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim() || !description.trim()) return;

    setLoading(true);

    const success = await createBook({
      title,
      author,
      description,
    });

    if (success) {
      setTitle("");
      setAuthor("");
      setDescription("");
      router.replace("/books");
    }

    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <ThemedText style={styles.heading}>Add A New Book 📚</ThemedText>

            <ThemedText style={styles.subtitle}>
              Fill in the details below
            </ThemedText>

            <Spacer />

            <ThemedTextinput
              style={styles.input}
              placeholder="Book Title"
              value={title}
              onChangeText={setTitle}
            />

            <Spacer />

            <ThemedTextinput
              style={styles.input}
              placeholder="Author Name"
              value={author}
              onChangeText={setAuthor}
            />

            <Spacer />

            <ThemedTextinput
              style={styles.multiline}
              placeholder="Book Description"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />

            <Spacer />

            <ThemedButton
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              <ThemedText style={styles.buttonText}>
                {loading ? "Saving..." : "Create Book"}
              </ThemedText>
            </ThemedButton>
          </View>
        </ScrollView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f1fb",
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 25,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#f2f2f2",
  },

  multiline: {
    padding: 15,
    borderRadius: 14,
    backgroundColor: "#f2f2f2",
    minHeight: 100,
  },

  button: {
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
