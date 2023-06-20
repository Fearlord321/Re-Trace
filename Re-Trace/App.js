import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainNavigator from './src/Components/MainNavigator';
import { MarkerProvider } from './src/Components/MarkerContext';
import DarkThemeContext, { DarkThemeProvider } from './src/Components/DarkThemeContext';

const Tab = createBottomTabNavigator();
4
function App() {
  const [markers, setMarkers] = useState([]); 
  return (
    <DarkThemeProvider>
    <MarkerProvider value={{ markers, setMarkers }}>
      <MainNavigator />
    </MarkerProvider>
    </DarkThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default  App;


