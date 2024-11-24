import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NavigationBar from '../components/NavigationBar';
import dropdown from "../../assets/drop-down.png"
export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [points, setPoints] = useState([
    { id: '1', name: 'Point 1', tags: ['Easy', 'Photo'], task: 'Task 1 Description' },
    { id: '2', name: 'Point 2', tags: ['Hard', 'Info'], task: 'Task 2 Description' },
    { id: '3', name: 'Point 3', tags: ['Medium', 'Photo'], task: 'Task 3 Description' },
  ]);

  const [dropdownOpen,setdropDownOpen] = useState(false) 
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
                onPress={() => {

                  if(dropdownOpen && dropdownValue == item.id){
                    setdropDownOpen(false)
                    setDropdownValue(null)
                    console.log("closed dropdown")
                    console.log(dropdownValue,dropdownOpen)
                  }
                  else{
                    setdropDownOpen(true);
                    setDropdownValue(item.id)
                    console.log("Opened Dropdown")
                    console.log(dropdownValue,dropdownOpen)
                  }
                 }}
              >
                <Image style={dropdownValue == item.id ?styles.dropDownArrowUp:styles.dropDownArrow} source={dropdown}/>
              </TouchableOpacity>
            </View>
            {dropdownValue === item.id && (
                  <View style={styles.pointDropDown}>
                      
                  </View>
  )}
          </View>
          
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2027',
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  dropDownArrow:{
    width:20,
    height:30,
    zIndex:1
  },
  dropDownArrowUp:{
    width:20,
    height:30,
    zIndex:1,
    transform: [{ rotate: '180deg' }],
  },
  pointItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#31363F',
    borderRadius: 8,
    elevation: 3,
  },
  pointDropDown:{
    height:400,
    backgroundColor:"#31363F",
    borderTopWidth: 2,
    marginTop:10,
    flex:1,
    borderTopColor: "#1B2027", 
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
    backgroundColor: '#1B2027',
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

