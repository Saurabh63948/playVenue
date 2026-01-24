


import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '@clerk/clerk-expo';
import api from '../axiosInstance';
import AppNavigator from './AppNavigator';
import StartScreen from '../screens/StartScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import NameScreen from '../screens/NameScreen';
import SelectImage from '../screens/SelectImage';
import GameSelectionScreen from '../screens/GameSelectionScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [dbUserLoaded, setDbUserLoaded] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(true);

  useEffect(() => {
    const checkUserOnboarding = async () => {
      if (isSignedIn && user) {
        try {
        
       
         const response = await api.get(`/getUserByClerkId`,{
          params:{ clerkId: user.id },
         });
         
         
          if (response.data.success && response.data.data.sports && response.data.data.sports.length > 0) {
            setIsOnboarded(true);
          } else {
            setIsOnboarded(false);
          }
        } catch (error) {
          console.log("DB User not found or error:", error.message);
          setIsOnboarded(false); 
        } finally {
          setDbUserLoaded(true);
        }
      } else {
        setDbUserLoaded(false);
      }
    };

    checkUserOnboarding();
  }, [isSignedIn, user]);

  
  if (!isLoaded || (isSignedIn && !dbUserLoaded)) {
    return <SplashScreen />;
  }

 return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!isSignedIn ? (
   
      <Stack.Group>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Name" component={NameScreen} />
        <Stack.Screen name="Image" component={SelectImage} />
        <Stack.Screen name="GameSelection" component={GameSelectionScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Group>
    ) : (
     
      <Stack.Screen name="Main" component={AppNavigator} />
    )}
  </Stack.Navigator>
);
};

export default RootStackNavigator;