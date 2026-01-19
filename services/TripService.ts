import { getLocalYYYYMMDD } from "@/lib/helper";
import { TripSchema } from "@/lib/schema/tripSchema";
import { supabase } from "@/lib/supabase";

export const getTrips = async () => {
  const { data, error } = await supabase.from("trips").select("*");
  if (error) throw error;
  return data;
};

export type AddTripType = { userId: string } & TripSchema;
export const addTrip = async ({
  userId,
  title,
  destination,
  startDate,
  endDate,
}: AddTripType) => {
  const { data, error } = await supabase.from("trips").insert({
    user_id: userId,
    title,
    destination,
    start_date: getLocalYYYYMMDD(startDate),
    end_date: getLocalYYYYMMDD(endDate),
  });
  if (error) throw error;
  return data;
};

export const getTripById = async (id: string) => {
  const { data, error } = await supabase
    .from("trips")
    .select("*,trip_notes(*)")
    .eq("id", id);
  if (error) throw error;
  return data[0];
};

export type UpdateTripType = { id: string; userId: string } & TripSchema;
export const updateTrip = async ({
  id,
  userId,
  title,
  destination,
  startDate,
  endDate,
}: UpdateTripType) => {
  const { data, error } = await supabase
    .from("trips")
    .update({
      title,
      user_id: userId,
      destination,
      start_date: getLocalYYYYMMDD(startDate),
      end_date: getLocalYYYYMMDD(endDate),
    })
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const deleteTrip = async (id: string) => {
  const { data, error } = await supabase.from("trips").delete().eq("id", id);
  if (error) throw error;
  return data;
};
