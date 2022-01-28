import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이
const celebrity = [
  {
    id: 1,
    img: require("../../assets/celebrity/picture_1.png"),
    text: ["지그재그 단독,", "아이유의 PICK 아이템"],
  },
  {
    id: 2,
    img: require("../../assets/celebrity/picture_2.png"),
    text: ["1월 지인 피셜,", "악세사리 스타일링"],
  },
  {
    id: 3,
    img: require("../../assets/celebrity/picture_3.jpeg"),
    text: ["1월 가장 사랑받은", "BEST ITEM 5"],
  },
  {
    id: 4,
    img: require("../../assets/celebrity/picture_4.jpeg"),
    text: ["지금 바로 주목해야 할 ", "이 달의 신상"],
  },
  {
    id: 5,
    img: require("../../assets/celebrity/picture_5.jpeg"),
    text: ["주목해야 할 브랜드", "-캐주얼-"],
  },
];

const Brand = () => {
  return (
    <View style={styles.View}>
      <View style={styles.carouselView}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={0}
          showPagination
          data={celebrity}
          paginationStyleItemActive={{ backgroundColor: "pink" }}
          renderItem={({ item }) => (
            <View style={styles.child}>
              <Image
                style={{ width: "100%", height: "100%", position: "absolute" }}
                source={item.img}
              />
              <View style={styles.itemTextView}>
                {item.text.map(i => {
                  return (
                    <View>
                      <Text style={styles.itemText}>{i}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.bestItemsTitleView}>
        <Text style={styles.bestItemsTitleText}>Best Items</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
  },
  carouselView: {
    width: screenWidth,
    height: "80%",
  },
  bestItemsTitleView: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  bestItemsTitleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  child: {
    width: screenWidth,
    justifyContent: "center",
  },
  itemTextView: {
    position: "absolute",
    bottom: 60,
    left: 30,
    width: 250,
  },
  itemText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});
export default Brand;
