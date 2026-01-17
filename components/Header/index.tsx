import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export interface Header {
  title?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}
const Header = ({ title, leftComponent, rightComponent }: Header) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {leftComponent ? leftComponent : <View />}
      </View>
      <View style={styles.titleContainer}>
        {title ? <Text style={styles.title}>{title}</Text> : <View />}
      </View>
      <View style={styles.rightContainer}>
        {rightComponent ? rightComponent : <View />}
      </View>
    </View>
  );
};

export default Header;
