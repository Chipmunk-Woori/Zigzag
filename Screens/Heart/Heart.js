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
} from "react-native";

import { useSelector } from "react-redux";

import addFolder from "./addFolder";

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

const Heart = ({ navigation }) => {
  const [HeartProductList, setHeartProductList] = useState([]);

  let [TabTitle, setTabTitle] = useState([]); //탭 title 배열
  let [choicedTabTitle, setChoicedTabTitle] = useState(); //누른 탭 title

  let [editMode, setEditMode] = useState(false); //편집 모드
  let [choicedCheckList, setChoicedCheckList] = useState([]); //체크된 id 배열
  let [reload, setReload] = useState(false);

  let folderList = useSelector(state => state.reducer3);

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

  //탭 타이틀을 누르면 그 탭에 맞는 내용 보여줘야함.
  //탭 타이틀 누르면 타이틀 == folderList의 title 인 객체(map.item)를 찾아서(map)
  //그 객체를 HeartProductList에 넣어주면 됨.
  const returnTabContent = item => {
    let tempItemList = [];
    if (folderList) {
      folderList.map(folderItem => {
        if (folderItem.title == item) {
          tempItemList = folderItem.item;
        }
      });
    }

    setHeartProductList(tempItemList);
  };

  const returnState = item => {
    let state = false;

    if (item == choicedTabTitle) {
      state = true;
    }
    return state;
  };

  useEffect(() => {
    let tempTabTitle = [];
    folderList.map(fi => {
      tempTabTitle.push(fi.title);
    });
    setTabTitle(tempTabTitle);

    let tempFolder = folderList[0].item;
    setHeartProductList(tempFolder);

    let tempChoicedTabTitle = folderList[0].title;
    setChoicedTabTitle(tempChoicedTabTitle);
  }, [folderList]);

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
        <View style={styles.tabBackgroundView}>
          <FlatList
            data={TabTitle}
            keyExtractor={
              TabTitle.length !== 0 ? index => index.toString() : "empty"
            }
            horizontal={true}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={
                    returnState(item)
                      ? [styles.tabTitleView, styles.choicedTabTitle]
                      : styles.tabTitleView
                  }
                  onPress={() => {
                    returnTabContent(item);
                    setChoicedTabTitle(item);
                  }}
                >
                  <Text
                    style={
                      returnState(item)
                        ? [styles.tabTitleText, { color: "white" }]
                        : styles.tabTitleText
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("addFolder");
          }}
        >
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
          return HeartProductList.length !== 0 ? (
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
          ) : (
            <View></View>
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
    flex: 1,
  },
  headerView: {
    marginTop: screenHeight * 0.07,
    marginBottom: screenHeight * 0.03,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 19.5,
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
    alignItems: "center",
    marginBottom: screenHeight * 0.022,
  },
  tabBackgroundView: {
    width: "92%",
    flexDirection: "row",
  },
  tabTitleView: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
    marginRight: 5,
    alignItems: "center",
  },
  choicedTabTitle: {
    borderColor: "black",
    backgroundColor: "black",
  },
  headerSecondIcon: {
    width: screenWidth * 0.048,
    height: screenHeight * 0.022,
  },

  tabTitleText: {
    fontSize: 12,
    fontWeight: "bold",
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
    marginHorizontal: screenWidth * 0.007,
    marginBottom: screenHeight * 0.02,
    width: screenWidth * 0.29,
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
    width: screenWidth * 0.29,
    height: 13,
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
