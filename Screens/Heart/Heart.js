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

import { useSelector } from "react-redux";

//장바구니 아이콘 색상 : #F719A3
const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이
const productHeight = screenHeight * 0.35;
const commonMargin = screenWidth * 0.045;
const textMarginBottom = screenHeight * 0.0019;

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
  const [HeartProductList, setHeartProductList] = useState([
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
  ]);

  let [editMode, setEditMode] = useState(false); // 편집 모드
  let [choicedCheckList, setChoicedCheckList] = useState([]); // 체크된 id 배열
  let [reload, setReload] = useState(false);

  // 가위 버튼 누르면 편집모드로 변경하는 함수
  const scissorsButton = () => {
    setEditMode(true);
  };

  // 체크 버튼 누르면 choicedCheckList 에 넣고 빼는 함수
  const choicedCheckButton = id => {
    let tempArray = choicedCheckList;
    let temp = false;

    // 만약 눌렸던 버튼이었으면 choicedCheckList 에서 빼기
    if (choicedCheckList.length !== 0) {
      choicedCheckList.map(item => {
        if (item === id) {
          tempArray = tempArray.filter(item => {
            return item !== id;
          });
          temp = true;
        }
      });
    }

    // 만약 안 눌렸던 버튼이었으면 choicedCheckList 에 넣어주기
    if (!temp) {
      tempArray.push(id);
    }

    setChoicedCheckList(tempArray);
    setReload(!reload);
  };

  // choicedCheckList 에 들어가있으면 true, 없으면 false 반환하는 함수
  const choiceMode = id => {
    let trueOrFalse = false;

    if (choicedCheckList.length !== 0) {
      choicedCheckList.map(item => {
        if (item === id) {
          trueOrFalse = true;
        }
      });
    }

    return trueOrFalse;
  };

  // 체크된 항목 지우는 함수
  const deleteProduct = () => {
    let tempArray = [...HeartProductList];

    tempArray.map(item => {
      choicedCheckList.map(checkItem => {
        if (item.id === checkItem) {
          tempArray = tempArray.filter(item => {
            return item.id !== checkItem;
          });
        }
      });
    });

    setHeartProductList(tempArray);
    setEditMode(false);
    setReload(!reload);
  };

  return (
    <View style={styles.View}>
      <View style={styles.headerView}>
        <View>
          {!editMode ? (
            <Text style={styles.headerText}>찜한 아이템</Text>
          ) : (
            <Text style={styles.headerTextEditMode}>상품 선택</Text>
          )}
        </View>

        {!editMode ? (
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

            <TouchableOpacity onPress={scissorsButton}>
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
        ) : (
          <View style={styles.headerDeleteButtonView}>
            <TouchableOpacity onPress={deleteProduct}>
              <Text style={styles.headerDeleteButton}>완료</Text>
            </TouchableOpacity>
          </View>
        )}
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
        renderItem={({ item, index }) => {
          return (
            <View key={item.id} style={styles.productMiniSizeView}>
              <View>
                <View style={{ position: "relative" }}>
                  <Image source={item.img} style={styles.productMiniSizeImg} />
                </View>
                <View style={styles.checkboxView}>
                  {editMode && (
                    <TouchableOpacity
                      onPress={() => {
                        choicedCheckButton(item.id);
                      }}
                    >
                      <Image
                        style={styles.checkbox}
                        source={
                          choiceMode(item.id)
                            ? require("../../assets/icon/checked.png")
                            : require("../../assets/icon/unchecked.png")
                        }
                      />
                    </TouchableOpacity>
                  )}
                </View>
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
  headerTextEditMode: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerDeleteButtonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FF009F",
    width: screenWidth * 0.13,
    height: screenHeight * 0.04,
  },
  headerDeleteButton: {
    color: "white",
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
    marginBottom: screenHeight * 0.02,
    //backgroundColor: "yellow",
  },
  productMiniSizeImg: {
    height: screenHeight * 0.16,
    width: screenWidth * 0.29,
    marginBottom: screenHeight * 0.01,
    borderRadius: 5,
  },
  checkboxView: {
    position: "absolute",
    top: screenHeight * 0.009,
    right: screenWidth * 0.02,
  },
  checkbox: {
    width: screenWidth * 0.045,
    height: screenHeight * 0.021,
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
