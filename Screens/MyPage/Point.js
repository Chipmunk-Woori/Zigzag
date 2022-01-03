import React, { useState, useEffect } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const Point = ({ navigation }) => {
  const [retainedPoint, setRetainedPoint] = useState("192");
  const [button, setButton] = useState(["전체", "적립", "사용", "소멸"]);
  return (
    <View style={styles.ViewStyle}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../../assets/icon/backArrow.png")}
            style={styles.headerBackIcon}
          />
        </TouchableOpacity>
        <Image
          source={require("../../assets/icon/shoppingBasket_black.png")}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>포인트</Text>
      </View>
      <View style={styles.retainedPointView}>
        <Text style={styles.retainedPointTitle}>보유</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.retainedPoint}>{retainedPoint}</Text>
          <Text style={styles.won}>원</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        {button.map(i => {
          return (
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonTouch}>
                <Text style={styles.buttonText}>{i}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View>
        <FlatList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    paddingHorizontal: 14,
    backgroundColor: "white",
    flex: 1,
  },
  headerView: {
    marginTop: 30,
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  headerBackIcon: {
    width: 15,
    height: 15,
    marginRight: 15,
  },
  headerIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  retainedPointView: {
    width: "100%",
    height: 90,
    justifyContent: "center",
  },
  retainedPointTitle: {
    fontSize: 12,
    marginBottom: 10,
  },
  retainedPoint: {
    fontSize: 23,
    fontWeight: "bold",
    marginRight: 3,
  },
  won: {
    fontSize: 17,
    fontWeight: "bold",
  },
  buttonView: {
    marginRight: 10,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonTouch: {
    borderRadius: 20,
    borderColor: "lightgray",
    borderWidth: 0.9,
    borderStyle: "solid",
    backgroundColor: "white",
    height: 30,
    paddingHorizontal: 11,
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
  },
  choicedButtonText: {
    color: "white",
  },
  choicedButton: {
    backgroundColor: "black",
    borderColor: "black",
  },
});
export default Point;
