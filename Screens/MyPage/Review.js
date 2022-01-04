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
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Review_TabView1 from "./Review_TabView1";
import Review_TabView2 from "./Review_TabView2";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const renderScene = SceneMap({
  first: Review_TabView1,
  second: Review_TabView2,
});
const Review = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "작성 가능한 리뷰" },
    { key: "second", title: "작성한 리뷰" },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "black" }}
      style={{ backgroundColor: "white" }}
      activeColor="black"
      inactiveColor="red"
      getLabelText={({ route }) => route.title}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={
            focused
              ? styles.TabViewTitleText
              : [styles.TabViewTitleText, styles.inactiveColor]
          }
        >
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <View style={styles.ViewStyle}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../../assets/icon/backArrow.png")}
            style={styles.headerBackIcon}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>리뷰</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    paddingHorizontal: 14,
    backgroundColor: "white",
    flex: 1,
  },
  headerView: {
    marginTop: 30,
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  headerBackIcon: {
    width: 15,
    height: 15,
    marginRight: 15,
  },
  headerIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  TabViewTitleText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  inactiveColor: {
    color: "gray",
  },
});
export default Review;
