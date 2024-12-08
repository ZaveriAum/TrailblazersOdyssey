import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import NavigationBar from '../components/NavigationBar';
import TeamService from '../service/TeamService'
import Icon from 'react-native-vector-icons/FontAwesome';


const ContactMemberScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [email, setEmail] = useState('');
  const [teamMember, setTeamMember] = useState(null);
  const [message, setMessage] = useState('');
  const [team, setTeam] = useState([]);

  useEffect(() => {
    TeamService.getTeam()
      .then((res) => {
        setTeam(res.data.team);
      })
      .catch((e) => console.log(e.message));
  }, []);

  const getDropdownItems = () => {
    if (!team.length) return [];
  
    return team
      .filter(
        (member) =>
          (selectedOption === 'email' && member.email) ||
          (selectedOption === 'sms' && member.phone_number)
      )
      .map((member) => {
        const label = member.first_name + member.last_name
        const value =
          selectedOption === 'email'
            ? member.email
            : member.phone_number;
        return { label, value };
      });
  };
  
  

  const handleSend = () => {
    if (!teamMember || !message) {
      alert('Please fill all fields');
      return;
    }

    if (selectedOption === 'email') {
      alert(`Email sent to ${teamMember} with message: ${message}`);
    } else if (selectedOption === 'sms') {
      alert(`SMS sent to ${teamMember} with message: ${message}`);
    }
  };

  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />
      <Text style={styles.header}>Contact Member</Text>
      <View style={styles.body}>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setSelectedOption('email')}
          >
            <Text
              style={selectedOption === 'email' ? styles.radioSelected : styles.radioText}
            >
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setSelectedOption('sms')}
          >
            <Text
              style={selectedOption === 'sms' ? styles.radioSelected : styles.radioText}
            >
              SMS
            </Text>
          </TouchableOpacity>
        </View>

        {selectedOption && (
          <View style={styles.form}>
            {selectedOption === 'email' && (
              <TextInput
                style={styles.input}
                placeholder="Your Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor="#888"
              />
            )}
            <RNPickerSelect
              onValueChange={(value) => setTeamMember(value)}
              items={getDropdownItems()}
              placeholder={{ label: 'Select Team Member', value: null }}
              style={{
                inputIOS: styles.input,
                inputAndroid: styles.input,
                iconContainer: {
                  top: 10,
                  right: 10,
                },
              }}
              Icon={() =><Icon name="caret-down" size={35} color="#1E1E1E" />}
              useNativeAndroidPickerStyle={false}
            />


            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Message"
              value={message}
              onChangeText={setMessage}
              multiline
              placeholderTextColor="#888"
            />
            <View style={styles.buttonWrapper}>
              <Button title="Send" onPress={handleSend} color="#50D890" />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2027',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  radioOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#31363F',
  },
  radioText: {
    color: '#FFF',
    fontSize: 16,
  },
  radioSelected: {
    color: '#50D890',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#242C34',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  input: {
    backgroundColor: '#31363F',
    color: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    height: 50,
    paddingRight: 30,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonWrapper: {
    marginTop: 10,
  },
});

export default ContactMemberScreen;