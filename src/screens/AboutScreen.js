import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import NavigationBar from "../components/NavigationBar";
import * as Animatable from 'react-native-animatable';

export default function AboutScreen({ navigation }) {
  const developers = [
    { name: "Aum Zaveri" },
    { name: "Elio Fezollari" },
    { name: "Mia Truong" },
    { name: "Hamed Haghani" },
  ];
  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>About Us</Text>
        {developers.map((developer, index) => (
          <TouchableOpacity key={index} style={styles.developerButton}>
            <Text style={styles.developerText}>{developer.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2027',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 30,
    textAlign: "center",
  },
  developerButton: {
    backgroundColor: "#31363F",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  developerText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "500",
  },
});