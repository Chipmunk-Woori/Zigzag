import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  useWindowDimensions,
  TextInput,
  Dimensions,
} from "react-native";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import HomeTabView from "./HomeTabView";
import Brand from "./Brand";
import Best from "./Best";
import Sale from "./Sale";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const Home = ({ navigation }) => {
  const [text, onChangeText] = React.useState("검색어를 입력해주세요");

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "홈" },
    { key: "second", title: "Brand" },
    { key: "third", title: "베스트" },
    { key: "fourth", title: "세일" },
  ]);
  const renderScene = SceneMap({
    first: () => {
      return <HomeTabView />;
    },
    second: () => {
      return <Brand />;
    },
    third: () => {
      return <Best />;
    },
    fourth: () => {
      return <Sale />;
    },
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "black" }} //bar color
      style={{ backgroundColor: "white" }} //tab color
      renderLabel={({ route, color, focused }) => (
        <Text
          style={{
            color: focused ? "black" : "lightgray",
            fontWeight: "bold",
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.topView}>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          ZIGZAG
        </Text>
        <TextInput
          style={styles.searchTextInput}
          onChangeText={onChangeText}
          value={text}
        />
        <Image
          source={require("../../assets/icon/shoppingBasket.png")}
          style={{
            width: screenWidth * 0.07,
            height: screenHeight * 0.03,
            marginLeft: screenWidth * 0.04,
          }}
        />
      </View>

      <TabView
        style={{ height: "92%", width: "100%" }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topView: {
    height: "8%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: screenHeight * 0.04,
  },
  searchTextInput: {
    height: "60%",
    width: "60%",
    margin: 12,
    padding: 5,
    backgroundColor: `#f1f1f1`,
    fontSize: 12,
    borderRadius: 20,
  },
});

export default Home;
