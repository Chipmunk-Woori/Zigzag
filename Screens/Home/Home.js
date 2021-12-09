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
  TouchableOpacity,
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Search");
          }}
          style={styles.searchTouch}
        >
          <TextInput
            style={styles.searchTextInput}
            onChangeText={onChangeText}
            value={text}
            clearButtonMode={"while-editing"}
            clearTextOnFocus={true}
          />
          <Image
            style={styles.searchImg}
            source={require("../../assets/icon/search_gray.png")}
          />
        </TouchableOpacity>
        <Image
          source={require("../../assets/icon/shoppingBasket.png")}
          style={{
            width: screenWidth * 0.062,
            height: screenHeight * 0.028,
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
  searchTouch: {
    height: "60%",
    width: "65%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    flexDirection: "row",
    position: "relative",
    // backgroundColor: "lavender",
  },
  searchTextInput: {
    height: "80%",
    width: "100%",
    paddingLeft: 30,
    backgroundColor: `#EAF0FA`,
    fontSize: 12,
    borderRadius: 20,
    color: "gray",
  },
  searchImg: {
    width: 14,
    height: 14,
    position: "absolute",
    left: 10,
    //#ACACAC
  },
});

export default Home;
