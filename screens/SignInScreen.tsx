// import {
//   Image,
//   Pressable,
//   Text,
//   TextInput,
//   View,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import React, { useState, useCallback, useEffect } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import { EyeClosed, EyeIcon } from "lucide-react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useAuth, useOAuth, useUser, useSignIn } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";
// import { useNavigation } from "@react-navigation/native";
// import api from "../axiosInstance";

// WebBrowser.maybeCompleteAuthSession();

// const signInSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Enter a valid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type SignInFormData = z.infer<typeof signInSchema>;

// const SignInScreen = () => {
//   const navigation = useNavigation<any>();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSyncing, setIsSyncing] = useState(false);
  
//   // Clerk Hooks
//   const { user } = useUser();
//   const { signIn, setActive, isLoaded: signInLoaded } = useSignIn();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { signOut } = useAuth();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<SignInFormData>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: "saurabh123mahi@gmail.com",
//       password: "saurabh123",
//     },
//   });

//   // Effect to sync user and navigate when Clerk session is active
//   useEffect(() => {
//     if (user) {
//       syncUserWithBackend();
//     }
//   }, [user]);

//   const syncUserWithBackend = async () => {
//     if (!user) return;
//     setIsSyncing(true);
//     try {
//       const userData = {
//         clerkId: user.id,
//         email: user.primaryEmailAddress?.emailAddress,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         image: user.imageUrl,
//         provider: user.externalAccounts[0]?.verification?.strategy || "password",
//       };

//       console.log("Syncing user with backend...", userData);
//       await api.post("/create-or-update", userData);
      
//       // SUCCESS: Navigate to the Start screen
//       navigation.replace("Start"); 
//     } catch (error: any) {
//       console.error("Backend sync failed:", error.response?.data || error.message);
//       Alert.alert("Sync Error", "Failed to sync user data with server.");
//     } finally {
//       setIsSyncing(false);
//     }
//   };

//   // --- Normal Email/Password Login ---
//  const onSubmit = async (data: SignInFormData) => {
//   if (!signInLoaded) return;

//   try {
//     const result = await signIn.create({
//       identifier: data.email,
//       password: data.password,
//     });

//     if (result.status === "complete") {
//       await setActive({ session: result.createdSessionId });
//     } else if (result.status === "needs_verification") {
//       Alert.alert("Verify Email", "Please verify your email before signing in.");
//     }
//   } catch (err: any) {
//     Alert.alert("Login Failed", err.errors?.[0]?.message);
//   }
// };

//   // --- Google Login ---
//   const onGoogleSignInPress = useCallback(async () => {
//     try {
//       const { createdSessionId, setActive: setOAuthActive } = await startOAuthFlow({
//         redirectUrl: Linking.createURL("/dashboard", { scheme: "playvenue" }),
//       });

//       if (createdSessionId && setOAuthActive) {
//         await setOAuthActive({ session: createdSessionId });
//       }
//     } catch (err) {
//       console.error("OAuth error", err);
//     }
//   }, [startOAuthFlow]);

//   return (
//     <View className="flex-1 bg-white items-center justify-center px-6">
//       <Image
//         source={{ uri: "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1768495999/ChatGPT_Image_Jan_15_2026_10_18_29_PM_wzqkbk.png" }}
//         className="w-[200px] h-[100px]"
//         resizeMode="contain"
//       />
//       <Text className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</Text>
//       <Text className="text-base text-gray-500 mb-6">Sign in to continue</Text>

//       {/* Email Input */}
//       <Controller
//         control={control}
//         name="email"
//         render={({ field: { onChange, value } }) => (
//           <TextInput
//             value={value}
//             onChangeText={onChange}
//             placeholder="Enter Your Email"
//             autoCapitalize="none"
//             className="w-full p-4 my-2 border border-gray-300 rounded-xl"
//             style={{ borderColor: errors.email ? "red" : "#ccc" }}
//           />
//         )}
//       />
//       {errors.email && <Text className="text-red-500 text-xs self-start ml-1">{errors.email.message}</Text>}

