import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

export let heartProductList = createStore(() => {
  return [
    {
      id: 1,
      img: require("../assets/product/product_1.png"),
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
      img: require("../assets/product/product_2.png"),
      brandName: "시티브리즈",
      productName: "[21FW]케이블 니트",
      discountPercentage: "5%",
      zDiscount: false,
      originalPrice: "",
      price: "119,700",
      brand: true,
      freeShipping: true,
    },
  ];
});

export const Store_heartProduct = () => {
  return (
    <View>
      <Text style={{ fontSize: 40 }}>테스트(Store_heartProduct)</Text>
    </View>
  );
};
