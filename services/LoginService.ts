import { LoginSchema } from "@/lib/schema/loginSchema";
import { supabase } from "@/lib/supabase";

export const signUp = async ({ email, password }: LoginSchema) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const signIn = async ({ email, password }: LoginSchema) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data;
};
