import React from "react";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from "react-native";

const Sale = () => {
  const tempFlatListArray = [0, 1, 2, 3, 4, 5, 6];

  return (
    <View>
      <FlatList
        data={tempFlatListArray}
        keyExtractor={(item, index) => {
          index.toString();
        }}
        renderItem={({ item }) => {
          return (
            <View key={item}>
              <Text>반복테스트</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Sale;
