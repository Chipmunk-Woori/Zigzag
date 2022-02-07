import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const posterData = [
  {
    id: "poster_1",
    img: require("../../assets/poster/poster_1.png"),
    text: ["대세 정호연 만난", "캘빈클라인 진 봄 신상"],
    textColor: "black",
  },
  {
    id: "poster_2",
    img: require("../../assets/poster/poster_2.png"),
    text: ["로고로 힘 더했다!", "엠엘비 청키 라이너 발매"],
    textColor: "white",
  },
  {
    id: "poster_3",
    img: require("../../assets/poster/poster_3.png"),
    text: ["제이에스티나", "22 S/S 핸드백 컬렉션 발매"],
    textColor: "white",
  },
];

const productMiniSize = [
  {
    id: 1,
    img: require("../../assets/product/product_1.png"),
    brandName: "사뿐",
    productName: "뮤이안 베이직 롱부츠",
    discountPercentage: "",
    zDiscount: false,
    originalPrice: "",
    price: "52,900",
    brand: false,
    freeShipping: true,
  },
  {
    id: 2,
    img: require("../../assets/product/product_2.png"),
    brandName: "시티브리즈",
    productName: "[21FW]케이블 니트",
    discountPercentage: "5%",
    zDiscount: false,
    originalPrice: "",
    price: "119,700",
    brand: true,
    freeShipping: true,
  },
  {
    id: 3,
    img: require("../../assets/product/product_3.png"),
    brandName: "사뿐",
    productName: "페리아 스웨이드 스틸힐",
    discountPercentage: "40%",
    zDiscount: true,
    originalPrice: "38,900",
    price: "23,340",
    brand: false,
    freeShipping: true,
  },
];

const productBigSize = [
  {
    id: 4,
    img: require("../../assets/product/product_4.png"),
    brandName: "순키",
    productName: "오프숄더 니트",
    discountPercentage: "73%",
    zDiscount: true,
    originalPrice: "36,000",
    price: "9,800",
    brand: false,
    freeShipping: true,
  },
  {
    id: 5,
    img: require("../../assets/product/product_5.png"),
    brandName: "더무드",
    productName: "실크원피스",
    discountPercentage: "10%",
    zDiscount: false,
    originalPrice: "",
    price: "34,100",
    brand: false,
    freeShipping: false,
  },
  {
    id: 6,
    img: require("../../assets/product/product_6.png"),
    brandName: "어텀뮤트",
    productName: "하이퀄리티 울 자켓",
    discountPercentage: "",
    zDiscount: false,
    originalPrice: "",
    price: "109,000",
    brand: false,
    freeShipping: true,
  },
];
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const posterHeight = screenHeight * 0.28;
const productHeight = screenHeight * 0.35;
const commonMargin = screenWidth * 0.045;
const textMarginBottom = screenHeight * 0.0019;
const colors = ["tomato", "thistle", "skyblue", "teal"];

