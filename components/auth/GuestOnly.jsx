import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import ThemedLoader from "../ThemedLoader";

const GuestOnly = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // Jab auth check complete ho jaye aur user logged in ho
    if (!loading && user) {
      router.replace("/(dashboard)/profile");
    }
  }, [user, loading]);

  if (loading) {
    return <ThemedLoader />;
  }

  // Agar user logged in hai to kuch render mat karo (redirect ho raha hoga)
  if (user) return null;

  // Agar user guest hai to page show karo
  return children;
};

export default GuestOnly;
