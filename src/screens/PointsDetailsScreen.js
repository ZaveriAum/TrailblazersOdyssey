import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
} from 'react-native';

export default function EditPointScreen({ points, setPoints }) {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [pointName, setPointName] = useState('');
  const [pointTask, setPointTask] = useState('');
  const [pointAddress, setPointAddress] = useState('');
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('');

  // Debugging: Check if points are being passed
  useEffect(() => {
    console.log('Points available:', points);
  }, [points]);

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
      setTags(point.tags);
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
      <Text style={styles.header}>Edit or Delete a Point!</Text>

      {points.length === 0 ? (
        <Text style={styles.noPointsText}>No points available. Please add a point first!</Text>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select a Point:</Text>
              <View style={styles.pickerContainer}>
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
                <>
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

                  <Text style={styles.label}>Add Tags:</Text>
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

                  <Text style={styles.label}>Current Tags:</Text>
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
                </>
              )}
            </View>
          </ScrollView>

          {selectedPoint && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={savePoint}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={deletePoint}>
                <Text style={styles.deleteButtonText}>Delete Point</Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  noPointsText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 50,
  },
  inputContainer: {
    backgroundColor: '#2A2A2A',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 700,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 8,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '100%',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 15,
    width: '100%',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  tagText: {
    color: '#FFFFFF',
    marginRight: 8,
    fontSize: 14,
  },
  tagRemove: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#2A2A2A',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
