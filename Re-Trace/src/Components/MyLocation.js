import React, { useState, useEffect, useContext, useRef } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MarkerContext from "./MarkerContext";
import DarkThemeContext from "./DarkThemeContext";
import NavToUser from "./NavToUser";
import { useNavigation } from "@react-navigation/native";
import { reverseGeocodeAsync } from "expo-location";

export default function MyLocation({ marker }) {
  const [region, setRegion] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [postcode, setPostcode] = useState("");
  const { markers, setMarkers } = useContext(MarkerContext);
  const { isDarkMode } = useContext(DarkThemeContext);
  const mapRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        handleLocationUpdate
      );
    })();
  }, []);

  const handleLocationUpdate = (newLocation) => {
    const { latitude, longitude } = newLocation.coords;
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    getLocationName(latitude, longitude);
  };

  const getLocationName = async (latitude, longitude) => {
    try {
      const [location] = await reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (location) {
        const { city, postalCode, region } = location;
        const formattedLocationName = `${city}, ${region}`;
        setLocationName(formattedLocationName);
        setPostcode(postalCode);
      }
    } catch (error) {
      console.log("Error getting location name:", error);
    }
  };

  const handleMarkerUpdate = () => {
    setMarkers([...markers, marker]);
    navigation.navigate("Home", { marker });
  };

  useEffect(() => {
    if (marker && mapRef.current) {
      const { coordinate } = marker;
      mapRef.current.animateToRegion(
        {
          ...coordinate,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  }, [marker]);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    Alert.prompt(
      "Enter pin Name",
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
              const newMarker = { coordinate, title: text };
              setMarkers([...markers, newMarker]);
              navigation.navigate("Home", { marker: newMarker });
            }
          },
        },
      ],
      "plain-text"
    );
  };

  if (!region) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={[styles.container, isDarkMode && styles.containerDarkMode]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        gestureEnabled={true}
        showsUserLocation={true}
        onLongPress={handleMapPress}
        userInterfaceStyle={isDarkMode ? "dark" : "light"}
      >
        {/* User Input Markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
          >
            <Entypo name="location-pin" size={40} color="red" />
          </Marker>
        ))}

        {/* Conditional rendering of NavToUser */}
        {marker && (
          <Marker coordinate={region}>
            <Ionicons
              name="ios-navigate-circle-outline"
              size={40}
              color="blue"
            />
          </Marker>
        )}
      </MapView>

      {/* Display Location Name */}
      <View style={styles.locationContainer}>
        <Text
          style={[
            styles.locationText,
            isDarkMode && styles.locationTextDarkMode,
          ]}
        >
          {locationName}
        </Text>
        <Text
          style={[
            styles.postcodeText,
            isDarkMode && styles.postcodeTextDarkMode,
          ]}
        >
          {postcode}
        </Text>
      </View>

      <NavToUser
        mapReference={mapRef}
        userRegion={region}
        updateMarker={handleMarkerUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  locationContainer: {
    position: "absolute",
    top: 70,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    zIndex: 2,
  },
  locationText: {
    color: "white",
    fontSize: 24,
    zIndex: 1,
    textAlign: "center",
    marginBottom: 5,
  },
  postcodeText: {
    color: "white",
    fontSize: 18,
    zIndex: 1,
    textAlign: "center",
  },
  containerDarkMode: {
    backgroundColor: "#5A5A5A",
  },
  locationTextDarkMode: {
    color: "white",
  },
  postcodeTextDarkMode: {
    color: "white",
  },
});
