import { Platform } from "react-native";

export const isIos = () => Platform.OS === "ios";
export const isAndroid = () => Platform.OS === "android";

export const getLocalYYYYMMDD = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;

  const localDate = new Date(date.getTime() - offset);

  return localDate.toISOString().split("T")[0];
};
