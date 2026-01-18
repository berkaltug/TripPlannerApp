import { Stack } from "expo-router";
import React from "react";

const TripLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="add-trip" options={{ headerShown: false }} />
    </Stack>
  );
};

export default TripLayout;
