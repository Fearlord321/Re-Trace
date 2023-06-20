import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import MarkerContext from "./MarkerContext";
import DarkThemeContext from "./DarkThemeContext";
import { Feather } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

const PinPoint = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userRegion, mapReference } = route.params || {};
  const { markers, setMarkers } = useContext(MarkerContext);
  const { isDarkMode } = useContext(DarkThemeContext);
  const [addresses, setAddresses] = useState({});

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const geocodePromises = markers.map((marker) =>
          Location.reverseGeocodeAsync(marker.coordinate)
        );
        const geocodeResults = await Promise.all(geocodePromises);
        const updatedAddresses = {};
        geocodeResults.forEach((result, index) => {
          const { city, postalCode } = result[0];
          updatedAddresses[index] = { city, postalCode };
        });
        setAddresses(updatedAddresses);
      } catch (error) {
        console.log("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [markers]);

  const handlePress = (marker, index) => {
    navigation.navigate("Home", {
      marker,
      userRegion,
      mapReference,
      index,
      markers,
    });
  };

  const pinEdit = (index) => {
    Alert.prompt(
      "Edit Name",
      "",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (text) => {
            if (text) {
              const updatedMarkers = [...markers];
              updatedMarkers[index].title = text;
              setMarkers(updatedMarkers);
            }
          },
        },
      ],
      "plain-text",
      markers[index].title
    );
  };

  const pinDelete = (index) => {
    const updatedMarkers = [...markers];
    updatedMarkers.splice(index, 1);
    setMarkers(updatedMarkers);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDarkMode]}>
      {/* HEADER */}
      <Text style={[styles.Text, isDarkMode && styles.textDarkMode]}>
        My PinPoints
      </Text>

      <ScrollView contentContainerStyle={styles.list}>
        {markers &&
          markers.map((marker, index) => (
            <View key={index} style={styles.listItemContainer}>
              {/* Pinpoint Names, Address, and Postal Code */}
              <TouchableOpacity
                onPress={() => handlePress(marker, index)}
                style={[styles.listItem, isDarkMode && styles.listItemDarkMode]}
              >
                <Text
                  style={[
                    styles.listItemText,
                    isDarkMode && styles.listItemTextDarkMode,
                  ]}
                >
                  {marker.title}
                </Text>
                <Text
                  style={[
                    styles.listItemSubText,
                    isDarkMode && styles.listItemSubTextDarkMode,
                  ]}
                >
                  {addresses[index] && addresses[index].city}
                </Text>
                <Text
                  style={[
                    styles.listItemSubText,
                    isDarkMode && styles.listItemSubTextDarkMode,
                  ]}
                >
                  {addresses[index] && addresses[index].postalCode}
                </Text>
              </TouchableOpacity>

              {/* Pin Delete */}
              <TouchableOpacity
                onPress={() => pinDelete(index)}
                style={styles.iconContainer}
              >
                <Feather name="trash" size={30} color="red" />
              </TouchableOpacity>

              {/* Pin Edit */}
              <TouchableOpacity
                onPress={() => pinEdit(index)}
                style={styles.iconContainer}
              >
                <Icon name="edit" size={30} color="green" />
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  list: {
    width: "80%",
    alignItems: "center",
  },
  listItemContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  listItem: {
    flex: 1,
    padding: 20,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 2,
    alignItems: "center",
  },
  listItemText: {
    fontSize: 18,
    color: "#333",
  },
  listItemSubText: {
    fontSize: 14,
    color: "#777",
  },
  iconContainer: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  Text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  // Dark Mode
  textDarkMode: {
    color: "white",
  },
  containerDarkMode: {
    backgroundColor: "#5A5A5A",
  },
  listItemTextDarkMode: {
    color: "white",
  },
  listItemSubTextDarkMode: {
    color: "#BBB",
  },
  listItemDarkMode: {
    backgroundColor: "#333",
  },
});

export default PinPoint;
