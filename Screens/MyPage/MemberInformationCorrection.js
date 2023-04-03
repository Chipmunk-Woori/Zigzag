import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

const MemberInformationCorrection = ({ navigation }) => {
  const [userName, setUserName] = useState("이름");
  const [userCall, setUserCall] = useState("휴대폰번호");

  const [nameText, setNameText] = useState("배우리");
  const [callText, setCallText] = useState("01087489362");
  const [nameNumber, setNameNumber] = useState(null);
  const [callNumber, setCallNumber] = useState(null);
  const [notice, setNotice] = useState([
    "· 개명하신 경우 본인인증을 하면 자동으로 이름이 변경돼요.",
    "· 이동통신사에 본인 명의로 가입되어 있는지 확인해 주세요.",
    "· 본인인증을 하시면 본인인증할 때 입력하신 정보로 이름과 휴대폰 번호가",
    "  모두 변경돼요.",
  ]);
  const [reload, setReload] = useState(false);

  const nameCorrectionButton = nameText => {
    setUserName(nameText);
    setReload(!reload);
  };

  const callCorrectionButton = callText => {
    setUserCall(callText);
  };

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

        <Text style={styles.headerText}>회원 정보 수정</Text>
      </View>
      <View style={styles.nameView}>
        <Text style={styles.titleText}>이름</Text>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            onChangeText={setNameText}
            value={nameText}
          />
          <TouchableOpacity
            style={styles.correctionButton}
            onPress={() => {
              nameCorrectionButton(nameText);
            }}
          >
            <Text style={styles.correctionText}>변경</Text>
          </TouchableOpacity>
        </View>

        {notice.map(item => {
          return <Text style={styles.noticeText}>{item}</Text>;
        })}
      </View>
      <View style={styles.nameView}>
        <Text style={styles.titleText}>휴대폰번호</Text>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            onChangeText={setCallText}
            value={callText}
          />
          <TouchableOpacity
            style={styles.correctionButton}
            onPress={() => {
              callCorrectionButton(callText);
            }}
          >
            <Text style={styles.correctionText}>변경</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.userNaneView}>
        <Text style={styles.useNameText}>사용자 이름 : {userName}</Text>
        <Text style={styles.useNameText}>휴대폰 번호 : {userCall}</Text>
      </View>
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
  nameView: {
    paddingTop: 24,
    paddingHorizontal: 16,
    height: 150,
    width: "100%",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 12,
  },
  textInputView: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    marginTop: 10,
    marginVertical: 10,
  },
  textInput: {
    marginRight: 10,
    height: 40,
    width: 290,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#ECEDEE",
    backgroundColor: "#F5F7F8",
    color: "gray",
  },
  correctionButton: {
    backgroundColor: "black",
    height: 37,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  correctionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  noticeText: {
    color: "gray",
    fontSize: 12,
    marginBottom: 3,
    marginLeft: 9,
  },
  userNaneView: {
    height: 70,
    justifyContent: "center",
    backgroundColor: "#F5F7F8",
  },
  useNameText: {
    fontSize: 13,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 5,
  },
});
export default MemberInformationCorrection;
