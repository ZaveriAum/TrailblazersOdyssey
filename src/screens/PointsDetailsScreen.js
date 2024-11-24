import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import NavigationBar from '../components/NavigationBar';

export default function PointDetailScreen({ route, navigation }) {
  const { pointId } = route.params;

  const [pointDetails, setPointDetails] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const points = [
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
    ];

    const point = points.find((p) => p.id === pointId);
    if (point) {
      setPointDetails(point);
    }
  }, [pointId]);

  if (!pointDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const onShare = async ()=>{
    try {
      const result = await Share.share({
        message:
          `${pointDetails.name} 
          Task: ${pointDetails.task}
          Address: ${pointDetails.address}
          `,
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

  const rate = ()=>{
    setModalVisible(!modalVisible)
    pointDetails.rating = (pointDetails.rating + rating)/2
    console.log(pointDetails.rating)
  }
  return (
    <View style={styles.container}>

    <NavigationBar navigation={navigation} />
    <ScrollView contentContainerStyle={styles.body}>
      <Text style={styles.title}>{pointDetails.name}</Text>
      <Text style={styles.details}>{pointDetails.details}</Text>
      
      <Text style={styles.subTitle}>Tags:</Text>
      <Text style={styles.text}>{pointDetails.tags.join(', ')}</Text>
      
      <Text style={styles.subTitle}>Task:</Text>
      <Text style={styles.text}>{pointDetails.task}</Text>

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
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Icon name="map-marker" size={35} color="#1E1E1E" />
        </TouchableOpacity>
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
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#bbb',
    marginTop: 5,
  },
  backButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#fff',
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

});