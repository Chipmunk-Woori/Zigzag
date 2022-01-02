import React, { useState, useEffect, useCallback } from "react";

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
import { TabView, SceneMap } from "react-native-tab-view";

import RollPickerNative from "roll-picker-native";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const topSize = ["33 이하", "44", "55", "66", "77", "88", "99 이상"];
const bottomSize = ["22 이하", "23", "24", "25", "26", "27", "28", "29 이상"];
const shoesSize = [
  "210 이하",
  "215",
  "220",
  "225",
  "230",
  "235",
  "240",
  "245",
  "250 이상",
];

const BodyTypeInformation = ({ navigation }) => {
  const days = Array.from({ length: 71 }, (_, i) => (i + 130).toString());
  const years = Array.from({ length: 101 }, (_, i) => (i + 30).toString());
  const [year, setYear] = useState(0);
  const [day, setDay] = useState(0);

  const [choicedSize, setChoicedSize] = useState([]);

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

  const choicedSizeButton = ({ item }) => {
    let temp = [...choicedSize];
    temp.push({ item });
    setChoicedSize(temp);
  };

  const buttonState = ({ item }) => {
    let state = false;
    choicedSize.map(i => {
      if (i == { item }) {
        state = true;
      }
    });

    return state;
  };

  // useEffect(() => {
  //   buttonState({ item });
  // }, [choicedSize]);

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
                  style={styles.sizeButton}
                  onPress={({ item }) => {
                    choicedSizeButton({ item });
                  }}
                >
                  {buttonState({ item }) ? (
                    <Text style={styles.sizeText2}>{item}</Text>
                  ) : (
                    <Text style={styles.sizeText}>{item}</Text>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
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
          <TouchableOpacity style={styles.agreementTouch}>
            <Image
              source={require("../../assets/icon/unchecked_gray.png")}
              style={styles.agreementTouchImage}
            />
            <Text>동의합니다.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    // backgroundColor: "orange",
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
  sizeText: {
    fontSize: 12,
  },
  sizeText2: {
    fontSize: 12,
    color: "red",
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
});
export default BodyTypeInformation;
