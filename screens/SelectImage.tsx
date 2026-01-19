import { StyleSheet, Text, View ,SafeAreaView, ScrollView, Pressable, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useUserOnboarding } from '../contexts/UserOnboardingContext';

interface ImageItem{
  id:String;
  image:String
}

export const dummyAvatars = [
  {
    id: 1,
    image: "https://api.dicebear.com/7.x/adventurer/png?seed=avatar1",
  },
  {
    id: 2,
    image: "https://api.dicebear.com/7.x/adventurer/png?seed=avatar2",
  },
  {
    id: 3,
    image: "https://api.dicebear.com/7.x/adventurer/png?seed=avatar3",
  },
  {
    id: 4,
    image: "https://api.dicebear.com/7.x/adventurer/png?seed=avatar4",
  },
  {
    id: 5,
    image: "https://api.dicebear.com/7.x/adventurer/png?seed=avatar5",
  },
  
];



const SelectImage = () => {
  const navigation=useNavigation()
  // const [images,setImage]=useState("")
   const {image,setImage}=useUserOnboarding();

  return (
   <SafeAreaView className='flex-1 bg-gray-100 px-6'>
    <ScrollView contentContainerStyle={{paddingBottom:100}}>
      <View className='mt-10 items-center' >
        <Text className='text-2xl font-bold text-green-600'>Choose your Avatar</Text>
        <Text className='text-base text-gray-500 mt-2' >Pick one or upload your own</Text>
      </View>
      <View className='flex-row flex-wrap justify-center mt-10'>
        {dummyAvatars.map((avatar) => (
  <Pressable
   onPress={()=>setImage(avatar.image)}
  
  key={avatar.id} className={`w-20 h-20 rounded-full overflow-hidden border-2 ${image === avatar.image ? "border-green-500":"border-transparent"}`} >
    <Image
      source={{ uri: avatar.image }}
      accessibilityLabel="dummy user avatar"
      className='w-full h-full'
    />
  </Pressable>
))}
      </View>
      <View className='mt-8 items-center'>
        <TextInput
        className='w-4/5 border border-gray-300 rounded-xl px-4 text-base bg-white mb-3'
         placeholder='paste image url (optional)'
         autoCapitalize='none'
         value={image}
         onChangeText={setImage}
        />
        <Text className='text-xs text-gray-500 text-center' >
          Acceptance rate is 2.5x higher for players with photos
        </Text>
      </View>
    </ScrollView>
    <View className='absolute bottom-6 w-full items-center mb-6' >
      <Pressable
      onPress={()=>navigation.navigate("GameSelection")}
  className={`w-3/4  h-12 rounded-xl items-center justify-center ms-10
  ${image ? "bg-green-600" : "bg-green-300"}`}
>
        <Text className='text-white font-semibold text-base text-center'>
          Next
        </Text>
      </Pressable>
    </View>
   </SafeAreaView>
  )
}

export default SelectImage

const styles = StyleSheet.create({})