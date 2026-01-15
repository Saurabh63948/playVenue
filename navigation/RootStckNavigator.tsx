import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppNavigator from './AppNavigator';
import HomeScreens from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  const isSignedIn = true; // later replace with auth state

  return (
    <Stack.Navigator >
      {isSignedIn ? (
       <Stack.Screen name="Main" component={AppNavigator} />
      ) : (
        <Stack.Screen
          name="Auth"
          component={HomeScreens}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
