import { Stack } from "expo-router";
import React from "react";

const TripNoteLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[note-id]" options={{ headerShown: false }} />
      <Stack.Screen name="add-trip-note" options={{ headerShown: false }} />
    </Stack>
  );
};

export default TripNoteLayout;
