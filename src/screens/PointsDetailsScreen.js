import React, { useState, useEffect } from 'react';
import { Share, View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, Button, Linking } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import PointService from '../service/PointService';
import Toast from 'react-native-toast-message';

export default function PointDetailScreen({ route, navigation }) {
  const { pointId } = route.params;

  const [pointDetails, setPointDetails] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [lat, setLat] = useState()
  const [long, setLong] = useState()
  const [mapVisible, setMapVisible] = useState(false);
  const difficulties = ["#50D890","#8ADE55","#C4E940","#EEF65C","#F5B042","#F77854","#F65C78","#D1459E","#9341E2","#5E4BE4"];


  useEffect(() => { 
    PointService.getPoint(pointId).then((res)=>{
      setPointDetails(res.data.point);
    }).catch((e)=>console.log("Error: " + e))
  }, [pointId]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      PointService.getLatLong(pointDetails.address).then((res)=>{
        setLat(res.data[0].lat)
        setLong(res.data[0].lon)
      })
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  if (!pointDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const onShare = async ()=>{
    try {
      const destination = `${lat},${long}`;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
      const result = await Share.share({
        message:
          `${pointDetails.name}\nTask: ${pointDetails.task}\nAddress: ${pointDetails.address}\nDifficulty: ${pointDetails.difficulty}\nDestination: ${url}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  }

  const selectRating = (rating)=>{
    setRating(rating);
  }

  const rate = async ()=>{
    setModalVisible(!modalVisible)
    pointDetails.rating = (pointDetails.rating + rating)/2
    await PointService.updatePoint(pointDetails._id, {rating : pointDetails.rating}).then((res)=>{
      Toast.show({
        type: 'success',
        text1 : `Thank you for rating ${res.data.name}`
      })
    }).catch(e=>console.error(e))
  }

  const toggleTooltip = () => {
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 2000);
  };

  const getDifficultyColor = (difficulty) => {
    return difficulties[pointDetails.difficulty - 1];
  };

  const toggleMapModal = () => {
    setMapVisible(!mapVisible);
  };

  const openGoogleMaps = () => {
    const destination = `${lat},${long}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>

    <NavigationBar navigation={navigation} />
    <ScrollView contentContainerStyle={styles.body}>
    <View style={styles.nameContainer}>
          <Text style={styles.pointName}>{pointDetails.name}</Text>
          <TouchableOpacity
            style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(pointDetails.difficulty) }]}
            onPress={toggleTooltip}
          />
        </View>

        {tooltipVisible && (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>Difficulty: {pointDetails.difficulty}</Text>
          </View>
        )}

        <View style={styles.tagsContainer}>
          {pointDetails.tags.map((tag, index) => (
            <Text key={index} style={[styles.tag, { backgroundColor: tag.tagColor }]}>
              {tag.tagname}
            </Text>
          ))}
        </View>
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Rating:</Text>
          <Text style={styles.detailValue}>{pointDetails.rating}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Task:</Text>
          <Text style={styles.detailValue}>{pointDetails.task}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Address:</Text>
          <Text style={styles.detailValue}>{pointDetails.address}</Text>
        </View>

        <TouchableOpacity style={styles.backButton} 
         onPress={()=>navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={toggleMapModal}>
          <Icon name="map-marker" size={35} color="#1E1E1E" />
        </TouchableOpacity>
      
        <Modal
        animationType="slide"
        transparent={false}
        visible={mapVisible}
        onRequestClose={toggleMapModal}
      >
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 43.653225,
              longitude: -79.383186,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: lat,
                longitude: long,
              }}
              title="MyLocation"
              description="This is a marker in San Francisco"
            />
          </MapView>
          <View style={styles.mapButtons}>
            <Button title="Get Directions" onPress={openGoogleMaps} />
            <Button title="Close" onPress={toggleMapModal} color="red" />
          </View>
        </View>
      </Modal>

        <TouchableOpacity onPress={onShare}>
          <Icon name="send" size={35} color="#1E1E1E" />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={20} color="#000" />
            </TouchableOpacity>

            <Text style={styles.modalText}>Rate Point</Text>
            <View style={styles.rate_btns}>
                <TouchableOpacity onPress={()=>selectRating(1)}>
                  <Icon name="star-o" size={30} color="#FFD700" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>selectRating(2)}>
                  <Icon name="star-o" size={30} color="#FFD700" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>selectRating(3)}>
                  <Icon name="star-o" size={30} color="#FFD700" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>selectRating(4)}>
                  <Icon name="star-o" size={30} color="#FFD700" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>selectRating(5)}>
                  <Icon name="star-o" size={30} color="#FFD700" />
                </TouchableOpacity>
            </View>
            <Button title="Rate" onPress={rate} />
          </View>
          </View>
        </Modal>

          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Icon name="star" size={35} color="#1E1E1E" />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2027',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  pointName: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '600',
    marginRight: 10,
  },
  difficultyDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  tooltip: {
    position: 'absolute',
    top: 20,
    left: 240,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 8,
    elevation: 5,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
    color: '#fff',
  },
  detailCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'left',
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 6,
    backgroundColor: '#EEE',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  bottomNav: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#EEE',
  paddingVertical: 10,
  borderTopWidth: 1,
  borderColor: '#333',
},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 20,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  width: '80%',
  maxHeight: '50%',
  position: 'relative',
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
},
buttonOpen: {
  backgroundColor: '#F194FF',
},
buttonClose: {
  backgroundColor: '#2196F3',
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
},
rate_btns: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 10,
  width: '100%',
},
cancelButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  padding: 5,
  zIndex: 10,
},
mapContainer: {
  flex: 1,
},
map: {
  flex: 1,
},
mapButtons: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 10,
  backgroundColor: '#fff',
},
});