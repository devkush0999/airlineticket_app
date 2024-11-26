import Header from "@/components/Header";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Image, StyleSheet, Platform, View, Text } from "react-native";
import {
  ArrowPathRoundedSquareIcon,
  ChevronDoubleRightIcon,
} from "react-native-heroicons/outline";

interface searchFlightData {
  originCity: string;
  destinationCity: string;
  departureDate: string;
  seat: number;
  // selectedDate: string;
}

export interface FlightOfferData {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: Date;
  returndate: Date;
  adults: number;
  maxResults: number;
}

// ========================================================================== trip option comonents========================================//
interface TripOptionProps {
  pageNavigation: string;
  handleNavigationChange: (type: string) => void;
}
const TripOption: React.FC<TripOptionProps> = ({
  pageNavigation,
  handleNavigationChange,
}) => (
  <View className="flex-row justify-between w-full px-4 py-2">
    <Pressable
      className="flex-row w-1/2"
      onPress={() => handleNavigationChange("oneWay")}
    >
      <View
        className={`w-full justify-center items-center flex-row space-x-2 pb-2 ${
          pageNavigation === "oneWay"
            ? "border-b-4 border-[#12B3A8]"
            : "border-transparent"
        }`}
      >
        <ChevronDoubleRightIcon
          size={20}
          strokeWidth={pageNavigation === "oneWay" ? 3 : 2}
          color={pageNavigation === "oneWay" ? "#12B3A8" : "gray"}
        />
        <Text
          className={`text-xl pl-2  ${
            pageNavigation === "oneWay" ? "text-[#12B3A8]" : "text-gray-500"
          }`}
          style={{ fontWeight: pageNavigation === "oneWay" ? "700" : "500" }}
          // style={{ fontFamily: "SpaceMono-Regular" }}
        >
          One Way{" "}
        </Text>
      </View>
    </Pressable>

    <Pressable
      className="flex-row w-1/2"
      onPress={() => handleNavigationChange("roundTrip")}
    >
      <View
        className={`w-full justify-center items-center flex-row space-x-2 pb-2 ${
          pageNavigation === "roundTrip"
            ? "border-b-4 border-[#12B3A8]"
            : "border-transparent"
        }`}
      >
        <ArrowPathRoundedSquareIcon
          size={20}
          strokeWidth={pageNavigation === "roundTrip" ? 3 : 2}
          color={pageNavigation === "roundTrip" ? "#12B3A8" : "gray"}
        />
        <Text
          className={`text-xl pl-2  ${
            pageNavigation === "roundTrip" ? "text-[#12B3A8]" : "text-gray-500"
          }`}
          style={{ fontWeight: pageNavigation === "roundTrip" ? "700" : "500" }}
          // style={{ fontFamily: "SpaceMono-Regular" }}
        >
          Round Trip{" "}
        </Text>
      </View>
    </Pressable>
  </View>
);

