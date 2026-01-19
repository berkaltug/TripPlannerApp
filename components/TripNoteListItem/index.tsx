import { TripNote } from "@/services/TripNoteService";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const TripNoteListItem = ({
  tripNote,
  onPressNote,
}: {
  tripNote: TripNote;
  onPressNote: (tripNoteId: string) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPressNote(tripNote.id)}
    >
      <Text style={styles.content}>{tripNote.content}</Text>
      <Feather name="arrow-right" size={18} color="black" />
    </TouchableOpacity>
  );
};

export default TripNoteListItem;
