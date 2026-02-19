import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { router, Link } from "expo-router";
import { supabase } from "../../lib/supabase";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextinput from "../../components/ThemedTextinput";
import Spacer from "../../components/Spacer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (isLoading) return;

    // Basic Validation
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        const message = error.message.toLowerCase();

        if (message.includes("rate limit")) {
          Alert.alert(
            "Too Many Attempts",
            "You are trying too many times. Please wait a few minutes and try again.",
          );
        } else if (message.includes("already registered")) {
          Alert.alert(
            "Account Exists",
            "This email is already registered. Please login instead.",
            [
              { text: "OK" },
              { text: "Login", onPress: () => router.push("/(auth)/login") },
            ],
          );
        } else {
          Alert.alert("Registration Failed", error.message);
        }

        return;
      }

      if (data?.user) {
        Alert.alert(
          "Registration Successful",
          "Your account has been created successfully!",
          [
            {
              text: "Go to Login",
              onPress: () => router.replace("/(auth)/login"),
            },
          ],
        );
      }
    } catch (err) {
      console.log("Register error:", err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />

        <ThemedText title style={styles.title}>
          Create Account
        </ThemedText>

        <ThemedTextinput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!isLoading}
        />

        <ThemedTextinput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        />

        <ThemedTextinput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!isLoading}
        />

        <ThemedText style={styles.passwordHint}>
          Password must be at least 6 characters long
        </ThemedText>

        <ThemedButton onPress={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff" }}>Register</Text>
          )}
        </ThemedButton>

        <Link href="/(auth)/login" asChild>
          <ThemedButton
            variant="secondary"
            style={styles.loginLink}
            disabled={isLoading}
          >
            <ThemedText>Already have an account? Login</ThemedText>
          </ThemedButton>
        </Link>

        <ThemedText style={styles.termsText}>
          By registering, you agree to our Terms of Service and Privacy Policy
        </ThemedText>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    marginBottom: 20,
  },
  passwordHint: {
    fontSize: 12,
    color: "#666",
    marginBottom: 20,
    width: "80%",
  },
  loginLink: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  termsText: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
