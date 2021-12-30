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

//130-200,30-130

const BodyTypeInformation = ({ navigation }) => {
  const days = Array.from({ length: 71 }, (_, i) => (i + 130).toString());
  const years = Array.from({ length: 101 }, (_, i) => (i + 30).toString());

  const [year, setYear] = useState(0);
  const [day, setDay] = useState(0);

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
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            backgroundColor: "white",
          }}
        >
          <RollPickerNative
            items={days}
            index={day}
            onIndexChange={index => handleRoll("day", index)}
            selectHeight={35}
            containerHeight={130}
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

      <View style={styles.sizeView}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.sizeTitle}>평소 상의 사이즈</Text>
        </View>
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
    width: "100%",
    // height: 200,
    marginTop: 50,
    // backgroundColor: "orange",
  },
  sizeTitle: {
    fontSize: 16,
  },
});
export default BodyTypeInformation;
