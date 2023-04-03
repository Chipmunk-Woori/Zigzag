import React, { useState, useCallback } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import RollPickerNative from "roll-picker-native";

const topSize = [
  { type: "topSize", value: "33 이하" },
  { type: "topSize", value: "44" },
  { type: "topSize", value: "55" },
  { type: "topSize", value: "66" },
  { type: "topSize", value: "77" },
  { type: "topSize", value: "88" },
  { type: "topSize", value: "99 이상" },
];
const bottomSize = [
  { type: "bottomSize", value: "22 이하" },
  { type: "bottomSize", value: "23" },
  { type: "bottomSize", value: "24" },
  { type: "bottomSize", value: "25" },
  { type: "bottomSize", value: "26" },
  { type: "bottomSize", value: "27" },
  { type: "bottomSize", value: "28" },
  { type: "bottomSize", value: "29 이상" },
];
const shoesSize = [
  { type: "shoesSize", value: "210 이하" },
  { type: "shoesSize", value: "215" },
  { type: "shoesSize", value: "220" },
  { type: "shoesSize", value: "225" },
  { type: "shoesSize", value: "230" },
  { type: "shoesSize", value: "235" },
  { type: "shoesSize", value: "240" },
  { type: "shoesSize", value: "245" },
  { type: "shoesSize", value: "250 이하" },
];

