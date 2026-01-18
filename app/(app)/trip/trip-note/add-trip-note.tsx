import ControlledTextInput from "@/components/ControlledTextInput";
import { addTripNote } from "@/services/TripNoteService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const AddTripNotePage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm({});

  const { isLoading, isError } = useMutation({
    mutationFn: addTripNote,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Trip Note Added Successfully",
      });
      router.back();
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Trip Note Added Failed",
      });
    },
  });
  return (
    <SafeAreaView>
      <ControlledTextInput
        control={control}
        name="content"
        placeholder="Write your trip note"
        numberOfLines={5}
      />
    </SafeAreaView>
  );
};

export default AddTripNotePage;
