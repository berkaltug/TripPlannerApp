import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddTrip = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // Web'de console.log, Native'de Alert ile görelim
    Alert.alert("Form Verisi", JSON.stringify(data));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header leftComponent={<BackButton />} title="Add Trip" />
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Name Your Trip"
          />
        )}
      />
      <Controller
        name="destination"
        control={control}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Your Destination"
          />
        )}
      />
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
  input: {
    borderColor: "#444444ff",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#418ee6ff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-end",
  },
});
