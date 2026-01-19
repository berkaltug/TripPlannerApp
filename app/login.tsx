import { StyleSheet, Text, TouchableOpacity } from "react-native";

import ControlledTextInput from "@/components/ControlledTextInput";
import GoogleSignInButton from "@/components/social-auth-buttons/GoogleSignInButton";
import { LoginSchema, loginSchema } from "@/lib/schema/loginSchema";
import { signIn } from "@/services/LoginService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function ViewLoginScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Login Successful",
      });
      router.navigate("/");
    },
    onError: (error) => {
      console.error(error);

      Toast.show({
        type: "error",
        text1: error.message,
      });
    },
  });
  const handleLoginPress: SubmitHandler<LoginSchema> = (data) => {
    mutation.mutate(data);
  };

  const goToSignup = () => {
    router.push("/register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ControlledTextInput control={control} name="email" placeholder="Email" />
      <ControlledTextInput
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleLoginPress)}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToSignup}>
        <Text>Register</Text>
      </TouchableOpacity>
      <GoogleSignInButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#418ee6ff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
});
