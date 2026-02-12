import { Image, useColorScheme } from "react-native";
import DarkLogo from "../assets/img/shelfie-1.png";
import LightLogo from "../assets/img/shelfie-2.jpg";

const ThemedLogo = ({ ...props }) => {
  const colorScheme = useColorScheme();
  const logo = colorScheme === "dark" ? DarkLogo : LightLogo;
  return <Image source={logo} {...props} />;
};

export default ThemedLogo;