//  =============================================================location components ============================================================
interface LocationInputProps {
  placeholder: string;
  value: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  placeholder,
  icon,
  value,
  onPress,
}) => (
  <View className="border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center">
    <Pressable
      className="flex-row justify-between w-full px-4 py-2"
      onPress={onPress}
    >
      <View className="px-4 flex-row justify-between items-center">
        <View className="w-[15%] border-r-2 border-gray-300">{icon}</View>
        <View className="w-[80%] py-3">
          {value ? (
            <Text className="bg-transparent text-gray-600 font-bold">
              {value}
            </Text>
          ) : (
            <Text className="bg-transparent text-gray-600 font-semibold">
              {placeholder}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  </View>
);
//========================================================= Departure Date Component ====================================================
interface DepartureDateProps {
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onPress: () => void;
}
const DepartureDate: React.FC<DepartureDateProps> = ({
  placeholder,
  icon,
  value,
  onPress,
}) => (
  // <View className="border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center">
  <Pressable
    className="border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center py-4 flex-row items-center pl-4"
    onPress={onPress}
  >
    {/* <View className="px-4 flex-row justify-between items-center"> */}
    <View className="w-[15%] border-r-2 border-gray-300">{icon}</View>
    <View className="w-[85%] px-4 items-start justify-start">
      <Text className="bg-transparent text-gray-600 font-bold">
        {value || placeholder}
      </Text>
    </View>
    {/* </View> */}
  </Pressable>
  // </View>
);

export default function HomeScreen() {
  const [isPending, setIsPending] = useState(false);
  const [pageNavigation, setPageNavigation] = useState("oneWay");
  const [searchFlightData, setSearchFlightData] = useState<searchFlightData>({
    originCity: "",
    destinationCity: "",
    departureDate: "",
    seat: 0,
    // selectedDate: "2024-03-01",
  });
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [flightOfferData, setFlightOfferData] = useState<FlightOfferData>({
    originLocationCode: "",
    destinationLocationCode: "",
    departureDate: new Date(),
    returndate: new Date(),
    adults: 0,
    maxResults: 20,
  });
  const handleNavigationChange = (type: string) => {
    setPageNavigation(type);
  };

  useEffect(() => {
    const loadSelectedDestination = async () => {
      try {
      } catch (error) {
        console.error(error);
      }
    };
  }, []);

  return (
    <View className="flex-1 border items-center bg-[#F5FF7FA] relative">
      <StatusBar style="light" />
      {isPending && (
        <View className="absolute z-50 w-full h-full justify-center items-center">
          <View className="bg-[#000000] bg-opacity-50 h-full w-full justify-center items-center opacity-[0.45]">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      )}
      <View
        className="border  h-64 mb-4 justify-start w-full bg-[#192031] relative pt-16"
        style={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
      >
        <Header />
      </View>
      {/* ================================================================= Form area ====================================================== ===========*/}
      <View className="w-full px-4 -mt-32 mx-4">
        <View className="bg-white rounded-3xl pt-2 pb-4 shadown-md shadow-slate-500">
          <View className="flex-row justify-between w-full px-4 py-2">
            <TripOption
              pageNavigation={pageNavigation}
              handleNavigationChange={handleNavigationChange}
            />
          </View>
          {/*========================================================   Location Input ======================================================== */}
          {/**==========================================================  orgin city ========================================================*/}
          <LocationInput
            placeholder={
              searchFlightData.originCity
                ? searchFlightData.originCity
                : "Departure City"
            }
            icon={
              <FontAwesome5 size={20} color="gray" name="plane-departure" />
            }
            value={searchFlightData.originCity}
            onPress={() => router.push("/departure")}
          />

          {/* *======================================================== Destination city *======================================================== */}
          <LocationInput
            placeholder={
              searchFlightData.destinationCity
                ? searchFlightData.destinationCity
                : "Destination City"
            }
            icon={<FontAwesome5 size={20} color="gray" name="plane-arrival" />}
            value={searchFlightData.destinationCity}
            onPress={() => {}}
          />
          {/* *======================================================== Departure Data *======================================================== */}
          <DepartureDate
            placeholder={
              selectedDate && selectedDate.length > 0
                ? selectedDate.replace(/^"|"$/g, "")
                : "Departure Date"
            }
            icon={<FontAwesome5 size={20} color="gray" name="calendar-alt" />}
            value={searchFlightData.departureDate.replace(/^"|"$/g, "")}
            onPress={() => {}}
          />

          {/* ========================================================== Seat Data ======================================================== */}
          <View className="border-2 border-gray-300 mx-4 rounded-2xl py-3 justify-center flex-row">
            <View>
              <MaterialCommunityIcons
                size={20}
                color="gray"
                name="seat-passenger"
              />
            </View>
            <TextInput
              className="w-[85%] px-4 font-semibold"
              placeholder="Seat"
              keyboardType="numeric"
              value={String(searchFlightData.seat)}
              onChangeText={(text) => {
                const seatValue = parseInt(text, 10);

                const validSeatValue = isNaN(seatValue) ? 0 : seatValue;

                setSearchFlightData((prev) => ({
                  ...prev,
                  seat: validSeatValue,
                }));

                setFlightOfferData((prev) => ({
                  ...prev,
                  adults: validSeatValue,
                }));
              }}
            />
          </View>
          {/* =========================================================search button =================================================== */}
          <View className="w-full justify-start pt-2 px-4 mt-4">
            <Pressable
              className="bg-red-200 rounded-lg justify-center items-center py-3"
              onPress={() => {}}
            >
              <Text className="text-bold text-xl text-black">Search </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
