import BackButton from "@/components/BackButton";
import ControlledDatePicker from "@/components/ControlledDatePicker";
import ControlledTextInput from "@/components/ControlledTextInput";
import Header from "@/components/Header";
import { invalidateTripsQuery } from "@/lib/queryHelper";
import { TripNoteSchema, tripNoteSchema } from "@/lib/schema/tripNoteSchema";
import { addTripNote } from "@/services/TripNoteService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const AddTripNotePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TripNoteSchema>({
    resolver: zodResolver(tripNoteSchema),
    mode: "onChange",
  });

  const { tripId, startDate, endDate } = useLocalSearchParams();

  const mutation = useMutation({
    mutationFn: addTripNote,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Trip Note Added Successfully",
      });
      invalidateTripsQuery(queryClient);
      router.back();
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Trip Note Added Failed",
      });
    },
  });

  const onSubmit: SubmitHandler<TripNoteSchema> = (data) => {
    mutation.mutate({
      tripId: tripId as string,
      noteDate: data.noteDate,
      content: data.content,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header leftComponent={<BackButton />} title="Add Trip Note" />
      <ControlledTextInput
        control={control}
        name="content"
        placeholder="Write your trip note"
        numberOfLines={10}
        multiline={true}
        inputStyle={{ height: 200 }}
      />
      {errors.content && (
        <Text style={styles.errorText}>{errors.content.message}</Text>
      )}
      <Text>Pick Date to Attach This Note</Text>
      <ControlledDatePicker
        control={control}
        name="noteDate"
        minimumDate={new Date(startDate as string)}
        maximumDate={new Date(endDate as string)}
      />
      {errors.noteDate && (
        <Text style={styles.errorText}>{errors.noteDate.message}</Text>
      )}
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text>Add Note</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddTripNotePage;

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
    alignItems: "center",
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
