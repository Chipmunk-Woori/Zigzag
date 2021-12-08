import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const Search = ({ navigation }) => {
  const [text, onChangeText] = React.useState("아이템과 스토어를 검색해보세요");
  return (
    <View style={styles.View}>
      <View style={styles.topView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={styles.backButton}
            source={require("../../assets/icon/backArrow.png")}
          />
        </TouchableOpacity>
        <View style={styles.searchView}>
          <TextInput
            style={styles.searchTextInput}
            onChangeText={onChangeText}
            value={text}
          />
          <Image
            style={styles.searchImg}
            source={require("../../assets/icon/search_gray.png")}
          />
        </View>
      </View>
      <View style={styles.secondView}>
        <Text style={{ color: "gray" }}>내가 찾아봤던</Text>
        <TouchableOpacity style={{ marginRight: 15 }}>
          <Text>지우기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionView}>
        <TouchableOpacity
          style={[styles.menuTouchableOpacity, styles.menuTextOpacityStyle]}
        >
          <Text style={styles.menuText}>횰릭</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondView}>
        <Text style={{ color: "gray" }}>지금 가장 인기있는</Text>
      </View>
      <View style={styles.optionView}>
        <TouchableOpacity
          style={[styles.menuTouchableOpacity, styles.menuTextOpacityStyle]}
        >
          <Text style={styles.menuText}>숏패딩</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondView}>
        <Text style={{ color: "gray" }}>최근 본 상품</Text>
      </View>
      <View style={styles.optionView}>
        <TouchableOpacity
          style={[styles.menuTouchableOpacity, styles.menuTextOpacityStyle]}
        >
          <Text style={styles.menuText}>니트</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  backButton: {
    width: 15,
    height: 20,
  },
  topView: {
    height: "8%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: screenHeight * 0.04,
  },
  searchView: {
    height: "60%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    flexDirection: "row",
    position: "relative",
    //backgroundColor: "lavender",
  },
  searchTextInput: {
    height: "80%",
    width: "100%",
    padding: 15,
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
  menuTouchableOpacity: {
    backgroundColor: "#EEF0F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: screenWidth * 0.01,
  },

  menuTextOpacityStyle: {
    width: screenWidth * 0.15,
    height: screenHeight * 0.033,
    borderRadius: 13,
    // backgroundColor: "red",
  },
  secondView: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    // backgroundColor: "lavender",
  },
  menuText: {
    fontSize: 12,
    // fontWeight: "bold",
  },
  optionView: {
    height: 50,
  },
});
export default Search;
