import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NavigationBar from '../components/NavigationBar';
import dropdown from "../../assets/images/drop-down.png"
import eye from "../../assets/images/eye.png"
import searchIcon from "../../assets/images/search.png"
import PointService from '../service/PointService';
export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const dropdownItem = [
    { label: 'Task', value: 'Task' },
    { label: 'Name', value: 'Name' }
  ];

  const [points, setPoints] = useState([]);

  const difficulties = ["#50D890", "#8ADE55", "#C4E940", "#EEF65C", "#F5B042", "#F77854", "#F65C78", "#D1459E", "#9341E2", "#5E4BE4"];

  const [dropdownOpen, setdropDownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [miniDropDown, setMiniDropDown] = useState("Name")
  const [isLoading,setIsLoading] = useState(true)
  const [miniDropDownOpen, setminiDropDownOpen] = useState(false)
  const handleNavigate = (pointId) => {
    // Navigate to a detailed screen
    navigation.navigate('PointDetailScreen', { pointId });
  };

  useEffect(() => {
    console.log(miniDropDown)
  }, [miniDropDown])

  useEffect(() => {
    PointService.getPoints().then((res) => {
      setPoints(res.data.points)
    }).then(setIsLoading(false)).catch((e) => {
      console.log("error", e)
      setIsLoading(false)
    })
  }, [])


  const filteredPoints = points.filter(item => {
    if (miniDropDown === 'Name') {
      return item.name.toLowerCase().includes(search.toLowerCase());
    } else if (miniDropDown === 'Task') {
      return item.task.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  }
  );

  if(isLoading){
    return(
      <View style={styles.noPoints}><Text style={styles.noPointsText}>Loading Points</Text></View>
    )
  }
  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />
      <Text style={styles.pick}>Pick a Point!</Text>

      {filteredPoints.length > 0 ? <FlatList
        data={filteredPoints}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.pointItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.dot, { backgroundColor: difficulties[item.difficulty - 1] }]} />
              <Text style={styles.pointName}>{item.name}</Text>
            </View>
            <View style={styles.bottomRow}>
              <Text style={styles.pointTask}>{item.task}</Text>

              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => {
                  if (dropdownOpen && dropdownValue == item._id) {
                    setdropDownOpen(false);
                    setDropdownValue(null);
                  } else {
                    setdropDownOpen(true);
                    setDropdownValue(item._id);
                  }
                }}
              >
                <Image style={dropdownValue == item._id ? styles.dropDownArrowUp : styles.dropDownArrow} source={dropdown} />
              </TouchableOpacity>
            </View>

            {dropdownValue === item._id && (
              <View style={styles.pointDropDown}>
                <View style={styles.labels}>
                  <Text style={styles.tagTaskText}>Tags</Text>
                  <FlatList
                    data={item.tags}
                    keyExtractor={(tag) => tag._id}
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
                <TouchableOpacity onPress={() => {
                  handleNavigate(item._id)
                }} style={styles.viewMore}>
                  <Image source={eye} style={styles.eyeIcon} />
                  <Text style={styles.buttonText}>View More</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        style={styles.list}
      /> : <View style={styles.noPoints}><Text style={styles.noPointsText}>No points can be found</Text></View>}

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
          value={miniDropDown} 
          containerStyle={styles.dropdownContainer2}
          style={styles.dropdownStyle}
          dropDownStyle={styles.dropdownDropdownStyle}
          placeholder="Name"
          open={miniDropDownOpen}
          setOpen={setminiDropDownOpen}
          setValue={setMiniDropDown}
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
  noPointsText: {
    color: "white",
    fontSize: 20,
    backgroundColor: "#121212",
    padding: 20,
    borderRadius: 20
  },
  noPoints: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: -120,
    padding: 20,
  },
  pick: {
    fontSize: 50,
    color: "#EEE",
    fontWeight: 500,
    textAlign: "center",
    marginVertical: 20
  },
  dropdownContainer2: {
    width: 150,
    marginLeft: 10,
  },
  textInput: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#EEE",
    flexDirection: 'row',
    padding: 5
  },
  textInputInput: {
    backgroundColor: "white",
    flex: 1,
    height: '100%',
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1
  },
  eyeIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
    alignSelf: 'center',
  },
  viewMore: {
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    margin: 'auto',
    flexDirection: "row"
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
    paddingVertical: 10,
    borderRadius: 10,
  },
  tagTaskText: {
    marginLeft: 25,
    color: "#aaa",
    fontSize: 16
  },
  taskView: {
    marginHorizontal: 25,
    marginTop: 15,
    direction: "row",
    backgroundColor: "#76ABAE",
    padding: 10,
    borderRadius: 10
  },
  dropDownArrow: {
    width: 20,
    height: 30,
  },
  labels: {
    marginVertical: 30
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20

  },
  dropDownArrowUp: {
    width: 20,
    height: 30,
    zIndex: 1,
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
  pointDropDown: {
    borderRadius: 25,
    backgroundColor: "#1B2027",
    marginTop: 10,
    flex: 1,
  },
  tags: {
    backgroundColor: "red"
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
  task: {
    marginBottom: 30,

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
