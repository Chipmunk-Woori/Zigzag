import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const MyPage = () => {
  const [headerName, setHeaderName] = useState("마이페이지");
  const [userName, setUserName] = useState("배우리");
  const [userEmail, setUserEmail] = useState("haha51015@naver.com");

  return (
    <View style={styles.View}>
      <View style={styles.headerView}>
        <View>
          <Text style={styles.headerText}>{headerName}</Text>
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
              source={require("../../assets/icon/bell.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.headerIconShoppingBasket}
              source={require("../../assets/icon/shoppingBasket.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.myInformationTouch}>
        <View>
          <Text style={styles.userNameText}>{userName}님 안녕하세요!</Text>
          <Text style={styles.userEmailText}>{userEmail}</Text>
        </View>
        <Image
          source={require("../../assets/icon/next.png")}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
      <View style={styles.gradeView}>
        <TouchableOpacity style={styles.gradeTouch}>
          <Image
            source={require("../../assets/icon/pinkGrade.png")}
            style={styles.gradeIconImg}
          />
          <Text style={styles.gradeIconText}>P</Text>
          <Text style={styles.gradeText}>PINK</Text>

          <Text style={styles.userEmailText}>혜택보기</Text>
        </TouchableOpacity>
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
  myInformationTouch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 25,
  },
  userNameText: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 7,
  },
  userEmailText: {
    color: "gray",
    fontSize: 12,
  },
  gradeView: {
    backgroundColor: "white", //배경색이 없으면 그림자 안 보일 수 있음
    shadowColor: "lightgray", //그림자 색
    shadowOpacity: 0.3, //그림자 투명도
    shadowRadius: 4, //그림자 퍼지는 길이
    shadowOffset: {
      //그림자 위치
      height: 2,
      width: 2,
    },

    borderRadius: 4,
    height: 73,
  },
  gradeTouch: {
    flexDirection: "row",
    alignItems: "center",
    height: 73,
  },
  gradeIconImg: {
    width: 39,
    height: 39,
    position: "relative",
    marginLeft: 18,
    marginRight: 12,
  },
  gradeIconText: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    color: "white",
    left: 32,
    top: 23,
  },
  gradeText: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 180,
  },
});

export default MyPage;
