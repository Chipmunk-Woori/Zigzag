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
import { linear } from "react-native/Libraries/Animated/Easing";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; // 전체화면 세로길이

const shoppingmallList = [
  {
    id: "shoppingmall_1",
    shoppingmallName: "핫핑",
    zOnly: true,
    img: require("../../assets/shoppingmall/product_9.png"),
    filter: "20대·30대·심플베이직·러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "111.2만",
  },
  {
    id: "shoppingmall_2",
    shoppingmallName: "육육걸즈",
    zOnly: true,
    img: require("../../assets/shoppingmall/product_8.png"),
    filter: "20대·30대·심플베이직·러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "215.7만",
  },
  {
    id: "shoppingmall_3",
    shoppingmallName: "프롬비기닝",
    zOnly: true,
    img: require("../../assets/shoppingmall/poster_1.png"),
    filter: "20대·30대·심플베이직·러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "96.3만",
  },
  {
    id: "shoppingmall_4",
    shoppingmallName: "퓨어다",
    zOnly: true,
    img: require("../../assets/shoppingmall/product_3.png"),
    filter: "20대·30대·심플베이직·러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "47만",
  },
  {
    id: "shoppingmall_5",
    shoppingmallName: "베니토",
    zOnly: true,
    img: require("../../assets/shoppingmall/poster_2.png"),
    filter: "20대·30대·오피스룩·러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "42.3만",
  },
  {
    id: "shoppingmall_6",
    shoppingmallName: "블랙업",
    zOnly: false,
    img: require("../../assets/shoppingmall/poster_3.png"),
    filter: "20대·30대·심플베이직·러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "99.5만",
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
            <View>
              <View style={styles.listView}>
                <Text style={styles.listNumber}>{index + 1}</Text>
                <Image source={item.img} style={styles.listImg} />
                <View
                  style={{
                    width: screenWidth * 0.5,
                  }}
                >
                  <View style={styles.shoppingmallNameView}>
                    <Text style={styles.shoppingmallName}>
                      {item.shoppingmallName}
                    </Text>
                    {item.zOnly && <Text style={styles.zOnly}>z-only</Text>}
                  </View>
                  <Text style={styles.filter}>{item.filter}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text style={styles.coupon}>{item.coupon}</Text>

                    {item.freeShipping && (
                      <Text style={styles.freeShipping}>· 무료배송</Text>
                    )}
                  </View>
                </View>

                <View style={styles.starView}>
                  <TouchableOpacity>
                    <Image
                      style={styles.starIcon}
                      source={require("../../assets/icon/star_empty.png")}
                    />
                  </TouchableOpacity>
                  <Text style={styles.bookmarkNumber}>
                    {item.bookmarkNumber}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderStyle: "solid",
                  borderWidth: 0.3,
                  borderColor: "#EEF0F6",
                  width: "100%",
                }}
              ></View>
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
    marginBottom: screenHeight * 0.02,
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
    width: screenWidth,
    height: screenHeight * 0.09,
    alignItems: "center",
    //backgroundColor: "skyblue",
  },
  listNumber: {
    fontSize: 18,
    //fontWeight: "bold",
    color: "#C2CAD3",
    marginRight: screenWidth * 0.04,
  },
  listImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: screenWidth * 0.04,
  },
  shoppingmallNameView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: screenHeight * 0.005,
    // backgroundColor: "yellow",
  },
  shoppingmallName: {
    fontSize: 15,
    marginRight: screenWidth * 0.01,
  },
  zOnly: {
    fontSize: 10,
    color: "#F13794",
    fontWeight: "bold",
  },
  filter: {
    fontSize: 12,
    color: "#A1A8B0",
    marginBottom: screenHeight * 0.002,
  },
  coupon: {
    fontSize: 11,
    color: "#6495ed",
    fontWeight: "bold",
    marginRight: screenWidth * 0.01,
  },
  freeShipping: {
    fontSize: 10,
    color: "#B69EDA",
    fontWeight: "bold",
  },
  starView: {
    alignItems: "center",
    width: screenWidth * 0.13,
    marginLeft: screenWidth * 0.09,
    //backgroundColor: "yellow",
  },
  starIcon: {
    width: screenWidth * 0.03,
    height: screenHeight * 0.015,
    marginBottom: screenHeight * 0.003,
    //backgroundColor: "skyblue",
  },
  bookmarkNumber: {
    fontSize: 8,
    color: "#A1A8B0",
  },
});

export default Ranking_Shoppingmall;
