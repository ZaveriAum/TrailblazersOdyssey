import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import NavigationBar from "../components/NavigationBar";
import TeamService from "../service/TeamService"; // Import the TeamService to interact with the backend
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect to refetch data

export default function AddTeamMemberScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState(""); 


  const handleAddMember = async () => {
    if (!firstName || !lastName || !email || !phone) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const newMember = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phone,
    };

    try {
      const response = await TeamService.createMember(newMember);
      if (response.data.status) {
        Alert.alert("Success", "Member added successfully.");
        navigation.goBack(); // Navigate back to the previous screen after success
      } else {
        Alert.alert("Error", "Failed to add member.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while adding the member.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />
      <View style={styles.form}>
        <Text style={styles.header}>Add Member</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg. John"
            placeholderTextColor="#A1A1A1"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg. Doe"
            placeholderTextColor="#A1A1A1"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg. ab@example.com"
            placeholderTextColor="#A1A1A1"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg. 437 0092 329"
            placeholderTextColor="#A1A1A1"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddMember}>
          <Text style={styles.buttonText}>Add Member</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2027",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  inputLabel: {
    color: "#A1A1A1",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#A1A1A1",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#32D7A6",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
