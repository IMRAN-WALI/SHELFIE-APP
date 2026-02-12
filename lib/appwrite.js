import { Client, Account, Avatars } from "react-native-appwrite";

export const client = new Client()
  .setProject("697f72590008484f5756")
  .setPlatform("SHELFIE-APP");

export const account = new Account(client);
export const avatars = new Avatars(client);
