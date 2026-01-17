import AddTripButton from "@/components/AddTripButton";
import Header from "@/components/Header";
import SignOutButton from "@/components/SignOutButton";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const HomePage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const { data, error } = await supabase.from("trips").select("*");
      if (error) throw error;
      return data;
    },
  });
  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" rightComponent={<AddTripButton />} />
      {data &&
        data.length > 0 &&
        data.map((trip) => <Text key={trip.id}>{trip.name}</Text>)}
      <SignOutButton />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
