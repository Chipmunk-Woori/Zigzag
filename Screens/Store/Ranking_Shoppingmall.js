import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
} from "react-native";

import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; // 전체화면 세로길이

const shoppingmallList = [
  {
    id: "shoppingmall_1",
    shoppingmallName: "핫핑",
    zOnly: true,
    img: require("../../assets/shoppingmall/product_9.png"),
    filter: "20대·30대·심플베이직·러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "111.2만",
  },
  {
    id: "shoppingmall_2",
    shoppingmallName: "육육걸즈",
    zOnly: true,
    img: require("../../assets/shoppingmall/product_8.png"),
    filter: "20대·30대·심플베이직·러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "215.7만",
  },
  {
    id: "shoppingmall_3",
    shoppingmallName: "프롬비기닝",
    zOnly: true,
    img: require("../../assets/shoppingmall/poster_1.png"),
    filter: "20대·30대·심플베이직·러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "96.3만",
  },
  {
    id: "shoppingmall_4",
    shoppingmallName: "퓨어다",
    zOnly: true,
    img: require("../../assets/shoppingmall/product_3.png"),
    filter: "20대·30대·심플베이직·러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "47만",
  },
  {
    id: "shoppingmall_5",
    shoppingmallName: "베니토",
    zOnly: true,
    img: require("../../assets/shoppingmall/poster_2.png"),
    filter: "20대·30대·오피스룩·러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "42.3만",
  },
  {
    id: "shoppingmall_6",
    shoppingmallName: "블랙업",
    zOnly: false,
    img: require("../../assets/shoppingmall/poster_3.png"),
    filter: "20대·30대·심플베이직·러블리",
    coupon: "최대 20,000원 쿠폰",
    freeShipping: true,
    bookmarkNumber: "99.5만",
  },
];

