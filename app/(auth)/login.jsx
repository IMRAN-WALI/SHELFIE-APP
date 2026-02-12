import { Pressable, StyleSheet, Text } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { Link } from "expo-router";
import ThemedButton from "../../components/ThemedButton";
import { Colors } from "../../constants/Colors";

const Login = () => {
  const handleSubmit = () => {
    console.log("Login Form Submitted");
  };

  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title style={styles.title}>
        Login To Your Account
      </ThemedText>

      <ThemedButton onPress={handleSubmit}>
        <ThemedText style={{ color: "#f2f2f2" }}>Login</ThemedText>
      </ThemedButton>

      <Spacer height={100} />

      <Link href="/(auth)/register">
        <ThemedText style={{ textAlign: "center" }}>
          Register Instead
        </ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 30,
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 15,
  },
  pressed: {
    opacity: 0.8,
  },
});
