import {TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/native';

export default function NavigationBar(){
    return(
        <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" size={28} color="white" />
            </TouchableOpacity>

            <Text style={styles.navBarTitle}>Trailblazers Odyssey</Text>

            <Image
            source={require('../../assets/icon.png')}
            style={styles.logo}
            />
      </View>
    )
}

const styles = StyleSheet.create({
    navBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      height: 60,
      backgroundColor: '#333',
    },
    navBarTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    logo: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    }
  });