import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const EditTripNotePage = () => {
  const router = useRouter();
  const { noteId } = useLocalSearchParams();

  return <SafeAreaView></SafeAreaView>;
};

export default EditTripNotePage;
