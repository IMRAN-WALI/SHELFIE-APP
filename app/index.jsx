import { StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import Logo from "../assets/img/shelfie-2.jpg";
import ThemedView from "../components/ThemedView";
import ThemedLogo from "../components/ThemedLogo";
import ThemedText from "../components/ThemedText";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL();

      if (url?.includes("reset-password")) {
        // Reset link detect hua to login page open karo
        router.replace("/(auth)/login");
      }
    };

    handleDeepLink();

    // App already open ho aur link aaye tab bhi handle kare
    const subscription = Linking.addEventListener("url", (event) => {
      if (event.url.includes("reset-password")) {
        router.replace("/(auth)/login");
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedLogo source={Logo} style={styles.Img} />
      <ThemedText style={styles.title}>Welcome to Shelfie 🔥</ThemedText>
      <ThemedText style={{ marginTop: 10 }}>
        My First Mobile Application As A Beginner
      </ThemedText>

      <Link href="/(auth)/login" style={styles.link}>
        <ThemedText>Login Page</ThemedText>
      </Link>

      <Link href="/(auth)/register" style={styles.link}>
        <ThemedText>Register Page</ThemedText>
      </Link>

      <Link href="/(dashboard)/profile" style={styles.link}>
        <ThemedText>Profile Page</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    color: "blue",
  },
  Img: {
    marginVertical: 15,
  },
});
