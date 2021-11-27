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
const textMarginBottom = screenHeight * 0.0019;

const firstContentTitle = "⏰ 하객룩 타임특가"; // 첫번째 게시글 제목

const firstContentData = [
  {
    id: 9,
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
    id: 8,
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
    id: 7,
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
          fontSize: 19,
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

const Best = () => {
  const tempFlatListArray = [0, 1];
  const [pinkHeartArray, setPinkHeartArray] = useState([]); // 좋아요 누른 하트 들어있는 배열
  const [reload, setReload] = useState(false);

  // 하트 변경 함수
  // 내가 누른 상품이 핑크하트면 흰하트로 변경, 흰하트면 핑크하트로 변경
  const heartChange = index => {
    let pressedIndex = index; // 내가 지금 누른 상품의 index
    let tempPinkHeartArray = pinkHeartArray; // pinkHeartArray 값 받은 임시 배열
    let check = false; // 하트의 상태를 바꿔주는 작업을 했는지 알려줌

    // 내가 누른 하트가 핑크하트면 흰하트로 바꿔줄게
    // 핑크하트 배열에서 빼자
    if (pinkHeartArray.length !== 0) {
      pinkHeartArray.map(item => {
        if (item === pressedIndex) {
          tempPinkHeartArray = tempPinkHeartArray.filter(item => {
            return item !== pressedIndex;
          });

          check = true; // 하트가 핑크하트길래 흰하트로 바꿔줬다는 표시
        }
      });
    }
    // 내가 누른 하트가 흰하트면 핑크하트로 바꿔줄게
    // 핑크하트 배열에 넣자
    if (!check) {
      // 윗 단계를 거치지않았다면
      tempPinkHeartArray.push(pressedIndex);
    }

    // 변경된 값 적용
    setPinkHeartArray(tempPinkHeartArray);

    // 새로고침
    // 배열의 내용이 수정된 것은 인지하지못하므로
    setReload(!reload);
  };

  // 핑크하트인지 흰하트인지 확인하는 함수
  const returnHeartState = index => {
    let pressedIndex = index; // 내가 지금 누른 상품의 index
    let heartState = false;

    // 핑크하트면 heartState = true, 흰하트면 heartState = false
    pinkHeartArray.map(item => {
      if (item === pressedIndex) {
        return (heartState = true);
      }
    });

    return heartState;
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
                <View style={styles.firstContentSaleTextView}>
                  <Text style={styles.firstContentSaleText}>타임특가</Text>
                </View>
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
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {freeShippingText(item)}
                      <TouchableOpacity
                        onPress={() => {
                          heartChange(index);
                        }}
                      >
                        <Image
                          style={styles.firstContenHeart}
                          source={
                            returnHeartState(index)
                              ? require("../../assets/icon/heart_pink.png")
                              : require("../../assets/icon/heart_white.png")
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={tempFlatListArray}
        listKey={(item, index) => {
          index.toString();
        }}
        ListHeaderComponent={getHeader}
        renderItem={({ item }) => {
          return <View key={item}></View>;
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
    borderRadius: 8,
  },
  firstContentSaleTextView: {
    backgroundColor: "black",
    width: screenWidth * 0.17,
    height: screenHeight * 0.035,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 9,
  },
  firstContentSaleText: {
    fontWeight: "bold",
    color: "white",
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
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 5,
      width: 5,
    },

    borderRadius: 8,
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
    fontSize: 19,
    color: "black",
    fontWeight: "bold",
  },
  firstContenHeart: {
    marginLeft: textMarginBottom * 98,
    height: screenHeight * 0.023,
    width: screenWidth * 0.049,
  },
});

export default Best;
