import { Stack } from "expo-router";

import { SplashScreenController } from "@/components/SplashScreenController";

import { useAuthContext } from "@/hooks/useAuthContext";
import AuthProvider from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

// Separate RootNavigator so we can access the AuthContext
function RootNavigator() {
  const { isLoggedIn } = useAuthContext();
  console.log("isLoggedIn", isLoggedIn);

  return (
    <>
      <Stack>
        <Stack.Protected guard={!!isLoggedIn}>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Screen name="+not-found" />
      </Stack>
      {/* toast messages should render above all navigation so they don't disappear */}
      <Toast />
    </>
  );
}

const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </AuthProvider>
  );
}
