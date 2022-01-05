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
import { TabView } from "react-native-tab-view";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const Review_TabView1 = () => {
  return (
    <View style={styles.View}>
      <Image
        source={require("../../assets/icon/notepad.png")}
        style={styles.iconImage}
      />
      <Text style={styles.Text}>작성 가능한 리뷰가 없어요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "lavender",
  },
  iconImage: {
    width: 100,
    height: 100,
    marginBottom: 35,
  },
  Text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Review_TabView1;
