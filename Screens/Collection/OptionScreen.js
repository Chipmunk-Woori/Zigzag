import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";

// import DragSortableView from "./DragSortableView";
import DragSortableView from "../DragSortableView/DragSortableView";

const TEST_DATA = [
  { icon: require("../../assets/product/product_1.png"), txt: 1 },
  { icon: require("../../assets/product/product_2.png"), txt: 2 },
  { icon: require("../../assets/product/product_3.png"), txt: 3 },
];

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const parentWidth = screenWidth;
const childrenWidth = screenWidth;
const childrenHeight = 48;

const OptionScreen = () => {
  const [state, setState] = useState({
    data: TEST_DATA,
    scrollEnabled: true,
  });

  const [tempState, setTempState] = useState(true);

  const renderItem = (item, index) => {
    if (item) {
      return (
        <View style={styles.item}>
          <View style={styles.item_children}>
            <Image style={styles.item_icon} source={item.icon} />
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView
        ref={scrollView => (scrollView = scrollView)}
        scrollEnabled={state.scrollEnabled}
        style={styles.container}
      >
        <DragSortableView
          dataSource={state.data}
          parentWidth={parentWidth}
          childrenWidth={childrenWidth}
          childrenHeight={childrenHeight}
          scaleStatus={"scaleY"}
          onDragStart={(startIndex, endIndex) => {
            setTempState(false);
          }}
          onDragEnd={startIndex => {
            setTempState(true);
          }}
          onDataChange={data => {
            if (data.length != state.data.length) {
              data = TEST_DATA;
            }
          }}
          keyExtractor={(item, index) => index.toString()} // FlatList
          //  onClickItem={(data, item, index) => {}}
          renderItem={(item, index) => {
            return renderItem(item, index);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  item: {
    width: childrenWidth,
    height: childrenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  item_children: {
    width: childrenWidth,
    height: childrenHeight - 4,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  item_icon: {
    width: childrenHeight * 0.6,
    height: childrenHeight * 0.6,
    marginLeft: 15,
    resizeMode: "contain",
  },
  item_text: {
    marginRight: 15,
    color: "#2ecc71",
  },
});

export default OptionScreen;
