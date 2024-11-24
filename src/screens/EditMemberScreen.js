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
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add New Member</Text>
        </TouchableOpacity>
        {team_member.map((member, index) => (
            <View key={index} style={styles.box}>
            <Text style={styles.developerText}>{member.name}</Text>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
          
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#121212",
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
      marginBottom: 20,
      textAlign: "center",
    },
    addButton: {
      backgroundColor: "#28a745",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 30,
      alignSelf: 'flex-start', // Makes button width fit its content
    },
    addButtonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    box: {
      backgroundColor: "#1E1E1E",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      width: "100%",
      flexDirection: "row", // Align items horizontally
      justifyContent: "space-between", // Space out the content between name and button
      alignItems: "center", // Align name and button properly
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    developerText: {
      color: "#FFF",
      fontSize: 20,
      fontWeight: "500",
      flex: 1, // Makes the text take up the remaining space
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 10,
    },
    deleteButtonText: {
      color: "#FFF",
      fontSize: 14,
      fontWeight: "bold",
    }

  
  });