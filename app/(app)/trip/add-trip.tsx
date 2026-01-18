import BackButton from "@/components/BackButton";
import ControlledDatePicker from "@/components/ControlledDatePicker";
import ControlledTextInput from "@/components/ControlledTextInput";
import Header from "@/components/Header";
import { useAuthContext } from "@/hooks/useAuthContext";
import { addTrip } from "@/services/TripService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface FormValues {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
}

const AddTrip = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { profile } = useAuthContext();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: addTrip,
    onSuccess: (data) => {
      console.log(data);
      Toast.show({
        type: "success",
        text1: "Trip Added Successfully",
      });
      router.navigate("/");
    },
    onError: (error) => {
      console.error(error);

      Toast.show({
        type: "error",
        text1: "Trip Added Failed",
      });
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate({
      userId: profile?.id,
      ...data,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftComponent={<BackButton />} title="Add Trip" />
      <ControlledTextInput
        control={control}
        name="title"
        placeholder="Name Your Trip"
      />
      <ControlledTextInput
        control={control}
        name="destination"
        placeholder="Your Destination"
      />

      <Text>Pick Start Date</Text>

      <ControlledDatePicker
        control={control}
        name="startDate"
        errors={errors}
      />
      <Text>Pick End Date</Text>
      <ControlledDatePicker control={control} name="endDate" errors={errors} />

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  button: {
    backgroundColor: "#418ee6ff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-end",
  },
});
