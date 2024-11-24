import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SpalshScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import PointDetailScreen from '../screens/PointsDetailsScreen';
import TeamScreen from '../screens/TeamScreen';
import EditMemberScreen from  '../screens/EditMemberScreen';
import ContactMemberScreen from  '../screens/ContactMemberScreen';
import CreatePointScreen from '../screens/CreatePointScreen';
import EditPointScreen  from '../screens/EditPointScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <SafeAreaView style={styles.container}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Team" component={TeamScreen} />
            <Stack.Screen name="PointDetailScreen" component={PointDetailScreen} />
            <Stack.Screen name="EditMember" component={EditMemberScreen} />
            <Stack.Screen name="ContactMember" component={ContactMemberScreen} />
            <Stack.Screen name="CreatePoint" component={CreatePointScreen} />
            <Stack.Screen name="EditPoint" component={EditPointScreen}/>

        </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });