import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { SceneMap, TabView, TabBar } from "react-native-tab-view";

import Ranking from "./Ranking";
import Bookmark from "./Bookmark";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const Store = ({ navigation }) => {
  const [tabChange, setTabChange] = useState(false);
  const [bookmarkEditMode, setBookmarkEditMode] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "랭킹" },
    { key: "second", title: "즐겨찾기" },
  ]);

  const renderScene = SceneMap({
    first: () => {
      return <Ranking />;
    },
    second: () => {
      return Bookmark(bookmarkEditMode);
    },
    // second: () => {
    //   return <Bookmark />;
    // },
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "black" }} //bar color
      style={{ backgroundColor: "white" }} //tab color
      onTabPress={({ route }) => {
        if (route.key === "first") {
          setTabChange(true);
          setBookmarkEditMode(false);
        } else if (route.key === "second") {
          setTabChange(false);
        }
      }}
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
    <View style={styles.View}>
      {!bookmarkEditMode ? (
        <View style={styles.headerView}>
          <View>
            <Text style={styles.headerText}>스토어</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Image
                style={styles.headerIcon}
                source={require("../../assets/icon/hashtag.png")}
              />
            </TouchableOpacity>

            {!tabChange ? (
              <TouchableOpacity
                onPress={() => {
                  setBookmarkEditMode(true);
                }}
              >
                <Image
                  style={styles.headerIcon}
                  source={require("../../assets/icon/scissors.png")}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Image
                  style={styles.headerIcon}
                  source={require("../../assets/icon/search.png")}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity>
              <Image
                style={styles.headerIconShoppingBasket}
                source={require("../../assets/icon/shoppingBasket.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.headerView_editMode}>
          <Text style={styles.headerText_eidtMode}>즐겨찾기 편집</Text>
          <TouchableOpacity
            style={styles.headerEditModeCompletion_editMode}
            onPress={() => {
              setBookmarkEditMode(false);
            }}
          >
            <Text style={styles.headerEditModeCompletionText_editMode}>
              완료
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  View: {
    paddingHorizontal: screenHeight * 0.02,
    backgroundColor: "white",
    flex: 1,
  },
  headerView: {
    marginTop: screenHeight * 0.07,
    marginBottom: screenHeight * 0.018,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerView_editMode: {
    marginTop: screenHeight * 0.055,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 21,
    fontWeight: "bold",
  },
  headerText_eidtMode: {
    fontSize: 16,
    fontWeight: "bold",
  },
  headerIcon: {
    width: screenWidth * 0.046,
    height: screenHeight * 0.022,
    marginLeft: screenWidth * 0.06,
  },
  headerEditModeCompletion_editMode: {
    borderRadius: 20,
    borderStyle: "solid",
    borderColor: "#F719A3",
    borderWidth: 1,
    backgroundColor: "#F719A3",
    padding: 8,
    paddingHorizontal: 10,
  },
  headerEditModeCompletionText_editMode: {
    color: "white",
    fontSize: 12,
    fontWeight: "900",
  },
  headerIconShoppingBasket: {
    width: screenWidth * 0.062,
    height: screenHeight * 0.028,
    marginLeft: screenWidth * 0.06,
  },
});

export default Store;
