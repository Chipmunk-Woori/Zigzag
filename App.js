import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from "react-native";

import Home from "./Screens/Home/Home";
import Store from "./Screens/Store/Store";
import Collection from "./Screens/Collection/Collection";
import Heart from "./Screens/Heart/Heart";
import MyPage from "./Screens/MyPage/MyPage";

import HomeTabView from "./Screens/Home/HomeTabView";
import Brand from "./Screens/Home/Brand";
import Best from "./Screens/Home/Best";
import Sale from "./Screens/Home/Sale";

import Store_heartProduct from "./Store/Store_heartProduct";
import { Provider } from "react-redux";
import { createStore } from "redux";

let store = createStore(() => {
  return [{ id: 0, name: "ABC", quan: 2 }];
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// const TabInactiveTintColor = "#C2CAD3";

const App = () => {
  const HomeNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Brand" component={Brand} />
        <Stack.Screen name="Best" component={Best} />
        <Stack.Screen name="Sale" component={Sale} />
        <Stack.Screen name="HomeTabView" component={HomeTabView} />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "black", //탭 활성화 색상
            inactiveTintColor: "#C2CAD3", //탭 비활성화 색상
          }}
          screenOptions={{ headerShown: false }} //헤더 숨김
        >
          <Tab.Screen
            name="Home"
            component={HomeNavigator}
            options={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                return focused ? (
                  <Image
                    source={require("./assets/icon/Tab_home_black.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <Image
                    source={require("./assets/icon/Tab_home.png")}
                    style={{ width: 20, height: 20 }}
                  />
                );
              },
            })}
          />

          <Tab.Screen
            name="Store"
            component={Store}
            options={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                return focused ? (
                  <Image
                    source={require("./assets/icon/Tab_store_black.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <Image
                    source={require("./assets/icon/Tab_store.png")}
                    style={{ width: 20, height: 20 }}
                  />
                );
              },
            })}
          />
          <Tab.Screen
            name="Collection"
            component={Collection}
            options={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                return focused ? (
                  <Image
                    source={require("./assets/icon/Tab_menu_black.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <Image
                    source={require("./assets/icon/Tab_menu.png")}
                    style={{ width: 20, height: 20 }}
                  />
                );
              },
            })}
          />
          <Tab.Screen
            name="Heart"
            component={Heart}
            options={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                return focused ? (
                  <Image
                    source={require("./assets/icon/Tab_heart_black.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <Image
                    source={require("./assets/icon/Tab_heart.png")}
                    style={{ width: 20, height: 20 }}
                  />
                );
              },
            })}
          />
          <Tab.Screen
            name="MyPage"
            component={MyPage}
            options={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                return focused ? (
                  <Image
                    source={require("./assets/icon/Tab_mypage_black.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <Image
                    source={require("./assets/icon/Tab_mypage.png")}
                    style={{ width: 20, height: 20 }}
                  />
                );
              },
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

{
}

const styles = StyleSheet.create({
  First: {
    color: "black",
  },
});

export default App;
