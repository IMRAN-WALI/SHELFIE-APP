import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { UserContext } from "../../contexts/UserContext";

const GuestOnly = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // Jab auth check complete ho jaye aur user logged in ho
    if (!loading && user) {
      router.replace("/(dashboard)/profile");
    }
  }, [user, loading]);

  // Jab tak Supabase check kar raha hai
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Checking Authentication...</Text>
      </View>
    );
  }

  // Agar user logged in hai to kuch render mat karo (redirect ho raha hoga)
  if (user) return null;

  // Agar user guest hai to page show karo
  return children;
};

export default GuestOnly;
