import React, { useState, useEffect } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    FlatList,
    Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const posterData = [
    {
        id: 1,
        img: require('../../assets/poster/poster_1.png'),
    },
    {
        id: 2,
        img: require('../../assets/poster/poster_2.png'),
    },
    {
        id: 3,
        img: require('../../assets/poster/poster_3.png'),
    },
];

const productMiniSize = [
    {
        id: 1,
        img: require('../../assets/product/product_1.png'),
        brandName: '사뿐',
        productName: '뮤이안 베이직 롱부츠',
        discount: '',
        zDiscount: false,
        originalPrice: '',
        price: '52,900',
        brand: false,
        freeShipping: true,
    },
    {
        id: 2,
        img: require('../../assets/product/product_2.png'),
        brandName: '시티브리즈',
        productName: '[21FW]케이블 니트',
        discount: '5%',
        zDiscount: false,
        originalPrice: '',
        price: '119,700',
        brand: true,
        freeShipping: true,
    },
    {
        id: 3,
        img: require('../../assets/product/product_3.png'),
        brandName: '사뿐',
        productName: '페리아 스웨이드 스틸힐',
        discount: '40%',
        zDiscount: true,
        originalPrice: '38,900',
        price: '23,340',
        brand: false,
        freeShipping: true,
    },
];
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const posterHeight = screenHeight * 0.26;
const productHeight = screenHeight * 0.35;

const HomeTabView = ({ navigation }) => {
    const [nextState, setNextState] = useState(false);
    const [posterNumber, setPosterNumber] = useState(0);

    const zDiscountText = (item) => {
        const tempItem = item;

        if (tempItem.zDiscount == true) {
            return (
                <Text
                    style={{
                        color: 'hotpink',
                        fontSize: 11,
                        fontWeight: 'bold',
                        marginRight: screenHeight * 0.005,
                    }}
                >
                    제트할인가
                </Text>
            );
        }
    };

    const discountText = (item) => {
        const tempItem = item;

        if (tempItem.discount !== '') {
            return (
                <Text
                    style={{
                        color: 'hotpink',
                        fontSize: 13,
                        fontWeight: 'bold',
                        marginRight: screenHeight * 0.005,
                    }}
                >
                    {tempItem.discount}
                </Text>
            );
        }
    };

    const originalPriceText = (item) => {
        const tempItem = item;

        if (tempItem.originalPrice !== '') {
            return (
                <Text
                    style={{
                        color: 'gray',
                        fontSize: 9,
                    }}
                >
                    {tempItem.originalPrice}
                </Text>
            );
        }
    };

    const freeShippingText = (item) => {
        const tempItem = item;

        if (tempItem.freeShipping == true) {
            return (
                <View>
                    <Text
                        style={{
                            color: 'gray',
                            fontSize: 9,
                            marginRight: screenHeight * 0.005,
                            backgroundColor: '#f5f5f5',
                            width: screenHeight * 0.06,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: '#f5f5f5',
                            //borderColor: 'red',
                        }}
                    >
                        무료배송
                    </Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.entireView}>
            <FlatList
                data={posterData}
                keyExtractor={(item) => item.id}
                horizontal={true}
                renderItem={({ item }) => {
                    return (
                        <View key={item.id} style={styles.posterView}>
                            <Image
                                source={item.img}
                                style={{
                                    width: screenWidth,
                                    height: posterHeight,
                                }}
                            />
                        </View>
                    );
                }}
            />

            <View
                style={{
                    // backgroundColor: 'skyblue',
                    marginTop: 14,
                    marginHorizontal: 14,
                    flexDirection: 'row',
                }}
            >
                <Text style={styles.firstProductTitleName}>배우리님</Text>
                <Text style={styles.firstProductTitle}>
                    을 위한 추천 아이템
                </Text>
            </View>

            <View style={{ marginLeft: 15 }}>
                <FlatList
                    data={productMiniSize}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    renderItem={({ item }) => {
                        return (
                            <View
                                key={item.id}
                                style={styles.productMiniSizeView}
                            >
                                <View>
                                    <Image
                                        source={item.img}
                                        style={{
                                            height: screenHeight * 0.16,
                                            width: screenWidth * 0.25,
                                            marginBottom: screenHeight * 0.01,
                                        }}
                                    />
                                </View>
                                <View>
                                    <Text
                                        style={styles.productMiniSizeBrandName}
                                    >
                                        {item.brandName}
                                    </Text>
                                    <Text
                                        style={
                                            styles.productMiniSizeProductName
                                        }
                                    >
                                        {item.productName}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {zDiscountText(item)}
                                        {originalPriceText(item)}
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        {discountText(item)}
                                        <Text
                                            style={styles.productMiniSizePrice}
                                        >
                                            {item.price}
                                        </Text>
                                    </View>
                                    {freeShippingText(item)}
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    entireView: {
        // height: screenHeight,
        // width: screenWidth,
        // backgroundColor: 'red',
    },
    posterView: {
        height: posterHeight,
        width: screenWidth,
    },
    firstProductTitleName: {
        color: 'black',
        fontSize: 15,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    firstProductTitle: {
        color: 'black',
        fontSize: 15,
        marginBottom: 15,
    },
    productMiniSizeView: {
        justifyContent: 'space-between',
    },
    productMiniSizeBrandName: {
        fontSize: 11,
        color: 'black',
        fontWeight: 'bold',
    },
    productMiniSizeProductName: {
        fontSize: 11,
        color: 'black',
    },
    productMiniSizePrice: {
        fontSize: 13,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default HomeTabView;