const Ranking_Shoppingmall = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reload, setReload] = useState(false);

  const [optionArray, setOptionArray] = useState([
    {
      id: "optionTitle_1",
      title: "카테고리",
      option: [
        "의류",
        "가방",
        "슈즈",
        "이너웨어",
        "액세사리",
        "패션소품",
        "빅사이즈",
        "애슬레저",
        "비치웨어",
        "커플룩",
      ],
    },
    {
      id: "optionTitle_2",
      title: "스타일",
      option: [
        "심플베이직",
        "캐주얼",
        "모던시크",
        "러블리",
        "로맨틱",
        "유니크",
        "캠퍼스룩",
        "아메카지",
      ],
    },
    {
      id: "optionTitle_3",
      title: "연령대",
      option: [
        "10대",
        "20대 초반",
        "20대 중반",
        "20대 후반",
        "30대 초반",
        "30대 중반",
        "30대 후반",
      ],
    },
  ]);

  let [choicedOption, setChoicedOption] = useState([]); // 🍀선택된 옵션들

  // 🍀누른 옵션
  const PressedOption = optionItem => {
    let temp = [...choicedOption];
    let check = false;

    if (choicedOption.length !== 0) {
      choicedOption.map(item => {
        if (item == optionItem) {
          temp = temp.filter(tempItem => {
            tempItem !== optionItem;
          });
          check = true;
        }
      });
    }

    if (check == false) {
      temp.push(optionItem);
    }

    setChoicedOption(temp);
    setReload(!reload);
  };

  // 🍀옵션 현재 상태 체크
  const OptionResult = optionItem => {
    let check = false;

    if (choicedOption.length !== 0) {
      choicedOption.map(mapItem => {
        if (optionItem == mapItem) {
          check = true;
        }
      });
    }

    return check;
  };

  // ⭐️배열일 필요가 없음 : 선택한 아이템만 들어갈거니까
  // ⭐️체크박스처럼 여러 개를 넣을 경우 배열
  let [choicedItem, setChoicedItem] = useState();

  // ⭐️누른 카테고리 객체를 choicedItem에 넣어줌
  const choiced = item => {
    setChoicedItem(item);
  };

  // ⭐️choicedItem에 있는 애를 보여줌
  const optionView = () => {
    if (choicedItem) {
      // ⭐️choicedItem 가 null, undefined 가 아니라면(=유효하다면) true 반환
      return (
        <View style={styles.optionView}>
          {choicedItem.option.map(optionItem => {
            return (
              <TouchableOpacity
                onPress={() => {
                  PressedOption(optionItem);
                }}
                style={
                  OptionResult(optionItem)
                    ? [styles.button, styles.button_choiced]
                    : styles.button
                }
              >
                <Text
                  style={
                    OptionResult(optionItem)
                      ? styles.filterOption_choiced
                      : styles.filterOption_none
                  }
                >
                  {optionItem}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else {
      // ⭐️맨 처음 아무것도 선택하지 않았을 때
      if (optionArray.length > 0) {
        // ⭐️에러 방지
        return (
          <View style={styles.optionView}>
            {optionArray[0].option.map(optionItem => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    PressedOption(optionItem);
                  }}
                  style={styles.button}
                >
                  <Text
                    style={
                      OptionResult(optionItem)
                        ? styles.filterOption_choiced
                        : styles.filterOption_none
                    }
                  >
                    {optionItem}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }
    }
  };

  const pressOrNot = item => {
    if (choicedItem) {
      if (choicedItem == item) {
        return true;
      }
    } else {
      if (item.id == "optionTitle_1") {
        return true;
      }
      return false;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.menuView}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.menuTouchableOpacity, styles.menuIconTouchableOpacity]}
        >
          <Image
            source={require("../../assets/icon/filter.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.menuTouchableOpacity, styles.menuTextOpacityCloth]}
        >
          <Text style={styles.menuText}>의류</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.menuTouchableOpacity, styles.menuTextOpacityStyle]}
        >
          <Text style={styles.menuText}>스타일 7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.menuTouchableOpacity, styles.menuTextOpacityStyle]}
        >
          <Text style={styles.menuText}>연령대 3</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={shoppingmallList}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          return (
            <View>
              <View style={styles.listView}>
                <Text style={styles.listNumber}>{index + 1}</Text>
                <Image source={item.img} style={styles.listImg} />
                <View
                  style={{
                    width: screenWidth * 0.5,
                  }}
                >
                  <View style={styles.shoppingmallNameView}>
                    <Text style={styles.shoppingmallName}>
                      {item.shoppingmallName}
                    </Text>
                    {item.zOnly && <Text style={styles.zOnly}>z-only</Text>}
                  </View>
                  <Text style={styles.filter}>{item.filter}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text style={styles.coupon}>{item.coupon}</Text>

                    {item.freeShipping && (
                      <Text style={styles.freeShipping}>· 무료배송</Text>
                    )}
                  </View>
                </View>

                <View style={styles.starView}>
                  <TouchableOpacity>
                    <Image
                      style={styles.starIcon}
                      source={require("../../assets/icon/star_empty.png")}
                    />
                  </TouchableOpacity>
                  <Text style={styles.bookmarkNumber}>
                    {item.bookmarkNumber}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderStyle: "solid",
                  borderWidth: 0.3,
                  borderColor: "#EEF0F6",
                  width: "100%",
                }}
              ></View>
            </View>
          );
        }}
      />

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: "row" }}>
                {optionArray.map((item, index) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          choiced(item);
                        }}
                        style={styles.filterMenu}
                      >
                        <Text
                          style={
                            pressOrNot(item)
                              ? styles.filterMenuText
                              : styles.filterMenuText_none
                          }
                        >
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
              <View>{optionView()}</View>

              <View
                style={{
                  borderStyle: "solid",
                  borderWidth: 0.3,
                  borderColor: "#EEF0F6",
                  width: "100%",
                  marginBottom: 13,
                }}
              ></View>
              <View style={styles.bottomButtonView}>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Image
                    style={{ width: 12, height: 12, marginRight: 10 }}
                    source={require("../../assets/icon/refresh.png")}
                  />
                  <Text style={{ fontSize: 14 }}>카테고리 초기화</Text>
                </TouchableOpacity>

                <Pressable
                  style={styles.buttonClose}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.buttonCloseText}>선택 완료</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {},
  menuView: {
    flexDirection: "row",
    marginBottom: screenHeight * 0.02,
  },
  menuTouchableOpacity: {
    backgroundColor: "#EEF0F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: screenWidth * 0.01,
  },
  menuIconTouchableOpacity: {
    width: screenWidth * 0.072,
    height: screenHeight * 0.033,
    borderRadius: 100,
  },
  menuIcon: {
    width: screenWidth * 0.029,
    height: screenHeight * 0.015,
  },
  menuTextOpacityCloth: {
    width: screenWidth * 0.11,
    height: screenHeight * 0.033,
    borderRadius: 13,
  },
  menuText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  menuTextOpacityStyle: {
    width: screenWidth * 0.15,
    height: screenHeight * 0.033,
    borderRadius: 13,
  },
  listView: {
    flexDirection: "row",
    width: screenWidth,
    height: screenHeight * 0.09,
    alignItems: "center",
  },
  listNumber: {
    fontSize: 18,
    color: "#C2CAD3",
    marginRight: screenWidth * 0.04,
  },
  listImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: screenWidth * 0.04,
  },
  shoppingmallNameView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: screenHeight * 0.005,
  },
  shoppingmallName: {
    fontSize: 15,
    marginRight: screenWidth * 0.01,
  },
  zOnly: {
    fontSize: 10,
    color: "#F13794",
    fontWeight: "bold",
  },
  filter: {
    fontSize: 12,
    color: "#A1A8B0",
    marginBottom: screenHeight * 0.002,
  },
  coupon: {
    fontSize: 11,
    color: "#6495ed",
    fontWeight: "bold",
    marginRight: screenWidth * 0.01,
  },
  freeShipping: {
    fontSize: 10,
    color: "#B69EDA",
    fontWeight: "bold",
  },
  starView: {
    alignItems: "center",
    width: screenWidth * 0.13,
    marginLeft: screenWidth * 0.09,
  },
  starIcon: {
    width: screenWidth * 0.03,
    height: screenHeight * 0.015,
    marginBottom: screenHeight * 0.003,
  },
  bookmarkNumber: {
    fontSize: 8,
    color: "#A1A8B0",
  },
  centeredView: {
    //backgroundColor: "yellow",
    flex: 1,
  },
  modalBackground: {
    // backgroundColor: "black",
    // opacity: 1,
    flex: 1,
  },
  modalView: {
    width: "100%",
    height: 385,
    marginTop: 460,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    borderStyle: "solid",
    borderWidth: 0.2,
    borderColor: "gray",
    opacity: 1,
  },
  buttonClose: {
    backgroundColor: "black",
    width: 150,
    height: 40,
    marginLeft: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  buttonCloseText: {
    color: "white",
    fontWeight: "bold",
  },
  filterOptionText: {
    fontSize: 13,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 30,
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "lightgray",
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    // elevation: 2,
    // backgroundColor: "lavender",
  },
  button_choiced: {
    borderColor: "#F719A3",
  },
  filterOption_none: {
    color: "black",
  },
  filterOption_choiced: {
    color: "#F719A3",
  },
  optionView: {
    flexDirection: "row",
    width: "100%",
    height: 190,
    flexWrap: "wrap",
    // backgroundColor: "lavender",
  },
  filterMenu: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  filterMenuText: {
    //클릭된 title
    fontSize: 16,
    fontWeight: "bold",
  },
  filterMenuText_none: {
    //클릭안된 title
    fontSize: 16,
    fontWeight: "bold",
    color: "lightgray",
  },
  bottomButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Ranking_Shoppingmall;
