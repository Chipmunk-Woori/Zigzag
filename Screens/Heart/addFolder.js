import React, { useState, useEffect } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const addFolder = ({ navigation }) => {
  let folderList = useSelector(state => state.reducer3);
  const [folderName, setFolderName] = useState("폴더 이름 입력");
  const [number, setChangeNumber] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../../assets/icon/backArrow.png")}
            style={styles.headerBackIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>폴더 편집</Text>
        <TouchableOpacity>
          <Image
            source={require("../../assets/icon/addFolder.png")}
            style={styles.headerAddFolderIcon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={folderList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.individualFolderView}>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/icon/minusIcon.png")}
                  style={styles.deleteButton}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.titleView}
                onPress={() => setModalVisible(true)}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  source={require("../../assets/icon/list.png")}
                  style={{ width: 17, height: 17 }}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

{
  /* <TextInput
style={styles.textInput}
onChangeText={setFolderName}
value={folderName}
/> */
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerBackIcon: {
    width: 15,
    height: 15,
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  headerAddFolderIcon: {
    width: 22,
    height: 22,
  },
  individualFolderView: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderStyle: "solid",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  deleteButton: {
    width: 20,
    height: 20,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: "70%",
  },
  titleView: {
    height: 40,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "lightgray",
    padding: 10,
    width: "80%",
    borderRadius: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "black",
    transparent: "30%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default addFolder;
