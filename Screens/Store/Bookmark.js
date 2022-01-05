import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const shoppingmallList = [
  {
    id: "shop_1",
    shopName: "프롬비기닝",
    discount: "최대 3,000원 할인",
    img: require("../../assets/shoppingmall/shoppingmall_1.png"),
  },
  {
    id: "shop_2",
    shopName: "플라이모델",
    discount: "",
    img: require("../../assets/shoppingmall/shoppingmall_2.png"),
  },
  {
    id: "shop_3",
    shopName: "글램라인",
    discount: "",
    img: require("../../assets/shoppingmall/shoppingmall_3.png"),
  },
  {
    id: "shop_4",
    shopName: "횰릭",
    discount: "",
    img: require("../../assets/shoppingmall/shoppingmall_1.png"),
  },
  {
    id: "shop_5",
    shopName: "립합",
    discount: "최대 5,000원 할인",
    img: require("../../assets/shoppingmall/shoppingmall_2.png"),
  },
  {
    id: "shop_6",
    shopName: "소보",
    discount: "최대 10,000원 할인",
    img: require("../../assets/shoppingmall/shoppingmall_3.png"),
  },
];

const Bookmark = bookmarkEditMode => {
  const [bookmarkNumber, setBookmarkNumber] = useState("15");
  const [editMode, setEditMode] = useState(bookmarkEditMode);
  return (
    <View style={styles.View}>
      <View style={styles.bookmarkNumberView}>
        <Text style={styles.bookmarkNumberText}>즐겨찾기 {bookmarkNumber}</Text>

        {!editMode && (
          <TouchableOpacity style={styles.discountCouponTextView}>
            <Image
              style={styles.discountCouponCheckbox}
              source={require("../../assets/icon/circle.png")}
            />
            <Text style={styles.discountCouponText}>할인쿠폰</Text>
          </TouchableOpacity>
        )}
      </View>

      {!editMode && (
        <>
          <View style={styles.totalNewView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/icon/circle.png")}
                style={styles.totalNewImg}
              />
              <Text style={styles.shoppingmallNameText}>신상 몰아보기</Text>
            </View>
            <Image
              source={require("../../assets/icon/next.png")}
              style={styles.totalNewNextIcon}
            />
          </View>
          <View style={styles.lineView} />
        </>
      )}

      <View>
        <FlatList
          data={shoppingmallList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.shopView}>
                {editMode && (
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/icon/minusIcon.png")}
                      style={styles.minusIconImg}
                    />
                  </TouchableOpacity>
                )}

                <Image source={item.img} style={styles.shopImg} />
                <Text style={styles.shoppingmallNameText}>{item.shopName}</Text>

                {editMode && (
                  <View style={styles.HashTagIconView}>
                    <TouchableOpacity>
                      <Image
                        source={require("../../assets/icon/hashtag_gray.png")}
                        style={styles.HashtagImg}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        source={require("../../assets/icon/menu.png")}
                        style={styles.HashtagImg}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
  },
  bookmarkNumberView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bookmarkNumberText: {
    fontSize: 12,
    color: "gray",
  },
  discountCouponText: {
    fontSize: 12,
    color: "blue",
  },
  discountCouponCheckbox: {
    width: 15,
    height: 15,
    marginRight: 4,
  },
  discountCouponTextView: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalNewView: {
    width: "100%",
    height: 63,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalNewImg: {
    width: 50,
    height: 50,
  },
  shoppingmallNameText: {
    fontSize: 15,
    marginLeft: 10,
    width: 170,
  },
  totalNewNextIcon: {
    width: 18,
    height: 18,
    marginLeft: 100,
  },
  lineView: {
    borderColor: "#F5F7FA",
    borderStyle: "solid",
    borderWidth: 3,
  },
  shopView: {
    width: "100%",
    height: 74,
    borderBottomColor: "#F5F7FA",
    borderStyle: "solid",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  shopImg: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  minusIconImg: {
    width: 19,
    height: 19,
    marginRight: 20,
  },
  HashtagImg: {
    width: 17,
    height: 17,
    marginLeft: 23,
  },
  HashTagIconView: {
    flexDirection: "row",
    marginLeft: 7,
  },
});

export default Bookmark;
