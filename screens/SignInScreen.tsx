// // import {
// //   Image,
// //   Pressable,
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   View,
// // } from "react-native";
// // import React, { useState } from "react";
// // import { z } from "zod";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { Controller, useForm } from "react-hook-form";
// // import { Ionicons } from '@expo/vector-icons';
// // import { EyeClosed, EyeIcon } from "lucide-react-native";
// // const signInSchema = z.object({
// //   email: z.string().min(1, "Email is required").email("Enter a valid email"),
// //   password: z.string().min(6, "Password must be at least 6 characters"),
// // });

// // type SignInFormData = z.infer<typeof signInSchema>;

// // const SignInScreen = () => {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const {
// //     control,
// //     handleSubmit,
// //     formState: { errors, isSubmitting },
// //   } = useForm<SignInFormData>({
// //     resolver: zodResolver(signInSchema),
// //     defaultValues: {
// //       email: "saurabh123mahi@gmail.com",
// //       password: "saurabh123",
// //     },
// //   });

// //   const onSubmit = (data: SignInFormData) => {
// //     console.log("formData", data);
// //   };

// //   return (
// //     <View className=" flex-1 bg-white items-center justify-center px-6">
// //       <Image
// //         source={{
// //           uri: "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1768495999/ChatGPT_Image_Jan_15_2026_10_18_29_PM_wzqkbk.png",
// //         }}
// //         className="w-[200px] h-[100px]"
// //         resizeMode="contain"
// //       />
// //       <Text className="text-2xl font-bold text-gray-800 mb-1">
// //         Welcome Back
// //       </Text>
// //       <Text text-base text-gray-500 mb-6>
// //         Sign in to continue
// //       </Text>
// //       {/* Emial Input */}
// //       <Controller
// //         control={control}
// //         name="email"
// //         render={({ field: { onChange, value } }) => (
// //           <TextInput
// //             value={value}
// //             onChangeText={onChange}
// //             placeholder="Enter Your Email/phone"
// //             autoCapitalize="none"
// //             style={{
// //               width: "100%",
// //               padding: 12,
// //               marginVertical: 10,
// //               borderWidth: 1,
// //               borderColor: errors.email ? "red" : "#ccc",
// //               borderRadius: 10,
// //             }}
// //           />
// //         )}
// //       />
// //       {errors?.email && (
// //         <Text className="text-red-500 text-sm w-full">
// //           {errors.email.message}
// //         </Text>
// //       )}

// //       {/* Password */}

// //       <Controller 
// //        control={control}
// //        name="password"
// //      render={({ field: { onChange, value } }) => (
// //        <View 
// //        style={{width:"100%",borderWidth:1,
// //         borderColor:errors.password ? "red" :"#ccc",
// //          borderRadius: 10,
// //         marginVertical: 10,
// //         flexDirection: "row",
// //         alignItems: "center",
// //         paddingHorizontal: 12,
// //        }}
// //        >
// //         <TextInput
// //          value={value}
// //          onChangeText={onChange}
// //          placeholder="password"
// //               secureTextEntry={!showPassword}
// //          style={{
// //           flex: 1,
// //           paddingVertical: 12,
// //         }}
// //         />
// //          <Pressable onPress={() => setShowPassword(!showPassword)}>
// //         <Text className="text-blue-500 font-semibold">
// //           {showPassword ? <EyeClosed/> : <EyeIcon/>}
// //         </Text>
// //       </Pressable>
// //         </View>
// //        )}
// //       />{errors.password && (
// //         <Text className="text-red-500 text-sm w-full">
// //           {errors.password.message}
// //         </Text>
// //       )}

// //       {/* Sign In Button  */}
// //       {/* Sign In Button */}
// //       <Pressable
// //         onPress={handleSubmit(onSubmit)}
// //         disabled={isSubmitting}
// //         className="w-full bg-green-500 py-3 rounded-xl mt-6"
// //       >
// //         <Text className="text-white text-center text-lg font-semibold">
// //           {isSubmitting ? "Signing in..." : "Sign In"}
// //         </Text>
// //       </Pressable>
// //       <View className="flex-row items-center w-full my-3" >
// //         <View className="flex-1 h-[1px] bg-gray-300"  />
// //         <Text className="mx-2 text-gray-400 text-xm">OR</Text>
// //         <View className="flex-1 h-[1px] bg-gray-300">

// //         </View>
// //         {/* GOOGLE SIGNIN  COMPONENT*/}
// //       </View>
// //     </View>
// //   );
// // };

// // export default SignInScreen;

// // const styles = StyleSheet.create({});


// import {
//   Image,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import React, { useState, useCallback } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import { EyeClosed, EyeIcon } from "lucide-react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";

// // Browser warm up for faster login
// WebBrowser.maybeCompleteAuthSession();

// const signInSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Enter a valid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type SignInFormData = z.infer<typeof signInSchema>;

// const SignInScreen = () => {
//   const [showPassword, setShowPassword] = useState(false);
  
//   // Clerk OAuth Setup
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

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

