import React, { useRef, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import MyLocation from "./MyLocation";
import { useNavigation, useRoute } from "@react-navigation/native";
import DarkThemeContext from "./DarkThemeContext";

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { marker, index, markers, mapReference } = route.params || {};
  const mapUpdate = useRef();
  const { isDarkMode } = useContext(DarkThemeContext);

  useEffect(() => {
    if (mapUpdate.current && marker && marker.coordinate) {
      const { coordinate } = marker;
      mapUpdate.current.animateToRegion(
        {
          ...coordinate,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  }, [marker]);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDarkMode]}>
      <MyLocation marker={marker} mapUpdate={mapUpdate.current} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerDarkMode: {
    backgroundColor: "#5A5A5A",
  },
});

export default Home;
