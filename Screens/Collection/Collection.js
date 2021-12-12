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
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const Collection = () => {
  const [categoryArray, setCategoryArray] = useState([
    {
      categorySeq: 1,
      categoryName: "무료배송",
      img: require("../../assets/icon/freeShipping.png"),
    },
    {
      categorySeq: 2,
      categoryName: "아우터",
      img: require("../../assets/icon/outer.png"),
    },
    {
      categorySeq: 3,
      categoryName: "무료배송",
      img: require("../../assets/icon/top.png"),
    },
    {
      categorySeq: 4,
      categoryName: "무료배송",
      img: require("../../assets/icon/dress.png"),
    },
    {
      categorySeq: 5,
      categoryName: "바지",
      img: require("../../assets/icon/pants.png"),
    },
  ]);
  return (
    <View style={styles.View}>
      <View style={styles.headerView}>
        <View>
          <Text style={styles.headerText}>모아보기</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Image
              style={styles.headerIconShoppingBasket}
              source={require("../../assets/icon/shoppingBasket.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoryView}>
        {categoryArray.map(i => {
          return (
            <TouchableOpacity style={styles.categoryTouchable}>
              <Image style={styles.categoryIcon} source={i.img} />
              <Text style={styles.categoryText}>{i.categoryName}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
  headerText: {
    fontSize: 21,
    fontWeight: "bold",
  },
  headerIconShoppingBasket: {
    width: screenWidth * 0.062,
    height: screenHeight * 0.028,
    marginLeft: screenWidth * 0.06,
  },
  categoryView: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
    // backgroundColor: "lavender",
  },
  categoryTouchable: {
    alignItems: "center",
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  categoryText: {
    fontSize: 11,
    marginTop: 8,
  },
});

export default Collection;
