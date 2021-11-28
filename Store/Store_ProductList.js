import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

let ProductListState = [
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
  {
    id: 3,
    img: require("../assets/product/product_3.png"),
    brandName: "사뿐",
    productName: "페리아 스웨이드 스틸힐",
    discountPercentage: "40%",
    zDiscount: true,
    originalPrice: "38,900",
    price: "23,340",
    brand: false,
    freeShipping: true,
  },
  {
    id: 4,
    img: require("../assets/product/product_4.png"),
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
    img: require("../assets/product/product_5.png"),
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
    img: require("../assets/product/product_6.png"),
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
    id: 9,
    img: require("../assets/product/product_9.png"),
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
    img: require("../assets/product/product_8.png"),
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
    img: require("../assets/product/product_7.png"),
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

let reducer2 = (state = heartProductListState, action) => {
  if (action.type === "plusHeart") {
    //let tempArray = [...heartProductListState];
    //tempArray.push(action.payload);
    // ^ 기존 코드는 임시로 지금 추가한 하나만 보여주도록 되어있었음

    console.log(action.payload);
    heartProductListState.push(action.payload);
    return heartProductListState;
  } else {
    return state;
  }
};

let reducer1 = (state = ProductListState, action) => {
  return state;
};

export let store = createStore(combineReducers({ reducer1, reducer2 }));

export const Store_productList = () => {
  return (
    <View>
      <Text style={{ fontSize: 40 }}>테스트ProductList</Text>
    </View>
  );
};
