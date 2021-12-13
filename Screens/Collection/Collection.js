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
} from "react-native";
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const Collection = () => {
  const [categoryArray, setCategoryArray] = useState([
    {
      categorySeq: 1,
      categoryName: "무료배송",
      img: require("../../assets/icon/freeShipping.png"),
    },
    {
      categorySeq: 2,
      categoryName: "아우터",
      img: require("../../assets/icon/outer.png"),
    },
    {
      categorySeq: 3,
      categoryName: "상의",
      img: require("../../assets/icon/top.png"),
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
    // {
    //   categorySeq: 6,
    //   categoryName: "스커트",
    //   img: require("../../assets/icon/skirts.png"),
    // },
    // {
    //   categorySeq: 7,
    //   categoryName: "슈즈",
    //   img: require("../../assets/icon/shoes.png"),
    // },
    // {
    //   categorySeq: 8,
    //   categoryName: "가방",
    //   img: require("../../assets/icon/bag.png"),
    // },
    // {
    //   categorySeq: 9,
    //   categoryName: "악세사리",
    //   img: require("../../assets/icon/accessory.png"),
    // },
    // {
    //   categorySeq: 10,
    //   categoryName: "더보기",
    //   img: require("../../assets/icon/plus.png"),
    // },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
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
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Modal숨기기</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const outerModal = () => {
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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Modal숨기기</Text>
            </Pressable>
          </View>
        </Modal>
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableOpacity>
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
              onPress={() => {}}
              style={styles.categoryTouchable}
            >
              <Image style={styles.categoryIcon} source={i.img} />
              <Text style={styles.categoryText}>{i.categoryName}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {outerModal()}
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
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: "lavender",
    flexWrap: "wrap",
  },
  categoryTouchable: {
    alignItems: "center",
    backgroundColor: "skyblue",
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  categoryText: {
    fontSize: 11,
    marginTop: 8,
  },

  centeredView: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
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
});

export default Collection;
