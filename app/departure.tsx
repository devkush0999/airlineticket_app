import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { apiToken } from "./../utils/api";
import axios from "axios";
import { FlightOfferData } from "./(tabs)";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function departure() {
  const [searchInput, setSearchInput] = useState("");
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [flightOfferData, setFlightOfferData] = useState<any>({
    originLocationCode: "",
  });
  const [previousSelectedDeparture, setPreviousSelectedDeparture] = useState(
    []
  );

  const loadPreviousSelectedCities = async () => {
    try {
      const cities = await AsyncStorage.getItem("previousSelectedCities");
      if (cities) {
        setPreviousSelectedDeparture(JSON.parse(cities));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const debounce = (func: any, delay: number) => {
    let timeoutId: any;
    return function (...args: any) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const autoCompleteSearch = async (searchInput: string) => {
    try {
      const headers = {
        Authorization: `Bearer ${apiToken}`,
      };

      const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${searchInput}`;
      const response = await axios.get(url, { headers });
      setAutoCompleteResults(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log("Rate limit exceeded. Please try again later.");
      }
      console.error(error);
    }
  };

  const debouncedSearch = debounce(autoCompleteSearch, 5000);

  const handleInputChange = (value: string) => {
    setSearchInput(value);
    debouncedSearch(value);
  };
  const handleSelectAutoComplete = async (item: any) => {
    const previousSelectedCities = [...previousSelectedDeparture];
    previousSelectedCities.push({ city: item.name, iataCode: item.iataCode });
    await AsyncStorage.setItem(
      "departureCities",
      JSON.stringify(previousSelectedCities)
    );
    setPreviousSelectedDeparture(previousSelectedCities);
    setFlightOfferData({
      ...flightOfferData,
      originLocationCode: item.iataCode,
    });
    setSearchInput(`${item.name} (${item.iataCode})`);
    setAutoCompleteResults([]);
  };
  return (
    <View className="flex-1 items-center bg-[#F5F7FA]">
      <View className="w-full h-full">
        <View
          className="border mb-4 justify-start w-full bg-[#192031] relative pt-16 pb-8"
          style={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
        >
          <View className="flex-row gap-4 justify-start items-center px-2">
            <Pressable
              className="flex-row items-center justify-center h-14 w-[20%] bg-red-400 rounded-xl"
              onPress={() => router.back()}
            >
              <View className="rounded-full bg-gray-500 h-10 w-10 justify-center items-center">
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={24}
                  color="white"
                />
              </View>
            </Pressable>
            <View className=" w-[60%] justify-center items-center flow-row">
              <Text className="text-white text-xl font-extrabold">
                Select Departure{" "}
              </Text>
            </View>
            <View>
              <View>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={30}
                  color="white"
                />
              </View>
            </View>
          </View>
        </View>

        {/* ===================================== Airport  or city  search ======================================= */}
        <View className="w-full py-4 px-4 relative">
          <View className="flex-row justify-between items-center bg-white border-2 border-gray-400 rounded-xl h-14 overflow-hidden">
            <View className="w-full h-full justify-center">
              <TextInput
                placeholder="Search for airport or city"
                placeholderTextColor={"gray"}
                value={searchInput}
                onChangeText={handleInputChange}
                className="bg-transparent text-gray-600 h-full px-2 capitalize"
              />
            </View>
          </View>
        </View>
        {/* ====================================== AutoComplete Results ======================================== */}
        {autoCompleteResults.length > 0 && (
          <View className="border-2 border-gray-400 bg-white rounded-xl shadow-sm mt-4">
            <FlatList
              data={autoCompleteResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelectAutoComplete(item)}
                  className="px-2 py-2 rounded-xl my-1"
                >
                  <Text className="text-gray-500 capitalize">
                    {item.name}({item.iatacode})
                  </Text>
                </Pressable>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}
