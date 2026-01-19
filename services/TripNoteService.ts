import { getLocalYYYYMMDD } from "@/lib/helper";
import { TripNoteSchema } from "@/lib/schema/tripNoteSchema";
import { supabase } from "@/lib/supabase";

export interface TripNote {
  id: string;
  trip_id: string;
  note_date: string;
  content: string;
  created_at: string;
}

export const getTripNotes = async (tripId: string) => {
  const { data, error } = await supabase
    .from("trip_notes")
    .select("*")
    .eq("trip_id", tripId)
    .order("note_date", { ascending: true });

  if (error) {
    console.error("Error fetching trip notes:", error.message);
    throw error;
  }

  return data as TripNote[];
};

export type AddTripNoteType = { tripId: string } & TripNoteSchema;
export const addTripNote = async ({
  tripId,
  noteDate,
  content,
}: AddTripNoteType) => {
  const { error } = await supabase.from("trip_notes").insert({
    trip_id: tripId,
    note_date: getLocalYYYYMMDD(noteDate),
    content: content,
  });
  if (error) {
    console.error("Error adding trip note:", error.message);
    throw error;
  }
};

export const getTripNoteById = async (tripNoteId: string) => {
  const { data, error } = await supabase
    .from("trip_notes")
    .select("*")
    .eq("id", tripNoteId);
  if (error) {
    console.error("Error fetching trip note:", error.message);
    throw error;
  }
  return data[0] as TripNote;
};

export type updateTripNoteType = { tripNoteId: string } & TripNoteSchema;
export const updateTripNote = async ({
  tripNoteId,
  noteDate,
  content,
}: updateTripNoteType) => {
  const { error } = await supabase
    .from("trip_notes")
    .update({
      note_date: getLocalYYYYMMDD(noteDate),
      content: content,
    })
    .eq("id", tripNoteId);
  if (error) {
    console.error("Error updating trip note:", error.message);
    throw error;
  }
};

export const deleteTripNote = async (tripNoteId: string) => {
  const { error } = await supabase
    .from("trip_notes")
    .delete()
    .eq("id", tripNoteId);
  if (error) {
    console.error("Error deleting trip note:", error.message);
    throw error;
  }
};
