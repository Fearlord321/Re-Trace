import React, { useContext } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import DarkThemeContext from "./DarkThemeContext";

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkThemeContext);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDarkMode]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, isDarkMode && styles.titleDarkMode]}>
          Settings
        </Text>
      </View>

      {/* Dark Mode Switch */}
      <View style={styles.switchContainer}>
        <Text style={[styles.text, isDarkMode && styles.textDarkMode]}>
          Dark Mode
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 100,
  },

  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },

  //Dark Mode
  containerDarkMode: {
    backgroundColor: "#5A5A5A",
  },
  textDarkMode: {
    color: "white",
  },
  titleDarkMode: {
    color: "white",
  },
});

export default Settings;
