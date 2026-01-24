
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUserOnboarding } from "../contexts/UserOnboardingContext";
import { useSignUp } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { EyeClosed, EyeIcon } from "lucide-react-native";
import z from "zod";
import api from "../axiosInstance";

// ---------------- SCHEMA ----------------
const signUpSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const navigation = useNavigation<any>();
  const { isLoaded, signUp, setActive } = useSignUp();
  
  // Data from Onboarding Context
  const { firstName, lastName, image, sports } = useUserOnboarding();

  const {
    control,
    handleSubmit,
    watch, // To get email for backend sync
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = watch("email");

  // ---------------- STEP 1: INITIAL SIGN UP ----------------
  const onSubmit = async (data: SignUpFormData) => {
    if (!isLoaded) return;

    try {
      // Create the user in Clerk
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      // Send the OTP to their email
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (error: any) {
      Alert.alert(
        "Signup Error",
        error?.errors?.[0]?.message || "Something went wrong"
      );
      console.log("Signup Error:", error);
    }
  };

  // STEP 2: VERIFY OTP & SYNC
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    if (code.length !== 6) {
      Alert.alert("Invalid Code", "Please enter 6 digit OTP");
      return;
    }

    setIsVerifying(true);

    try {
      // Attempt to verify the code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        // Set the session active
        await setActive({
          session: completeSignUp.createdSessionId,
        });

        // --------- BACKEND SYNC (MongoDB) ---------
        try {
          const userData = {
            clerkId: completeSignUp.createdUserId,
            email: emailValue,
            firstName: firstName || "User",
            lastName: lastName || "",
            image: image || "",
            sports:  ['cricket',"football"],
            provider: "email",
          };
          await api.post("/create-or-update", userData);
          
        } catch (dbError: any) {
         
          console.error("MongoDB Sync Failed", dbError.response?.data || dbError.message);
        }

        // Final Navigation to Start/Home
        navigation.replace("Start"); 
      } else {
        console.error("Verification status incomplete:", completeSignUp.status);
      }
    } catch (error: any) {
      Alert.alert(
        "Verification Failed",
        error?.errors?.[0]?.message || "OTP verification failed"
      );
    } finally {
      setIsVerifying(false);
    }
  };

  // ---------------- VERIFICATION UI ----------------
  if (pendingVerification) {
    return (
      <View className="flex-1 bg-white px-6 justify-center">
        <Text className="text-2xl font-bold mb-2">Verify your email</Text>
        <Text className="text-gray-500 mb-6">
          We've sent a 6 digit code to {emailValue}
        </Text>

        <TextInput
          placeholder="000000"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
          className="w-full p-4 border border-gray-300 rounded-xl mb-6 text-center text-2xl font-bold tracking-[10px]"
        />

        <TouchableOpacity
          onPress={onVerifyPress}
          disabled={isVerifying}
          className="bg-black py-4 rounded-xl flex-row justify-center"
        >
          {isVerifying ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">
              Verify & Continue
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPendingVerification(false)}
          className="mt-4"
        >
          <Text className="text-center text-gray-500">Edit Email / Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ---------------- SIGNUP FORM UI ----------------
  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View className="items-center mb-10">
        <Image
          source={{
            uri: "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1768495999/ChatGPT_Image_Jan_15_2026_10_18_29_PM_wzqkbk.png",
          }}
          className="w-[200px] h-[100px]"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold mt-2 text-gray-800">Create Account</Text>
        <Text className="text-gray-500 text-sm">Join the playVenue community</Text>
      </View>

      <View className="space-y-4">
        {/* Email Field */}
        <View>
          <Text className="font-semibold text-gray-700 mb-1 ml-1">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                className="w-full p-4 border border-gray-300 rounded-xl"
                style={{ borderColor: errors.email ? "#ef4444" : "#d1d5db" }}
              />
            )}
          />
          {errors.email && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</Text>}
        </View>

        {/* Password Field */}
        <View>
          <Text className="font-semibold text-gray-700 mb-1 ml-1">Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View
                className="flex-row items-center border border-gray-300 rounded-xl"
                style={{ borderColor: errors.password ? "#ef4444" : "#d1d5db" }}
              >
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="At least 6 characters"
                  secureTextEntry={!showPassword}
                  className="flex-1 p-4"
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} className="pr-4">
                  {showPassword ? <EyeClosed size={20} color="gray" /> : <EyeIcon size={20} color="gray" />}
                </Pressable>
              </View>
            )}
          />
          {errors.password && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</Text>}
        </View>
      </View>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="bg-green-500 py-4 rounded-xl mt-8 active:opacity-80"
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center text-lg font-bold">Sign Up</Text>
        )}
      </Pressable>

      <TouchableOpacity
        className="mt-6"
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text className="text-center text-gray-600">
          Already have an account? <Text className="font-bold text-green-600">Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;