//       {/* Password Input */}
//       <Controller
//         control={control}
//         name="password"
//         render={({ field: { onChange, value } }) => (
//           <View className="flex-row items-center w-full p-1 my-2 border border-gray-300 rounded-xl" style={{ borderColor: errors.password ? "red" : "#ccc" }}>
//             <TextInput
//               value={value}
//               onChangeText={onChange}
//               placeholder="Password"
//               secureTextEntry={!showPassword}
//               className="flex-1 p-3"
//             />
//             <Pressable onPress={() => setShowPassword(!showPassword)} className="pr-3">
//               {showPassword ? <EyeClosed size={20} color="gray" /> : <EyeIcon size={20} color="gray" />}
//             </Pressable>
//           </View>
//         )}
//       />
//       {errors.password && <Text className="text-red-500 text-xs self-start ml-1">{errors.password.message}</Text>}

//       <Pressable
//         onPress={handleSubmit(onSubmit)}
//         disabled={isSubmitting || isSyncing}
//         className="w-full bg-green-500 py-3 rounded-xl mt-6 active:bg-green-600"
//       >
//         <Text className="text-white text-center text-lg font-semibold">
//           {isSubmitting || isSyncing ? "Processing..." : "Sign In"}
//         </Text>
//       </Pressable>

//       <View className="flex-row items-center w-full my-6">
//         <View className="flex-1 h-[1px] bg-gray-300" />
//         <Text className="mx-2 text-gray-400 text-sm">OR</Text>
//         <View className="flex-1 h-[1px] bg-gray-300" />
//       </View>

//       {/* GOOGLE SIGNIN BUTTON */}
//       <Pressable
//         onPress={onGoogleSignInPress}
//         disabled={isSyncing || isSubmitting}
//         className="w-full flex-row items-center justify-center border border-gray-300 py-3 rounded-xl"
//       >
//         {isSyncing ? (
//           <ActivityIndicator color="#000" />
//         ) : (
//           <>
//             <Image 
//               source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.png" }} 
//               style={{ width: 20, height: 20, marginRight: 10 }}
//             />
//             <Text className="text-gray-700 text-lg font-medium">Continue with Google</Text>
//           </>
//         )}
//       </Pressable>
//     </View>
//   );
// };

// export default SignInScreen;

