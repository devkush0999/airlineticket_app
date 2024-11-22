import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";

const WelcomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#192031]">
      <StatusBar style="light" />
      <View className="border border-white  h-full">
        <View className=" w-full px-4 items-center my-8">
          <Text className="text-3xl text-white">Welcome </Text>
          <Animated.View
            entering={FadeInDown.duration(200).springify()}
            className="flex-row justify-center items-center pb-24"
          >
            <MaterialCommunityIcons name="airplane" size={24} color="#12B3A8" />
            <Text className="text-xl text-white leading-[60px] pl-1">
              BHOLU{" "}
            </Text>
            <Text className="text-xl text-blue-100 leading-[60px] pl-1 italic">
              FLY
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(200).delay(200).springify()}
          >
            <Text className="text-white text-[52px] font-medium leading-[60px] mt-4">
              Descover your Dream flight Easily
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(200).delay(400).springify()}
            className="mt-4"
          >
            <Text className=" text-neutral-300 text-lg font-medium leading-[38px] mt-4 px-1">
              find an easy way to buy airplane tickets with just a few clicks in
              the application
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(200).delay(600).springify()}
            className="h-1/4 w-full justify-start pt-8 px-4"
          >
            <Pressable
              onPress={() => router.push("/(tabs)")}
              className="bg-[#12B3A8] rounded-full justify-center items-center py-4"
            >
              <Text className="text-bold text-lg">Discover </Text>
            </Pressable>

            <View className="flex-row gap-2 w-full justify-center">
              <Text className="text-neutral-300 text-medium text-lg italic">
                Don't have an account?{" "}
              </Text>
              <Text className="text-white text-bold text-lg">Discover </Text>
            </View>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
