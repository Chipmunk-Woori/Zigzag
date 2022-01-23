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
  TextField,
  TextInput,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const addFolder = ({ navigation }) => {
  let folderList = useSelector(state => state.reducer3);
  let dispatch = useDispatch();
  const [folderName, setFolderName] = useState("타이틀");
  const [addFolderName, setAddFolderName] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [modalProductImg, setModalProductImg] = useState(
    require("../../assets/product/temp.png")
  );
  const [modalProductId, setModalProductId] = useState(1);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const titleCheck = () => {
    let check = true;

    //이미 있는 title 인지 확인
    folderList.map(i => {
      if (i.title == addFolderName) {
        check = false;
      }
    });

    //빈 칸인지 확인
    if (addFolderName == "") {
      check = false;
    }

    return check;
  };

  return (
    <View style={{ position: "relative" }}>
      <View style={styles.View}>
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
          <TouchableOpacity
            onPress={() => {
              setAddModalVisible(true);
            }}
          >
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
                <TouchableOpacity
                  onPress={() => {
                    dispatch({
                      type: "deleteTitle",
                      payload: { item },
                    });
                  }}
                >
                  <Image
                    source={require("../../assets/icon/minusIcon.png")}
                    style={styles.deleteButton}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.titleView}
                  onPress={() => {
                    setEditModalVisible(true);
                    setFolderName(item.title);
                    setModalProductImg(
                      require("../../assets/product/temp.png")
                    );
                    setModalProductId(item.folderKey);
                  }}
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
          visible={addModalVisible}
          onPressOut={() => {
            setAddModalVisible(!addModalVisible);
          }}

          // onRequestClose={() => {
          //   setAddModalVisible(!addModalVisible);
          // }}
        >
          <View style={styles.centeredView}>
            <Text style={styles.modalTitleText}>폴더 추가</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={[styles.textInput, { width: "90%" }]}
                onChangeText={setAddFolderName}
                value={addFolderName}
                placeholder="폴더명을 입력해주세요."
              />
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                if (titleCheck() == true) {
                  setAddModalVisible(!addModalVisible);
                  dispatch({
                    type: "addTitle",
                    payload: { title: addFolderName },
                  });
                }
              }}
            >
              <Text style={styles.textStyle}>확인</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => {
            setEditModalVisible(!editModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <Text style={styles.modalTitleText}>폴더 이름 변경</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={styles.modalProductImg} source={modalProductImg} />
              <TextInput
                style={styles.textInput}
                onChangeText={setFolderName}
                value={folderName}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setEditModalVisible(!editModalVisible);
                dispatch({
                  type: "changeTitle",
                  payload: { folderKey: modalProductId, title: folderName },
                });
              }}
            >
              <Text style={styles.textStyle}>확인</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      {editModalVisible && <View style={styles.modalTrueView} />}
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    paddingHorizontal: 15,
    position: "absolute",
  },
  modalTrueView: {
    height: 600,
    width: "100%",
    backgroundColor: "black",
    opacity: 0.4,
    position: "absolute",
  },
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
    borderColor: "lightgray",
    borderRadius: 8,
    padding: 10,
    width: "65%",
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
    height: "55%",
    marginTop: "75%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "lightgray",
    width: "90%",
    paddingVertical: 14,
    marginTop: 20,
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
  modalTitleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 25,
  },
  modalProductImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
});
export default addFolder;
