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

//장바구니 아이콘 색상 : #F719A3
const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이
const productHeight = screenHeight * 0.35;
const commonMargin = screenWidth * 0.045;
const textMarginBottom = screenHeight * 0.0019;

const HeartProductList = [
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
];

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

const productNumber = () => {
  return (
    <View>
      <Text style={styles.productNumberText}>찜한 상품</Text>
    </View>
  );
};

const Heart = () => {
  const tempFlatListDataArray = [0, 1, 2];
  const [userName, setUserName] = useState("배우리");
  return (
    <View style={styles.View}>
      <View style={styles.headerView}>
        <View>
          <Text style={styles.headerText}>찜한 아이템</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Image
              style={styles.headerIcon}
              source={require("../../assets/icon/list.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.headerIcon}
              source={require("../../assets/icon/scissors.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.headerIconShoppingBasket}
              source={require("../../assets/icon/shoppingBasket.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerSecondView}>
        <Image
          style={styles.headerSecondIconHeart}
          source={require("../../assets/icon/love.png")}
        />
        <TouchableOpacity>
          <Image
            style={styles.headerSecondIcon}
            source={require("../../assets/icon/folder.png")}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={HeartProductList}
        listKey={item => "b" + item.id}
        numColumns={3}
        ListHeaderComponent={productNumber}
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
                <Text style={styles.productMiniSizePrice}>{item.price}</Text>
              </View>
              <View>{freeShippingText(item)}</View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    paddingHorizontal: screenHeight * 0.02,
    backgroundColor: "white",
  },
  headerView: {
    marginTop: screenHeight * 0.07,
    marginBottom: screenHeight * 0.03,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 21,
    fontWeight: "bold",
  },
  headerIcon: {
    width: screenWidth * 0.046,
    height: screenHeight * 0.022,
    marginLeft: screenWidth * 0.06,
  },
  headerIconShoppingBasket: {
    width: screenWidth * 0.062,
    height: screenHeight * 0.028,
    marginLeft: screenWidth * 0.06,
  },
  headerSecondView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: screenHeight * 0.022,
    //backgroundColor: "yellow",
  },
  headerSecondIcon: {
    width: screenWidth * 0.048,
    height: screenHeight * 0.022,
  },
  headerSecondIconHeart: {
    width: screenWidth * 0.065,
    height: screenHeight * 0.03,
  },
  productNumberText: {
    fontSize: 13,
    color: "gray",
    marginBottom: screenHeight * 0.014,
  },
  productMiniSizeView: {
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    marginRight: screenWidth * 0.01,
    //backgroundColor: "yellow",
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
});
export default Heart;
