import TripNoteListItem from "@/components/TripNoteListItem";
import { TripNote } from "@/services/TripNoteService";
import React from "react";
import { FlatList, View } from "react-native";
interface TripNoteListProps {
  tripNotes: TripNote[];
}
const TripNoteList = ({ tripNotes }: TripNoteListProps) => {
  return (
    <View>
      <FlatList
        data={tripNotes}
        renderItem={({ item }) => <TripNoteListItem tripNote={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TripNoteList;
