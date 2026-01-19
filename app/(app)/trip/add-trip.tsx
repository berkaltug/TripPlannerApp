import BackButton from "@/components/BackButton";
import ControlledDatePicker from "@/components/ControlledDatePicker";
import ControlledTextInput from "@/components/ControlledTextInput";
import Header from "@/components/Header";
import { useAuthContext } from "@/hooks/useAuthContext";
import { TripSchema, tripSchema } from "@/lib/schema/tripSchema";
import { addTrip } from "@/services/TripService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const AddTrip = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<TripSchema>({
    resolver: zodResolver(tripSchema),
    mode: "onChange",
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

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

  const onSubmit: SubmitHandler<TripSchema> = (data) => {
    console.log("onSubmit", data);
    console.log("star date", data.startDate);

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
      {errors.title && (
        <Text style={styles.errorText}>{errors.title.message}</Text>
      )}
      <ControlledTextInput
        control={control}
        name="destination"
        placeholder="Your Destination"
      />
      {errors.destination && (
        <Text style={styles.errorText}>{errors.destination.message}</Text>
      )}

      <Text>Pick Start Date</Text>

      <ControlledDatePicker
        control={control}
        name="startDate"
        maximumDate={
          endDate && !isNaN(endDate?.getTime()) ? new Date(endDate) : undefined
        }
      />
      {errors.startDate && (
        <Text style={styles.errorText}>{errors.startDate.message}</Text>
      )}

      <Text>Pick End Date</Text>
      <ControlledDatePicker
        control={control}
        name="endDate"
        minimumDate={
          startDate && !isNaN(startDate?.getTime())
            ? new Date(startDate)
            : undefined
        }
      />
      {errors.endDate && (
        <Text style={styles.errorText}>{errors.endDate.message}</Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[styles.button, !isValid && styles.disabledButton]}
        disabled={!isValid}
      >
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
  disabledButton: {
    backgroundColor: "#ccc",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
