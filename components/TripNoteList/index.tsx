import TripNoteListItem from "@/components/TripNoteListItem";
import { TripNote } from "@/services/TripNoteService";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

interface TripNoteListProps {
  tripNotes: TripNote[];
  startDate: string;
  endDate: string;
}
const TripNoteList = ({ tripNotes, startDate, endDate }: TripNoteListProps) => {
  const router = useRouter();

  const onPressNote = (tripNoteId: string) => {
    router.push({
      pathname: `/trip/trip-note/${tripNoteId}`,
      params: { tripNoteId, startDate, endDate },
    });
  };

  return (
    <View>
      <FlatList
        data={tripNotes}
        renderItem={({ item }) => (
          <TripNoteListItem tripNote={item} onPressNote={onPressNote} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TripNoteList;
