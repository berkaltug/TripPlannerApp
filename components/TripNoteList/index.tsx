import { TripNote } from "@/services/TripNoteService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SectionList, Text, View } from "react-native";
import TripNoteListItem from "../TripNoteListItem";
import { styles } from "./styles";

interface TripNoteListProps {
  tripNotes: TripNote[];
  startDate: string;
  endDate: string;
}

const TripNoteList = ({ tripNotes, startDate, endDate }: TripNoteListProps) => {
  const router = useRouter();
  const [groupedNotes, setGroupedNotes] = useState([]);
  useEffect(() => {
    const grouped = tripNotes.reduce((acc, note) => {
      const date = note.note_date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(note);
      return acc;
    }, {});

    const transformed = Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date],
    }));

    const ordered = transformed.sort(
      (a, b) => new Date(b.title).getTime() - new Date(a.title).getTime(),
    );
    setGroupedNotes(ordered);
  }, [tripNotes]);

  const onPressNote = (tripNoteId: string) => {
    router.push({
      pathname: `/trip/trip-note/${tripNoteId}`,
      params: { tripNoteId, startDate, endDate },
    });
  };

  return (
    <View>
      <SectionList
        sections={groupedNotes}
        renderItem={({ item }) => (
          <TripNoteListItem tripNote={item} onPressNote={onPressNote} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.itemHeader}>{title}</Text>
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

export default TripNoteList;
