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

const UserInformation = ({ navigation }) => {
  const [userName, setUserName] = useState("배우리");
  const [userEmail, setUserEmail] = useState("haha51015@naver.com");
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../../assets/icon/backArrow.png")}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>내 정보</Text>
      </View>
      <View style={styles.userInformationView}>
        <Text style={styles.headerText}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>
      <View style={styles.lineViewHard} />
      <TouchableOpacity
        style={styles.categoryView}
        onPress={() => {
          navigation.navigate("MemberInformationCorrection");
        }}
      >
        <Text style={styles.categoryText}>회원 정보 수정</Text>
        <Image
          source={require("../../assets/icon/next.png")}
          style={styles.categoryIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.categoryView}>
        <Text style={styles.categoryText}>체형 정보</Text>
        <Image
          source={require("../../assets/icon/next.png")}
          style={styles.categoryIcon}
        />
      </TouchableOpacity>

      <View style={styles.lineViewHard} />

      <TouchableOpacity style={styles.categoryView}>
        <Text style={styles.categoryText}>간편 결제 관리</Text>
        <Image
          source={require("../../assets/icon/next.png")}
          style={styles.categoryIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryView}>
        <Text style={styles.categoryText}>환불 계좌 관리</Text>
        <Image
          source={require("../../assets/icon/next.png")}
          style={styles.categoryIcon}
        />
      </TouchableOpacity>

      <View style={styles.lineViewHard} />

      <TouchableOpacity style={styles.categoryView}>
        <Text style={styles.categoryText}>로그아웃</Text>
        <Image
          source={require("../../assets/icon/next.png")}
          style={styles.categoryIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.unregisterView}>
        <Text style={styles.unregisterText}>회원탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    marginTop: 35,
    height: 40,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerIcon: {
    width: 15,
    height: 15,
    marginRight: 13,
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  userInformationView: {
    height: 125,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  userEmail: {
    marginTop: 10,
  },
  categoryView: {
    flexDirection: "row",
    height: 52,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    // backgroundColor: "orange",

    borderbottomStyle: "solid",
    borderColor: "#F0F5F9",
    borderBottomWidth: 1,
    width: "92%",
  },
  categoryText: {
    fontSize: 16,
    width: 300,
  },
  categoryIcon: {
    width: 15,
    height: 15,
  },
  lineViewHard: {
    borderbottomStyle: "solid",
    borderColor: "#F0F5F9",
    borderBottomWidth: 7,
    width: "100%",
  },
  unregisterView: {
    height: 40,
    justifyContent: "center",
    marginHorizontal: 15,
  },
  unregisterText: {
    fontSize: 12,
    color: "gray",
  },
});
export default UserInformation;
