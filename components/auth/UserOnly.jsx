import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { UserContext } from "../../contexts/UserContext";

const UserOnly = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // Jab loading complete ho jaye aur user exist na kare
    if (!loading && !user) {
      router.replace("/(auth)/login");
    }
  }, [user, loading]);

  // Jab tak Supabase user check kar raha hai
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Checking Authentication...</Text>
      </View>
    );
  }

  // Agar user nahi hai to kuch render mat karo (redirect ho raha hoga)
  if (!user) return null;

  // Agar user hai to protected screen show karo
  return children;
};

export default UserOnly;
