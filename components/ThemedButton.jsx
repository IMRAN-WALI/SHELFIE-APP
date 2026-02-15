import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

function ThemedButton({ style, children, variant = "primary", ...props }) {
  const backgroundStyle =
    variant === "outline"
      ? {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: Colors.primary,
        }
      : variant === "text"
        ? {
            backgroundColor: "transparent",
          }
        : {
            backgroundColor: Colors.primary,
          };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        backgroundStyle,
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      {children}
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
