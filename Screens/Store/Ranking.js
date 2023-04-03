import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import { SceneMap, TabView, TabBar } from "react-native-tab-view";
import Ranking_Brand from "./Ranking_Brand";
import Ranking_Shoppingmall from "./Ranking_Shoppingmall";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; // 전체화면 세로길이

const Ranking = () => {
  const renderScene = SceneMap({
    first: Ranking_Shoppingmall,
    second: Ranking_Brand,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "쇼핑몰" },
    { key: "second", title: "브랜드" },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }} //bar color
      style={{
        //tab color
        width: screenWidth * 0.3,
        height: screenHeight * 0.05,
        backgroundColor: "white",
      }}
      renderLabel={({ route, color, focused }) => (
        <View style={{ height: screenHeight * 0.025 }}>
          <Text
            style={{
              color: focused ? "black" : "lightgray",
              fontWeight: "bold",
            }}
          >
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  renderTabBar;
  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  View: {},
});

export default Ranking;
