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
    text: ["주목해야 할 브랜드", "- 캐주얼 -"],
  },
];

const bestItems = [
  {
    folderKey: 2,
    title: "아우터",
    products: [
      {
        id: 1,
        img: require("../../assets/bestItems/outer_1.jpeg"),
        brandName: "멜란지 마스터",
        productName: "스탠다드 후드 스웨트 집업",
        discountPercentage: "20%",
        zDiscount: true,
        originalPrice: "39,900",
        price: "31,920",
        brand: false,
        freeShipping: true,
      },
      {
        id: 2,
        img: require("../../assets/bestItems/outer_2.jpeg"),
        brandName: "엘무드",
        productName: "화란 세미오버 가디건",
        discountPercentage: "25%",
        zDiscount: true,
        originalPrice: "84,900",
        price: "63,675",
        brand: true,
        freeShipping: true,
      },
      {
        id: 3,
        img: require("../../assets/bestItems/outer_3.jpeg"),
        brandName: "꼼파뇨",
        productName: "헤비오버핏 램스울 가디건",
        discountPercentage: "50%",
        zDiscount: true,
        originalPrice: "11,9000",
        price: "89,250",
        brand: false,
        freeShipping: true,
      },
      {
        id: 4,
        img: require("../../assets/bestItems/outer_4.jpeg"),
        brandName: "니티드",
        productName: "벌키 브러쉬 아가일 가디건",
        discountPercentage: "10%",
        zDiscount: true,
        originalPrice: "72,000",
        price: "64,800",
        brand: true,
        freeShipping: false,
      },
      {
        id: 5,
        img: require("../../assets/bestItems/outer_5.jpeg"),
        brandName: "엄브로",
        productName: "클래식 웜업 자켓 블랙",
        discountPercentage: "",
        zDiscount: false,
        originalPrice: "",
        price: "139,000",
        brand: true,
        freeShipping: true,
      },
      {
        id: 6,
        img: require("../../assets/bestItems/outer_6.jpeg"),
        brandName: "이십오퍼센테이지",
        productName: "25P 트라이앵글 로고 가디건",
        discountPercentage: "10%",
        zDiscount: true,
        originalPrice: "72,000",
        price: "64,800",
        brand: false,
        freeShipping: true,
      },
    ],
  },
  {
    folderKey: 3,
    title: "상의",
    products: [
      {
        id: 1,
        img: require("../../assets/bestItems/top_1.jpeg"),
        brandName: "엘무드",
        productName: "화란 세미오버 니트 아보카도",
        discountPercentage: "20%",
        zDiscount: true,
        originalPrice: "79,900",
        price: "63,900",
        brand: false,
        freeShipping: true,
      },
      {
        id: 2,
        img: require("../../assets/bestItems/top_2.jpeg"),
        brandName: "와릿이즌",
        productName: "서핑엔젤 반팔 티셔츠 화이트",
        discountPercentage: "",
        zDiscount: false,
        originalPrice: "",
        price: "39,000",
        brand: true,
        freeShipping: true,
      },
      {
        id: 3,
        img: require("../../assets/bestItems/top_3.jpeg"),
        brandName: "게인스보로",
        productName: "로럴골든 하프집업_오트밀",
        discountPercentage: "28%",
        zDiscount: true,
        originalPrice: "65,000",
        price: "46,500",
        brand: true,
        freeShipping: true,
      },
      {
        id: 4,
        img: require("../../assets/bestItems/top_4.jpeg"),
        brandName: "와릿이즌",
        productName: "서핑엔젤 반팔 티셔츠 화이트",
        discountPercentage: "",
        zDiscount: false,
        originalPrice: "",
        price: "39,000",
        brand: true,
        freeShipping: true,
      },
      {
        id: 5,
        img: require("../../assets/bestItems/top_5.jpeg"),
        brandName: "키르시",
        productName: "스몰 체리 V넥 스웻셔츠 KS",
        discountPercentage: "25%",
        zDiscount: true,
        originalPrice: "59,000",
        price: "44,250",
        brand: true,
        freeShipping: true,
      },
      {
        id: 6,
        img: require("../../assets/bestItems/top_6.jpeg"),
        brandName: "엠엘비",
        productName: "바크 맨투맨 (셋업) NY",
        discountPercentage: "",
        zDiscount: false,
        originalPrice: "",
        price: "99,000",
        brand: true,
        freeShipping: true,
      },
    ],
  },
];

const Brand = () => {
  const [showIndex, setShowIndex] = useState(3);
  const [reload, setReload] = useState(false);
  return (
    <View style={styles.View}>
      <ScrollView>
        <View style={styles.carouselView}>
          <SwiperFlatList
            autoplay={false}
            autoplayDelay={2}
            autoplayLoop={false}
            index={0}
            showPagination={false}
            data={celebrity}
            onChangeIndex={({ index, prevIndex }) => {
              setShowIndex(index + 1);
            }}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.child}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                    }}
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
              );
            }}
          />
        </View>

        <View
          style={[
            styles.carouselIndexView,
            { backgroundColor: "black", opacity: 0.5 },
          ]}
        />
        <View style={styles.carouselIndexView}>
          <Text style={styles.carouselIndexText}>{showIndex}</Text>
          <Text style={[styles.carouselIndexText, { color: "lightgray" }]}>
            /{celebrity.length}
          </Text>
        </View>

        <View style={styles.bestItemsTitleView}>
          <Text style={styles.bestItemsTitle}>Best Items</Text>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <FlatList
            data={bestItems}
            keyExtractor={item => item.folderKey}
            horizontal={true}
            renderItem={({ item }) => {
              return (
                <View style={styles.bestItemsView}>
                  <Text style={styles.bestItemsTitleText}>{item.title}</Text>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
  },
  carouselView: {
    width: screenWidth,
    height: screenHeight * 0.5,
  },
  bestItemsTitleView: {
    width: "100%",
    height: screenHeight * 0.07,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  bestItemsTitle: {
    fontSize: 19,
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
  carouselIndexView: {
    flexDirection: "row",
    width: 40,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    position: "absolute",
    bottom: 120,
    right: 15,
    marginBottom: 20,
  },
  carouselIndexText: {
    color: "white",
    fontSize: 13,
  },
  bestItemsView: {
    height: 40,
    padding: 10,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  bestItemsTitleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "gray",
  },
});
export default Brand;
