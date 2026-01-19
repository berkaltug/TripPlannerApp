import { useAuthContext } from "@/hooks/useAuthContext";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useAuthContext();
  console.log("isLoading authcontext", isLoading);

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
