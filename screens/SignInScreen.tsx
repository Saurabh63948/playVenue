import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from '@expo/vector-icons';
import { EyeClosed, EyeIcon } from "lucide-react-native";
const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "saurabh123mahi@gmail.com",
      password: "saurabh123",
    },
  });

  const onSubmit = (data: SignInFormData) => {
    console.log("formData", data);
  };

  return (
    <View className=" flex-1 bg-white items-center justify-center px-6">
      <Image
        source={{
          uri: "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1768495999/ChatGPT_Image_Jan_15_2026_10_18_29_PM_wzqkbk.png",
        }}
        className="w-[200px] h-[100px]"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold text-gray-800 mb-1">
        Welcome Back
      </Text>
      <Text text-base text-gray-500 mb-6>
        Sign in to continue
      </Text>
      {/* Emial Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Enter Your Email/phone"
            autoCapitalize="none"
            style={{
              width: "100%",
              padding: 12,
              marginVertical: 10,
              borderWidth: 1,
              borderColor: errors.email ? "red" : "#ccc",
              borderRadius: 10,
            }}
          />
        )}
      />
      {errors?.email && (
        <Text className="text-red-500 text-sm w-full">
          {errors.email.message}
        </Text>
      )}

      {/* Password */}

      <Controller 
       control={control}
       name="password"
     render={({ field: { onChange, value } }) => (
       <View 
       style={{width:"100%",borderWidth:1,
        borderColor:errors.password ? "red" :"#ccc",
         borderRadius: 10,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
       }}
       >
        <TextInput
         value={value}
         onChangeText={onChange}
         placeholder="password"
              secureTextEntry={!showPassword}
         style={{
          flex: 1,
          paddingVertical: 12,
        }}
        />
         <Pressable onPress={() => setShowPassword(!showPassword)}>
        <Text className="text-blue-500 font-semibold">
          {showPassword ? <EyeClosed/> : <EyeIcon/>}
        </Text>
      </Pressable>
        </View>
       )}
      />{errors.password && (
        <Text className="text-red-500 text-sm w-full">
          {errors.password.message}
        </Text>
      )}

      {/* Sign In Button  */}
      {/* Sign In Button */}
      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="w-full bg-green-500 py-3 rounded-xl mt-6"
      >
        <Text className="text-white text-center text-lg font-semibold">
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Text>
      </Pressable>
      <View className="flex-row items-center w-full my-3" >
        <View className="flex-1 h-[1px] bg-gray-300"  />
        <Text className="mx-2 text-gray-400 text-xm">OR</Text>
        <View className="flex-1 h-[1px] bg-gray-300">

        </View>
        {/* GOOGLE SIGNIN  COMPONENT*/}
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
