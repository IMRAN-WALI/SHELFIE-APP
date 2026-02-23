import { StyleSheet, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { Feather } from "@expo/vector-icons";

import ThemedView from "../components/ThemedView";
import ThemedLogo from "../components/ThemedLogo";
import ThemedText from "../components/ThemedText";
import ThemedButton from "../components/ThemedButton";
import { Colors } from "../constants/Colors";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL();
      if (url?.includes("reset-password")) {
        router.replace("/(auth)/login");
      }
    };

    handleDeepLink();

    const subscription = Linking.addEventListener("url", (event) => {
      if (event.url.includes("reset-password")) {
        router.replace("/(auth)/login");
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedLogo style={styles.logo} />

        <ThemedText style={styles.title}>Welcome to Shelfie 📖</ThemedText>

        <ThemedText style={styles.subtitle}>
          My First Mobile Application As A Beginner
        </ThemedText>

        {/* LOGIN BUTTON */}
        <Link href="/(auth)/login" asChild>
          <ThemedButton style={styles.fullButton}>
            <ThemedText style={styles.buttonText}>Login</ThemedText>
          </ThemedButton>
        </Link>

        {/* REGISTER BUTTON */}
        <Link href="/(auth)/register" asChild>
          <ThemedButton variant="outline" style={styles.fullButton}>
            <ThemedText style={styles.outlineText}>Register</ThemedText>
          </ThemedButton>
        </Link>

        {/* PROFILE LINK WITH VIP ARROW */}
        <Link href="/(dashboard)/profile" style={styles.profileLink}>
          <View style={styles.profileRow}>
            <ThemedText style={styles.profileText}>Go to Profile</ThemedText>

            <Feather
              name="arrow-up-right"
              size={18}
              color={Colors.primaryDark}
              style={{ marginLeft: 6 }}
            />
          </View>
        </Link>
      </View>
    </ThemedView>
  );
}

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
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },

  fullButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  outlineText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  profileLink: {
    marginTop: 12,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileText: {
    color: Colors.primaryDark,
    fontWeight: "600",
    fontSize: 15,
  },
});
