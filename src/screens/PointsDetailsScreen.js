import React, { useState, useEffect } from 'react';
import { Share, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import NavigationBar from '../components/NavigationBar';
export default function PointDetailScreen({ route, navigation }) {
  const { pointId } = route.params;

  const [pointDetails, setPointDetails] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

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
        difficulty: 7,
      },
    ];

    const point = points.find((p) => p.id === pointId);
    if (point) setPointDetails(point);
  }, [pointId]);

  // Get color based on difficulty
  const getDifficultyColor = (difficulty) => {
    const greenToRed = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#F44336'];
    return greenToRed[Math.min(difficulty, greenToRed.length - 1)];
  };

  // Toggle Tooltip
  const toggleTooltip = () => {
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 2000); // Hide after 2 seconds
  };

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
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

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
          <Text style={styles.detailTitle}>Task:</Text>
          <Text style={styles.detailValue}>{pointDetails.task}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Address:</Text>
          <Text style={styles.detailValue}>{pointDetails.address}</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={onShare}>
          <Text style={styles.backButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Locate</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignSelf: 'flex-start', // Align content to the left
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
    textAlign: 'left', // Align text to the left
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#555',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
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
});