import {
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { EyeClosed, EyeIcon } from "lucide-react-native";
import * as WebBrowser from "expo-web-browser";
import { useAuth, useOAuth, useUser, useSignIn } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import api from "../axiosInstance";

WebBrowser.maybeCompleteAuthSession();

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInScreen = () => {
  const navigation = useNavigation<any>();
  const [showPassword, setShowPassword] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Clerk Hooks
  const { user, isLoaded: userLoaded } = useUser();
  const { signIn, setActive, isLoaded: signInLoaded } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { signOut } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // --- Backend Sync Function (Manual call only) ---
  const syncUserWithBackend = async (currentUser: any) => {
    if (!currentUser) return;
    setIsSyncing(true);
    try {
      const userData = {
        clerkId: currentUser.id,
        email: currentUser.primaryEmailAddress?.emailAddress,
        firstName: currentUser.firstName || "User",
        lastName: currentUser.lastName || "",
        image: currentUser.imageUrl,
        provider: currentUser.externalAccounts?.[0]?.verification?.strategy || "password",
      };

      console.log("Manual Syncing with backend...", userData);
      await api.post("/create-or-update", userData);
      navigation.replace("Start");
    } catch (error: any) {
      console.error("Backend sync failed:", error.response?.data || error.message);
      Alert.alert("Sync Error", "Server is not responding. Please check your connection.");
    } finally {
      setIsSyncing(false);
    }
  };

  // --- Normal Email/Password Login ---
  const onSubmit = async (data: SignInFormData) => {
    if (!signInLoaded) return;
    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // NOTE: Idhar sync handleBackend logic hum splash screen ya root par rakhte hain 
        // par aap manually navigation.replace("Start") bhi kar sakte ho.
      }
    } catch (err: any) {
      Alert.alert("Login Failed", err.errors?.[0]?.message || "Invalid credentials");
    }
  };

  // --- Google Login ---
  const onGoogleSignInPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive: setOAuthActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/dashboard", { scheme: "playvenue" }),
      });

      if (createdSessionId && setOAuthActive) {
        await setOAuthActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startOAuthFlow]);

  // 1. Agar Clerk load ho raha hai
  if (!userLoaded || !signInLoaded) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  // 2. AGAR USER LOGGED IN HAI: Toh "Continue as..." UI dikhao
  if (user) {
    return (
      <View className="flex-1 bg-white items-center justify-center px-6">
        <Image
          source={{ uri: user.imageUrl }}
          className="w-24 h-24 rounded-full mb-4 border-2 border-green-500"
        />
        <Text className="text-2xl font-bold text-gray-800">Hi, {user.firstName}!</Text>
        <Text className="text-gray-500 mb-8">{user.primaryEmailAddress?.emailAddress}</Text>

        <Pressable
          onPress={() => syncUserWithBackend(user)}
          disabled={isSyncing}
          className="w-full bg-green-500 py-4 rounded-xl mb-4 active:bg-green-600 shadow-md"
        >
          {isSyncing ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center text-lg font-bold">Continue as {user.firstName}</Text>
          )}
        </Pressable>

        <TouchableOpacity onPress={() => signOut()} className="mt-2">
          <Text className="text-red-500 font-semibold text-base">Sign Out / Use different account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. AGAR USER LOGGED IN NAHI HAI: Toh Login Form dikhao
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Image
        source={{ uri: "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1768495999/ChatGPT_Image_Jan_15_2026_10_18_29_PM_wzqkbk.png" }}
        className="w-[180px] h-[80px] mb-4"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</Text>
      <Text className="text-base text-gray-500 mb-8">Sign in to your account</Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Email Address"
            autoCapitalize="none"
            className="w-full p-4 my-2 border border-gray-200 rounded-2xl bg-gray-50"
          />
        )}
      />
      {errors.email && <Text className="text-red-500 text-xs self-start ml-2">{errors.email.message}</Text>}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View className="flex-row items-center w-full p-1 my-2 border border-gray-200 rounded-2xl bg-gray-50">
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              secureTextEntry={!showPassword}
              className="flex-1 p-3"
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} className="pr-4">
              {showPassword ? <EyeClosed size={20} color="gray" /> : <EyeIcon size={20} color="gray" />}
            </Pressable>
          </View>
        )}
      />
      {errors.password && <Text className="text-red-500 text-xs self-start ml-2">{errors.password.message}</Text>}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="w-full bg-green-500 py-4 rounded-2xl mt-6 shadow-sm active:bg-green-600"
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center text-lg font-bold">Sign In</Text>
        )}
      </Pressable>

      <View className="flex-row items-center w-full my-8">
        <View className="flex-1 h-[0.5px] bg-gray-300" />
        <Text className="mx-4 text-gray-400 text-xs font-bold">OR</Text>
        <View className="flex-1 h-[0.5px] bg-gray-300" />
      </View>

      <Pressable
        onPress={onGoogleSignInPress}
        className="w-full flex-row items-center justify-center border border-gray-200 py-4 rounded-2xl bg-white shadow-sm"
      >
        <Image 
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.png" }} 
          style={{ width: 20, height: 20, marginRight: 12 }}
        />
        <Text className="text-gray-700 text-base font-semibold">Continue with Google</Text>
      </Pressable>
      
      <TouchableOpacity 
        onPress={() => navigation.navigate("SignUp")}
        className="mt-8"
      >
        <Text className="text-gray-500">
          Don't have an account? <Text className="text-green-600 font-bold">Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;