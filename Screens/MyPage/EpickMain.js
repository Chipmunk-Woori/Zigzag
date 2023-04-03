import React from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const ProfileSettingButton = ({ title, subText, AddButtonText }) => {
  return (
    <View>
      <View style={styles.ProfileSettingButtonView}>
        <Text style={styles.ProfileSettingButtonTitleText}>{title}</Text>
        <View style={styles.ProfileSettingButtonSubtextView}>
          <Text style={styles.ProfileSettingButtonSubtext}>{subText}</Text>
        </View>
        <TouchableOpacity style={styles.AddButtonView}>
          <Text style={{ color: "white", fontWeight: "500" }}>
            {AddButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EpickMain = ({ navigation }) => {
  return (
    <View style={styles.View}>
      <ScrollView>
        <View style={styles.profileSettingView}>
          <Text style={{ marginBottom: 15 }}>프로필 설정</Text>
          <View style={{ flexDirection: "row" }}>
            <ProfileSettingButton
              title={"닉네임 설정"}
              subText={"별명이 있나요?"}
              AddButtonText={"설정"}
            />
            <ProfileSettingButton
              title={"자기소개"}
              subText={"자유롭게 소개하세요"}
              AddButtonText={"추가"}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    backgroundColor: "white",
    flex: 1,
  },
  profileSettingView: {
    width: "100%",
    height: 250,
    backgroundColor: "#EEF0F6",
    marginTop: 100,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  ProfileSettingButtonView: {
    width: 150,
    height: 160,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginRight: 10,
  },
  ProfileSettingButtonTitleText: {
    color: "black",
    fontWeight: "500",
    fontSize: 15,
  },
  ProfileSettingButtonSubtextView: {
    marginTop: 13,
    marginBottom: 14,
    alignItems: "center",
  },
  ProfileSettingButtonSubtext: {
    color: "gray",
    fontSize: 14,
  },
  AddButtonView: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 13,
  },
});
export default EpickMain;
