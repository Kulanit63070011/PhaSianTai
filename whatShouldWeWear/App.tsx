import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './fontend/screens/HomeScreen';
import TestSceen from './fontend/screens/TestScreen';
import Option1Screen from './fontend/screens/Option1Screen';
import Option2Screen from './fontend/screens/Option2Screen';
import AllOptionsScreen from './fontend/screens/AllOptionScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3', // change to desired color
          },
          headerTintColor: '#fff', // set text color to white
        }}>
        {/* <Stack.Screen
          name='test'
          component={TestSceen} /> */}
        <Stack.Screen
          name="What_should_i_wear"
          component={HomeScreen} />
        <Stack.Screen
          name="selected1"
          component={Option1Screen} />
        <Stack.Screen
          name="Option2"
          component={Option2Screen} />
        <Stack.Screen
          name="AllOptions"
          component={AllOptionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