const zDiscountText = item => {
  const tempItem = item;

  if (tempItem.zDiscount == true) {
    return (
      <Text
        style={{
          color: "#F719A3",
          fontSize: 11,
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
          color: "#F719A3",
          fontSize: 13,
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
          fontSize: 9,
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

const HomeTabView = ({ navigation }) => {
  const [showIndex, setShowIndex] = useState(1);
  const [nextState, setNextState] = useState(false);
  const [posterNumber, setPosterNumber] = useState(0);
  const [userName, setUserName] = useState("배우리");
  const tempFlatListDataArray = [0, 1, 2];

  getHeader = () => {
    return (
      <View style={{ position: "relative" }}>
        <SwiperFlatList
          autoplay={true}
          autoplayDelay={2}
          autoplayLoop={true}
          index={0}
          showPagination={false}
          data={posterData}
          onChangeIndex={({ index, prevIndex }) => {
            setShowIndex(index + 1);
          }}
          renderItem={({ item, index }) => (
            <View style={styles.posterChild}>
              <Image
                source={item.img}
                style={{
                  width: screenWidth,
                  height: posterHeight,
                }}
              />
              <View style={styles.posterTextView}>
                {item.text.map(i => {
                  return (
                    <Text
                      style={[styles.posterText, { color: item.textColor }]}
                    >
                      {i}
                    </Text>
                  );
                })}
              </View>
            </View>
          )}
        />
        <View
          style={[styles.posterNumberView, styles.posterNumberBackground]}
        />
        <View style={[styles.posterNumberView, { flexDirection: "row" }]}>
          <Text style={styles.posterNumberText}>{showIndex}</Text>
          <Text style={[styles.posterNumberText, { color: "lightgray" }]}>
            /
          </Text>
          <Text style={[styles.posterNumberText, { color: "lightgray" }]}>
            {posterData.length}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={tempFlatListDataArray}
        listKey={(item, index) => {
          "a" + index.toString();
        }}
        ListHeaderComponent={getHeader}
        renderItem={({ item }) => {
          return (
            <View
              key={item}
              style={{
                marginLeft: commonMargin,
                marginRight: commonMargin,
              }}
            >
              <View
                style={{
                  marginTop: screenHeight * 0.02,
                  flexDirection: "row",
                }}
              >
                <Text style={styles.firstProductTitleName}>{userName}님</Text>
                <Text style={styles.firstProductTitle}>
                  을 위한 추천 아이템
                </Text>
              </View>

              <View>
                <View
                  style={{
                    borderColor: "white",
                    borderStyle: "solid",
                    borderWidth: 1,
                  }}
                >
                  <FlatList
                    data={productMiniSize}
                    listKey={item => "b" + item.id}
                    numColumns={3}
                    renderItem={({ item }) => {
                      return (
                        <View key={item.id} style={styles.productMiniSizeView}>
                          <View>
                            <Image
                              source={item.img}
                              style={{
                                height: screenHeight * 0.16,
                                width: screenWidth * 0.29,
                                marginBottom: screenHeight * 0.01,
                                borderRadius: 5,
                              }}
                            />
                          </View>

                          <View>
                            <Text style={styles.productMiniSizeBrandName}>
                              {item.brandName}
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.productMiniSizeProductName}>
                              {item.productName}
                            </Text>
                          </View>
                          <View style={styles.productMiniSizeZdiscount}>
                            {zDiscountText(item)}
                            {originalPriceText(item)}
                          </View>

                          <View style={styles.productMiniSizeDiscount}>
                            {discountPercentageText(item)}
                            <Text style={styles.productMiniSizePrice}>
                              {item.price}
                            </Text>
                          </View>
                          <View>{freeShippingText(item)}</View>
                        </View>
                      );
                    }}
                  />
                </View>

                <View
                  style={{
                    marginTop: screenHeight * 0.025,
                    borderColor: "white",
                    borderStyle: "solid",
                    borderWidth: 1,
                  }}
                >
                  <FlatList
                    data={productBigSize}
                    listKey={item => "c" + item.id}
                    numColumns={2}
                    renderItem={({ item }) => {
                      return (
                        <View key={item.id} style={styles.productBigSizeView}>
                          <View>
                            <Image
                              source={item.img}
                              style={{
                                height: screenHeight * 0.23,
                                width: screenWidth * 0.42,
                                marginBottom: screenHeight * 0.01,
                              }}
                            />
                          </View>

                          <View>
                            <Text style={styles.productMiniSizeBrandName}>
                              {item.brandName}
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.productMiniSizeProductName}>
                              {item.productName}
                            </Text>
                          </View>
                          <View style={styles.productMiniSizeZdiscount}>
                            {zDiscountText(item)}
                            {originalPriceText(item)}
                          </View>

                          <View style={styles.productMiniSizeDiscount}>
                            {discountPercentageText(item)}
                            <Text style={styles.productMiniSizePrice}>
                              {item.price}
                            </Text>
                          </View>
                          <View>{freeShippingText(item)}</View>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  firstProductTitleName: {
    color: "black",
    fontSize: 15,
    marginBottom: 15,
    fontWeight: "bold",
  },
  firstProductTitle: {
    color: "black",
    fontSize: 15,
    marginBottom: 15,
  },
  productMiniSizeView: {
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    marginRight: screenWidth * 0.01,
  },
  productMiniSizeBrandName: {
    fontSize: 11,
    color: "black",
    fontWeight: "bold",
    marginBottom: textMarginBottom * 1.7,
  },
  productMiniSizeProductName: {
    fontSize: 11,
    color: "black",
    marginBottom: textMarginBottom,
  },
  productMiniSizeZdiscount: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: textMarginBottom,
  },
  productMiniSizeDiscount: {
    flexDirection: "row",
    marginBottom: textMarginBottom * 3,
  },
  productMiniSizePrice: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
  },
  productBigSizeView: {
    marginBottom: screenHeight * 0.02,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    marginRight: screenWidth * 0.055,
  },
  posterChild: {
    width: screenWidth,
    height: posterHeight,
  },
  posterText: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginBottom: 5,
  },
  posterTextView: {
    position: "absolute",
    top: screenHeight * 0.18,
    left: 19,
  },
  posterNumberView: {
    position: "absolute",
    right: 15,
    top: screenHeight * 0.24,
    width: screenWidth * 0.09,
    height: screenHeight * 0.023,
    alignItems: "center",
    justifyContent: "center",
  },
  posterNumberBackground: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "black",
    opacity: 0.5,
  },
  posterNumberText: {
    color: "white",
    fontSize: 12,
  },
});

export default HomeTabView;
