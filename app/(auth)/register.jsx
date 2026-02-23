import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  View,
} from "react-native";
import { useState } from "react";
import { router, Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextinput from "../../components/ThemedTextinput";
import Spacer from "../../components/Spacer";
import Colors from "../../constants/Colors";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          "🎉 Registration Successful",
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
        {/* Background Decoration */}
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />

        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Feather name="user-plus" size={32} color={Colors.primary} />
            </View>
            <ThemedText style={styles.title}>Create Account</ThemedText>
            <ThemedText style={styles.subtitle}>
              Join the Shelfie community 📚
            </ThemedText>
          </View>

          <Spacer height={20} />

          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Feather
              name="mail"
              size={20}
              color={Colors.primary}
              style={styles.inputIcon}
            />
            <ThemedTextinput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Feather
              name="lock"
              size={20}
              color={Colors.primary}
              style={styles.inputIcon}
            />
            <ThemedTextinput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
            />
            <TouchableWithoutFeedback
              onPress={() => setShowPassword(!showPassword)}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#999"
                style={styles.eyeIcon}
              />
            </TouchableWithoutFeedback>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputWrapper}>
            <Feather
              name="shield"
              size={20}
              color={Colors.primary}
              style={styles.inputIcon}
            />
            <ThemedTextinput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!isLoading}
            />
            <TouchableWithoutFeedback
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Feather
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={20}
                color="#999"
                style={styles.eyeIcon}
              />
            </TouchableWithoutFeedback>
          </View>

          {/* Password Hint with Strength Indicator */}
          <View style={styles.passwordHintContainer}>
            <View style={styles.passwordStrength}>
              {[1, 2, 3].map((item) => (
                <View
                  key={item}
                  style={[
                    styles.strengthBar,
                    {
                      backgroundColor:
                        password.length >= item * 2
                          ? password.length >= 8
                            ? Colors.success
                            : Colors.warning
                          : "#e0e0e0",
                    },
                  ]}
                />
              ))}
            </View>
            <ThemedText style={styles.passwordHint}>
              {password.length < 6
                ? "❌ Minimum 6 characters"
                : password.length < 8
                  ? "⚠️ Getting stronger"
                  : "✅ Strong password"}
            </ThemedText>
          </View>

          <Spacer height={10} />

          {/* Register Button */}
          <ThemedButton
            onPress={handleSubmit}
            disabled={isLoading}
            style={styles.registerButton}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Create Account</Text>
              </View>
            )}
          </ThemedButton>

          {/* Login Link */}
          <Link href="/(auth)/login" asChild>
            <ThemedButton
              variant="secondary"
              style={styles.loginLink}
              disabled={isLoading}
            >
              <ThemedText style={styles.loginText}>
                Already have an account?{" "}
                <Text style={styles.loginHighlight}>Login</Text>
              </ThemedText>
            </ThemedButton>
          </Link>

          {/* Terms Text */}
          <ThemedText style={styles.termsText}>
            By registering, you agree to our{"\n"}
            <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </ThemedText>
        </View>
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
    backgroundColor: "#f8f4ff",
    position: "relative",
  },
  bgCircle1: {
    position: "absolute",
    top: -100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(104, 73, 167, 0.05)",
  },
  bgCircle2: {
    position: "absolute",
    bottom: -80,
    left: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(104, 73, 167, 0.05)",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 30,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(104, 73, 167, 0.1)",
  },
  header: {
    alignItems: "center",
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(104, 73, 167, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primaryDark,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f4ff",
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(104, 73, 167, 0.2)",
    paddingHorizontal: 15,
    height: 60,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
    backgroundColor: "transparent",
  },
  eyeIcon: {
    padding: 10,
  },
  passwordHintContainer: {
    width: "100%",
    marginBottom: 20,
  },
  passwordStrength: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  passwordHint: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
  registerButton: {
    height: 55,
    borderRadius: 15,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  loginLink: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginTop: 15,
  },
  loginText: {
    color: "#666",
    fontSize: 14,
  },
  loginHighlight: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: "500",
  },
});
