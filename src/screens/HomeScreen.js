import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NavigationBar from '../components/NavigationBar';

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [points, setPoints] = useState([
    { id: '1', name: 'Point 1', tags: ['Easy', 'Photo'], task: 'Task 1 Description' },
    { id: '2', name: 'Point 2', tags: ['Hard', 'Info'], task: 'Task 2 Description' },
    { id: '3', name: 'Point 3', tags: ['Medium', 'Photo'], task: 'Task 3 Description' },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownItems, setDropdownItems] = useState([
    { label: 'Easy', value: 'easy' },
    { label: 'Hard', value: 'hard' },
    { label: 'Medium', value: 'medium' },
  ]);

  const handleNavigate = (pointId) => {
    // Navigate to a detailed screen
    navigation.navigate('PointDetailScreen', { pointId });
  };

  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />

      <FlatList
        data={points}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.pointItem}>
            <Text style={styles.pointName}>{item.name}</Text>
            <Text style={styles.pointTags}>{item.tags.join(', ')}</Text>

            <View style={styles.bottomRow}>
              <Text style={styles.pointTask}>{item.task}</Text>

              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => handleNavigate(item.id)}
              >
                <Text style={styles.infoText}>i</Text>
              </TouchableOpacity>
            </View>
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
    elevation: 3,
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
  dropdownContainer: {
    width: '40%',
    marginTop: 10,
  },
  dropdown: {
    height: 40,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  pointTask: {
    flex: 1,
    fontSize: 14,
    color: '#bbb',
    marginTop: 5,
  },
  infoButton: {
    backgroundColor: '#555',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#EEEEEE',
    height: 60,
  },
  searchBar: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#000',
  },
});

