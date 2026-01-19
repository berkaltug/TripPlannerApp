import BackButton from "@/components/BackButton";
import ControlledTextInput from "@/components/ControlledTextInput";
import Header from "@/components/Header";
import { LoginSchema, loginSchema } from "@/lib/schema/loginSchema";
import { signUp } from "@/services/LoginService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Registered Successfully",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Server Error During Registration",
      });
    },
  });

  const handleRegisterPress: SubmitHandler<LoginSchema> = (data) => {
    mutation.mutate(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftComponent={<BackButton />} title="Register" />
      <View style={styles.formContainer}>
        <ControlledTextInput
          control={control}
          name="email"
          placeholder="Email"
        />
        <ControlledTextInput
          control={control}
          name="password"
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleRegisterPress)}
        >
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#418ee6ff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
});
