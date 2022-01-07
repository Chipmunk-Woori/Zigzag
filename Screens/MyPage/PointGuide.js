import React, { useState, useEffect, useRef } from "react";

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
  Animated,
} from "react-native";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이
// 회색 : "#EEF0F6"

const PointGuide = ({ navigation }) => {
  const [coin2Y, setcoin2Y] = useState(360);
  const [coinY, setcoinY] = useState(620);
  const [usePoint, setUsePoint] = useState([
    {
      id: "usePoint_1",
      title: "포인트 사용방법 하나!",
      guideText: "결제 상품을 이용해주세요.",
      instruction: "Z결제 미입점 상품은 포인트가 적립되지 않아요.",
    },
    {
      id: "usePoint_2",
      title: "포인트 사용방법 둘!",
      guideText: "Z결제하기 버튼으로 원하는 상품을 담으시고!",
      instruction: "",
    },
    {
      id: "usePoint_3",
      title: "포인트 사용방법 셋!",
      guideText: "결제하실 때 지급해드린 포인트를 사용해주세요!",
      instruction: "",
    },
  ]);

  const coinChangeTop = event => {
    let scrollHeight = event.nativeEvent.contentOffset.y; //화면에서 스크롤 위치

    let temp2 = -1 * scrollHeight + 360;
    setcoin2Y(temp2);
    let temp = (-100 / 200) * scrollHeight + 620;
    setcoinY(temp);
  };

  return (
    <View style={styles.View}>
      <ScrollView onScroll={coinChangeTop} scrollEventThrottle={10}>
        <View style={styles.backParallelogramShapeView}>
          <View style={styles.backParallelogramShape} />
        </View>

        <View style={styles.iconImgView}>
          <Image
            style={styles.iconImg}
            source={require("../../assets/icon/reservedPoint.png")}
          />
        </View>

        <View style={styles.guideTextView}>
          <View style={{ marginBottom: 5, alignItems: "center" }}>
            <Text style={styles.subGuideText}>
              김치도 아니고.. 포인트 잘 모이서..
            </Text>
            <Text style={styles.subGuideText}>삭히고 계신 분들을 위하여..</Text>
          </View>
          <View>
            <Text style={styles.MainGuideText}>포인트</Text>
            <Text style={styles.MainGuideText}>쓰는법</Text>
            <Text style={styles.MainGuideText}>알랴줌</Text>
          </View>
        </View>

        <View style={{ position: "absolute" }}>
          <Image
            source={require("../../assets/icon/goldCoin.png")}
            style={[styles.coinIconImg, { top: coinY }]}
          />
          <Image
            source={require("../../assets/icon/goldCoin.png")}
            style={[styles.coinIconImg2, { top: coin2Y }]}
          />
        </View>

        {/* --------------------------------------------------------- */}
        <View style={styles.warningView}>
          <Text style={styles.warningText1}>Stop!</Text>
          <Text style={styles.warningText2}>Z결제 상픔만</Text>
          <Text style={styles.warningText2}>포인트를 쓸 수 있어요!</Text>
          <View style={styles.warningText3View}>
            <Text style={styles.warningText3}>Z결제 상품 아닌데</Text>
            <Text style={styles.warningText3}>
              포인트 사용 안 된다고 하기 없기! 약속!
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={styles.line} />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.usePointTitle}>{usePoint[0].title}</Text>
          <Text style={styles.usePointGuideText}>{usePoint[0].guideText}</Text>
          <Text style={styles.usePointInstruction}>
            {usePoint[0].instruction}
          </Text>
        </View>

        <View style={{ height: 400, backgroundColor: "orange" }} />
      </ScrollView>

      {/* --------------------------------------------------------- */}
      <TouchableOpacity
        style={styles.backButtonTouch}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          source={require("../../assets/icon/backArrow.png")}
          style={styles.backbuttonImg}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: "white",
  },
  backButtonTouch: {
    marginTop: 50,
    marginLeft: 15,
    borderColor: "#EEF0F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 30,
    width: 37,
    height: 37,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",

    backgroundColor: "white", //배경색이 없으면 색이 안 보일 수 있음
    shadowColor: "gray",
    shadowOpacity: 0.1,
    shadowRadius: 2, //그림자 퍼지는 길이
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  backParallelogramShapeView: {
    position: "relative",
    height: 700,
  },
  backParallelogramShape: {
    width: "100%",
    height: 428,
    transform: [{ skewY: "165deg" }],
    backgroundColor: "#F719A3",
    top: 220,
  },
  backbuttonImg: {
    width: 15,
    height: 15,
  },
  iconImgView: {
    position: "absolute",
    top: 200,
    width: "100%",
    alignItems: "center",
  },
  iconImg: {
    width: 160,
    height: 160,
    top: -70,
  },
  guideTextView: {
    alignItems: "center",
    position: "absolute",
    top: 355,
    width: "100%",
  },
  MainGuideText: {
    color: "white",
    fontSize: 68,
    fontWeight: "bold",
  },
  subGuideText: {
    color: "white",
    fontSize: 13,
  },
  coinIconImg: {
    width: 100,
    height: 100,
    transform: [{ rotate: "55deg" }],
    left: 37,
  },
  coinIconImg2: {
    width: 70,
    height: 70,
    transform: [{ rotate: "120deg" }],
    left: 275,
  },
  warningView: {
    alignItems: "center",
    marginBottom: 50,
    marginTop: 35,
  },
  warningText1: {
    color: "#F719A3",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  warningText2: {
    fontWeight: "bold",
    fontSize: 21,
  },
  warningText3View: {
    marginTop: 10,
    backgroundColor: "#EEF0F6",
    width: 250,
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
  },
  warningText3: {
    fontSize: 14,
    color: "gray",
  },
  line: {
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "lightgray",
    width: "80%",
    marginBottom: 110,
  },
  usePointTitle: {
    fontWeight: "bold",
    fontSize: 30,
  },
  usePointGuideText: {
    fontSize: 20,
    marginTop: 30,
  },
  usePointInstruction: {
    fontSize: 14,
    marginTop: 10,
    color: "#B0B6BC",
  },
});
export default PointGuide;
