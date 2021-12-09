import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const Search = ({ navigation, props }) => {
  let [inputText, setInputText] = useState("아이템과 스토어를 검색해보세요");
  const [matchArray, setMatchArray] = useState([]);
  const [reload, setReload] = useState(false);
  const [editMode, setEditMode] = useState(false);

  let productList = useSelector(state => {
    return state.reducer1;
  });

  const [flatListArray, setFlatListArray] = useState([
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
  ]);

  useEffect(() => {
    matchFunction();
  }, [inputText]);

  // 🎀입력값과 일치하는 브랜드명, 상품명을 matchArray에 넣기
  const matchFunction = () => {
    let temp = [];

    if (inputText !== "" && inputText !== "아이템과 스토어를 검색해보세요") {
      setEditMode(true);
      productList.map(i => {
        if (i.brandName == inputText) {
          temp.push(i.brandName);
        } else if (i.productName == inputText) {
          temp.push(i.productName);
        }
      });

      setMatchArray(temp);
      setReload(!reload);
    }

    if (inputText == "") {
      setEditMode(false);
    }

    console.log(inputText);
  };

  return (
    <View style={styles.View}>
      <View style={styles.topView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={styles.backButton}
            source={require("../../assets/icon/backArrow.png")}
          />
        </TouchableOpacity>
        <View style={styles.searchView}>
          <TextInput
            style={styles.searchTextInput}
            onChangeText={text => setInputText(text)}
            value={inputText}
            clearButtonMode={"while-editing"} //입력창 전부 지우는 버튼
            clearTextOnFocus={true} //입력창에 focus하면 빈 칸 만들어줌
            // onKeyPress={() => {
            //   matchFunction();
            // }}
          />
          <Image
            style={styles.searchImg}
            source={require("../../assets/icon/search_gray.png")}
          />
        </View>
      </View>

      {/* ------------------------------------------------------------     */}

      <View style={editMode ? styles.eidtModeView : styles.NoEditModeView}>
        <FlatList
          data={flatListArray}
          keyExtractor={(item, index) => {
            index.toString();
          }}
          renderItem={({ item, index }) => {
            return (
              <View key={index.toString()}>
                <View style={styles.flatLsitView}>
                  <Image style={styles.listImg} source={item.img} />
                  <Text>{item.brandName}</Text>
                </View>
                <View style={styles.lineView} />
              </View>
            );
          }}
        />
      </View>

      {/* ------------------------------------------------------------     */}

      <View style={!editMode ? styles.eidtModeView : styles.NoEditModeView}>
        <View style={styles.secondView}>
          <Text style={{ color: "gray" }}>내가 찾아봤던</Text>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Text>지우기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionView}>
          <TouchableOpacity
            style={[styles.menuTouchableOpacity, styles.menuTextOpacityStyle]}
          >
            <Text style={styles.menuText}>횰릭</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.secondView}>
          <Text style={{ color: "gray" }}>지금 가장 인기있는</Text>
        </View>
        <View style={styles.optionView}>
          <TouchableOpacity
            style={[styles.menuTouchableOpacity, styles.menuTextOpacityStyle]}
          >
            <Text style={styles.menuText}>숏패딩</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.secondView}>
          <Text style={{ color: "gray" }}>최근 본 상품</Text>
        </View>
        <View style={styles.optionView}>
          <TouchableOpacity
            style={[styles.menuTouchableOpacity, styles.menuTextOpacityStyle]}
          >
            <Text style={styles.menuText}>니트</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  backButton: {
    width: 15,
    height: 20,
  },
  topView: {
    height: "8%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: screenHeight * 0.04,
  },
  searchView: {
    height: "60%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    flexDirection: "row",
    position: "relative",
    //backgroundColor: "lavender",
  },
  searchTextInput: {
    height: "80%",
    width: "100%",
    paddingLeft: 30,
    backgroundColor: `#EAF0FA`,
    fontSize: 12,
    borderRadius: 20,
    color: "gray",

    // height: 40
    // borderColor: "gray",
    // borderWidth: 1,
  },
  searchImg: {
    width: 14,
    height: 14,
    position: "absolute",
    left: 10,
    //#ACACAC
  },
  menuTouchableOpacity: {
    backgroundColor: "#EEF0F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: screenWidth * 0.01,
  },

  menuTextOpacityStyle: {
    width: screenWidth * 0.15,
    height: screenHeight * 0.033,
    borderRadius: 13,
    // backgroundColor: "red",
  },
  secondView: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    // backgroundColor: "lavender",
  },
  menuText: {
    fontSize: 12,
    // fontWeight: "bold",
  },
  optionView: {
    height: 50,
  },
  listImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: screenWidth * 0.04,
  },
  flatLsitView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 4,
  },
  lineView: {
    borderBottomColor: `#EAF0FA`,
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  eidtModeView: {
    flex: 1,
  },
  NoEditModeView: {
    flex: 1,
    display: "none",
  },
});
export default Search;
