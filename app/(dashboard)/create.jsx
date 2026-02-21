import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { useBooks } from "../../hooks/useBooks";
import { useRouter } from "expo-router";
import ThemedTextinput from "../../components/ThemedTextinput";
import ThemedButton from "../../components/ThemedButton";

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
        <ThemedText title style={styles.heading}>
          Add A New Book
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
          placeholder="Author"
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
        />

        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: "#fff" }}>
            {loading ? "Saving..." : "Create Book"}
          </Text>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 80,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
});
