import React, { useState, useEffect, useRef } from "react";

import Carousel from "react-native-snap-carousel";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const carouselItems = [
  {
    title: "Item 1",
    text: "Text 1",
  },
  {
    title: "Item 2",
    text: "Text 2",
  },
  {
    title: "Item 3",
    text: "Text 3",
  },
  {
    title: "Item 4",
    text: "Text 4",
  },
  {
    title: "Item 5",
    text: "Text 5",
  },
];

const _renderItem = ({ item, index }) => {
  return (
    <View
      style={{
        //🌟각 게시물의 스타일
        backgroundColor: "pink",
        borderRadius: 5,
        height: 300,
        padding: 30, //게시물 안 내용
        marginLeft: 50,
        marginRight: 50,
      }}
    >
      <Text style={{ fontSize: 30 }}>{item.title}</Text>
      <Text>{item.text}</Text>
    </View>
  );
};

const Brand = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  let carousel = useRef(null);
  return (
    <View>
      <View>
        <SafeAreaView
          style={{
            //🌟전체 화면 스타일
            height: 500,
            width: 350,
            backgroundColor: "rebeccapurple",
            paddingTop: 50,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Carousel
              layout={"default"}
              ref={ref => {
                carousel = ref;
              }}
              data={carouselItems}
              sliderWidth={300} //슬라이드 전체 너비
              itemWidth={300}
              //한 화면에서 (게시물 하나 + 양 옆 여비) 너비
              //이게 너무 작으면 다음 게시물과 겹쳐

              renderItem={_renderItem}
              onSnapToItem={index => setActiveIndex(index)}
            />
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Brand;
