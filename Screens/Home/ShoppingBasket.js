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
  const Basketproducts = [
    {
      productId: 1,
      productName: "다이아루즈브이넥니트",
      productColor: "소라",
      productPrice: "32,000",
      productImg: require("../../assets/product/product_10.png"),
      shoppingmallName: "쵸퍼",
      shoppingmallImg: require("../../assets/shoppingmall/shoppingmall_1.png"),
    },
    {
      productId: 2,
      productName: "리튼 양털하프패딩점퍼 (2color)",
      productColor: "도브그레이",
      productPrice: "105,500",
      productImg: require("../../assets/product/product_11.png"),
      shoppingmallName: "프롬비기닝",
      shoppingmallImg: require("../../assets/shoppingmall/shoppingmall_2.png"),
    },
  ];

  const getFooter = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={styles.deliveryChargeView}>
          <Text style={styles.deliveryChargeText}>총 결제금액</Text>
          <Text style={styles.productPrice}>32,000원</Text>
        </View>
        <View style={styles.deliveryChargeView}>
          <Text style={styles.deliveryChargeText}>총 배송비</Text>
          <Text style={styles.productPrice}>0원</Text>
        </View>
        <View style={styles.ViewLine} />
        <View style={styles.deliveryChargeView}>
          <Text style={[styles.deliveryChargeText, styles.fontSizeUp]}>
            총 결제예상금액
          </Text>
          <Text style={styles.totalProductPriceText}>32,000원</Text>
        </View>
      </View>
    );
  };

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
          <Text>상품삭제</Text>
        </TouchableOpacity>
      </View>

      {/* {productShow()} */}
      <View>
        <FlatList
          data={Basketproducts}
          keyExtractor={item => item.productId}
          ListFooterComponent={getFooter}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.productView} key={index.toString()}>
                <View style={styles.shoppingmallView}>
                  <Image
                    style={styles.shoppingmallImg}
                    source={item.shoppingmallImg}
                  />
                  <Text style={styles.shoppingmallName}>
                    {item.shoppingmallName}
                  </Text>
                </View>
                <View style={styles.ViewLine} />

                <View style={styles.productDetailView}>
                  <TouchableOpacity>
                    <Image
                      style={styles.checkIcon}
                      source={require("../../assets/icon/checked.png")}
                      //source={require("../../assets/icon/unchecked_gray.png")}
                    />
                  </TouchableOpacity>

                  {/* 체크박스 오른쪽 내용---------------------------------------------------------------- */}
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={item.productImg}
                        style={styles.productImg}
                      />
                      <View style={styles.productNameView}>
                        <Text style={styles.productNameText}>
                          {item.productName}
                        </Text>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                          <Text style={styles.productColorText}>
                            {item.productColor}
                          </Text>
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
                    <Text style={styles.freeShippingText}>
                      배송비 무료 상품
                    </Text>
                    {/* 상품 가격---------------------------------------------------------------- */}
                    <View style={styles.amountView}>
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
                      <Text style={styles.productPrice}>
                        {item.productPrice}
                      </Text>
                    </View>
                    <View style={styles.ViewLine} />
                    <View style={styles.deliveryChargeView}>
                      <Text style={styles.deliveryChargeText}>배송비</Text>
                      <Text style={styles.deliveryChargeText}>무료</Text>
                    </View>
                    <View style={styles.ViewLine} />
                    <View style={styles.deliveryChargeView}>
                      <Text style={styles.deliveryChargeText}>총 결제금액</Text>
                      <Text style={styles.totalProductPriceText}>32,000원</Text>
                    </View>
                    <View style={styles.purchaseButtonView}>
                      <TouchableOpacity style={styles.purchaseButton_choice}>
                        <Text
                          style={[
                            styles.purchaseButtonText_noChoice,
                            styles.purchaseButtonText_choice,
                          ]}
                        >
                          바로구매
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.purchaseButton_choice,
                          styles.purchaseButton_noChoice,
                        ]}
                      >
                        <Text style={styles.purchaseButtonText_noChoice}>
                          상품추가
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>

      {/* 구매하기 버튼---------------------------------------------------------------- */}
      <View style={styles.buyButtonView}>
        <View style={styles.buyButtonPriceView}>
          <Text style={styles.deliveryChargeText}>총 결제금액</Text>
          <Text style={styles.buyButtonPriceText}>32,000원</Text>
        </View>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={{ color: "white" }}>구매하기</Text>
        </TouchableOpacity>
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
  cancelTouch: {
    width: 10,
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
    marginTop: 10,
    // backgroundColor: "orange",
  },
  shoppingmallView: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  shoppingmallImg: {
    width: 33,
    height: 33,
    borderRadius: 20,
    marginRight: 10,
  },
  shoppingmallName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  ViewLine: {
    borderBottomColor: "#E8EFF2",
    borderBottomWidth: 0.8,
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
    marginLeft: 15,
  },
  productNameText: {
    marginTop: 8,
    fontSize: 15,
    width: 220,
    marginRight: 10,
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
  },
  freeShippingText: {
    color: "green",
    marginTop: 20,
    marginBottom: 6,
    marginLeft: 7,
    fontSize: 12,
  },
  amountView: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    justifyContent: "space-between",
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
  productPrice: {
    fontSize: 14,
  },
  deliveryChargeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 47,
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  deliveryChargeText: {
    color: "gray",
    fontSize: 12,
  },
  totalProductPriceText: {
    fontSize: 17,
  },
  purchaseButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  purchaseButton_choice: {
    borderStyle: "solid",
    borderColor: "#F719A3",
    borderRadius: 20,
    borderWidth: 2,
    padding: 10,
    width: 150,
    alignItems: "center",
  },
  purchaseButton_noChoice: {
    borderColor: "lightgray",
  },
  purchaseButtonText_noChoice: {},
  purchaseButtonText_choice: {
    color: "#F719A3",
  },
  fontSizeUp: {
    fontSize: 15,
    fontWeight: "bold",
  },
  buyButtonView: {
    height: 60,
    marginTop: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buyButtonPriceView: {
    justifyContent: "center",
  },
  buyButtonPriceText: {
    fontSize: 16,
    marginTop: 6,
  },
  buyButton: {
    backgroundColor: "#F719A3",
    width: 170,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ShoppingBasket;
