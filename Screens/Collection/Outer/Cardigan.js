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

const Cardigan = () => {
  return (
    <View style={{ marginTop: 50 }}>
      <Text>가디건</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {},
});
export default Cardigan;
