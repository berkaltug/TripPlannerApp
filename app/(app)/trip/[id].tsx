import BackButton from "@/components/BackButton";
import ControlledDatePicker from "@/components/ControlledDatePicker";
import ControlledTextInput from "@/components/ControlledTextInput";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useAuthContext } from "@/hooks/useAuthContext";
import { deleteTrip, getTripById, updateTrip } from "@/services/TripService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface FormValues {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
}

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
  } = useForm<FormValues>({
    values: {
      title: data?.title,
      destination: data?.destination,
      startDate: data?.start_date,
      endDate: data?.end_date,
    },
  });

  const { profile } = useAuthContext();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: updateTrip,
    onSuccess: (data) => {
      console.log(data);
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate({
      userId: profile?.id,
      id: id as string,
      ...data,
    });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteTrip,
    onSuccess: (data) => {
      console.log(data);
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

  return (
    <SafeAreaView style={styles.container}>
      <Header leftComponent={<BackButton />} title="Add Trip" />
      <ControlledTextInput control={control} name="title" />
      <ControlledTextInput control={control} name="destination" />

      <Text>Pick Start Date</Text>

      <ControlledDatePicker
        control={control}
        name="startDate"
        errors={errors}
      />
      <Text>Pick End Date</Text>
      <ControlledDatePicker control={control} name="endDate" errors={errors} />

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text>Update</Text>
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
});
