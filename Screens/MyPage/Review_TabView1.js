import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import { TabView } from "react-native-tab-view";

const Review_TabView1 = () => {
  return (
    <View style={styles.View}>
      <Image
        source={require("../../assets/icon/notepad.png")}
        style={styles.iconImage}
      />
      <Text style={styles.Text}>작성 가능한 리뷰가 없어요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 100,
    height: 100,
    marginBottom: 35,
  },
  Text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Review_TabView1;
