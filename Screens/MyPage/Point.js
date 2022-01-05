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

const PointData = [
  {
    type: "use",
    date: "21.12.17",
    price: 1000,
    title: "야간 깜짝 포인트",
    deadline: "21.12.18",
  },
  {
    type: "save",
    date: "21.11.22",
    price: 100,
    title: "블랙쇼핑지원금_100",
    deadline: "21.12.01",
  },
  {
    type: "exp",
    date: "21.08.08",
    price: 98,
    title: "구매확정 적립",
    deadline: "22.08.08",
  },
  {
    type: "save",
    date: "21.08.06",
    price: 94,
    title: "구매확정 적립",
    deadline: "22.08.06",
  },
  {
    type: "save",
    date: "21.08.03",
    price: 1000,
    title: "쿠폰해지 보상 적립",
    deadline: "21.08.10",
  },
  {
    type: "use",
    date: "21.05.28",
    price: 325,
    title: "구매확정 적립",
    deadline: "22.05.28",
  },
  {
    type: "use",
    date: "21.05.28",
    price: 325,
    title: "구매확정 적립",
    deadline: "22.05.28",
  },
  {
    type: "exp",
    date: "21.08.06",
    price: 94,
    title: "구매확정 적립",
    deadline: "22.08.06",
  },
  {
    type: "exp",
    date: "21.08.03",
    price: 1000,
    title: "쿠폰해지 보상 적립",
    deadline: "21.08.10",
  },
];

const Point = ({ navigation }) => {
  const [retainedPoint, setRetainedPoint] = useState("192");
  const [buttonTitle, setButtonTitle] = useState([
    "전체",
    "적립",
    "사용",
    "소멸",
  ]);
  const [choicedButtonTitle, setChoicedButtonTitle] = useState("전체");
  const [choicedData, setChoicedData] = useState([]);

  useEffect(() => {
    let temp = [...PointData];
    setChoicedData(temp);
  }, []);

  const returnIconImage = item => {
    if (item !== "") {
      switch (item.type) {
        case "save":
          return (
            <Image
              source={require("../../assets/icon/reservedPoint.png")}
              style={styles.pointIcon}
            />
          );
        case "use":
          return (
            <Image
              source={require("../../assets/icon/usedPoint.png")}
              style={styles.pointIcon}
            />
          );
        case "exp":
          return (
            <Image
              source={require("../../assets/icon/lapsedPoint.png")}
              style={styles.pointIcon}
            />
          );
      }
    }
  };

  const returnContent = item => {
    if (item !== "") {
      switch (item.type) {
        case "save":
          return (
            <View>
              <Text style={styles.pointPrice}>+{item.price}원</Text>
              <Text style={styles.pointTitle}>{item.title}</Text>
              <Text style={styles.pointDeadline}>{item.deadline}까지</Text>
            </View>
          );
        case "use":
          return (
            <View>
              <Text style={[styles.pointPrice, styles.usedPointColor]}>
                +{item.price}원
              </Text>
              <Text style={styles.pointTitle}>결제 시 사용</Text>
            </View>
          );
        case "exp":
          return (
            <View>
              <Text style={[styles.pointPrice, styles.lapsedPointColor]}>
                +{item.price}원
              </Text>
              <Text style={styles.pointTitle}>소멸</Text>
            </View>
          );
      }
    }
  };

  const choicedButton = i => {
    let tempArray = [...PointData];

    if (i !== "") {
      switch (i) {
        case "적립":
          tempArray = tempArray.filter(fi => {
            return fi.type == "save";
          });
          break;
        case "사용":
          tempArray = tempArray.filter(fi => {
            return fi.type == "use";
          });
          break;
        case "소멸":
          tempArray = tempArray.filter(fi => {
            return fi.type == "exp";
          });
          break;
      }
    }

    setChoicedButtonTitle(i);
    setChoicedData(tempArray);
  };

  returnButtonState = i => {
    let state = false;
    if (i !== "") {
      if (choicedButtonTitle == i) {
        state = true;
      }

      return state;
    }
  };

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

      <View style={{ flexDirection: "row", marginBottom: 19 }}>
        {buttonTitle.map(i => {
          return (
            <View style={styles.buttonView}>
              <TouchableOpacity
                onPress={() => {
                  choicedButton(i);
                }}
                style={
                  returnButtonState(i)
                    ? [styles.buttonTouch, styles.choicedButton]
                    : styles.buttonTouch
                }
              >
                <Text
                  style={
                    returnButtonState(i)
                      ? [styles.buttonText, styles.choicedButtonText]
                      : styles.buttonText
                  }
                >
                  {i}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.questionTouch}
        onPress={() => {
          navigation.navigate("PointGuide");
        }}
      >
        <Text style={styles.questionText}>
          포인트 적립, 사용방법이 궁금해요 👀
        </Text>
        <Image
          source={require("../../assets/icon/next.png")}
          style={{ width: 15, height: 15 }}
        />
      </TouchableOpacity>

      <FlatList
        data={choicedData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.pointView}>
              <Text style={styles.pointDate}>{item.date}</Text>
              <View style={styles.pointContentView}>
                {returnIconImage(item)}
                <View style={styles.pointTextView}>{returnContent(item)}</View>
              </View>
            </View>
          );
        }}
      />
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
  questionTouch: {
    flexDirection: "row",
    width: "100%",
    height: 38,
    borderColor: "lightgray",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionText: {
    fontSize: 12,
    color: "gray",
  },
  pointView: {
    width: "100%",
    height: 118,
    borderColor: "lightgray",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    padding: 13,
  },
  pointContentView: {
    flexDirection: "row",
    height: 80,
    alignItems: "center",
  },
  pointTextView: {
    height: 50,
  },
  pointIcon: {
    width: 55,
    height: 55,
    marginRight: 16,
  },
  pointDate: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 7,
  },
  pointPrice: {
    color: "#F719A3",
    fontWeight: "500",
    fontSize: 15,
    marginBottom: 2,
  },
  usedPointColor: {
    color: "#5153FF",
  },
  lapsedPointColor: {
    color: "gray",
  },
  pointTitle: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 3,
  },
  pointDeadline: {
    fontWeight: "500",
    color: "gray",
    fontSize: 11,
  },
});
export default Point;
