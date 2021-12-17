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
  Modal,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const ShoppingBasket = ({ navigation }) => {
  const [headerText, setTeaderText] = useState("장바구니");
  return (
    <View style={styles.View}>
      <View style={styles.headerView}>
        <TouchableOpacity>
          <Image
            style={styles.headerCancelIcon}
            source={require("../../assets/icon/cancel.png")}
          />
        </TouchableOpacity>
        <Image
          source={require("../../assets/icon/shoppingBasket_black.png")}
          style={styles.headerShoppingBasketIcon}
        />
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
      <View style={styles.secondView}>
        <View style={styles.wholeSelection}>
          <TouchableOpacity>
            <Image
              style={styles.checkIcon}
              source={require("../../assets/icon/checked.png")}
              //source={require("../../assets/icon/unchecked_gray.png")}
            />
          </TouchableOpacity>
          <Text>전체선택</Text>
          <Text>(1/1)</Text>
        </View>
        <TouchableOpacity>
          <Text>선택삭제</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productView}>
        <View style={styles.shoppingmallView}>
          <Image
            style={styles.shoppingmallImg}
            source={require("../../assets/shoppingmall/shoppingmall_1.png")}
          />
          <Text style={styles.shoppingmallName}>횰릭</Text>
        </View>
        <View style={styles.ViewLine} />
        {/* ---------------------------------------------------------------- */}
        <View style={styles.productDetailView}>
          <TouchableOpacity>
            <Image
              style={styles.checkIcon}
              source={require("../../assets/icon/checked.png")}
              //source={require("../../assets/icon/unchecked_gray.png")}
            />
          </TouchableOpacity>

          {/* ---------------------------------------------------------------- */}
          <View>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../assets/product/product_10.png")}
                style={styles.productImg}
              />
              <View style={styles.productNameView}>
                <Text style={styles.productNameText}>다이아루즈브이넥니트</Text>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Text style={styles.productColorText}>소라</Text>
                  <Text style={styles.productAmountText}>1개</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Image
                  style={styles.productDeleteButton}
                  source={require("../../assets/icon/cancel.png")}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.freeShippingText}>배송비 무료 상품</Text>
            {/* ---------------------------------------------------------------- */}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <Image
                  style={styles.amountButton}
                  source={require("../../assets/icon/minus.png")}
                />
              </TouchableOpacity>
              <Text style={styles.amountText}>1</Text>
              <TouchableOpacity>
                <Image
                  style={styles.amountButton}
                  source={require("../../assets/icon/add.png")}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity></TouchableOpacity>
            <Text>32,000원</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    paddingHorizontal: screenHeight * 0.02,
    paddingTop: 40,
    backgroundColor: "white",
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
  },
  headerCancelIcon: {
    width: 15,
    height: 15,
    marginRight: 15,
  },
  headerShoppingBasketIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  checkIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  secondView: {
    width: "100%",
    height: 40,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wholeSelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  productView: {
    width: "100%",
    height: 330,
    backgroundColor: "orange",
  },
  shoppingmallView: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
  },
  shoppingmallImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  shoppingmallName: {
    fontWeight: "bold",
    fontSize: 17,
  },
  ViewLine: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  productDetailView: {
    marginTop: 10,
    flexDirection: "row",
  },
  productImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  productNameView: {
    marginLeft: 10,
  },
  productNameText: {
    marginTop: 8,
    fontSize: 15,
  },
  productColorText: {
    color: "gray",
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 13,
  },
  productAmountText: {
    color: "gray",
    fontSize: 12,
  },
  productDeleteButton: {
    width: 11,
    height: 11,
    marginTop: 10,
    marginLeft: 100,
  },
  freeShippingText: {
    color: "green",
    marginTop: 20,
    marginBottom: 17,
    marginLeft: 10,
  },
  amountButton: {
    width: 18,
    height: 18,
    // marginLeft: 5,
  },
  amountText: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default ShoppingBasket;
