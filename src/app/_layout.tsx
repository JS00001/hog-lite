import { Slot } from "expo-router";

import "@/app/globals.css";
import AuthProvider from "@/providers/Auth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
