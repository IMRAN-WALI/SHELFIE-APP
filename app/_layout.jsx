import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../contexts/UserContext";
import { BooksProvider } from "../contexts/BooksContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <SafeAreaProvider>
      <UserProvider>
        <BooksProvider>
          <StatusBar style="dark" translucent={false} />

          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.navBackground,
              },
              headerTintColor: theme.title,
              headerTitleAlign: "center",
              headerStatusBarHeight: 0,
            }}
          >
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          </Stack>
        </BooksProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
