import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { useState } from "react";

import { Text, View } from "react-native";

let ProductListState = [
  {
    id: 1,
    img: require("../assets/product/product_1.png"),
    brandName: "사뿐",
    productName: "알마 니트 집업 가디건",
    discountPercentage: "",
    zDiscount: false,
    originalPrice: "",
    price: "52,900",
    brand: false,
    freeShipping: true,
    firstTypeSeq: 1,
    secondTypeSeq: 1,
  },
  {
    id: 2,
    img: require("../assets/product/product_2.png"),
    brandName: "쇼퍼랜드",
    productName: "아가일 가디건",
    discountPercentage: "5%",
    zDiscount: false,
    originalPrice: "",
    price: "119,700",
    brand: true,
    freeShipping: true,
    firstTypeSeq: 1,
    secondTypeSeq: 1,
  },
  {
    id: 3,
    img: require("../assets/product/product_3.png"),
    brandName: "달트",
    productName: "베어 무스탕",
    discountPercentage: "40%",
    zDiscount: true,
    originalPrice: "38,900",
    price: "23,340",
    brand: false,
    freeShipping: true,
    firstTypeSeq: 1,
    secondTypeSeq: 2,
  },
  {
    id: 4,
    img: require("../assets/product/product_4.png"),
    brandName: "달바",
    productName: "오프숄더 니트",
    discountPercentage: "73%",
    zDiscount: true,
    originalPrice: "36,000",
    price: "9,800",
    brand: false,
    freeShipping: true,
    firstTypeSeq: 2,
    secondTypeSeq: 2,
  },
  {
    id: 5,
    img: require("../assets/product/product_5.png"),
    brandName: "프롬비기닝",
    productName: "프리미엄 밀크숏퍼자켓",
    discountPercentage: "10%",
    zDiscount: false,
    originalPrice: "",
    price: "34,100",
    brand: false,
    freeShipping: false,
    firstTypeSeq: 1,
    secondTypeSeq: 2,
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
    firstTypeSeq: 1,
    secondTypeSeq: 2,
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
    firstTypeSeq: 3,
    secondTypeSeq: 1,
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
    firstTypeSeq: 1,
    secondTypeSeq: 2,
  },
  {
    id: 7,
    img: require("../assets/product/product_7.png"),
    brandName: "라룸",
    productName: "헤리브이넥니트",
    discountPercentage: "30%",
    zDiscount: true,
    originalPrice: "117,200",
    price: "81,900",
    brand: false,
    freeShipping: true,
    firstTypeSeq: 2,
    secondTypeSeq: 1,
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

let folderList = [
  {
    folderKey: 0,
    title: "♥",
    item: [
      {
        id: 9,
        img: require("../assets/product/product_9.png"),
        brandName: "로즐리",
        productName: "세실리아 벌룬니트",
        discountPercentage: "73%",
        zDiscount: true,
        originalPrice: "59,000",
        price: "39,900",
        brand: false,
        freeShipping: true,
        firstTypeSeq: 3,
        secondTypeSeq: 1,
      },
      {
        id: 2,
        img: require("../assets/product/product_2.png"),
        brandName: "메종 마르지엘라",
        productName: "베이직 맨투맨",
        discountPercentage: "5%",
        zDiscount: false,
        originalPrice: "",
        price: "119,700",
        brand: true,
        freeShipping: true,
        firstTypeSeq: 1,
        secondTypeSeq: 1,
      },
      {
        id: 4,
        img: require("../assets/product/product_4.png"),
        brandName: "달바",
        productName: "루즈핏 맨투맨",
        discountPercentage: "73%",
        zDiscount: true,
        originalPrice: "36,000",
        price: "9,800",
        brand: false,
        freeShipping: true,
        firstTypeSeq: 2,
        secondTypeSeq: 2,
      },
      {
        id: 5,
        img: require("../assets/product/product_5.png"),
        brandName: "프롬비기닝",
        productName: "프리미엄 집업",
        discountPercentage: "10%",
        zDiscount: false,
        originalPrice: "",
        price: "34,100",
        brand: false,
        freeShipping: false,
        firstTypeSeq: 1,
        secondTypeSeq: 2,
      },
      {
        id: 6,
        img: require("../assets/product/product_6.png"),
        brandName: "어텀뮤트",
        productName: "하이퀄리티 토트백",
        discountPercentage: "",
        zDiscount: false,
        originalPrice: "",
        price: "109,000",
        brand: false,
        freeShipping: true,
        firstTypeSeq: 1,
        secondTypeSeq: 2,
      },
      {
        id: 3,
        img: require("../assets/product/product_3.png"),
        brandName: "달트",
        productName: "스퀘어 로퍼",
        discountPercentage: "40%",
        zDiscount: true,
        originalPrice: "38,900",
        price: "23,340",
        brand: false,
        freeShipping: true,
        firstTypeSeq: 1,
        secondTypeSeq: 2,
      },
      {
        id: 1,
        img: require("../assets/product/product_1.png"),
        brandName: "사뿐",
        productName: "블랙 베이직 로퍼",
        discountPercentage: "",
        zDiscount: false,
        originalPrice: "",
        price: "52,900",
        brand: false,
        freeShipping: true,
        firstTypeSeq: 1,
        secondTypeSeq: 1,
      },
    ],
  },
  {
    folderKey: 1,
    title: "상의",
    item: [
      {
        id: 9,
        img: require("../assets/product/product_9.png"),
        brandName: "로즐리",
        productName: "세실리아 벌룬니트",
        discountPercentage: "73%",
        zDiscount: true,
        originalPrice: "59,000",
        price: "39,900",
        brand: false,
        freeShipping: true,
        firstTypeSeq: 3,
        secondTypeSeq: 1,
      },
      {
        id: 2,
        img: require("../assets/product/product_2.png"),
        brandName: "메종 마르지엘라",
        productName: "베이직 맨투맨",
        discountPercentage: "5%",
        zDiscount: false,
        originalPrice: "",
        price: "119,700",
        brand: true,
        freeShipping: true,
        firstTypeSeq: 1,
        secondTypeSeq: 1,
      },
      {
        id: 4,
        img: require("../assets/product/product_4.png"),
        brandName: "달바",
        productName: "루즈핏 맨투맨",
        discountPercentage: "73%",
        zDiscount: true,
        originalPrice: "36,000",
        price: "9,800",
        brand: false,
        freeShipping: true,
        firstTypeSeq: 2,
        secondTypeSeq: 2,
      },
      {
        id: 5,
        img: require("../assets/product/product_5.png"),
        brandName: "프롬비기닝",
        productName: "프리미엄 집업",
        discountPercentage: "10%",
        zDiscount: false,
        originalPrice: "",
        price: "34,100",
        brand: false,
        freeShipping: false,
        firstTypeSeq: 1,
        secondTypeSeq: 2,
      },
    ],
  },
  {
    folderKey: 2,
    title: "가방",
    item: [
      {
        id: 6,
        img: require("../assets/product/product_6.png"),
        brandName: "어텀뮤트",
        productName: "하이퀄리티 토트백",
        discountPercentage: "",
        zDiscount: false,
        originalPrice: "",
        price: "109,000",
        brand: false,
        freeShipping: true,
        firstTypeSeq: 1,
        secondTypeSeq: 2,
      },
    ],
  },
  {
    folderKey: 3,
    title: "신발",
    item: [
      {
        id: 3,
        img: require("../assets/product/product_3.png"),
        brandName: "달트",
        productName: "스퀘어 로퍼",
        discountPercentage: "40%",
        zDiscount: true,
        originalPrice: "38,900",
        price: "23,340",
        brand: false,
        freeShipping: true,
        firstTypeSeq: 1,
        secondTypeSeq: 2,
      },
      {
        id: 1,
        img: require("../assets/product/product_1.png"),
        brandName: "사뿐",
        productName: "블랙 베이직 로퍼",
        discountPercentage: "",
        zDiscount: false,
        originalPrice: "",
        price: "52,900",
        brand: false,
        freeShipping: true,
        firstTypeSeq: 1,
        secondTypeSeq: 1,
      },
    ],
  },
];

let reducer2 = (state = heartProductListState, action) => {
  if (action.type === "plusHeart") {
    // console.log(action.payload);
    heartProductListState.push(action.payload);
    return heartProductListState;
  } else {
    return state;
  }
};

let reducer1 = (state = ProductListState, action) => {
  return state;
};

let reducer3 = (state = folderList, action) => {
  if (action.type == "changeTitle") {
    let copy = [...folderList];
    copy.map(copyItem => {
      if (copyItem.folderKey == action.payload.folderKey) {
        copyItem.title = action.payload.title;
        folderList = copy;
      }
    });

    // console.log(action.payload.folderKey);
    return folderList;
  } else if (action.type == "addTitle") {
    let copy = [...folderList];
    let add = {
      folderKey: folderList.length,
      title: action.payload.title,
      item: [],
    };
    copy.push(add);
    // console.log(add.folderKey);

    folderList = copy;
    return folderList;
  } else if (action.type === "deleteTitle") {
    let payloadTitle = action.payload.item.title;
    folderList.map(mi => {
      if (mi.title == payloadTitle) {
        folderList = folderList.filter(fi => {
          return fi.title !== payloadTitle;
        });
      }
    });
    return folderList;
  } else {
    return state;
  }
};

export let store = createStore(
  combineReducers({ reducer1, reducer2, reducer3 })
);

export const Store_productList = () => {
  return (
    <View>
      <Text style={{ fontSize: 40 }}>테스트ProductList</Text>
    </View>
  );
};
