import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import ThemedLoader from "../ThemedLoader";

const UserOnly = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // Jab loading complete ho jaye aur user exist na kare
    if (!loading && !user) {
      router.replace("/(auth)/login");
    }
  }, [user, loading]);

  if (loading) {
    return <ThemedLoader />;
  }

  // Agar user nahi hai to kuch render mat karo (redirect ho raha hoga)
  if (!user) return null;

  // Agar user hai to protected screen show karo
  return children;
};

export default UserOnly;
