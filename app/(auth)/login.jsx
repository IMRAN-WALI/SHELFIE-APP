import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  View, // 👈 IMPORT ADD KARO
} from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { Link, router } from "expo-router";
import ThemedButton from "../../components/ThemedButton";
import { Colors } from "../../constants/Colors";
import ThemedTextinput from "../../components/ThemedTextinput";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword] = useState(false);

  const { login } = useUser();

  const handleSubmit = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        Alert.alert("Login Failed", result.error);
        return;
      }

      // Login successful
      console.log("Login successful:", result.data.user);
      router.replace("/(tabs)");
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
        <Spacer height={50} />

        <ThemedText title style={styles.welcomeText}>
          Welcome Back! 👋
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Login to continue to your account
        </ThemedText>

        <Spacer height={30} />

        {/* Email Input */}
        <ThemedTextinput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
          editable={!isLoading}
        />

        {/* Password Input */}
        <ThemedTextinput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
          editable={!isLoading}
        />

        {/* Forgot Password Link */}
        <ThemedButton
          variant="text"
          onPress={() => {}}
          style={styles.forgotPassword}
          disabled={isLoading}
        >
          <ThemedText style={styles.forgotPasswordText}>
            Forgot Password?
          </ThemedText>
        </ThemedButton>

        {/* Login Button */}
        <ThemedButton
          onPress={handleSubmit}
          disabled={isLoading}
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
        >
          {isLoading ? (
            <ActivityIndicator color="#f2f2f2" />
          ) : (
            <ThemedText style={styles.loginButtonText}>Login</ThemedText>
          )}
        </ThemedButton>

        <Spacer height={20} />

        {/* Divider - YAHAN VIEW USE HUA HAI */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <ThemedText style={styles.dividerText}>OR</ThemedText>
          <View style={styles.dividerLine} />
        </View>

        <Spacer height={20} />

        {/* Register Link */}
        <Link href="/(auth)/register" asChild>
          <ThemedButton
            variant="outline"
            style={{ backgroundColor: Colors.primary, width: "100%" }}
            disabled={isLoading}
          >
            <ThemedText style={styles.registerButtonText}>
              Create New Account
            </ThemedText>
          </ThemedButton>
        </Link>
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
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
    color: Colors.primary,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    padding: 5,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
  },
  loginButton: {
    width: "100%",
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.black,
  },
  dividerText: {
    marginHorizontal: 10,
    color: Colors.black,
    fontSize: 15,
    fontWeight: "bold",
  },
  registerButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
