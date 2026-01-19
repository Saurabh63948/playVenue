import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import './global.css'
import AppNavigator from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './navigation/RootStckNavigator';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';

 


export default function App() {
  const publishableKey = "pk_test_YWxsb3dlZC1zYWxtb24tMzAuY2xlcmsuYWNjb3VudHMuZGV2JA";
  return (
     <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
