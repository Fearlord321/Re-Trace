import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import PinPoint from "./PinPoint";
import Settings from "./Settings";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons, Octicons } from "react-native-vector-icons";
import { StyleSheet } from "react-native";
import DarkThemeContext from "./DarkThemeContext";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const { isDarkMode } = useContext(DarkThemeContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarStyle: [
            styles.tabBarContainer,
            isDarkMode && styles.tabBarContainerDarkMode,
          ],
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home-map-marker";
            } else if (route.name === "PinPoint") {
              iconName = "map-marker-outline";
            } else if (route.name === "Settings") {
              iconName = "gear";
            }
            if (route.name === "Home" || route.name === "PinPoint") {
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size + 10}
                  color={color}
                />
              );
            } else if (route.name === "Settings") {
              return (
                <Octicons name={iconName} size={size + 10} color={color} />
              );
            }
          },
        })}
      >
        <Tab.Screen
          name="PinPoint"
          component={PinPoint}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderTopWidth: 0,
    elevation: 0,
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  tabBarContainerDarkMode: {
    backgroundColor: "#5A5A5A",
  },
});

export default MainNavigator;
