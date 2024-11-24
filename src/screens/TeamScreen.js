import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import NavigationBar from "../components/NavigationBar";

export default function AboutScreen({ navigation }) {
  // Team member data
  //WILL REPLACE WHEN HAVE TEAM DATABASE
  const team_member = [
    { name: "Aum Zaveri" },
    { name: "Elio Fezollari" },
    { name: "Mia Truong" },
    { name: "Hamed Haghani" },
  ];

  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Team Members</Text>

        {team_member.map((member, index) => (
          <TouchableOpacity key={index} style={styles.box}>
            <Text style={styles.developerText}>{member.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2027",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 30,
    textAlign: "center",
  },
  box: {
    backgroundColor: "#31363F",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%", 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  developerText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "500",
  },
});
