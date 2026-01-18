import { supabase } from "@/lib/supabase";

export const getTrips = async () => {
  const { data, error } = await supabase.from("trips").select("*");
  if (error) throw error;
  return data;
};

export const addTrip = async ({
  userId,
  title,
  destination,
  startDate,
  endDate,
}: {
  userId: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
}) => {
  const { data, error } = await supabase.from("trips").insert({
    user_id: userId,
    title,
    destination,
    start_date: startDate,
    end_date: endDate,
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

export const updateTrip = async ({
  id,
  userId,
  title,
  destination,
  startDate,
  endDate,
}: {
  id: string;
  userId: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
}) => {
  const { data, error } = await supabase
    .from("trips")
    .update({
      title,
      user_id: userId,
      destination,
      start_date: startDate,
      end_date: endDate,
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
