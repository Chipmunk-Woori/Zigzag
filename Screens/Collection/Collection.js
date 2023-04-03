import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import OptionScreen from "./OptionScreen";
import shoppingBasket from "../Home/ShoppingBasket";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const Collection = props => {
  let ProductListState = useSelector(state => state.reducer1);
  const [secondCategoryArray, setSecondCategoryArray] = useState([
    {
      secondTypeSeq: 1,
      secondTypeName: "가디건",
      firstTypeSeq: 2,
    },
    {
      secondTypeSeq: 2,
      secondTypeName: "자켓",
      firstTypeSeq: 2,
    },
    {
      secondTypeSeq: 3,
      secondTypeName: "코트",
      firstTypeSeq: 2,
    },
    {
      secondTypeSeq: 4,
      secondTypeName: "점퍼",
      firstTypeSeq: 2,
    },
    {
      secondTypeSeq: 5,
      secondTypeName: "티셔츠",
      firstTypeSeq: 3,
    },
    {
      secondTypeSeq: 6,
      secondTypeName: "니트/스웨터",
      firstTypeSeq: 3,
    },
    {
      secondTypeSeq: 7,
      secondTypeName: "셔츠/남방",
      firstTypeSeq: 3,
    },
    {
      secondTypeSeq: 8,
      secondTypeName: "미니원피스",
      firstTypeSeq: 4,
    },
    {
      secondTypeSeq: 9,
      secondTypeName: "미디원피스",
      firstTypeSeq: 4,
    },
  ]);
  const [categoryArray, setCategoryArray] = useState([
    {
      firstTypeSeq: 1,
      firstTypeName: "무료배송",
      img: require("../../assets/icon/freeShipping.png"),
    },
    {
      firstTypeSeq: 2,
      firstTypeName: "아우터",
      img: require("../../assets/icon/outer.png"),
    },
    {
      firstTypeSeq: 3,
      firstTypeName: "상의",
      img: require("../../assets/icon/top.png"),
    },
    {
      firstTypeSeq: 4,
      firstTypeName: "원피스/세트",
      img: require("../../assets/icon/dress.png"),
    },
    {
      firstTypeSeq: 5,
      firstTypeName: "바지",
      img: require("../../assets/icon/pants.png"),
    },
    {
      firstTypeSeq: 6,
      firstTypeName: "스커트",
      img: require("../../assets/icon/skirts.png"),
    },
    {
      firstTypeSeq: 7,
      firstTypeName: "슈즈",
      img: require("../../assets/icon/shoes.png"),
    },
    {
      firstTypeSeq: 8,
      firstTypeName: "가방",
      img: require("../../assets/icon/bag.png"),
    },
    {
      firstTypeSeq: 9,
      firstTypeName: "악세사리",
      img: require("../../assets/icon/accessory.png"),
    },
    {
      firstTypeSeq: 10,
      firstTypeName: "더보기",
      img: require("../../assets/icon/plus.png"),
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [pressedCategory, setPressedCategory] = useState(null); //선택된 카테고리
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes, setRoutes] = useState([
    { key: 1, firstTypeSeq: 2, secondTypeName: "전체" },
    { key: 2, firstTypeSeq: 2, secondTypeName: "가디건" },
  ]);

  useEffect(() => {
    if (pressedCategory !== null) {
      let tmpArray = [
        {
          key: 0,
          secondTypeName: "전체",
          firstTypeSeq: pressedCategory.firstTypeSeq,
        },
      ];

      secondCategoryArray.map(item => {
        if (item.firstTypeSeq == pressedCategory.firstTypeSeq) {
          let tmpSecondObject = {
            key: item.secondTypeSeq,
            secondTypeName: item.secondTypeName,
            firstTypeSeq: item.firstTypeSeq,
          };
          tmpArray.push(tmpSecondObject);
        }
      });
      setRoutes(tmpArray);
    }
  }, [pressedCategory]);

  const renderScene = ({ routes }) => {
    return <OptionScreen props={routes} />;
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#F13794" }} //선택된 바 색상
      style={{ backgroundColor: "white" }} //탭 배경 색상
      renderLabel={(
        { route, color } //탭 글자 색상
      ) => <Text style={{ color: "black" }}>{route.secondTypeName}</Text>}
    />
  );

  const modalScreen = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalHeaderView}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Image
                  style={styles.modalHeaderIcon}
                  source={require("../../assets/icon/backArrow.png")}
                />
              </TouchableOpacity>
              {pressedCategory && (
                <Text style={styles.modalHeaderText}>
                  {pressedCategory.firstTypeName}
                </Text>
              )}
            </View>

            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={renderTabBar}
            />
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.View}>
      <View style={styles.headerView}>
        <View>
          <Text style={styles.headerText}>모아보기</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Image
              style={styles.headerIconShoppingBasket}
              source={require("../../assets/icon/shoppingBasket.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoryView}>
        {categoryArray.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setPressedCategory(item);
              }}
              style={styles.categoryTouchable}
            >
              <Image style={styles.categoryIcon} source={item.img} />
              <Text style={styles.categoryText}>{item.firstTypeName}</Text>
            </TouchableOpacity>
          );
        })}
        {modalScreen()}
      </View>
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
    marginBottom: screenHeight * 0.018,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 21,
    fontWeight: "bold",
  },
  headerIconShoppingBasket: {
    width: screenWidth * 0.062,
    height: screenHeight * 0.028,
    marginLeft: screenWidth * 0.06,
  },
  categoryView: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: 10,
    flexWrap: "wrap",
  },
  categoryTouchable: {
    alignItems: "center",
    width: "20%",
    marginBottom: 15,
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  categoryText: {
    fontSize: 11,
    marginTop: 8,
  },

  centeredView: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "white",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalHeaderView: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  modalHeaderIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 20,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Collection;
