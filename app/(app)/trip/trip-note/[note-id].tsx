import BackButton from "@/components/BackButton";
import ControlledDatePicker from "@/components/ControlledDatePicker";
import ControlledTextInput from "@/components/ControlledTextInput";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { TripNoteSchema, tripNoteSchema } from "@/lib/schema/tripNoteSchema";
import {
  deleteTripNote,
  getTripNoteById,
  updateTripNote,
} from "@/services/TripNoteService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const EditTripNotePage = () => {
  const router = useRouter();
  const { tripNoteId, startDate, endDate } = useLocalSearchParams();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["trip-note", tripNoteId],
    queryFn: () => getTripNoteById(tripNoteId as string),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TripNoteSchema>({
    resolver: zodResolver(tripNoteSchema),
    mode: "onChange",
    values: {
      content: data?.content as string,
      noteDate: new Date(data?.note_date as string),
    },
  });
  const mutation = useMutation({
    mutationFn: updateTripNote,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Trip Note Updated Successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["trip"] });
      router.back();
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Trip Note Update Failed",
      });
    },
  });
  const onSubmit: SubmitHandler<TripNoteSchema> = (data) => {
    mutation.mutate({
      tripNoteId: tripNoteId as string,
      noteDate: data.noteDate,
      content: data.content,
    });
  };
  const deleteMutation = useMutation({
    mutationFn: deleteTripNote,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Trip Note Deleted Successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["trip"] });
      router.back();
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Trip Note Delete Failed",
      });
    },
  });

  const onPressDelete = () => {
    Alert.alert(
      "Delete Trip Note",
      "Are you sure you want to delete this trip note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteMutation.mutate(tripNoteId as string);
            // router.canGoBack() && router.back();
          },
        },
      ],
    );
  };

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <Header leftComponent={<BackButton />} title="Edit Trip Note" />
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
        <Text>Edit Note</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressDelete}
        style={[styles.button, { backgroundColor: "red" }]}
      >
        <Text>Delete Note</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditTripNotePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#418ee6ff",
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
