import { TripNote } from "@/services/TripNoteService";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const TripNoteListItem = ({ tripNote }: { tripNote: TripNote }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.content}>{tripNote.content}</Text>
      <Text>{tripNote.note_date}</Text>
    </TouchableOpacity>
  );
};

export default TripNoteListItem;
