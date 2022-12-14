import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import TechNews from "../Screens/TechNews";
import Articles from "../Screens/Articles";
import Setting from "../Screens/Setting";
const Navigation = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="black"
        barStyle={{ backgroundColor: "rgb(163, 175, 219)" }}
      >
        <Tab.Screen
          name="Feed"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="fire" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={TechNews}
          options={{
            tabBarLabel: "Tech",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="newspaper"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Articles"
          component={Articles}
          options={{
            tabBarLabel: "Articles",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="book" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Setting}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="star" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
