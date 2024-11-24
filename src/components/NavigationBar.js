import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function NavigationBar({ navigation }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const navigateToScreen = (screenName) => {
    setDropdownVisible(false);
    navigation.navigate(screenName);
  };

  const onButtonLayout = (event) => {
    const layout = event.nativeEvent.layout;
    setButtonPosition({
      x: layout.x,
      y: layout.y + layout.height,
    });
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={toggleDropdown} onLayout={onButtonLayout}>
        <Icon name="menu" size={28} color="#1E1E1E" />
      </TouchableOpacity>

      <Text style={styles.navBarTitle}>Trailblazers Odyssey</Text>

      <Image source={require('../../assets/icon-white.png')} style={styles.logo} />

      {dropdownVisible && buttonPosition && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={dropdownVisible}
          onRequestClose={toggleDropdown}
        >
          <TouchableWithoutFeedback onPress={toggleDropdown}>
            <View style={styles.modalBackground}>
              <View
                style={[
                  styles.dropdownContainer,
                  {
                    top: buttonPosition.y,
                    left: buttonPosition.x,
                  },
                ]}
              >
                <TouchableOpacity style={styles.dropdownItem} onPress={() => navigateToScreen('Splash Screen')}>
                  <Text style={styles.dropdownText}>Teams</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => navigateToScreen('Home')}>
                  <Text style={styles.dropdownText}>Points</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => navigateToScreen('About')}>
                  <Text style={styles.dropdownText}>About</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: '#EEE',
    position: 'relative',
  },
  navBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    flex: 1,
    textAlign: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width: 200,
    paddingVertical: 10,
    elevation: 5,
    position: 'absolute',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
});
