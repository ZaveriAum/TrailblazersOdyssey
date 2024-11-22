import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavigationBar from '../components/NavigationBar';

export default function PointDetailScreen({ route, navigation }) {
  const { pointId } = route.params;

  const [pointDetails, setPointDetails] = useState(null);

  useEffect(() => {
    const points = [
      { id: '1', name: 'Point 1', tags: ['Easy', 'Photo'], task: 'Task 1 Description', details: 'This is a detailed description for Point 1.' },
      { id: '2', name: 'Point 2', tags: ['Hard', 'Info'], task: 'Task 2 Description', details: 'This is a detailed description for Point 2.' },
      { id: '3', name: 'Point 3', tags: ['Medium', 'Photo'], task: 'Task 3 Description', details: 'This is a detailed description for Point 3.' },
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

  return (
    <View style={styles.container}>

    <NavigationBar navigation={navigation} />

      <Text style={styles.title}>{pointDetails.name}</Text>
      <Text style={styles.details}>{pointDetails.details}</Text>
      
      <Text style={styles.subTitle}>Tags:</Text>
      <Text style={styles.text}>{pointDetails.tags.join(', ')}</Text>
      
      <Text style={styles.subTitle}>Task:</Text>
      <Text style={styles.text}>{pointDetails.task}</Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
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
    backgroundColor: '#555',
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});
