import BackButton from "@/components/BackButton";
import ControlledDatePicker from "@/components/ControlledDatePicker";
import ControlledTextInput from "@/components/ControlledTextInput";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import TripNoteList from "@/components/TripNoteList";
import { useAuthContext } from "@/hooks/useAuthContext";
import { TripSchema, tripSchema } from "@/lib/schema/tripSchema";
import { deleteTrip, getTripById, updateTrip } from "@/services/TripService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const TripPage = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trip", id],
    queryFn: () => getTripById(id as string),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TripSchema>({
    values: {
      title: data?.title,
      destination: data?.destination,
      startDate: new Date(data?.start_date),
      endDate: new Date(data?.end_date),
    },
    resolver: zodResolver(tripSchema),
    mode: "onChange",
  });

  const { profile } = useAuthContext();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: updateTrip,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Trip Updated Successfully",
      });
      router.navigate("/");
    },
    onError: (error) => {
      console.error(error);

      Toast.show({
        type: "error",
        text1: "Trip Update Failed",
      });
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const onSubmit: SubmitHandler<TripSchema> = (data) => {
    mutation.mutate({
      userId: profile?.id,
      id: id as string,
      ...data,
    });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteTrip,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Trip Deleted Successfully",
      });
      router.navigate("/");
    },
    onError: (error) => {
      console.error(error);

      Toast.show({
        type: "error",
        text1: "Trip Delete Failed",
      });
    },
  });

  const onDelete = () => {
    Alert.alert("Delete Trip", "Are you sure you want to delete this trip?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deleteMutation.mutate(id as string),
      },
    ]);
  };

  if (isLoading) {
    return <Loading />;
  }

  const onPressAddNote = () => {
    router.push({
      pathname: "/trip/trip-note/add-trip-note",
      params: {
        tripId: id,
        startDate: data?.start_date,
        endDate: data?.end_date,
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header leftComponent={<BackButton />} title="Edit Trip" />
      <ControlledTextInput control={control} name="title" />
      {errors.title && (
        <Text style={styles.errorText}>{errors.title.message}</Text>
      )}
      <ControlledTextInput control={control} name="destination" />
      {errors.destination && (
        <Text style={styles.errorText}>{errors.destination.message}</Text>
      )}
      <Text>Pick Start Date</Text>

      <ControlledDatePicker
        control={control}
        name="startDate"
        maximumDate={
          endDate && !isNaN(endDate?.getTime()) ? endDate : undefined
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
          startDate && !isNaN(startDate?.getTime()) ? startDate : undefined
        }
      />
      {errors.endDate && (
        <Text style={styles.errorText}>{errors.endDate.message}</Text>
      )}
      <Text>Notes</Text>
      <TripNoteList
        tripNotes={data?.trip_notes || []}
        startDate={data?.start_date}
        endDate={data?.end_date}
      />
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressAddNote}>
        <Text> + Add Note</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onDelete}
        style={[styles.button, { backgroundColor: "red" }]}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TripPage;

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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
