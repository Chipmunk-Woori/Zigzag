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

const MyPage = ({ navigation }) => {
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

      <TouchableOpacity
        style={styles.myInformationTouch}
        onPress={() => {
          navigation.navigate("UserInformation");
        }}
      >
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
      <View style={styles.TouchIconsView}>
        <TouchableOpacity style={styles.TouchIconsTouch}>
          <Image
            source={require("../../assets/icon/truck.png")}
            style={styles.TouchIconsicon}
          />
          <Text style={styles.TouchIconText}>주문 · 배송</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.TouchIconsTouch}
          onPress={() => {
            navigation.navigate("Review");
          }}
        >
          <Image
            source={require("../../assets/icon/review.png")}
            style={styles.TouchIconsicon}
          />
          <Text style={styles.TouchIconText}>리뷰</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchIconsTouch}>
          <Image
            source={require("../../assets/icon/coupon.png")}
            style={styles.TouchIconsicon}
          />
          <Text style={styles.TouchIconText}>쿠폰</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.TouchIconsTouch}
          onPress={() => {
            navigation.navigate("Point");
          }}
        >
          <Image
            source={require("../../assets/icon/point.png")}
            style={styles.TouchIconsicon}
          />
          <Text style={styles.TouchIconText}>포인트</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bannerView}></View>
      <View style={styles.bannerTextView}>
        <Text style={styles.bannerText}>
          마이픽쿠폰은 앱 6.84.0이상 버전에서 볼 수 있어요
        </Text>
      </View>
      <View style={styles.ViewLine} />

      <View>
        <View style={styles.categoryView}>
          <Text style={styles.categoryViewText}>쇼핑</Text>
        </View>
        <View style={styles.categoryOptionView}>
          <Text style={styles.categoryOptionText}>문의 내역</Text>
        </View>
        <View style={styles.categoryOptionView}>
          <Text style={styles.categoryOptionText}>최근 본 상품</Text>
        </View>
      </View>
      <View style={styles.ViewLine_2} />
      <View>
        <View style={styles.categoryView}>
          <Text style={styles.categoryViewText}>서비스 설정</Text>
        </View>
        <View style={styles.categoryOptionView}>
          <Text style={styles.categoryOptionText}>실험실</Text>
        </View>
        <View style={styles.categoryOptionView}>
          <Text style={styles.categoryOptionText}>설정</Text>
        </View>
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
    shadowColor: "gray", //그림자 색
    shadowOpacity: 0.2, //그림자 투명도
    shadowRadius: 4, //그림자 퍼지는 길이
    shadowOffset: {
      //그림자 위치
      height: 0,
      width: 0,
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
  TouchIconsView: {
    height: 98,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  TouchIconsTouch: {
    alignItems: "center",
    width: 75,
  },
  TouchIconsicon: {
    width: 25,
    height: 25,
  },
  TouchIconText: {
    fontSize: 13,
    marginTop: 4,
  },
  bannerView: {
    height: 50,
    borderColor: "lightgray",
    borderWidth: 1,
    borderStyle: "solid",
  },
  bannerTextView: {
    alignItems: "center",
    height: 30,
    justifyContent: "center",
  },
  bannerText: {
    fontSize: 10,
    color: "gray",
  },
  ViewLine: {
    borderColor: "lightgray",
    borderBottomWidth: 0.5,
    borderStyle: "solid",
  },
  categoryView: {
    height: 50,
    justifyContent: "center",
  },
  categoryViewText: {
    fontSize: 12,
    color: "gray",
  },
  categoryOptionView: {
    height: 50,
    justifyContent: "center",
  },
  categoryOptionText: {
    fontSize: 16,
  },
  ViewLine_2: {
    borderColor: "lightgray",
    borderBottomWidth: 0.2,
    borderStyle: "solid",
    marginTop: 21,
    marginBottom: 6,
  },
});

export default MyPage;
