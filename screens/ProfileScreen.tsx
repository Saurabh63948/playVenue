import React from "react";
import { Bold, Calendar, Edit, FileQuestion, Gift, LogOut, MailQuestion, Quote, Share2Icon, ShieldQuestionMark, Vegan } from "lucide-react-native";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
} from "react-native";

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        {/* Header */}
        <View className="bg-[#294462] p-4 pb-8">
          <View className="flex-row items-center justify-between">
            {/* LEFT: Profile info */}
            <View className="flex-row items-center">
              <Image
                className="w-16 h-16 rounded-full mr-4"
                source={{
                  uri: "https://lh3.googleusercontent.com/a/ACg8ocKoOj4WpckwQ79xFMUjb6lAyUBIFv1DL96NyBuIrBEZNTHnS0dKqA=s400-c",
                }}
              />

              <View>
                <Text className="text-white text-xl font-bold">
                  Saurabh Singh
                </Text>
                <Text className="text-white text-sm">150 Karma Point</Text>
              </View>
            </View>

            {/* RIGHT: Edit Button */}
            <TouchableOpacity className="bg-white/20 p-2 rounded-full">
              <Edit color="white" size={22} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4 mt-4">
          <View className="bg-white rounded-xl p-4 shawdow-sm">
            <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <Calendar color={"green"} size={24} />
              </View>

              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">
                  My Bookings
                </Text>
                <Text className="text-gray-500 text-sm">
                  View Transactions & Receipts
                </Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray-200 my-2" />
             <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <Calendar color={"green"} size={24} />
              </View>

              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">
                  Play Pals
                </Text>
                <Text className="text-gray-500 text-sm">
                  View & Manage Players
                </Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray-200 my-2" />
             <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <Calendar color={"green"} size={24} />
              </View>

              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">
                  Passbooks
                </Text>
                <Text className="text-gray-500 text-sm">
                  Manage Karma, Playo credits
                </Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray-200 my-2" />
             <TouchableOpacity className="flex-row items-center py-3">
              <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                <Calendar color={"green"} size={24} />
              </View>

              <View className="flex-1">
                <Text className="text-gray-800 text-base font-semibold">
                  Preference and Privacy
                </Text>
                <Text className="text-gray-500 text-sm">
                  Manage Your Settings
                </Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray-200 my-2" />
            
          </View>
        </View>
         
         {/* {Secondary Section } */}
      <View className="px-4 mt-4 mb-6">
        <View className="bg-white rounded-xl p-4 shadow-sm">
       {/* {Offers} */}
       <TouchableOpacity className="flex-row items-center py-3" >
       <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
         <Gift color={"green"} size={24}/>
       </View>
        <View className="flex-1">
         <Text className="text-gray-800 text-base font-semibold" >
          Offers  
         </Text>
          <Text className="text-gray-500 text-sm " >
          View Available Discounts  
         </Text>
       </View>
       </TouchableOpacity>
       <View className="h-px bg-gray-200 my-2"/>

       {/* blogs */}
       
       <TouchableOpacity className="flex-row items-center py-3" >
       <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
         <Vegan color={"green"} size={24}/>
       </View>
        <View className="flex-1">
         <Text className="text-gray-800 text-base font-semibold" >
          Blogs  
         </Text>
          <Text className="text-gray-500 text-sm " >
         Read Latest Articles  
         </Text>
       </View>
       </TouchableOpacity>
        <View className="h-px bg-gray-200 my-2"/>
        <TouchableOpacity className="flex-row items-center py-3" >
       <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
         <Share2Icon color={"green"} size={24}/>
       </View>
        <View className="flex-1">
         <Text className="text-gray-800 text-base font-semibold" >
          Invite & Earn 
         </Text>
          <Text className="text-gray-500 text-sm " >
         Refer friends for rewards 
         </Text>
       </View>
       </TouchableOpacity>
        <View className="h-px bg-gray-200 my-2"/>
        <TouchableOpacity className="flex-row items-center py-3" >
       <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
         <ShieldQuestionMark color={"green"} size={24}/>
       </View>
        <View className="flex-1">
         <Text className="text-gray-800 text-base font-semibold" >
          Helps & Support 
         </Text>
          <Text className="text-gray-500 text-sm " >
          Get Assistance
         </Text>
       </View>
       </TouchableOpacity>
        <View className="h-px bg-gray-200 my-2"/>
        <TouchableOpacity className="flex-row items-center py-3" >
       <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
         <LogOut color={"red"} size={24}/>
       </View>
        <View className="flex-1">
         <Text className="text-red-600 text-base font-semibold" >
                Logout
         </Text>
          <Text className="text-gray-500 text-sm " >
          Sign Out of Your Account
         </Text>
       </View>
       </TouchableOpacity>
        <View className="h-px bg-gray-200 my-2"/>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
