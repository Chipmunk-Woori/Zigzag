import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; // 전체화면 세로길이

const shoppingmallList = [
  {
    id: "shoppingmall_1",
    shoppingmallName: "핫핑",
    img: "",
    filter: "20대.30대.심플베이직.러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "111.2만",
  },
  {
    id: "shoppingmall_2",
    shoppingmallName: "육육걸즈",
    img: "",
    filter: "20대.30대.심플베이직.러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "215.7만",
  },
  {
    id: "shoppingmall_3",
    shoppingmallName: "프롬비기닝",
    img: "",
    filter: "20대.30대.심플베이직.러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "111.2만",
  },
];

const Ranking_Shoppingmall = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.menuView}>
        <TouchableOpacity style={styles.menuIconTouchableOpacity}>
          <Image
            source={require("../../assets/icon/filter.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuTextOpacityCloth}>
          <Text style={styles.menuText}>의류</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuTextOpacityStyle}>
          <Text style={styles.menuText}>스타일 7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuTextOpacityStyle}>
          <Text style={styles.menuText}>연령대 3</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={shoppingmallList}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.listView}>
              <Text>{index + 1}</Text>
              <Image
                source={require("../../assets/poster/poster_1.png")}
                style={styles.menuIcon}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  View: {},
  menuView: {
    flexDirection: "row",
    marginTop: screenHeight * 0.005,
  },
  menuIconTouchableOpacity: {
    backgroundColor: "#EEF0F6",
    width: screenWidth * 0.072,
    height: screenHeight * 0.033,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: screenWidth * 0.01,
  },
  menuIcon: {
    width: screenWidth * 0.029,
    height: screenHeight * 0.015,
  },
  menuTextOpacityCloth: {
    backgroundColor: "#EEF0F6",
    width: screenWidth * 0.11,
    height: screenHeight * 0.033,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: screenWidth * 0.01,
  },
  menuText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  menuTextOpacityStyle: {
    backgroundColor: "#EEF0F6",
    width: screenWidth * 0.15,
    height: screenHeight * 0.033,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: screenWidth * 0.01,
  },
  listView: {
    flexDirection: "row",
    marginTop: screenHeight * 0.03,
  },
});

export default Ranking_Shoppingmall;