//   // Google Login Function
//   const onGoogleSignInPress = useCallback(async () => {
//     try {
//       const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
//         redirectUrl: Linking.createURL("/dashboard", { scheme: "playvenue" }),
//       });

//       if (createdSessionId) {
//         setActive!({ session: createdSessionId });
//       } else {
//         // Use signIn or signUp for next steps such as MFA
//       }
//     } catch (err) {
//       console.error("OAuth error", err);
//     }
//   }, []);

//   const onSubmit = (data: SignInFormData) => {
//     console.log("formData", data);
//     // Yahan normal email sign-in logic aayega (Clerk useSignIn)
//   };

//   return (
//     <View className="flex-1 bg-white items-center justify-center px-6">
//       <Image
//         source={{
//           uri: "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1768495999/ChatGPT_Image_Jan_15_2026_10_18_29_PM_wzqkbk.png",
//         }}
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
//             placeholder="Enter Your Email/phone"
//             autoCapitalize="none"
//             className="w-full p-3 my-2 border border-gray-300 rounded-xl"
//             style={{ borderColor: errors.email ? "red" : "#ccc" }}
//           />
//         )}
//       />
//       {errors?.email && <Text className="text-red-500 text-sm w-full">{errors.email.message}</Text>}

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
//               className="flex-1 p-2"
//             />
//             <Pressable onPress={() => setShowPassword(!showPassword)} className="pr-3">
//               {showPassword ? <EyeClosed size={20} color="gray" /> : <EyeIcon size={20} color="gray" />}
//             </Pressable>
//           </View>
//         )}
//       />
//       {errors.password && <Text className="text-red-500 text-sm w-full">{errors.password.message}</Text>}

//       {/* Sign In Button */}
//       <Pressable
//         onPress={handleSubmit(onSubmit)}
//         disabled={isSubmitting}
//         className="w-full bg-green-500 py-3 rounded-xl mt-6 active:bg-green-600"
//       >
//         <Text className="text-white text-center text-lg font-semibold">
//           {isSubmitting ? "Signing in..." : "Sign In"}
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
//         className="w-full flex-row items-center justify-center border border-gray-300 py-3 rounded-xl space-x-2"
//       >
//         <Image 
//           source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }} 
//           style={{ width: 20, height: 20, marginRight: 10 }}
//         />
//         <Text className="text-gray-700 text-lg font-medium">Continue with Google</Text>
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
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { EyeClosed, EyeIcon } from "lucide-react-native";
import * as WebBrowser from "expo-web-browser";
import { useAuth, useOAuth, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import api from "../axiosInstance"; 

WebBrowser.maybeCompleteAuthSession();

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { user } = useUser(); // Clerk user hook
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
const { signOut, isSignedIn } = useAuth();
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

  
  useEffect(() => {
    if (user) {
      syncUserWithBackend();
    }
  }, [user]);

  const syncUserWithBackend = async () => {
    if (!user) return;
    setIsSyncing(true);
    try {
      const userData = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.imageUrl,
        provider: user.externalAccounts[0]?.verification?.strategy || "email",
      };

      console.log("Syncing user with backend...", userData);
      const response = await api.post("/create-or-update", userData);
      console.log("Backend sync complete :", response.data);
    } catch (error: any) {
      console.error("Backend sync failed :", error.response?.data || error.message);
    } finally {
      setIsSyncing(false);
    }
  };

  // Google Login
  const onGoogleSignInPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/dashboard", { scheme: "playvenue" }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const onSubmit = (data: SignInFormData) => {
    console.log("Normal Login Data:", data);
   
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Image
        source={{ uri: "https://res.cloudinary.com/dwz7bhzkf/image/upload/v1768495999/ChatGPT_Image_Jan_15_2026_10_18_29_PM_wzqkbk.png" }}
        className="w-[200px] h-[100px]"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</Text>
      <Text className="text-base text-gray-500 mb-6">Sign in to continue</Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Enter Your Email"
            autoCapitalize="none"
            className="w-full p-4 my-2 border border-gray-300 rounded-xl"
            style={{ borderColor: errors.email ? "red" : "#ccc" }}
          />
        )}
      />

      {/* Password Input */}
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
        className="w-full bg-green-500 py-3 rounded-xl mt-6 active:bg-green-600"
      >
        <Text className="text-white text-center text-lg font-semibold">
          {isSubmitting ? "Processing..." : "Sign In"}
        </Text>
      </Pressable>

      <View className="flex-row items-center w-full my-6">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="mx-2 text-gray-400 text-sm">OR</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      {/* GOOGLE SIGNIN BUTTON */}
      <Pressable onPress={() => signOut()}>
  <Text>Sign Out</Text>
</Pressable>
      <Pressable
        onPress={onGoogleSignInPress}
        disabled={isSyncing}
        className="w-full flex-row items-center justify-center border border-gray-300 py-3 rounded-xl"
      >
        {isSyncing ? (
          <ActivityIndicator color="#000" />
        ) : (
          <>
            <Image 
              source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }} 
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
            <Text className="text-gray-700 text-lg font-medium">Continue with Google</Text>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default SignInScreen;