import React from "react";

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

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

//redux store 데이터 가져와서 props 로 변환해주는 함수
//   const stateChangeProps = state => {
//      return {
//        heartProductList: state,
//      };
// };

const Collection = props => {
  let reducer1 = useSelector(state => {
    return state.reducer1;
  });

  let reducer2 = useSelector(state => {
    return state.reducer2;
  });

  let consoleTemp = () => {
    return console.log(reducer2);
  };

  return (
    <View style={styles.View}>
      {consoleTemp()}
      <View style={styles.headerView}>
        <Text style={styles.headerText}>모아보기</Text>
        <TouchableOpacity>
          <Image
            style={styles.headerIconShoppingBasket}
            source={require("../../assets/icon/shoppingBasket.png")}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Image source={reducer2[0].img} style={{ width: 100, height: 100 }} />
      </View>
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
});

export default Collection;
