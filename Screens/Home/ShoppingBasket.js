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

const Basketproducts = [
  {
    productId: 101,
    productName: "다이아루즈브이넥니트",
    productColor: "소라",
    productPrice: 30000,
    deliveryCharge: 0,
    productImg: require("../../assets/product/product_10.png"),
    shoppingmallName: "쵸퍼",
    shoppingmallImg: require("../../assets/shoppingmall/shoppingmall_1.png"),
  },
  {
    productId: 102,
    productName: "리튼 양털하프패딩점퍼 (2color)",
    productColor: "도브그레이",
    productPrice: 20000,
    deliveryCharge: 2500,
    productImg: require("../../assets/product/product_11.png"),
    shoppingmallName: "프롬비기닝",
    shoppingmallImg: require("../../assets/shoppingmall/shoppingmall_2.png"),
  },
  {
    productId: 103,
    productName: "스트라이프 니트",
    productColor: "노랑",
    productPrice: 10000,
    deliveryCharge: 2500,
    productImg: require("../../assets/product/product_12.png"),
    shoppingmallName: "아베아무아",
    shoppingmallImg: require("../../assets/shoppingmall/shoppingmall_3.png"),
  },
];

const ShoppingBasket = ({ navigation }) => {
  const [reload, setReload] = useState(false);
  const [shoppingList, setShoppingList] = useState([]); //구매 목록(체크된 상품들)
  const [productTotalPriceArr, setProductTotalPriceArr] = useState([]); //🔥총 결제금액 합계
  const [shoppingResultArr, setShoppingResultArr] = useState([]);
  //🟢amount 추가해 새로 만든 배열
  //🟢[{productId : 101, price : 10000, deliveryCharge: 3000, amount: 5, checkYn: Y}]
  let [wholeSelectionState, setWholeSelectionState] = useState(false);

  //체크박스 누르면 shoppingList에 넣어주는 함수
  const pressCheckbox = pressedItem => {
    let tempArray = [...shoppingList];
    let check = false;

    if (shoppingList.length !== 0) {
      shoppingList.map(item => {
        if (item.productId == pressedItem.productId) {
          tempArray = tempArray.filter(ti => {
            return ti.productId !== pressedItem.productId;
          });
          check = true;

          if (shoppingResultArr.length !== 0) {
            shoppingResultArr.map(sri => {
              if (sri.productId == pressedItem.productId) {
                sri.checkYn = "N";
              }
            });
          }
        }
      });
    }

    if (check == false) {
      tempArray.push(pressedItem);
      if (shoppingResultArr.length !== 0) {
        shoppingResultArr.map(sri => {
          if (sri.productId == pressedItem.productId) {
            sri.checkYn = "Y";
          }
        });
      }
    }

    setShoppingList(tempArray);
    setReload(!reload);
  };

  const returnState = pressedItem => {
    let state = false;

    if (shoppingList.length !== 0) {
      shoppingList.map(item => {
        if (item.productId == pressedItem.productId) {
          state = true;
        }
      });
    }

    return state;
  };

  //전체선택(n/n)
  const returnWholeSelection = () => {
    let bp = Basketproducts.length;
    let sl = shoppingList.length;
    let result = (
      <Text>
        ({sl}/{bp})
      </Text>
    );

    return result;
  };

  //전체선택 버튼
  const changeWholeSelection = () => {
    let tempArr = [];

    if (Basketproducts.length !== shoppingList.length) {
      Basketproducts.map(item => {
        tempArr.push(item);
      });
      setWholeSelectionState(true);
      shoppingResultArr.map(item => {
        item.checkYn = "Y";
      });
    } else {
      setWholeSelectionState(false);
      shoppingResultArr.map(item => {
        item.checkYn = "N";
      });
    }

    setShoppingList(tempArr);
    setReload(!reload);
  };

  //🟢상품 + 버튼
  const returnAmount = item => {
    let amount = 1;
    shoppingResultArr.map(shoppingResult => {
      if (shoppingResult.productId == item.productId) {
        amount = shoppingResult.amount;
      }
    });

    return amount;
  };

  //🟢상품 한 칸 당 '총 결제금액'
  const returnTotalProductPrice = item => {
    //🟢
    let amount = 1;
    shoppingResultArr.map(shoppingResult => {
      if (shoppingResult.productId == item.productId) {
        amount = shoppingResult.amount;
      }
    });

    let a = item.productPrice;
    let b = item.deliveryCharge;
    let totalPrice;

    totalPrice = a * amount + b;

    return totalPrice;
  };

  //상품 한 칸 당 '상품가격'
  const returnProductPrice = item => {
    let price = 0;
    shoppingResultArr.map(i => {
      if (i.productId == item.productId) {
        price = i.amount * i.price;
      }
    });

    return price;
  };

  let tempTotal = 0;

  //최종 '총 결제금액' : 상품 가격들만 더한 금액
  const returnLastTotalProductPrice = () => {
    let lastTotalPrice = 0;

    shoppingResultArr.map(item => {
      if (item.checkYn == "Y") {
        lastTotalPrice = item.price * item.amount + lastTotalPrice;
      }
    });

    return lastTotalPrice;
  };

  //최종 '총 배송비' : 배송비들만 더한 금액
  const returnLastTotalDeliveryCharge = () => {
    let lastTotalDeliveryCharge = 0;

    shoppingResultArr.map(item => {
      if (item.checkYn == "Y") {
        lastTotalDeliveryCharge = item.deliveryCharge + lastTotalDeliveryCharge;
      }
    });

    return lastTotalDeliveryCharge;
  };

  //최종 '총 결제예상금액' : 상품 가격 + 배송비 더한 금액🔥
  const returnLastTotalPrice = () => {
    let a = returnLastTotalProductPrice();
    let b = returnLastTotalDeliveryCharge();

    let result = a + b;

    return result;
  };

  useEffect(() => {
    if (Basketproducts.length !== shoppingList.length) {
      setWholeSelectionState(false);
    }

    if (Basketproducts.length == shoppingList.length) {
      setWholeSelectionState(true);
    }

    //전체선택(n/n)
    const returnWholeSelection = () => {
      let bp = Basketproducts.length;
      let sl = shoppingList.length;
      let result = (
        <Text>
          ({sl}/{bp})
        </Text>
      );

      return result;
    };
  }, [shoppingList, Basketproducts]);

  //🟢
  useEffect(() => {
    let initShoppingResultArr = [];
    Basketproducts.map(item => {
      let resultObject = new Object();
      resultObject.productId = item.productId;
      resultObject.price = item.productPrice;
      resultObject.deliveryCharge = item.deliveryCharge;
      resultObject.amount = 1;
      resultObject.checkYn = "N";
      initShoppingResultArr.push(resultObject);
    });
    setShoppingResultArr(initShoppingResultArr);
  }, []);

  const getFooter = () => {
    return (
      <View style={{ paddingBottom: 80 }}>
        <View style={{ marginTop: 0 }}>
          <View style={styles.deliveryChargeView}>
            <Text style={styles.deliveryChargeText}>총 결제금액</Text>
            <Text style={styles.productPrice}>
              {returnLastTotalProductPrice()}원
            </Text>
          </View>
          <View style={styles.deliveryChargeView}>
            <Text style={styles.deliveryChargeText}>총 배송비</Text>
            {returnLastTotalDeliveryCharge() == 0 ? (
              <Text style={styles.productPrice}>무료</Text>
            ) : (
              <Text style={styles.productPrice}>
                {returnLastTotalDeliveryCharge()}원
              </Text>
            )}
          </View>
          <View style={styles.ViewLine} />
          <View style={styles.deliveryChargeView}>
            <Text style={[styles.deliveryChargeText, styles.fontSizeUp]}>
              총 결제예상금액
            </Text>
            <Text style={styles.totalProductPriceText}>
              {returnLastTotalPrice()}원
            </Text>
          </View>
        </View>
        <View style={styles.buyButtonView}>
          <View style={styles.buyButtonPriceView}>
            <Text style={styles.deliveryChargeText}>총 결제금액</Text>
            <Text style={styles.buyButtonPriceText}>
              {returnLastTotalPrice()}원
            </Text>
          </View>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={{ color: "white" }}>구매하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const [headerText, setTeaderText] = useState("장바구니");
  return (
    <View style={styles.View}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
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
          <TouchableOpacity
            onPress={() => {
              changeWholeSelection();
            }}
          >
            <Image
              style={styles.checkIcon}
              source={
                wholeSelectionState
                  ? require("../../assets/icon/checked.png")
                  : require("../../assets/icon/unchecked_gray.png")
              }
            />
          </TouchableOpacity>
          <Text>전체선택</Text>
          {returnWholeSelection()}
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
                  <TouchableOpacity
                    onPress={() => {
                      pressCheckbox(item);
                    }}
                  >
                    <Image
                      style={styles.checkIcon}
                      source={
                        returnState(item)
                          ? require("../../assets/icon/checked.png")
                          : require("../../assets/icon/unchecked_gray.png")
                      }
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
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            let tempArray = [...shoppingResultArr];
                            tempArray.map(arrItem => {
                              if (arrItem.productId == item.productId) {
                                if (arrItem.amount > 1) {
                                  arrItem.amount = arrItem.amount - 1;
                                }
                              }
                            });

                            setShoppingResultArr(tempArray);
                          }}
                        >
                          <Image
                            style={styles.amountButton}
                            source={require("../../assets/icon/minus.png")}
                          />
                        </TouchableOpacity>
                        <Text style={styles.amountText}>
                          {/* 🟢 */}
                          {returnAmount(item)}
                        </Text>
                        {/* 🟢 */}
                        <TouchableOpacity
                          onPress={() => {
                            let newShoppingResultArr = [];
                            shoppingResultArr.map(shoppingResult => {
                              if (shoppingResult.productId == item.productId) {
                                shoppingResult.amount =
                                  shoppingResult.amount + 1;
                              }
                              newShoppingResultArr.push(shoppingResult);
                            });
                            setShoppingResultArr(newShoppingResultArr);
                          }}
                        >
                          {/* ------------------------------------------------------------------------------- */}
                          <Image
                            style={styles.amountButton}
                            source={require("../../assets/icon/add.png")}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.productPrice}>
                        {returnProductPrice(item)}원
                      </Text>
                    </View>
                    <View style={styles.ViewLine} />
                    <View style={styles.deliveryChargeView}>
                      <Text style={styles.deliveryChargeText}>배송비</Text>
                      {item.deliveryCharge == 0 ? (
                        <Text style={styles.deliveryChargeText}>무료</Text>
                      ) : (
                        <Text style={styles.deliveryChargeText}>
                          {item.deliveryCharge}원
                        </Text>
                      )}
                    </View>
                    <View style={styles.ViewLine} />
                    <View style={styles.deliveryChargeView}>
                      <Text style={styles.deliveryChargeText}>총 결제금액</Text>
                      <Text style={styles.totalProductPriceText}>
                        {returnTotalProductPrice(item)}원
                      </Text>
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
    width: 10,
    height: 10,
    backgroundColor: "#E8EDEF",
    borderRadius: 20,
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
    alignItems: "flex-end",
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
