import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import NavigationBar from "../components/NavigationBar";

export default function AboutScreen({ navigation }) {
  // Team member data
  //WILL REPLACE WHEN HAVE TEAM DATABASE
  const team_member = [
    { name: "Amelia Johnson" },
    { name: "Ethan Williams" },
    { name: "Sophia Martinez" },
    { name: "Lucas Brown" },
    { name: "Olivia Taylor" },
    { name: "Mason Clark" },
  ];

  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Team Members</Text>
        
        {team_member.map((member, index) => (
            <View key={index} style={styles.box}>
            <Text style={styles.developerText}>{member.name}</Text>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
          
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddMember')}
        >
          <Text style={styles.addButtonText}>Add New Member</Text>
        </TouchableOpacity>
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
      marginBottom: 20,
      textAlign: "center",
    },
    addButton: {
      backgroundColor: "#50D890",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 30,
      alignSelf: 'center', 
    },
    addButtonText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    box: {
      backgroundColor: "#31363F",
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