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

import UserInformation from "./Screens/MyPage/UserInformation";
import MemberInformationCorrection from "./Screens/MyPage/MemberInformationCorrection";
import BodyTypeInformation from "./Screens/MyPage/BodyTypeInformation";

import HomeTabView from "./Screens/Home/HomeTabView";
import Brand from "./Screens/Home/Brand";
import Best from "./Screens/Home/Best";
import Sale from "./Screens/Home/Sale";
import Search from "./Screens/Home/Search";
import ShoppingBasket from "./Screens/Home/ShoppingBasket";

import Ranking from "./Screens/Store/Ranking";
import Bookmark from "./Screens/Store/Bookmark";
import Ranking_Brand from "./Screens/Store/Ranking_Brand";
import Ranking_Shoppingmall from "./Screens/Store/Ranking_Shoppingmall";

// redux
import { store } from "./Store/Store_ProductList";
import { Provider } from "react-redux";
import { createStore } from "redux";

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
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ShoppingBasket" component={ShoppingBasket} />
      </Stack.Navigator>
    );
  };

  const StoreNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Store" component={Store} />
        <Stack.Screen name="Ranking" component={Ranking} />
        <Stack.Screen name="Bookmark" component={Bookmark} />
        <Stack.Screen
          name="Ranking_Shoppingmall"
          component={Ranking_Shoppingmall}
        />
        <Stack.Screen name="Ranking_Brand" component={Ranking_Brand} />
      </Stack.Navigator>
    );
  };

  const MypageNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="UserInformation" component={UserInformation} />
        <Stack.Screen
          name="BodyTypeInformation"
          component={BodyTypeInformation}
        />
        <Stack.Screen
          name="MemberInformationCorrection"
          component={MemberInformationCorrection}
        />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "#C2CAD3",
            tabBarStyle: [
              {
                display: "flex",
              },
              null,
            ],
          }}
        >
          <Tab.Screen
            name="홈"
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
            name="스토어"
            component={StoreNavigator}
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
            name="모아보기"
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
            name="찜"
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
            name="마이페이지"
            component={MypageNavigator}
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