const BodyTypeInformation = ({ navigation }) => {
  const days = Array.from({ length: 71 }, (_, i) => (i + 130).toString());
  const years = Array.from({ length: 101 }, (_, i) => (i + 30).toString());
  const [year, setYear] = useState(0);
  const [day, setDay] = useState(0);
  const [agreementState, setAgreementState] = useState(true);

  const [choicedSize, setChoicedSize] = useState([]);
  const [reload, setReload] = useState(false);

  const handleRoll = useCallback((field, index) => {
    switch (field) {
      case "day": {
        setDay(index);
        break;
      }
      case "year": {
        setYear(index);
        break;
      }
    }
  }, []);

  const choicedSizeButton = item => {
    let tempArray = [...choicedSize];

    if (choicedSize.length !== 0) {
      choicedSize.map(ci => {
        if (ci.type == item.type) {
          tempArray = tempArray.filter(fi => {
            return fi.type !== item.type;
          });
        }
      });
    }
    tempArray.push(item);
    setChoicedSize(tempArray);

    setReload(!reload);
  };

  const buttonState = item => {
    let state = false;

    if (choicedSize.length !== 0) {
      choicedSize.map(i => {
        if (i.value == item.value) {
          state = true;
        }
      });
    }

    return state;
  };

  const returnSizeSelect = (dataArray, title) => {
    return (
      <View style={styles.sizeView}>
        <View style={styles.sizeTitleView}>
          <Text style={styles.sizeTitle}>{title}</Text>
        </View>
        <View style={{ marginLeft: 80 }}>
          <FlatList
            data={dataArray}
            keyExtractor={(item, index) => {
              index.toString();
            }}
            horizontal={true}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={
                    buttonState(item)
                      ? [styles.sizeButton, styles.choicedSizeButton]
                      : styles.sizeButton
                  }
                  onPress={() => {
                    choicedSizeButton(item);
                  }}
                >
                  <Text
                    style={
                      buttonState(item)
                        ? styles.choicedSizeText
                        : styles.sizeText
                    }
                  >
                    {item.value}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
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

          <Text style={styles.headerText}>체형 정보</Text>
        </View>
        <View style={styles.guideView}>
          <Image
            source={require("../../assets/icon/bodyType.png")}
            style={styles.guideImg}
          />
          <Text style={styles.guideText}>체형 정보를 알려주세요</Text>
          <Text style={styles.guideTextSmall}>
            다른 구매자들의 사이즈 참고를 돕고,
          </Text>
          <Text style={styles.guideTextSmall}>
            다음 구매 시 사이즈를 추천해드릴게요.
          </Text>
        </View>
        <View style={styles.grayLine} />
        <View style={styles.pickerTitleView}>
          <Text style={styles.pickerTitleText}>키와 몸무게</Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 15,
            marginBottom: 50,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
            }}
          >
            <RollPickerNative
              items={days}
              index={day}
              onIndexChange={index => handleRoll("day", index)}
              selectHeight={35}
              containerHeight={130}
              containerStyle={{ backgroundColor: "white" }}
              itemStyle={{ backgroundColor: "white" }}
              itemTextStyle={{
                fontSize: 27,
                fontWeight: "bold",
              }}
              selectStyle={{ backgroundColor: "white" }}
              selectTextStyle={{
                fontSize: 27,
                fontWeight: "bold",
              }}
            />
            <RollPickerNative
              items={years}
              index={year}
              onIndexChange={index => handleRoll("year", index)}
              selectHeight={35}
              containerHeight={130}
              containerStyle={{ backgroundColor: "white" }}
              itemStyle={{ backgroundColor: "white" }}
              itemTextStyle={{
                fontSize: 27,
                fontWeight: "bold",
              }}
              selectStyle={{ backgroundColor: "white" }}
              selectTextStyle={{
                fontSize: 27,
                fontWeight: "bold",
              }}
            />
          </View>
        </View>

        {returnSizeSelect(topSize, "평소 상의 사이즈")}
        {returnSizeSelect(bottomSize, "평소 하의 사이즈")}
        {returnSizeSelect(shoesSize, "평소 신발 사이즈")}

        <View style={styles.grayLine} />
        <View style={styles.agreementView}>
          <Text style={styles.agreementText}>
            체형 정보(키, 몸무게, 상의, 하의, 신발 사이즈)는 다음 구매 시 사이즈
            추천의 용도로 사용되며, 다른 구매자들의 구매를 도울 수 있도록
            작성하신 상품 리뷰에 추가 정보로 제공됩니다.
          </Text>
          <Text style={styles.agreementText}>
            미 입력 시 서비스 이용의 불이익이 없으며, 입력하신 정보는 서비스
            탈퇴 시까지 보관됩니다.
          </Text>
          <TouchableOpacity
            style={styles.agreementTouch}
            onPress={() => {
              setAgreementState(!agreementState);
            }}
          >
            <Image
              source={
                agreementState
                  ? require("../../assets/icon/checked.png")
                  : require("../../assets/icon/unchecked_gray.png")
              }
              style={styles.agreementTouchImage}
            />
            <Text>동의합니다.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.saveButtonBackroundView}>
        <TouchableOpacity
          style={
            agreementState
              ? styles.saveButton
              : [styles.saveButton, styles.saveButton_none]
          }
        >
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
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
  guideView: {
    width: "100%",
    height: 218,
    alignItems: "center",
  },
  guideImg: {
    width: 85,
    height: 85,
    marginVertical: 15,
  },
  guideText: {
    fontSize: 19,
    fontWeight: "bold",
    marginVertical: 10,
  },
  guideTextSmall: {
    fontSize: 14,
    color: "gray",
  },
  grayLine: {
    width: "100%",
    borderColor: "#F0F5F9",
    borderWidth: 4,
    borderStyle: "solid",
  },
  pickerTitleView: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerTitleText: {
    fontSize: 15,
  },
  sizeView: {
    marginBottom: 10,
    marginBottom: 38,
  },
  sizeTitleView: {
    width: "100%",
    height: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  sizeTitle: {
    fontSize: 16,
  },
  sizeButton: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20,
    height: 38,
    paddingHorizontal: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  choicedSizeButton: {
    borderColor: "#F719A3",
  },
  sizeText: {
    fontSize: 12,
  },
  choicedSizeText: {
    fontSize: 12,
    color: "#F719A3",
  },
  agreementView: {
    paddingHorizontal: 23,
    marginTop: 38,
    height: 145,
  },
  agreementText: {
    fontSize: 12,
  },
  agreementTouchImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  agreementTouch: {
    flexDirection: "row",
    marginTop: 23,
  },
  saveButtonBackroundView: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "lightgray",
    borderTopWidth: 0.3,
    borderStyle: "solid",
  },
  saveButton: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20,
    height: 40,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  saveButton_none: {
    backgroundColor: "lightgray",
    borderColor: "lightgray",
  },
});
export default BodyTypeInformation;
