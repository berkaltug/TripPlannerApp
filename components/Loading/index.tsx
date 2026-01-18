import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";

const index = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#418ee6" />
    </View>
  );
};

export default index;
