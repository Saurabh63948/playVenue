import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollViewBase,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import moment from "moment";
import {
  Bell,
  Filter,
  MessageCircle,
  SlidersHorizontal,
} from "lucide-react-native";
import { useUser } from "@clerk/clerk-expo";
import api from "../axiosInstance";
import { useNavigation, useRoute } from "@react-navigation/native";

const PlayScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<
    "Calendar" | "Recommended" | "My Sports" | "Other Sports" | "Past Game"
  >("My Sports");
  const [selectedSport, setSelectedSport] = useState("All");
  const [games, setGames] = useState<Game[]>([]);
  const [loginuser, setLoginUser] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getUserById();
    }
  }, []);
  const getUserById = async () => {
    try {
      const res = await api.get(`/getUserByClerkId`, {
        params: { clerkId: user?.id },
      });
      if (res?.data?.success) {
        setLoginUser(res?.data?.data);
      }
    } catch (error) {
      console.error("Error in fetching user by ID", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 mt-8">
      <View className="bg-[#87b6b6] pb-3 mt-2">
        <View className="px-4 pt-3 flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-gray-300 text-sm">
              {moment().format("h:mm A")}
            </Text>
            <Text className="text-white text-lg font-semibold">
              Sunita Nagar ,Pune
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <MessageCircle color={"white"} size={22} />
            <Bell color={"white"} size={22} />
            <Image
              source={{ uri: loginuser?.image }}
              className="w-9 h-9 rounded-full"
            />
            <Text>saurah</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 px-4"
        >
          {[
            "Calender",
            "Recommended",
            "My Sports",
            "Other Sports",
            "Past Game",
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="mr-6 "
              onPress={() => {
                setSelectedCategory(item);
              }}
            >
              <Text
                className={`text-base font-bold ${selectedCategory === item ? "text-green-400" : "text-white"}`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          className="mt-4 px-4"
        >
          {[
            {
              name: "All",
              icon: "https://cdn-icons-png.flaticon.com/512/44/44948.png",
            },
            {
              name: "Cricket",
              icon: "https://cdn-icons-png.flaticon.com/512/502/502195.png",
            },
            {
              name: "Basketball",
              icon: "https://cdn-icons-png.flaticon.com/512/889/889455.png",
            },
            {
              name: "Badminton",
              icon: "https://cdn-icons-png.flaticon.com/512/502/502210.png",
            },
            {
              name: "Tennis",
              icon: "https://cdn-icons-png.flaticon.com/512/502/502212.png",
            },
            {
              name: "Volleyball",
              icon: "https://cdn-icons-png.flaticon.com/512/861/861536.png",
            },
          ].map((sport, index) => (
            <TouchableOpacity
              className={`mr-3 px-4 py-2 rounded-full flex-row items-center gap-2 ${selectedSport === sport.name ? "bg-green-500" : "bg-white border border-gray-200"}`}
              key={index}
              style={{ alignItems: "center", marginHorizontal: 10 }}
              onPress={() => {
                setSelectedSport(sport?.name);
              }}
            >
              <Image
                source={{ uri: sport.icon }}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />

              <Text
                className={`text-base font-semibold ${selectedSport === sport.name ? "text-white" : "text-gray-800"}`}
              >
                {sport.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View className="bg-white px-4 py-3 flex-row justify-between items-center boder-b border-gray-200">
        <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-xl">
          <Text className="text-base font-semibold text-gray-700">
            + Create Game
          </Text>
        </TouchableOpacity>

        <View className="flex-row gap-3">
          <TouchableOpacity>
            <SlidersHorizontal size={22} color="#1f2937" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Filter size={22} color="#1f2937" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayScreen;
