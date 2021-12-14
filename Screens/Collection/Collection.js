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
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import Cardigan from "../Collection/Outer/Cardigan";
import Jacket from "../Collection/Outer/Jacket";
import Totality from "../Collection/Outer/Totality";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const Collection = () => {
  const [categoryArray, setCategoryArray] = useState([
    {
      categorySeq: 1,
      categoryName: "무료배송",
      img: require("../../assets/icon/freeShipping.png"),
      option: {
        1: "아이템",
        2: "쇼핑몰",
      },
    },
    {
      categorySeq: 2,
      categoryName: "아우터",
      img: require("../../assets/icon/outer.png"),
      option: {
        1: "전체",
        2: "가디건",
        3: "자켓",
        4: "코트",
      },
    },
    {
      categorySeq: 3,
      categoryName: "상의",
      img: require("../../assets/icon/top.png"),
      option: {
        1: "티셔츠",
        2: "니트/스웨터",
        3: "셔츠/남방",
        4: "멘투맨",
      },
    },
    {
      categorySeq: 4,
      categoryName: "원피스/세트",
      img: require("../../assets/icon/dress.png"),
    },
    {
      categorySeq: 5,
      categoryName: "바지",
      img: require("../../assets/icon/pants.png"),
    },
    {
      categorySeq: 6,
      categoryName: "스커트",
      img: require("../../assets/icon/skirts.png"),
    },
    {
      categorySeq: 7,
      categoryName: "슈즈",
      img: require("../../assets/icon/shoes.png"),
    },
    {
      categorySeq: 8,
      categoryName: "가방",
      img: require("../../assets/icon/bag.png"),
    },
    {
      categorySeq: 9,
      categoryName: "악세사리",
      img: require("../../assets/icon/accessory.png"),
    },
    {
      categorySeq: 10,
      categoryName: "더보기",
      img: require("../../assets/icon/plus.png"),
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [pressedCategory, setPressedCategory] = useState(); //선택된 카테고리
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const renderScene = SceneMap({
    1: () => <Totality />,
    2: () => <Cardigan />,
    3: () => <Jacket />,
  });

  const [routes] = useState([
    { key: 1, title: "전체" },
    { key: 2, title: "가디건" },
    { key: 3, title: "자켓" },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#F13794" }} //선택된 바 색상
      style={{ backgroundColor: "white" }} //탭 배경 색상
      renderLabel={(
        { route, color } //탭 글자 색상
      ) => <Text style={{ color: "black" }}>{route.title}</Text>}
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
                  {pressedCategory.categoryName}
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
        {categoryArray.map(i => {
          return (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setPressedCategory(i);
              }}
              style={styles.categoryTouchable}
            >
              <Image style={styles.categoryIcon} source={i.img} />
              <Text style={styles.categoryText}>{i.categoryName}</Text>
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
    //backgroundColor: "orange",
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
