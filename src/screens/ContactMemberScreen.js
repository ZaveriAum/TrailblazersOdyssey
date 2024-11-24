import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import NavigationBar from "../components/NavigationBar";

export default function ContactMemberScreen({ navigation }) {
  const [message, setMessage] = useState("");  // Store the message input
  const [isSMSChecked, setIsSMSChecked] = useState(false);  // SMS checkbox state
  const [isEmailChecked, setIsEmailChecked] = useState(false);  // Email checkbox state

  // Function to create a custom checkbox button
  const CustomCheckbox = ({ checked, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[styles.customCheckbox, checked && styles.checked]}>
      {checked && <View style={styles.checkedCircle} />}
    </TouchableOpacity>
  );

  const sendMessage = () => {
    if (message.trim() === "") {
      Alert.alert("Error", "Please enter a message.");
      return;
    }

    if (!isSMSChecked && !isEmailChecked) {
      Alert.alert("Error", "Please select either SMS or Email to send.");
      return;
    }

    let sendMethod = "";
    if (isSMSChecked) {
      sendMethod = "SMS";
    } else if (isEmailChecked) {
      sendMethod = "Email";
    }

    // Directly alert the user with the chosen method
    Alert.alert(
      `${sendMethod} Sent`,
      `Your message: "${message}" has been sent via ${sendMethod}.`
    );
    setMessage("");  // Clear message after sending
    setIsSMSChecked(false);  // Reset SMS checkbox
    setIsEmailChecked(false);  // Reset Email checkbox
  };

  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Contact Us</Text>

        {/* Checkboxes for SMS and Email */}
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxWrapper}>
            <CustomCheckbox checked={isSMSChecked} onPress={() => setIsSMSChecked(!isSMSChecked)} />
            <Text style={styles.checkboxLabel}>SMS</Text>
          </View>
          <View style={styles.checkboxWrapper}>
            <CustomCheckbox checked={isEmailChecked} onPress={() => setIsEmailChecked(!isEmailChecked)} />
            <Text style={styles.checkboxLabel}>Email</Text>
          </View>
        </View>

        {/* Message Input Box */}
        <TextInput
          style={styles.input}
          placeholder="Enter your message"
          placeholderTextColor="#888"
          multiline
          value={message}
          onChangeText={setMessage}
        />

        {/* Send Message Button */}
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
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
    paddingVertical: 40,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "#FFF",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    textAlignVertical: "top", // Align text to the top of the input field
    height: 150, // Make the input box larger for multiline text
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10, 
  },
  customCheckbox: {
    width: 30,
    height: 30,
    borderRadius: 15, // Circular shape
    borderWidth: 2,
    borderColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#28a745", // Green when checked
    borderColor: "#28a745",
  },
  checkedCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5, 
    backgroundColor: "#FFF", 
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%", 
    alignItems: "center", 
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
