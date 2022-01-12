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

import { SliderBox } from "react-native-image-slider-box";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이
// 회색 : "#EEF0F6"

const PointGuide = ({ navigation }) => {
  const [coin2Y, setcoin2Y] = useState(360);
  const [coinY, setcoinY] = useState(620);

  const [usePointIndex, setUsePointIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [usePoint, setUsePoint] = useState([
    {
      id: "usePoint_1",
      title: "포인트 사용방법 하나!",
      guideText: (
        <View style={{ alignItems: "center" }}>
          <View
            style={[styles.usePointGuideTextView, { flexDirection: "row" }]}
          >
            <Image
              source={require("../../assets/icon/shoppingBasket.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text style={[styles.usePointGuideText, styles.color]}> 결제 </Text>
            <Text style={styles.usePointGuideText}>상품을 이용해주세요.</Text>
          </View>
          <Text style={styles.usePointInstruction}>
            Z결제 미입점 상품은 포인트가 적립되지 않아요.
          </Text>
        </View>
      ),
    },
    {
      id: "usePoint_2",
      title: "포인트 사용방법 둘!",
      guideText: (
        <View style={styles.usePointGuideTextView}>
          <Text style={styles.usePointGuideText}>Z결제하기 버튼으로</Text>
          <Text style={styles.usePointGuideText}>원하는 상품을 담으시고!</Text>
        </View>
      ),
    },
    {
      id: "usePoint_3",
      title: "포인트 사용방법 셋!",
      guideText: (
        <View style={styles.usePointGuideTextView}>
          <Text style={styles.usePointGuideText}>결제하실 때 지급해드린</Text>
          <Text style={styles.usePointGuideText}>포인트를 사용해주세요!</Text>
        </View>
      ),
    },
  ]);

  const coinChangeTop = event => {
    let scrollHeight = event.nativeEvent.contentOffset.y; //화면에서 스크롤 위치

    let temp2 = -1 * scrollHeight + 360;
    setcoin2Y(temp2);
    let temp = (-100 / 200) * scrollHeight + 620;
    setcoinY(temp);

    if (scrollHeight >= 1450) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
      }).start();
    }
  };

  const carouselState = {
    images: [
      require("../../assets/poster/poster_1.png"), // Local image
      require("../../assets/poster/poster_2.png"),
      require("../../assets/poster/poster_3.png"),
    ],
  };

  const returnPointGuideText = index => {
    setUsePointIndex(index);
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

        <View style={{ alignItems: "center", marginBottom: 80 }}>
          <Text style={styles.usePointTitle}>
            {usePoint[usePointIndex].title}
          </Text>
          <View>{usePoint[usePointIndex].guideText}</View>
        </View>

        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 200,
              alignItems: "center",
              height: 220,
            }}
          >
            <SliderBox
              images={carouselState.images}
              sliderBoxHeight={220}
              dotColor="#F719A3"
              inactiveDotColor="lightgray"
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 10,
                marginLeft: -10,
              }}
              ImageComponentStyle={{ width: 260 }}
              currentImageEmitter={index => returnPointGuideText(index)}
              autoplay={true}
              circleLoop={true}
              activeOpacity={1}
              paginationBoxStyle={{ bottom: 260 }}
            />
          </View>
        </View>

        <View style={{ alignItems: "center", backgroundColor: "black" }}>
          <Text style={styles.pointSavingMethodTitle}>포인트 적립방법</Text>
          <Image
            source={require("../../assets/icon/pointSavingMethod.png")}
            style={styles.pointSavingMethodImg}
          />
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <Text style={{ color: "#F719A3", fontSize: 16 }}>'구매확정'</Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              을 눌러야 포인트가 적립돼요.
            </Text>
          </View>
          <View style={{ marginBottom: 80 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.pointSavingMethodWarning}>· </Text>
              <View>
                <Text style={styles.pointSavingMethodWarning}>
                  멤버십 등급에 따라 적립 가능 유저 대상으로 자동 적립
                </Text>
                <Text style={styles.pointSavingMethodWarning}>
                  됩니다. (0.5% ~2%)
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.pointSavingMethodWarning}>· </Text>
              <View>
                <Text style={styles.pointSavingMethodWarning}>
                  배송 완료 후 '구매확정' 버튼을 누르지 않을 시에는
                </Text>
                <Text style={styles.pointSavingMethodWarning}>
                  8일 뒤 확정처리와 함께 자동적으로 포인트가 적립돼요
                </Text>
              </View>
            </View>
          </View>

          <Animated.View style={[styles.goShoppingView, { opacity: fadeAnim }]}>
            <Image
              style={styles.goShoppingIconImg}
              source={require("../../assets/icon/shoppingBasket.png")}
            />
            <Text style={styles.goShoppingText}>포인트로 살 수 있는</Text>
            <Text style={[styles.goShoppingText, { marginBottom: 10 }]}>
              상품 구경 갈까요?
            </Text>
            <Text style={styles.goShoppingSmallText}>
              더 간편해진 구매 경험과
            </Text>
            <Text style={styles.goShoppingSmallText}>
              Z결제 포인트도 적립해보세요!!
            </Text>
            <TouchableOpacity style={styles.goShoppingButtonView}>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                Z결제 쇼핑하러 가기
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.noteView}>
            <Text style={styles.noteTitleText}>유의사항</Text>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.noteContentText}>· </Text>
              <Text style={styles.noteContentText}>
                Z결제 포인트는 적립 유형에 따라 유효기간이 다릅니다.
              </Text>
            </View>

            <Text style={styles.noteContentDetailText}>
              - 구매 적립: 지급일로부터 1년
            </Text>
            <Text style={styles.noteContentDetailText}>
              - 이벤트 적립: 별도 명시한 유효기간까지, 별도 명시 유효기간 없을
              경우 1년
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.noteContentText}>· </Text>
              <Text style={styles.noteContentText}>
                Z결제 포인트는 유효기간이 임박한 순서로 사용되며, 미사용 시 유효
                기간이 지나면 자동적으로 소멸됩니다.
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.noteContentText}>· </Text>
              <Text style={styles.noteContentText}>
                지그재그 ID가 휴면계정 처리되거나 탈퇴할 경우, 적립된 Z결제
                포인트는 소멸됩니다.
              </Text>
            </View>
          </View>
        </View>
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
    marginBottom: 95,
  },
  usePointTitle: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 35,
  },
  usePointGuideText: {
    fontSize: 25,
  },
  usePointGuideTextView: {
    alignItems: "center",
    justifyContent: "center",
  },
  usePointInstruction: {
    fontSize: 14,
    color: "#B0B6BC",
    marginTop: 10,
  },
  color: {
    fontWeight: "bold",
    color: "#F719A3",
  },
  pointSavingMethodTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 34,
    marginTop: 60,
    marginBottom: 20,
  },
  pointSavingMethodImg: {
    width: "80%",
    height: 230,
    marginBottom: 40,
  },
  pointSavingMethodWarning: {
    fontSize: 12,
    color: "lightgray",
  },
  goShoppingView: {
    backgroundColor: "white",
    width: "80%",
    height: 390,
    borderRadius: 20,
    alignItems: "center",
  },
  goShoppingIconImg: {
    width: 150,
    height: 150,
    marginTop: 20,
    marginBottom: 20,
  },
  goShoppingText: {
    fontSize: 23,
    fontWeight: "bold",
  },
  goShoppingSmallText: {
    fontSize: 14,
    color: "gray",
  },
  goShoppingButtonView: {
    backgroundColor: "#F719A3",
    paddingHorizontal: 60,
    paddingVertical: 15,
    marginTop: 30,
    borderRadius: 7,
  },
  noteView: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 40,
    paddingBottom: 80,
  },
  noteTitleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  noteContentText: {
    color: "lightgray",
    fontSize: 13,
    marginTop: 5,
  },
  noteContentDetailText: {
    color: "gray",
    fontSize: 11,
    paddingLeft: 6,
  },
});
export default PointGuide;
