import { SignedOut, useClerk } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowBigRight,
  ArrowRight,
  Bell,
  ChevronRight,
  Facebook,
  Gamepad2,
  Gift,
  GroupIcon,
  Instagram,
  MessageCircle,
  Twitter,
  Users,
} from "lucide-react-native";
import React from "react";

import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export const spotligthData = [
  {
    keyid: 1,
    image:
      "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1754022594/main-sample.png",
    text: "Learn Tennis",
    desc: "Know more",
  },
  {
    keyid: 2,
    image:
      "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1754022594/cld-sample-3.jpg",
    text: "Up Your Game",
    desc: "Find a coach",
  },
  {
    keyid: 3,
    image:
      "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1754022594/cld-sample-2.jpg",
    text: "Tournaments",
    desc: "Compete and win rewards",
  },
  {
    keyid: 4,
    image:
      "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1754022592/samples/balloons.jpg",
    text: "Events",
    desc: "Join upcoming sports events",
  },
];

const HomeScreens = () => {
  const navigation = useNavigation();
  const {signOut} =useClerk();
  const handleSignOut =async()=>{
   try {
   const res=await signOut();

   } catch (error) {
    console.error("Sign out error",error)
   }
  }
  return (
    <SafeAreaView className="flex-1 bg-white mt-8 ">
      <View className="px-4 py-3 bg-white flex-row justify-between items-center border-b border-gray-200">
        <View className="flex-1">
          <Text className="text-gray-400 text-xs">Location</Text>
          <Text className="text-lg font-semibold">Pune Maharstra</Text>
        </View>
        <View className="flex-row gap-4 items-center ml-2">
          <MessageCircle size={20} stroke="#333" />
          <Bell size={20} stroke="#333" />
          <Pressable onPress={handleSignOut} >
            <Image
              className="w-8 h-8 rounded-full"
              src={
                "https://lh3.googleusercontent.com/a/ACg8ocKoOj4WpckwQ79xFMUjb6lAyUBIFv1DL96NyBuIrBEZNTHnS0dKqA=s400-c"
              }
              alt="blank"
            />
          </Pressable>
        </View>
      </View>
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <View className="bg-[#f4f4f5] rounded-2xl p-4 mt-4 flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-semibold">
              Set Your Weekly Fit Goal
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              Keep Your Self Fit
            </Text>
          </View>
          <View className="">
            <Text className="text-3xl">
              <ArrowRight size={20} color="#9CA3AF" strokeWidth={2} />
            </Text>
          </View>
        </View>

        <View className="bg-white border border-gray-200 rounded-2xl p-4 mt-4 shadow-sm relative ">
          <Text className="text-sm font-semibold text-gray-400">
            START PLAYING
          </Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-semibold mt-2">Create Game</Text>
              <Text className="text-base text-gray-500 mt-1">
                No Upcoming games in your calender
              </Text>
            </View>
            <TouchableOpacity className="bg-white px-4 py-2 border border-gray-300 rounded-md">
              <Text className="text-base font-semibold">Create</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="mt-3 self-center ">
            <Text className="text-[#222] font-semibold underline text-base">
              View My Calender
            </Text>
          </TouchableOpacity>
        </View>
        <View className="bg-[#F9FAFB] mt-5 rounded-2xl p-4 space-y-4">
          {/* Groups */}
          <TouchableOpacity className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="bg-green-100 p-2 rounded-full">
                <Text>
                  <Users size={25} strokeWidth={2} />
                </Text>
              </View>

              <View>
                <Text className="font-semibold text-lg text-gray-800">
                  Groups
                </Text>
                <Text className="text-sm text-gray-500">
                  Connect, Compete and Discuss
                </Text>
              </View>
            </View>
            <Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </Text>
          </TouchableOpacity>

          {/* Game Time Activities */}
          <TouchableOpacity className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="bg-yellow-100 p-2 rounded-full">
                <Text>
                  {" "}
                  <Gamepad2 size={25} strokeWidth={2} />
                </Text>
              </View>

              <View>
                <Text className="font-semibold text-lg text-gray-800">
                  Game Time Activities
                </Text>
                <Text className="text-sm text-gray-500">
                  410 Playo hosted games
                </Text>
              </View>
            </View>
            <Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mt-5">
          <TouchableOpacity className="w-[48%] bg-white rounded-2xl border border-gray-200 p-4">
            <Text className="font-semibold text-base text-black">Bookings</Text>
            <Text className="text-sm text-gray-500">Game History</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[48%] bg-white rounded-2xl border border-gray-200 p-4">
            <Text className="font-semibold text-base text-black">PlayPals</Text>
            <Text className="text-sm text-gray-500">Manage Players</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xl font-bold mt-6 mb-2">SpotLight</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {spotligthData.map((item) => (
            <TouchableOpacity
              key={item.keyid}
              className="mr-4 bg-white rounded-xl w-48 overflow-hidden shodow-sm "
              activeOpacity={0.8}
            >
              <Image
                className="w-full h-56"
                source={{ uri: item.image }}
                resizeMode="cover"
              />
              <View className="p-3">
                <Text className="font-bold text-gray-800 text-base">
                  {item?.text}
                </Text>
                <Text className="text-sm text-gray-600">{item?.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View className="items-center mt-5 mb-6">
          <Text className="text-sm text-gray-500">FOLLOW US ON</Text>
          <View className="flex-row gap-4 mt-2">
            <Text className="text-lg">
              <Facebook />
            </Text>
            <Text className="text-lg">
              <Instagram />
            </Text>
            <Text className="text-lg">
              <Twitter />
            </Text>
          </View>
        </View>

        <View className="bg-[#f9fafb] rounded-2xl p-4 mb-6 flex-row items-center">
          <View className="bg-gray-100 p-3 rounded-full mr-3">
            <Text>
              <Gift size={22} color="#A855F7" strokeWidth={2} />
            </Text>
          </View>
          <View className="flex-1">
            <Text className="font-semibold text-base">
              Refer a Sports Enthusiast
            </Text>
            <Text className="text-sm text-gray-600">
              Earn <Text className="text-blue-500">50 karma points</Text>by
              inviting your friends
            </Text>
          </View>
        </View>

        <View className="items-center mb-10 mt-4">
          <Text className="text-2xl font-bold text-[#14b8a6] ">PLAY_VENUE</Text>
          <Text className="text-sm text-gray-500 mt-1">
            Your Sports Community App{" "}
          </Text>
          <View className="flex-row items-center gap-1 mt-2">
            <TouchableOpacity>
              <Text className="text-sm text-blue underline">
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <Text className="text-gray-400">.</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue underline">
                Terms of service
              </Text>
            </TouchableOpacity>
            <Text className="text-gray-400">.</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue underline">FAQ's</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreens;
