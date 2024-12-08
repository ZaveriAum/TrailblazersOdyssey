import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import NavigationBar from "../components/NavigationBar";

export default function ContactMemberScreen({ navigation }) {
  const [message, setMessage] = useState("");
  const [isSMSChecked, setIsSMSChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);

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

    
    Alert.alert(
      `${sendMethod} Sent`,
      `Your message: "${message}" has been sent via ${sendMethod}.`
    );
    setMessage("");
    setIsSMSChecked(false);
    setIsEmailChecked(false);
  };

  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Contact Member</Text>

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

        <TextInput
          style={styles.input}
          placeholder="Enter your message"
          placeholderTextColor="#888"
          multiline
          value={message}
          onChangeText={setMessage}
        />

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
    backgroundColor: "#1B2027",
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
    backgroundColor: "#31363F",
    color: "#FFF",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    textAlignVertical: "top",
    height: 150,
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
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  checkedCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5, 
    backgroundColor: "#FFF", 
  },
  button: {
    backgroundColor: "#50D890",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%", 
    alignItems: "center", 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
