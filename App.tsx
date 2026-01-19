import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";
import AppNavigator from "./navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./navigation/RootStckNavigator";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { UserOnboardingProvider } from "./contexts/UserOnboardingContext";

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const AppContent: React.FC = () => {
  return (
    <UserOnboardingProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </UserOnboardingProvider>
  );
};

export default function App() {
  const publishableKey =
    "pk_test_YWxsb3dlZC1zYWxtb24tMzAuY2xlcmsuYWNjb3VudHMuZGV2JA";
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <AppContent />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
