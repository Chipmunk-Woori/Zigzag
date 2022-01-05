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

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const PointGuide = () => {
  return (
    <View style={styles.View}>
      <View style={styles.backView}>
        <Image
          style={styles.bookIcon}
          source={require("../../assets/icon/book.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View: { flex: 1 },
  backView: {
    flex: 1,
    // backgroundColor: "lavender",
  },
  bookIcon: {
    width: 180,
    height: 180,
    marginTop: 100,
  },
});
export default PointGuide;
