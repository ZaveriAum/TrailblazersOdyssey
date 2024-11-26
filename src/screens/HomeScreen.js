import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NavigationBar from '../components/NavigationBar';
import dropdown from "../../assets/images/drop-down.png"
import eye from "../../assets/images/eye.png"
import searchIcon from "../../assets/images/search.png"

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [isTag,setIsTag] = useState("")
  
  const dropdownItem = [
    { label: 'Task', value: 'task' },
    { label: 'Name', value: 'name' }
  ];
  
  const [points, setPoints] = useState([
    {
      id: "1",
      name: "Point 1",
      address: "150, Kendle avenue",
      tags: [
        { tagname: "Photo", tagColor: "#5C8FF6" },
        { tagname: "Hiking", tagColor: "#F6B85C" },
        { tagname: "Winter", tagColor: "#B35CF6" },
        { tagname: "Rural", tagColor: "#F65CA4" },
      ],
      task: "This is a very long description for the first task just to test that it works for veeeeeeeeeeeeeeeeeery long descriptions just incase!",
      difficulty: 0,
      rating: 5,
    },
    {
      id: "2",
      name: "Point 2",
      address: "160, Kendle avenue",
      tags: [
        { tagname: "Adventure", tagColor: "#F6A95C" },
        { tagname: "Nature", tagColor: "#6CF65C" },
        { tagname: "Beach", tagColor: "#F6F65C" },
        { tagname: "Mountain", tagColor: "#8A5CF6" },
        { tagname: "Urban", tagColor: "#F65C8A" }
      ],
      task: "Task 2 Description",
      difficulty: 1,
      rating: 5,
    },
    {
      id: "3",
      name: "Point 3",
      address: "170, Kendle avenue",
      tags: [
        { tagname: "Photo", tagColor: "#5C8FF6" },
        { tagname: "Hiking", tagColor: "#F6B85C" },
        { tagname: "Winter", tagColor: "#B35CF6" },
        { tagname: "Rural", tagColor: "#F65CA4" },
        { tagname: "Adventure", tagColor: "#F6A95C" },
        { tagname: "Nature", tagColor: "#6CF65C" },
        { tagname: "Beach", tagColor: "#F6F65C" },
        { tagname: "Mountain", tagColor: "#8A5CF6" },
        { tagname: "Urban", tagColor: "#F65C8A" }
      ],
      task: "Task 3 Description",
      difficulty: 2,
      rating: 5,
    },
  ]);
  
  const difficulties = ["#50D890","#EEF65C","#F65C78"];
  const [dropdownOpen,setdropDownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const[miniDropDown,setMiniDropDown] = useState(null)
  const[miniDropDownOpen,setminiDropDownOpen] = useState(false)
  const handleNavigate = (pointId) => {
    // Navigate to a detailed screen
    navigation.navigate('PointDetailScreen', { pointId });
  };

  // Filter points based on the search text
  const filteredPoints = points.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />
      <Text style={styles.pick}>Pick a Point!</Text>

      <FlatList
        data={filteredPoints} 
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.pointItem}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <View style={[styles.dot, { backgroundColor: difficulties[item.difficulty] }]} />
              <Text style={styles.pointName}>{item.name}</Text>
            </View>
            <View style={styles.bottomRow}>
              <Text style={styles.pointTask}>{item.task}</Text>

              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => {
                  if (dropdownOpen && dropdownValue == item.id) {
                    setdropDownOpen(false);
                    setDropdownValue(null);
                  } else {
                    setdropDownOpen(true);
                    setDropdownValue(item.id);
                  }
                }}
              >
                <Image style={dropdownValue == item.id ? styles.dropDownArrowUp : styles.dropDownArrow} source={dropdown} />
              </TouchableOpacity>
            </View>

            {dropdownValue === item.id && (
              <View style={styles.pointDropDown}>
                <View style={styles.labels}>
                  <Text style={styles.tagTaskText}>Tags</Text>
                  <FlatList
                    data={item.tags}
                    keyExtractor={(tag, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={[styles.tagItem, { backgroundColor: item.tagColor }]}>
                        <Text style={styles.tagText}>{item.tagname}</Text>
                      </View>
                    )}
                    numColumns={3} 
                    columnWrapperStyle={styles.columnWrapper}  
                  />
                </View>
                <View style={styles.task}>
                  <Text style={styles.tagTaskText}>Task</Text>
                  <View style={styles.taskView}><Text>{item.task}</Text></View>
                </View>
                <TouchableOpacity onPress={() => handleNavigate(item.id)} style={styles.viewMore}>
                  <Image source={eye} style={styles.eyeIcon} />
                  <Text style={styles.buttonText}>View More</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        style={styles.list}
      />

      <View style={styles.textInput}>
        <Image source={searchIcon} style={styles.eyeIcon} />
        <TextInput
          style={styles.textInputInput}
          placeholder="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}  
        />
        <DropDownPicker
          items={dropdownItem}
          defaultValue={dropdownItem}
          containerStyle={styles.dropdownContainer2}
          style={styles.dropdownStyle}
          dropDownStyle={styles.dropdownDropdownStyle}
          onChangeItem={(item) => setMiniDropDown(item.value)}  
          placeholder="Name"
          open={miniDropDownOpen} 
          setOpen={setminiDropDownOpen} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2027',
  },
  pick:{
    fontSize:50,
    color:"#EEE",
    fontWeight:500,
    textAlign:"center",
    marginVertical:20
  },
  dropdownContainer2:{
    width: 150,
    marginLeft: 10,
  },
  textInput: {
    justifyContent:"center",
    alignContent:"center",
    backgroundColor: "#EEE",
    flexDirection: 'row',  
    padding:5
  },
  textInputInput: {
    backgroundColor: "white",
    flex: 1, 
    height: '100%', 
    paddingLeft: 10, 
    borderRadius:10,
    borderWidth:1
  },
  eyeIcon:{
    width:25,
    height:25,
    marginRight:5,
    alignSelf: 'center', 
  },
  viewMore:{
    backgroundColor:"#EEEEEE",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:30,
    paddingVertical:10,
    paddingHorizontal:5,
    borderRadius:10,
    margin:'auto',
    flexDirection:"row"
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  tagItem: {
    width: 100,
    height: 40, 
    textAlign: "center",
    justifyContent: 'center', 
    alignItems: 'center',  
    paddingVertical:10,
    borderRadius: 10,
  },
  tagTaskText:{
    marginLeft:25,
    color:"#aaa",
    fontSize:16
  },
  taskView:{
    marginHorizontal:25,
    marginTop:15,
    direction:"row",
    backgroundColor:"#76ABAE",
    padding:10,
    borderRadius:10
  },
  dropDownArrow:{
    width:20,
    height:30,
  },
  labels:{
    marginVertical:30
  },
  columnWrapper:{
    justifyContent:"space-between",
    marginHorizontal:20,
    marginTop:20
    
  },
  dropDownArrowUp:{
    width:20,
    height:30,
    zIndex:1,
    transform: [{ rotate: '180deg' }],
  },
  dot: {
    width: 20, 
    height: 20, 
    borderRadius: 10,  
    marginRight: 10,
  },
  pointItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#31363F',
    borderRadius: 8,
    elevation: 3,
  },
  pointDropDown:{
    borderRadius:25,
    backgroundColor:"#1B2027",
    marginTop:10,
    flex:1,
  },
  tags:{
    backgroundColor:"red"
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
  task:{
    marginBottom:30,
    
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
