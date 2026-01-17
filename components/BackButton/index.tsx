import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const BackButton = () => {
  const router = useRouter();
  const onPress = () => router.canGoBack() && router.back();
  return (
    <TouchableOpacity onPress={onPress}>
      <Feather name="arrow-left" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
