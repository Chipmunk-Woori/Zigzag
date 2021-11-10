import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import Home from './Screens/Home/Home';
import Store from './Screens/Store/Store';
import Collection from './Screens/Collection/Collection';
import Heart from './Screens/Heart/Heart';
import MyPage from './Screens/MyPage/MyPage';

import HomeTabView from './Screens/Home/HomeTabView';
import Brand from './Screens/Home/Brand';
import Best from './Screens/Home/Best';
import Sale from './Screens/Home/Sale';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen name="Home" component={HomeNavigator} />
                <Tab.Screen name="Store" component={Store} />
                <Tab.Screen name="Collection" component={Collection} />
                <Tab.Screen name="Heart" component={Heart} />
                <Tab.Screen name="MyPage" component={MyPage} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    First: {
        color: 'black',
    },
});

export default App;
