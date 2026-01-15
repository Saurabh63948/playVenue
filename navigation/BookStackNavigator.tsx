import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookScreen from '../screens/BookScreen';

export type BookStackParamList = {
  BookHome: undefined;

  VenueInfo: {
    name: string;
    timings: string;
    location: string;
    rating: number;
    sportAvailable: {
      name: string;
      icon: string;
    }[];
    bookings: any[];
  };

  Slot: {
    place: string;
    sports: any[];
    bookings: any[];
  };

  Create: {
    area: string;
  };
};


const Stack = createNativeStackNavigator();
const BookStackNavigator = () => {
  return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Book' component={BookScreen} />
  </Stack.Navigator>
  )
}

export default BookStackNavigator