import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NavigationBar from '../components/NavigationBar';

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [points, setPoints] = useState([
    { id: '1', name: 'Point 1', tags: ['Easy', 'Photo'] },
    { id: '2', name: 'Point 2', tags: ['Hard', 'Info'] },
    { id: '3', name: 'Point 3', tags: ['Medium', 'Photo'] },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownItems, setDropdownItems] = useState([
    { label: 'Easy', value: 'easy' },
    { label: 'Hard', value: 'hard' },
    { label: 'Medium', value: 'medium' },
  ]);

  return (
    <View style={styles.container}>
      
      <NavigationBar/>

      <FlatList
        data={points}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.pointItem}>
            <Text style={styles.pointName}>{item.name}</Text>
            <Text style={styles.pointTags}>{item.tags.join(', ')}</Text>
          </View>
        )}
        style={styles.list}
      />

      <View style={styles.bottomBar}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Points..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />

        <DropDownPicker
          open={dropdownOpen}
          value={dropdownValue}
          items={dropdownItems}
          setOpen={setDropdownOpen}
          setValue={setDropdownValue}
          setItems={setDropdownItems}
          placeholder="Filter by Tag"
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  pointItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#222',
    borderRadius: 8,
  },
  pointName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  pointTags: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#333',
    height: 60,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'white',
  },
  dropdownContainer: {
    width: 150,
    marginLeft: 10,
  },
  dropdown: {
    backgroundColor: '#222',
  },
});
