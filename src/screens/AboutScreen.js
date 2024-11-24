import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
} from "react-native";
import NavigationBar from "../components/NavigationBar";

export default function EditPointScreen({ navigation, points, setPoints }) {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [pointName, setPointName] = useState("");
  const [pointTask, setPointTask] = useState("");
  const [pointAddress, setPointAddress] = useState("");
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("");

  const handleSelectPoint = (pointId) => {
    const point = points.find((p) => p.id === parseInt(pointId));
    if (point) {
      setSelectedPoint(point);
      setPointName(point.name);
      setPointTask(point.task);
      setPointAddress(point.address);
      setTags(point.tags || []);
    }
  };

  const savePoint = () => {
    if (!pointName || !pointTask || !pointAddress) {
      alert("Please fill out all fields!");
      return;
    }

    const updatedPoints = points.map((point) =>
      point.id === selectedPoint.id
        ? { ...point, name: pointName, task: pointTask, address: pointAddress, tags }
        : point
    );

    setPoints(updatedPoints);
    alert("Point updated successfully!");
  };

  const deletePoint = () => {
    if (selectedPoint) {
      setPoints(points.filter((point) => point.id !== selectedPoint.id));
      setSelectedPoint(null);
      setPointName("");
      setPointTask("");
      setPointAddress("");
      setTags([]);
      alert("Point deleted successfully!");
    }
  };

  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Edit or Delete a Point!</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select a Point:</Text>
          <Picker
            selectedValue={selectedPoint ? selectedPoint.id.toString() : ""}
            onValueChange={(value) => handleSelectPoint(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select a Point" value="" />
            {points.map((point) => (
              <Picker.Item key={point.id} label={point.name} value={point.id.toString()} />
            ))}
          </Picker>

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

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={savePoint}>
                  <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={deletePoint}>
                  <Text style={styles.buttonText}>Delete Point</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2027",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#31363F",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
  },
  deleteButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
