import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import {Picker} from '@react-native-picker/picker'
import PointService from '../service/PointService';

export default function EditPointScreen({ navigation }) {
  const [points, setPoints] = useState([]);
  const [isLoading,setIsLoading] = useState(true) 
  useEffect(() => {
    PointService.getPoints()
      .then((res) => {
        setPoints(res.data.points); 
        
        setIsLoading(false);  
      })
      .catch((e) => {
        console.log('error', e);
        setIsLoading(false);  
      });
  }, []);

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [pointName, setPointName] = useState('');
  const [pointTask, setPointTask] = useState('');
  const [pointAddress, setPointAddress] = useState('');
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('');


  const handleSelectPoint = (pointId) => {
    if (!pointId) {
      setSelectedPoint(null);
      setPointName('');
      setPointTask('');
      setPointAddress('');
      setTags([]);
      return;
    }

    const point = points.find((p) => p._id ===pointId);
    if (point) {
      setSelectedPoint(point);
      setPointName(point.name);
      setPointTask(point.task);
      setPointAddress(point.address);
      setTags(point.tags || []);
    }
  };
 const addTag = () => {
    if (tagName && tagColor) {
      setTags([...tags, { name: tagName, color: tagColor }]);
      setTagName('');
      setTagColor('');
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const savePoint = () => {
    if (!pointName || !pointTask || !pointAddress) {
      alert('Please fill out all fields!');
      return;
    }

    const updatedTags = tags.map(tag => 
      
      ({
      tagname: tag.name || tag.tagname,
      tagColor: tag.color || tag.tagColor,
      _id: tag._id || null
    }));

    const updatedPoint = {
      name: pointName,
      task: pointTask,
      address: pointAddress,
      tags: updatedTags,
    };

    PointService.updatePoint(selectedPoint._id, updatedPoint)
    .then((response) => {
      alert('Point updated successfully!'); 
      navigation.navigate("Home");  
    })
      .catch((error) => {
        console.error('Error updating point:', error);
        alert('There was an error updating the point.');
      });
  };

  const deletePoint = async () => {
    if (!selectedPoint) {
      alert('Validation Error', 'No point selected to delete.');
      return;
    }

    try {
      await PointService.deletePoint(selectedPoint._id); 
      alert('Success', 'Point deleted successfully!');

      
      setPoints(points.filter((point) => point._id !== selectedPoint._id));
      setSelectedPoint(null);
      setPointName('');
      setPointTask('');
      setPointAddress('');
      setTags([]);
    } catch (error) {
      console.error('Error deleting point:', error);
      Alert.alert('Error', 'Failed to delete the point.');
    }
  };

  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />

      <Text style={styles.header}>Edit or Delete a Point!</Text>

      {points.length === 0 ? (
        <Text style={styles.noPointsText}>
          No points available. Please add points to edit or delete them.
        </Text>
      ) : (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select a Point:</Text>
            <Picker
              selectedValue={selectedPoint ? selectedPoint._id: ''}
              onValueChange={(value) => handleSelectPoint(value)}
              style={styles.picker}
            >
              <Picker.Item label="Select a Point" value="" />
              {points.map((point) => (
                <Picker.Item key={point._id} label={point.name} value={point._id} />
              ))}
            </Picker>
          </View>

          {selectedPoint && (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Point Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Edit point name"
                  value={pointName}
                  onChangeText={setPointName}
                />

                <Text style={styles.label}>Point Task:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Edit point task"
                  value={pointTask}
                  onChangeText={setPointTask}
                />

                <Text style={styles.label}>Point Address:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Edit point address"
                  value={pointAddress}
                  onChangeText={setPointAddress}
                />

                <Text style={styles.label}>Tags:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter tag name"
                  value={tagName}
                  onChangeText={setTagName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter tag background color"
                  value={tagColor}
                  onChangeText={setTagColor}
                />
                <TouchableOpacity style={styles.addButton} onPress={addTag}>
                  <Text style={styles.addButtonText}>Add Tag</Text>
                </TouchableOpacity>

                <View style={styles.tagsContainer}>
                  {tags.map((tag, index) => (
                    <View
                      key={index}
                      style={[styles.tag, { backgroundColor: tag.color || tag.tagColor || '#EEE' }]}
                    >
                      <Text style={styles.tagText}>{tag.tagname || tag.name}</Text>
                      <TouchableOpacity onPress={() => removeTag(index)}>
                        <Text style={styles.tagRemove}>✖</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={savePoint}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={deletePoint}>
                  <Text style={styles.deleteButtonText}>Delete Point</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2027',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 15, // Reduced horizontal padding
    paddingBottom: 50, // Reduced bottom padding
  },
  header: {
    fontSize: 24, // Smaller header font size
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 15, // Reduced vertical margin
  },
  noPointsText: {
    fontSize: 16, // Reduced font size
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 40, // Reduced top margin
  },
  inputContainer: {
    marginTop:20,
    backgroundColor: '#31363F',
    padding: 15, // Reduced padding
    borderRadius: 8, // Reduced border radius
    width: '85%', // Slightly smaller width
    alignSelf: 'center',
  },
  label: {
    fontSize: 14, // Smaller font size
    color: '#FFFFFF',
    marginVertical: 6, // Reduced margin
  },
  picker: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6, // Reduced border radius
    padding: 8, // Reduced padding
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6, // Reduced border radius
    paddingVertical: 8, // Reduced vertical padding
    paddingHorizontal: 12, // Reduced horizontal padding
    marginBottom: 8, // Reduced margin between inputs
    fontSize: 14, // Reduced font size
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8, // Reduced vertical padding
    paddingHorizontal: 20, // Reduced horizontal padding
    borderRadius: 6, // Reduced border radius
    alignItems: 'center',
    marginVertical: 8, // Reduced vertical margin
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14, // Reduced font size
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10, // Reduced margin
    width: '100%',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8, // Reduced padding
    borderRadius: 5,
    margin: 5, // Reduced margin
  },
  tagText: {
    color: 'black',
    marginRight: 6, // Reduced margin
    fontSize: 12, // Reduced font size
  },
  tagRemove: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12, // Reduced font size
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10, // Reduced padding
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10, // Reduced vertical padding
    paddingHorizontal: 20, // Reduced horizontal padding
    borderRadius: 6, // Reduced border radius
    alignItems: 'center',
    width: '40%', // Slightly smaller width
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14, // Reduced font size
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 10, // Reduced vertical padding
    paddingHorizontal: 20, // Reduced horizontal padding
    borderRadius: 6, // Reduced border radius
    alignItems: 'center',
    width: '40%', // Slightly smaller width
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 14, // Reduced font size
    fontWeight: 'bold',
  },
});