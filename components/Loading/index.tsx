import React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#418ee6" />
    </SafeAreaView>
  );
};

export default index;
