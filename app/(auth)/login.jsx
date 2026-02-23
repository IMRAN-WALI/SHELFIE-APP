import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  View,
} from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import { Colors } from "../../constants/Colors";
import ThemedTextinput from "../../components/ThemedTextinput";
import { useUser } from "../../hooks/useUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useUser();

  const handleSubmit = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email.trim(), password.trim());

      if (!result.success) {
        Alert.alert("Login Failed", result.error);
        return;
      }

      // Login successful
      console.log("Login successful:", result.data.user);
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", error.message || "An unexpected error occurred");
      console.log("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        {/* Background Decorations */}
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />

        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Feather name="log-in" size={32} color={Colors.primary} />
            </View>
            <ThemedText style={styles.welcomeText}>Welcome Back! 👋</ThemedText>
            <ThemedText style={styles.subtitle}>
              Login to continue your reading journey
            </ThemedText>
          </View>

          <Spacer height={25} />

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
              onChangeText={setEmail}
              value={email}
              editable={!isLoading}
            />
          </View>

          {/* Password Input - SAME STYLE AS EMAIL */}
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
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
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

          {/* Forgot Password Link */}
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.forgotPasswordContainer}>
              <ThemedText style={styles.forgotPasswordText}>
                Forgot Password?
              </ThemedText>
              <Feather name="help-circle" size={14} color={Colors.primary} />
            </View>
          </TouchableWithoutFeedback>

          <Spacer height={15} />

          {/* Login Button */}
          <ThemedButton
            onPress={handleSubmit}
            disabled={isLoading}
            style={styles.loginButton}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.buttonContent}>
                <ThemedText style={styles.loginButtonText}>Login</ThemedText>
              </View>
            )}
          </ThemedButton>

          <Spacer height={25} />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <ThemedText style={styles.dividerText}>OR</ThemedText>
            <View style={styles.dividerLine} />
          </View>

          <Spacer height={15} />

          {/* Register Link */}
          <Link href="/(auth)/register" asChild>
            <ThemedButton
              variant="outline"
              style={styles.registerButton}
              disabled={isLoading}
            >
              <View style={styles.registerContent}>
                <Feather name="user-plus" size={18} color={Colors.primary} />
                <ThemedText style={styles.registerButtonText}>
                  Create New Account
                </ThemedText>
              </View>
            </ThemedButton>
          </Link>
        </View>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

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
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primaryDark,
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
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
  forgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    height: 55,
    borderRadius: 15,
    backgroundColor: Colors.primary,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "black",
    fontSize: 15,
    fontWeight: "500",
  },
  registerButton: {
    width: "100%",
    height: 55,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: "transparent",
  },
  registerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  registerButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
