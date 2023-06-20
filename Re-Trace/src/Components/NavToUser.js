import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function NavToUser({ mapReference, userRegion }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (mapReference && mapReference.current && userRegion) {
      mapReference.current.animateToRegion(
        {
          ...userRegion,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
      navigation.navigate("Home", { marker: null });
    }
  };

  return (
    <TouchableOpacity style={styles.myLocationButton} onPress={handlePress}>
      <Ionicons name="ios-navigate-circle-outline" size={30} color="blue" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  myLocationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    zIndex: 1,
  },
});
