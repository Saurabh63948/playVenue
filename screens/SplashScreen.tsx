import React from "react";
import { View, Image, ActivityIndicator, Text } from "react-native";

const SplashScreen = () => {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      {/* App Logo */}
      <Image
        source={{ uri: "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1768495999/ChatGPT_Image_Jan_15_2026_10_18_29_PM_wzqkbk.png" }}
        style={{ width: 150, height: 150 }}
        resizeMode="contain"
      />

      {/* Loading Indicator bottom mein */}
      <View className="absolute bottom-20 items-center">
        <ActivityIndicator size="small" color="#22c55e" />
        <Text className="text-gray-400 mt-4 font-medium tracking-widest uppercase text-[10px]">
          playVenue
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;