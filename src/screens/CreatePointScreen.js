import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import NavigationBar from '../components/NavigationBar';

export default function CreatePointScreen({ addPoint, navigation }) {
  const [pointName, setPointName] = useState('');
  const [pointTask, setPointTask] = useState('');
  const [pointAddress, setPointAddress] = useState('');
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('');

  const addTag = () => {
    if (tagName && tagColor) {
      setTags([...tags, { name: tagName, color: tagColor }]);
      setTagName('');
      setTagColor('');
    } else {
      alert('Please fill out both Tag Name and Tag Color!');
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddPoint = () => {
    if (!pointName || !pointTask || !pointAddress) {
      alert('Please fill out all fields!');
      return;
    }

    const newPoint = {
      id: Date.now(),
      name: pointName,
      task: pointTask,
      address: pointAddress,
      tags: tags,
    };

    console.log('New point created:', newPoint);
    addPoint(newPoint); 
    alert('Point added successfully!');
    setPointName('');
    setPointTask('');
    setPointAddress('');
    setTags([]);
    navigation.navigate('EditPoint'); 
  };

  return (
    <View style={styles.container}>
      {/* Add NavigationBar */}
      <NavigationBar navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Create a Point</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Point Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Point Name"
            value={pointName}
            onChangeText={setPointName}
          />

          <Text style={styles.label}>Point Task:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Point Task"
            value={pointTask}
            onChangeText={setPointTask}
          />

          <Text style={styles.label}>Point Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Point Address"
            value={pointAddress}
            onChangeText={setPointAddress}
          />

          <Text style={styles.label}>Add Tags:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Tag Name"
            value={tagName}
            onChangeText={setTagName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Tag Background Color"
            value={tagColor}
            onChangeText={setTagColor}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTag}>
            <Text style={styles.addButtonText}>Add Tag</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.currentTagsContainer}>
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
        </View>

        <TouchableOpacity style={styles.addPointButton} onPress={handleAddPoint}>
          <Text style={styles.addPointButtonText}>Add Point</Text>
        </TouchableOpacity>
      </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15, // Reduced padding
    paddingBottom: 50, // Reduced bottom padding
  },
  header: {
    fontSize: 24, // Smaller header font size
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 15, // Reduced vertical margin
  },
  inputContainer: {
    backgroundColor: '#2A2A2A',
    padding: 15, // Reduced padding
    borderRadius: 8, // Reduced border radius
    width: '85%', // Reduced width
    maxWidth: 600, // Reduced max width
    alignItems: 'center',
  },
  label: {
    fontSize: 14, // Smaller font size
    color: '#FFFFFF',
    marginVertical: 6, // Reduced margin
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6, // Reduced border radius
    paddingVertical: 8, // Reduced vertical padding
    paddingHorizontal: 12, // Reduced horizontal padding
    marginBottom: 8, // Reduced margin between inputs
    width: '100%',
    fontSize: 14, // Reduced font size
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8, // Reduced vertical padding
    paddingHorizontal: 20, // Reduced horizontal padding
    borderRadius: 6, // Reduced border radius
    alignItems: 'center',
    marginVertical: 8, // Reduced margin
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14, // Reduced font size
  },
  currentTagsContainer: {
    width: '85%',
    maxWidth: 600,
    marginTop: 20,
    alignItems: 'center',
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
  addPointButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10, // Reduced vertical padding
    paddingHorizontal: 20, // Reduced horizontal padding
    borderRadius: 6, // Reduced border radius
    alignItems: 'center',
    marginTop: 20,
    width: '85%',
    maxWidth: 600,
  },
  addPointButtonText: {
    color: '#FFFFFF',
    fontSize: 14, // Reduced font size
    fontWeight: 'bold',
  },
});