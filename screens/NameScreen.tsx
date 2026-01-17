import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { EyeClosed, EyeIcon } from 'lucide-react-native';

const signInSchema = z.object({
  firstName: z.string().min(2, "First Name is required!"),
   lastName: z.string().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;


const NameScreen = () => {
  const navigation =useNavigation();
 const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      firstName: "saurabh",
      lastName: "singh",
    },
  });

   const onSubmit = (data: SignInFormData) => {
    console.log("formData", data);
    navigation.navigate("Image")
  };

  return (
    <View className='flex-1 bg-white px-6 pt-20' >
      <Text className='text-2xl font-bold mb-4' >Let's get to know you</Text>
       <Text className='text-sm mb-1' >First Name *</Text>
        {/*First Name */}
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Enter First Name"
            autoCapitalize="none"
            style={{
              width: "100%",
              padding: 12,
              marginVertical: 0,
              borderWidth: 1,
              borderColor: errors.firstName ? "red" : "#ccc",
              borderRadius: 10,
            }}
          />
        )}
      />
      {errors?.firstName && (
        <Text className="text-red-500 text-sm w-full">
          {errors.firstName.message}
        </Text>
      )}

      {/* Last Name */}
       <Text className='text-sm mb-1 mt-5'>Last Name *</Text>
      <Controller 
       control={control}
       name="lastName"
     render={({ field: { onChange, value } }) => (
       <View 
       style={{width:"100%",borderWidth:1,
        borderColor:errors.lastName ? "red" :"#ccc",
         borderRadius: 10,
        marginVertical: 0,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
       }}
       >
        <TextInput
         value={value}
         onChangeText={onChange}
         placeholder="Enter last Name"
          
         style={{
          flex: 1,
          paddingVertical: 12,
          
        }}
        />
        
        </View>
       )}
      />{errors.lastName && (
        <Text className="text-red-500 text-sm w-full">
          {errors.lastName.message}
        </Text>
      )}


       <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-black py-4 rounded-xl mt-4 "
            >
              <Text className="text-white text-center font-bold text-base">
               Next
              </Text>
            </Pressable>
    </View>
  )
}

export default NameScreen

const styles = StyleSheet.create({})