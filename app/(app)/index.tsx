import AddTripButton from "@/components/AddTripButton";
import Header from "@/components/Header";
import SignOutButton from "@/components/SignOutButton";
import TripItem from "@/components/TripItem";
import { getTrips } from "@/services/TripService";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const HomePage = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["trips"],
    queryFn: getTrips,
    staleTime: 0,
    gcTime: 0,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Header title="Home" rightComponent={<AddTripButton />} />
        <ScrollView style={{ flex: 1 }}>
          {data &&
            data.length > 0 &&
            data.map((trip) => (
              <TripItem
                key={trip.id}
                id={trip.id}
                title={trip.title}
                destination={trip.destination}
                startDate={trip.start_date}
                endDate={trip.end_date}
              />
            ))}
        </ScrollView>
      </View>
      <SignOutButton />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
