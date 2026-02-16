import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { Link, router } from "expo-router";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextinput from "../../components/ThemedTextinput";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
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
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          Alert.alert(
            "Account Exists",
            "An account with this email already exists. Please login instead.",
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

      Alert.alert(
        "Registration Successful",
        "Your account has been created! Please check your email to verify your account.",
        [
          {
            text: "OK",
            onPress: () => router.push("/(auth)/login"),
          },
        ],
      );
    } catch (err) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.log("Register error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />

        <ThemedText title={true} style={styles.title}>
          Create Account
        </ThemedText>

        <ThemedTextinput
          style={{ width: "80%", marginBottom: 20 }}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
          editable={!isLoading}
        />

        <ThemedTextinput
          style={{ width: "80%", marginBottom: 20 }}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          editable={!isLoading}
        />

        <ThemedTextinput
          style={{ width: "80%", marginBottom: 20 }}
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          editable={!isLoading}
        />

        <ThemedText style={styles.passwordHint}>
          Password must be at least 6 characters long
        </ThemedText>

        <ThemedButton onPress={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#f2f2f2" />
          ) : (
            <Text style={{ color: "#f2f2f2" }}>Register</Text>
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
  passwordHint: {
    fontSize: 12,
    color: "#666",
    marginBottom: 20,
    textAlign: "left",
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
