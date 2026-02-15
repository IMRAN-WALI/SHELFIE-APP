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

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      if (!result.success) {
        // Handle specific Supabase errors
        if (result.error.includes("User already registered")) {
          Alert.alert(
            "Account Exists",
            "An account with this email already exists. Please login instead.",
            [
              { text: "OK" },
              { text: "Login", onPress: () => router.push("/(auth)/login") },
            ],
          );
        } else {
          Alert.alert("Registration Failed", result.error);
        }
        return;
      }

      // Success - show appropriate message based on email confirmation setting
      Alert.alert(
        "Registration Successful",
        "Your account has been created successfully! Please check your email to verify your account before logging in.",
        [
          {
            text: "OK",
            onPress: () => router.push("/(auth)/login"),
          },
        ],
      );

      console.log("Register Form Submitted", email, password);
    } catch (error) {
      Alert.alert("Error", error.message || "An unexpected error occurred");
      console.log("Register error:", error);
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

        {/* Email field */}
        <ThemedTextinput
          style={{ width: "80%", marginBottom: 20 }}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
          editable={!isLoading}
        />

        {/* Password field */}
        <ThemedTextinput
          style={{ width: "80%", marginBottom: 20 }}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          editable={!isLoading}
        />

        {/* Confirm Password field */}
        <ThemedTextinput
          style={{ width: "80%", marginBottom: 20 }}
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          editable={!isLoading}
        />

        {/* Password hint */}
        <ThemedText style={styles.passwordHint}>
          Password must be at least 6 characters long
        </ThemedText>

        {/* Register Button */}
        <ThemedButton onPress={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#f2f2f2" />
          ) : (
            <Text style={{ color: "#f2f2f2" }}>Register</Text>
          )}
        </ThemedButton>

        {/* Link to Login */}
        <Link href="/(auth)/login" asChild>
          <ThemedButton
            variant="secondary"
            style={styles.loginLink}
            disabled={isLoading}
          >
            <ThemedText>Already have an account? Login</ThemedText>
          </ThemedButton>
        </Link>

        {/* Terms and conditions (optional) */}
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
