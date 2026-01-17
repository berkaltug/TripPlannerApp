import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

import { styles } from "./styles";

const AddTripButton = () => {
  const router = useRouter();
  const onPress = () => {
    router.push("/add-trip");
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Feather name="plus" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default AddTripButton;
