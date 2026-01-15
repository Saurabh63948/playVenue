import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';
import PlayStackNavigator from './PlayStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import BookStackNavigator from './BookStackNavigator';
import { Text, View } from 'react-native';



type TabParamList = {
  Home: undefined;
  Play: undefined;
  Book: undefined;
  More: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Play':
              iconName = focused ? 'play' : 'play-outline';
              break;
            case 'Book':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'More':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Play" component={PlayStackNavigator} />
      <Tab.Screen name="Book" component={BookStackNavigator} />
      <Tab.Screen name="More" component={ProfileScreen} />
      
    </Tab.Navigator>
  );
};

export default AppNavigator;
