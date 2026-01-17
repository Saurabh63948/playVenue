import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { Calendar } from 'lucide-react-native';

const StartScreen = () => {
  const navigation = useNavigation();
  const mapView = useRef(null);

  const users = [
    {
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=800&q=80",
      description: "Hey there 👋",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=80",
      description: "Let's play 🎮",
    },
    {
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
      description: "Ready to vibe ✨",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      description: "Always online ⚡",
    },
    {
      image:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=800&q=80",
      description: "Let’s match 🔥",
    },
  ];

  const BANGALORE_COORDS = {
    latitude: 12.9916987,
    longitude: 77.5945627,
  };

 
  const generateCircularPoints = (center, radiusKm, numPoints) => {
  const points = [];
  const earthRadius = 6371; // km

  const latRad = center.latitude * (Math.PI / 180);
  const lngRad = center.longitude * (Math.PI / 180);

  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 2 * Math.PI) / numPoints;

    const lat =
      Math.asin(
        Math.sin(latRad) * Math.cos(radiusKm / earthRadius) +
          Math.cos(latRad) *
            Math.sin(radiusKm / earthRadius) *
            Math.cos(angle)
      );

    const lng =
      lngRad +
      Math.atan2(
        Math.sin(angle) *
          Math.sin(radiusKm / earthRadius) *
          Math.cos(latRad),
        Math.cos(radiusKm / earthRadius) -
          Math.sin(latRad) * Math.sin(lat)
      );

    points.push({
      latitude: lat * (180 / Math.PI),
      longitude: lng * (180 / Math.PI),
    });
  }

  return points;
};


  const circularPoints = generateCircularPoints(BANGALORE_COORDS, 5, 6);
  useEffect(() => {
  if (mapView.current) {
    mapView.current.fitToCoordinates(circularPoints, {
      edgePadding: {
        top: 70,
        bottom: 70,
        left: 70,
        right: 70,
      },
      animated: true,
    });
  }
}, []);

  return (
    <>
    <SafeAreaView className="flex-1 bg-white">
      <MapView
        ref={mapView}
        style={{ width: "100%", height: 400 }}
        initialRegion={{
          latitude: BANGALORE_COORDS.latitude,
          longitude: BANGALORE_COORDS.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {circularPoints?.map((point, index) => {
          const user = users[index % users.length];

          return (
            <Marker key={index} coordinate={point}>
              <View>
                <Image
                  className="w-[70px] h-[70px] rounded-full"
                  source={{ uri: user?.image }}
                  resizeMode="cover"
                />
              </View>

              <View className="bg-white px-3 py-2 rounded-md mt-1">
                <Text className="text-sm font-md text-center">
                  {user?.description}
                </Text>
              </View>
            </Marker>
          );
        })}
      </MapView>
      <View className="mt-10 items-center justify-center" >
       <Text className="text-xl font-semibold text-center w-1/2" >Find player in neighbhourhood</Text> 
       <Text className="text-gray-500 text-base mt-5">Just like you did as a kid!</Text> 
      </View>
      <Pressable onPress={()=>navigation.navigate("SignIn")} className="mt-10 items-center justify-center" >
        <Text  className="text-base text-gray-500" >
          Allready have a account? Login
        </Text>
      </Pressable>
      <View className="items-center justify-center mt-6" >
      <Image source={{uri:"https://res.cloudinary.com/dwz7bhzkf/image/upload/v1768495999/ChatGPT_Image_Jan_15_2026_10_18_29_PM_wzqkbk.png"}} className="w-[200px] h-[100px]" resizeMode="contain" />
      </View>
    </SafeAreaView>
    <View className="bg-white p-6 mb-1">
      <Pressable onPress={()=>navigation.navigate("Name")} className="bg-green-500 py-3 rounded-lg mb-3" >
        <Text className="text-white text-base font-medium text-center">
          READY , SET , GO
        </Text>
      </Pressable>
    </View>
    </>
  );
};

export default StartScreen;

const styles = StyleSheet.create({});
