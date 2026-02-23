import { StyleSheet, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import { useUser } from "../../hooks/useUser";
import { Colors } from "../../constants/Colors";

const Profile = () => {
  const { logout, user } = useUser();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        {/* Profile Icon */}
        <View style={styles.avatar}>
          <Feather name="user" size={40} color="#fff" />
        </View>

        {/* Email */}
        <ThemedText style={styles.email}>
          {user?.email || "Your Email"}
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Time To Start Reading Some Books 📚
        </ThemedText>

        <Spacer />

        {/* Logout Button */}
        <ThemedButton style={styles.logoutButton} onPress={logout}>
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </ThemedButton>
      </View>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f1fb",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 30,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  email: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  logoutButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryDark,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
