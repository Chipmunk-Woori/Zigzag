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

let heartProductListState = [
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
];

let reducer2 = (state = heartProductListState, action) => {
  return state;
};

export const heartProductList = createStore(reducer2);

export const Store_heartProduct = () => {
  return (
    <View>
      <Text style={{ fontSize: 40 }}>테스트(Store_heartProduct)</Text>
    </View>
  );
};
