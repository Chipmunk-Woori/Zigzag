import React, { useState, useEffect } from "react";

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
} from "react-native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const textMarginBottom = screenHeight * 0.0019;

const firstContentTitle = "⏰ 하객룩 타임특가";

const firstContentData = [
  {
    id: 1,
    img: require("../../assets/product/product_9.png"),
    brandName: "로즐리",
    productName: "[serenity] 세실리아 뷔스티에 원피스",
    discountPercentage: "73%",
    zDiscount: true,
    originalPrice: "59,000",
    price: "39,900",
    brand: false,
    freeShipping: true,
  },
  {
    id: 2,
    img: require("../../assets/product/product_8.png"),
    brandName: "위니크",
    productName: "시아 버튼 자켓 (2col)",
    discountPercentage: "30%",
    zDiscount: true,
    originalPrice: "238,000",
    price: "165,900",
    brand: false,
    freeShipping: true,
  },
  {
    id: 3,
    img: require("../../assets/product/product_7.png"),
    brandName: "빈스홀릭",
    productName: "하운드 더블 롱 코트",
    discountPercentage: "30%",
    zDiscount: true,
    originalPrice: "117,200",
    price: "81,900",
    brand: false,
    freeShipping: true,
  },
];

const zDiscountText = item => {
  const tempItem = item;

  if (tempItem.zDiscount == true) {
    return (
      <Text
        style={{
          color: "#F13794",
          fontSize: 12,
          fontWeight: "bold",
          marginRight: screenHeight * 0.005,
        }}
      >
        제트할인가
      </Text>
    );
  }
};

const discountPercentageText = item => {
  const tempItem = item;

  if (tempItem.discountPercentage !== "") {
    return (
      <Text
        style={{
          color: "#F13794",
          fontSize: 20,
          fontWeight: "bold",
          marginRight: screenHeight * 0.005,
        }}
      >
        {tempItem.discountPercentage}
      </Text>
    );
  }
};

const originalPriceText = item => {
  const tempItem = item;

  if (tempItem.originalPrice !== "") {
    return (
      <Text
        style={{
          color: "gray",
          fontSize: 12,
        }}
      >
        {tempItem.originalPrice}
      </Text>
    );
  }
};

const freeShippingText = item => {
  const tempItem = item;

  if (tempItem.freeShipping == true) {
    return (
      <View>
        <Text
          style={{
            color: "gray",
            fontSize: 9,
            marginRight: screenHeight * 0.005,
            backgroundColor: "#f5f5f5",
            width: screenWidth * 0.1,
            alignItems: "center",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "#f5f5f5",
          }}
        >
          무료배송
        </Text>
      </View>
    );
  }
};

const getHeader = () => {
  return (
    <View>
      <Text style={styles.firstContentTitle}>{firstContentTitle}</Text>
      <FlatList
        data={firstContentData}
        listKey={(item, index) => {
          index.toString();
        }}
        horizontal={true}
        renderItem={({ item, index }) => {
          return (
            <View key={item} style={styles.firstContentView}>
              <Image style={styles.firstContentImg} source={item.img} />
              <View style={styles.firstContentTextLocation}>
                <View style={styles.firstContentTextView}>
                  <View>
                    <Text style={styles.firstContentBrandName}>
                      {item.brandName}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.firstContentProductName}>
                      {item.productName}
                    </Text>
                  </View>
                  <View style={styles.firstContentZdiscount}>
                    {zDiscountText(item)}
                    {originalPriceText(item)}
                  </View>

                  <View style={styles.firstContentDiscount}>
                    {discountPercentageText(item)}
                    <Text style={styles.firstContentPrice}>{item.price}</Text>
                  </View>
                  <View>{freeShippingText(item)}</View>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const Sale = () => {
  const tempFlatListArray = [0, 1];

  return (
    <View>
      <FlatList
        data={tempFlatListArray}
        listKey={(item, index) => {
          index.toString();
        }}
        ListHeaderComponent={getHeader}
        renderItem={({ item }) => {
          return (
            <View key={item}>
              <Text>테스트</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  firstContentView: {
    marginLeft: screenWidth * 0.06,
    marginTop: screenHeight * 0.03,
    // marginRight: screenWidth * 0.03,
  },
  firstContentTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: screenHeight * 0.015,
    marginLeft: screenWidth * 0.06,
    marginTop: textMarginBottom * 15,
  },
  firstContentView: {
    // backgroundColor: "yellow",
    width: screenWidth * 0.75,
    height: screenHeight * 0.4 + screenHeight * 0.13,
    marginLeft: screenWidth * 0.06,
  },
  firstContentImg: {
    width: screenWidth * 0.75,
    height: screenHeight * 0.4,
    position: "relative",
  },
  firstContentTextLocation: {
    width: screenWidth * 0.75,
    alignItems: "center",
    position: "absolute",
    top: screenHeight * 0.35,
  },
  firstContentTextView: {
    backgroundColor: "white",
    width: screenWidth * 0.65,
    height: screenHeight * 0.16,
    paddingLeft: screenWidth * 0.04,
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 10,
    shadowSpread: 10,
  },
  firstContentBrandName: {
    fontSize: 11,
    color: "gray",
    marginBottom: textMarginBottom * 3,
  },
  firstContentProductName: {
    fontSize: 11,
    color: "black",
    marginBottom: textMarginBottom * 8,
  },
  firstContentZdiscount: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: textMarginBottom,
  },
  firstContentDiscount: {
    flexDirection: "row",
    marginBottom: textMarginBottom * 3,
  },
  firstContentPrice: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});

export default Sale;
