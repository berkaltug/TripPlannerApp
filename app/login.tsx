import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

import GoogleSignInButton from "@/components/social-auth-buttons/GoogleSignInButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewLoginScreen() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <GoogleSignInButton />
        <Text>Login</Text>
        <Link href="/" style={styles.link}>
          <Text>Try to navigate to home screen!</Text>
        </Link>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
