import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useUserOnboarding } from '../contexts/UserOnboardingContext';
import { useSignUp } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { EyeClosed, EyeIcon } from 'lucide-react-native';
import z from 'zod';
import { sports } from './GameSelectionScreen';
const signUpSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;
const SignUpScreen = () => {
   const [showPassword, setShowPassword] = useState(false);
     const [isSyncing, setIsSyncing] = useState(false);
     const [code,setCode]=useState("");
     const [pendingVerification,setPendingVerification]=useState(false)
  const navigation=useNavigation();
   const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        email: "saurabh123mahi@gmail.com",
        password: "saurabh123",
      },
    });
  
  const {isLoaded,signUp,setActive}=useSignUp();
  const [emailAddress,setEmailAddress]=useState("")
  const{setSports,sports:selectedSports,firstName,lastName,image}=useUserOnboarding()
  const onSubmit = async(data: SignUpFormData) => {
    if(!isLoaded)return;
   try {
    await signUp.create({
    emailAddress:data?.email,
    password:data?.password
    })
   } catch (error) {
      console.error("signup error",error)
   }
   
  };
  return (
    <View className='flex-1 bg-white px-4 justify-center' >
      {/* <Text className='text-2xl font-bold mb-6 text-center' >Verify Your Email</Text> */}


     <View className='items-center mb-6'>
      <Image
             source={{ uri: "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1768495999/ChatGPT_Image_Jan_15_2026_10_18_29_PM_wzqkbk.png" }}
             className="w-[200px] h-[100px]"
             resizeMode="contain"
           />
           <Text className='text-lg font-semibold mt-2 text-gray-800' >Wellcome to playVenue</Text>
     <Text className='text-sm text-gray-500' >Create an account to get started</Text>
     </View>
     

     <View>

   
      
      {/* Email Input */}
      <Text>Email *</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Enter Your Email"
            keyboardType='email-address'
            autoCapitalize="none"
            className="w-full p-4 my-2 border border-gray-300 rounded-xl"
            style={{ borderColor: errors.email ? "red" : "#ccc" }}
          />
        )}
      />

      {/* Password Input */}
      <Text>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View className="flex-row items-center w-full p-1 my-2 border border-gray-300 rounded-xl" style={{ borderColor: errors.password ? "red" : "#ccc" }}>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              secureTextEntry={!showPassword}
              className="flex-1 p-3"
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} className="pr-3">
              {showPassword ? <EyeClosed size={20} color="gray" /> : <EyeIcon size={20} color="gray" />}
            </Pressable>
          </View>
        )}
      />


      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting || isSyncing}
        className="w-full bg-black py-3 rounded-xl mt-6 active:bg-black"
      >
       
        <Text className="text-white text-center text-lg font-semibold">
          {isSubmitting ? "Processing..." : "Continue"}
        </Text>
      </Pressable>

      {/* <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting || isSyncing}
              className="w-full bg-green-500 py-3 rounded-xl mt-6 active:bg-green-600"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Already have a account{isSubmitting ? "Processing..." : "Sign In"}
              </Text>
            </Pressable> */}
            <TouchableOpacity className='mt-4' >
              <Text className='text-sm text-center text-gray-600' >
                Already have an account ? <Text className='font-semibold text-black'>Sign In</Text>
              </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({})