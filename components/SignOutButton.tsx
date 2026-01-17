import { supabase } from "@/lib/supabase";
import React from "react";
import { Button } from "react-native";

export default function SignOutButton() {
  const onSignOutButtonPress = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
    }
  };

  return <Button title="Sign out" onPress={onSignOutButtonPress} />;
}
