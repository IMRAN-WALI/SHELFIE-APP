import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext.jsx";

export function useBooks() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooks Must Be Used Within A BooksProvider");
  }

  return context;
}
