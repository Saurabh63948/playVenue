import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppNavigator from './AppNavigator';
import HomeScreens from '../screens/HomeScreen';
import StartScreen from '../screens/StartScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import NameScreen from '../screens/NameScreen';
import SelectImage from '../screens/SelectImage';
import GameSelectionScreen from '../screens/GameSelectionScreen';
import { useUser } from '@clerk/clerk-expo';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
 const { isLoaded, isSignedIn } = useUser();
 if (!isLoaded) {
  console.log("ye vali sceen bhi aayi ")
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      {isSignedIn ? (
       <Stack.Screen name="Main" component={AppNavigator} />
      ) : (
        <Stack.Group>
         <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Name" component={NameScreen} />
          <Stack.Screen name="Image" component={SelectImage} />
          <Stack.Screen name="GameSelection" component={GameSelectionScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
