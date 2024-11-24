import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
} from 'react-native';
import NavigationBar from '../components/NavigationBar';

export default function EditPointScreen({ navigation }) {
  const [points, setPoints] = useState([
    {
      id: 1,
      name: 'Point 1',
      task: 'Task for Point 1',
      address: '123 Main St',
      tags: [{ name: 'Tag1', color: 'red' }, { name: 'Tag2', color: 'blue' }],
    },
    {
      id: 2,
      name: 'Point 2',
      task: 'Task for Point 2',
      address: '456 Elm St',
      tags: [{ name: 'Tag3', color: 'green' }],
    },
  ]);

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

    const point = points.find((p) => p.id === parseInt(pointId));
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

    const updatedPoints = points.map((point) =>
      point.id === selectedPoint.id
        ? { ...point, name: pointName, task: pointTask, address: pointAddress, tags: tags }
        : point
    );

    setPoints(updatedPoints);
    alert('Point updated successfully!');
  };

  const deletePoint = () => {
    if (selectedPoint) {
      setPoints(points.filter((point) => point.id !== selectedPoint.id));
      setSelectedPoint(null);
      setPointName('');
      setPointTask('');
      setPointAddress('');
      setTags([]);
      alert('Point deleted successfully!');
    } else {
      alert('No point selected to delete.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Add NavigationBar here */}
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
              selectedValue={selectedPoint ? selectedPoint.id.toString() : ''}
              onValueChange={(value) => handleSelectPoint(value)}
              style={styles.picker}
            >
              <Picker.Item label="Select a Point" value="" />
              {points.map((point) => (
                <Picker.Item key={point.id} label={point.name} value={point.id.toString()} />
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
                      style={[styles.tag, { backgroundColor: tag.color || '#EEE' }]}
                    >
                      <Text style={styles.tagText}>{tag.name}</Text>
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
    backgroundColor: '#1E1E1E',
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
    backgroundColor: '#2A2A2A',
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
    color: '#FFFFFF',
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

