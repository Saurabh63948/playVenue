import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const sports = [
  {
    id: 1,
    name: "Football",
    image: "https://api.dicebear.com/7.x/icons/png?seed=football",
  },
  {
    id: 2,
    name: "Cricket",
    image: "https://api.dicebear.com/7.x/icons/png?seed=cricket",
  },
  {
    id: 3,
    name: "Basketball",
    image: "https://api.dicebear.com/7.x/icons/png?seed=basketball",
  },
  {
    id: 4,
    name: "Tennis",
    image: "https://api.dicebear.com/7.x/icons/png?seed=tennis",
  },
  {
    id: 5,
    name: "Baseball",
    image: "https://api.dicebear.com/7.x/icons/png?seed=baseball",
  },
  {
    id: 6,
    name: "Badminton",
    image: "https://api.dicebear.com/7.x/icons/png?seed=badminton",
  },
  {
    id: 7,
    name: "Hockey",
    image: "https://api.dicebear.com/7.x/icons/png?seed=hockey",
  },
  {
    id: 8,
    name: "Volleyball",
    image: "https://api.dicebear.com/7.x/icons/png?seed=volleyball",
  },
  {
    id: 9,
    name: "Rugby",
    image: "https://api.dicebear.com/7.x/icons/png?seed=rugby",
  },
  {
    id: 10,
    name: "Table Tennis",
    image: "https://api.dicebear.com/7.x/icons/png?seed=table-tennis",
  },
];

const GameSelectionScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [localSelected, setLocalSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setLocalSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };
  const handleDebut =()=>{
    navigation.navigate("SignUp")
  }
  const renderItem = ({ item }: any) => {
    const isSelected = localSelected.includes(item.id);

    return (
      <TouchableOpacity
        className="mb-6 mr-3 w-[48%] "
        onPress={() => toggleSelect(item.id)}
        activeOpacity={0.8}
      >
        <View
          className={`rounded-xl overflow-hidden border-2 ${
            isSelected ? "border-green-500" : "border-gray-100"
          }`}
        >
          <Image
            source={{ uri: item.image }}
            className="w-full h-32"
            resizeMode="cover"
          />
          {isSelected && <View className="absolute inset-0 bg-black/30" />}
        </View>
        <Text className={`text-center text-base ${
            isSelected ? "text-green-500" : "text-black-100"
          }`}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      className="flex-1 bg-white px-4"
      style={{ paddingTop: insets.top + 12 }}
    >
      <Text className="text-2xl font-bold text-black mt-2">Pick Your Game</Text>
      <Text className="text-gray-500 mb-4">
        Select your favorite sports to get started
      </Text>
      <View className="mt-10" />
      <FlatList
        data={sports}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <View className="absolute bottom-6 left-6 right-6">
        <TouchableOpacity className={`py-4 rounded-xl ${localSelected.length > 0 ? "bg-green-600" :"bg-gray-300"}`}
        disabled={localSelected.length === 0}
        onPress={handleDebut}
        >
          <Text className="text-white text-center font-semibold text-base" >
            {localSelected > 0 ? "Make my debut" : "select a Game"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameSelectionScreen;

const styles = StyleSheet.create({});
