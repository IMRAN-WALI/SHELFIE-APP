import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";

function ThemedButton({ style, children, ...props }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
      {...props}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default ThemedButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: 100,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: "#f2f2f2",
    fontSize: 16,
    fontWeight: "600",
  },
});
