import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextField,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import DragSortableView from "../DragSortableView/DragSortableView";

const screenWidth = Dimensions.get("screen").width; // 전체화면 가로길이
const screenHeight = Dimensions.get("screen").height; //전체화면 세로길이

const parentWidth = screenWidth;
const childrenWidth = screenWidth;
const childrenHeight = 55;

const addFolder = ({ navigation }) => {
  let folderList = useSelector(state => state.reducer3);
  let dispatch = useDispatch();
  const [folderName, setFolderName] = useState("");
  const [addFolderName, setAddFolderName] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [modalProductImg, setModalProductImg] = useState(
    require("../../assets/product/temp.png")
  );
  const [modalProductId, setModalProductId] = useState(1);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const dragRenderItem = item => {
    if (item) {
      return (
        <View style={{ width: parentWidth * 0.92, backgroundColor: "white" }}>
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
                setModalProductImg(require("../../assets/product/temp.png"));
                setModalProductId(item.folderKey);
              }}
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>

            <Image
              source={require("../../assets/icon/list.png")}
              style={{ width: 14, height: 14 }}
            />
          </View>
        </View>
      );
    }
  };

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

  const titleChangeCheck = () => {
    let check = true;

    folderList.map(i => {
      if (i.folderKey == modalProductId) {
        if (folderName == i.title) {
          check = false;
        }
      }
    });

    return check;
  };

  return (
    <View style={styles.ViewStyle}>
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
              setAddFolderName("");
            }}
          >
            <Image
              source={require("../../assets/icon/addFolder.png")}
              style={styles.headerAddFolderIcon}
            />
          </TouchableOpacity>
        </View>

        {/* <FlatList
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
                    style={{ width: 14, height: 14 }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        /> */}

        {/* ------------------------------------------------------------------------------- */}
        <View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollView => (scrollView = scrollView)}
            scrollEnabled={scrollEnabled}
            style={styles.container}
          >
            <DragSortableView
              dataSource={folderList}
              parentWidth={parentWidth}
              childrenWidth={childrenWidth}
              childrenHeight={childrenHeight}
              scaleStatus={"scaleY"}
              onDragStart={(startIndex, endIndex) => {
                setScrollEnabled(false);
              }}
              onDragEnd={startIndex => {
                setScrollEnabled(true);
              }}
              onDataChange={data => {
                if (data.length != folderList.length) {
                  data = folderList;
                }
              }}
              keyExtractor={(item, index) => index.toString()}
              //  onClickItem={(data, item, index) => {}}
              renderItem={(item, index) => {
                return dragRenderItem(item);
              }}
            />
          </ScrollView>
        </View>
        {/* ------------------------------------------------------------------------------- */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={addModalVisible}
          onBackdropPress={() => setAddModalVisible(false)}
          style={{ flex: 1, margin: 0 }}
        >
          <View style={styles.centeredView}>
            <Text style={styles.modalTitleText}>폴더 추가</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={[styles.textInput, { width: "90%" }]}
                onChangeText={setAddFolderName}
                value={addFolderName}
                clearTextOnFocus={true}
                autoFocus={true}
                placeholder="폴더명을 입력해주세요."
              />
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonClose,
                titleCheck() && { backgroundColor: "black" },
              ]}
              onPress={() => {
                if (titleCheck()) {
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
          coverScreen={false}
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onBackdropPress={() => setEditModalVisible(false)}
          style={{ flex: 1, margin: 0 }}
        >
          <View style={styles.centeredView}>
            <Text style={styles.modalTitleText}>폴더 이름 변경</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={styles.modalProductImg} source={modalProductImg} />
              <TextInput
                style={styles.textInput}
                onChangeText={setFolderName}
                value={folderName}
                autoFocus={true}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonClose,
                titleChangeCheck() && { backgroundColor: "black" },
              ]}
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
      {(editModalVisible || addModalVisible) && (
        <View style={styles.modalTrueView} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
  },
  View: {
    paddingHorizontal: 15,
    position: "absolute",
  },
  modalTrueView: {
    height: 600,
    width: "100%",
    backgroundColor: "black",
    opacity: 0.6,
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
    height: childrenHeight,
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
    borderStyle: "solid",
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
    height: "60%",
    width: "100%",
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
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 40,
  },
  item: {
    width: childrenWidth,
    height: childrenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  item_children: {
    width: childrenWidth * 0.9,
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
export default addFolder;
