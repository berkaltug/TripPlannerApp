import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface TripItemProps {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
}

const TripItem: React.FC<TripItemProps> = ({
  id,
  title,
  destination,
  startDate,
  endDate,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/trip/${id}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{destination}</Text>
      </View>
      <View style={styles.dateBox}>
        <Text style={styles.date}>{startDate}</Text>
        <Text style={styles.date}>{endDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TripItem;
