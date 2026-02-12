import { TextInput, useColorScheme } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const ThemedTextinput = ({ style, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 20,
          borderRadius: 5,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedTextinput;
