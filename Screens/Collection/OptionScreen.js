import React, { useState, useEffect } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const OptionScreen = () => {
  return (
    <View style={{ marginTop: 50 }}>
      <Text>옵션 화면이 될 화면입니당</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {},
});
export default OptionScreen;
