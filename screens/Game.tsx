import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    Animated,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import CustomCard from '../components/CustomCard';
import FAB from '../components/FAB';
import { giveUrl } from '../utils/api_service';
import { useNavigation } from "@react-navigation/core";



var database = require('../data/insta_db.json');
const windowHeight = Dimensions.get('window').height;
const blockHeight = windowHeight / 2;
const color1 = '#FFB84C';
const color2 = '#F16767';


const Game = () => {
    const initialState = {
        username: 'joesmith',
        fullname: 'Joe Smith',
        is_verified: true,
        followers_count: 234090,
        image_url: "https://"
    };
    const navigation = useNavigation();


    const [isAnimating, setIsAnimating] = useState(false);
    const [animatedValue] = useState(new Animated.Value(0));

    const [colorA, setColorA] = useState(color1);
    const [colorB, setColorB] = useState(color2);
    const [colorC, setColorC] = useState(color1);


    const [btn_hide, setBtn_hide] = useState(false);
    const [hideFollowers, setHideFollowers] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const [stateA, updateStateA] = useReducer(
        (state: any, updates: any) => ({ ...state, ...updates }),
        initialState,
    );

    const [stateB, updateStateB] = useReducer(
        (state: any, updates: any) => ({ ...state, ...updates }),
        initialState,
    );

    const [stateC, updateStateC] = useReducer(
        (state: any, updates: any) => ({ ...state, ...updates }),
        initialState,
    );

    const giveIdx = () => {
        return Math.floor(Math.random() * (database.length - 1 - 0 + 1));
    };

    const initGame = async () => {
        let idx1 = giveIdx();
        let idx2 = giveIdx();
        let idx3 = giveIdx();
        updateStateA(database[idx1]);
        updateStateB(database[idx2]);
        updateStateC(database[idx3]);
        giveUrl(database[idx1].username).then(resp => {
            updateStateA({ image_url: resp.data.data.user.profile_pic_url_hd });
        })
        giveUrl(database[idx2].username).then(resp => {
            updateStateB({ image_url: resp.data.data.user.profile_pic_url_hd });
        })
        giveUrl(database[idx3].username).then(resp => {
            updateStateC({ image_url: resp.data.data.user.profile_pic_url_hd });
        })
    };

    useEffect(() => {
        initGame();
    }, []);

    const transferState = () => {
        setColorA(colorB);
        setColorB(colorC);
        setColorC(colorB);
        updateStateA(stateB);
        updateStateB(stateC);
        let idx3 = giveIdx();
        updateStateC(database[idx3]);
        giveUrl(database[idx3].username).then(resp => {
            updateStateC({ image_url: resp.data.data.user.profile_pic_url });
        })
    };

    const handleButtonPress = (isUp: boolean) => {
        setIsAnimating(true);
        setBtn_hide(true);
        setHideFollowers(false);
        if ((isUp && stateB.followers_count >= stateA.followers_count) ||
            (!isUp && stateA.followers_count >= stateB.followers_count)) {
            setScore(score + 1);
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }).start(() => {
                setIsAnimating(false);
                transferState();
                setBtn_hide(false);
                setHideFollowers(true);
                animatedValue.setValue(0);
            });
        } else {
            setGameOver(true);
        }
    };

    const blockStyleA = {
        backgroundColor: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [colorA, colorA],
        }),
        height: blockHeight,
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -blockHeight],
                }),
            },
        ],
    };

    const blockStyleB = {
        backgroundColor: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [colorB, colorB],
        }),
        height: blockHeight,
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -blockHeight],
                }),
            },
        ],
    };

    const blockStyleC = {
        backgroundColor: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [colorC, colorC],
        }),
        height: blockHeight,
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -blockHeight],
                }),
            },
        ],
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Animated.View style={blockStyleA}>
                <CustomCard
                    fullname={stateA.fullname}
                    username={stateA.username}
                    followers={stateA.followers_count}
                    image_url={stateA.image_url}
                />
            </Animated.View>
            <Animated.View style={blockStyleB}>
                <CustomCard
                    fullname={stateB.fullname}
                    username={stateB.username}
                    followers={stateB.followers_count}
                    image_url={stateB.image_url}
                    hideFollowers={hideFollowers}
                />
            </Animated.View>
            <Animated.View style={blockStyleC}>
                <CustomCard
                    fullname={stateC.fullname}
                    username={stateC.username}
                    followers={stateC.followers_count}
                    image_url={stateC.image_url}
                    hideFollowers={true}
                />
            </Animated.View>
            {!btn_hide && <FAB color="#056016" name="arrow-up-bold" isUp={true} handleButtonPress={() => handleButtonPress(true)} />}
            {!btn_hide && <FAB color="#B50F27" name="arrow-down-bold" isUp={false} handleButtonPress={() => handleButtonPress(false)} />}

            {gameOver && <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{
                    backgroundColor: "#FFB84C",
                    borderRadius: 0, width: "100%",
                    padding: 15,
                    alignItems: "center",
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center',
                }}>
                <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
                    HOME
                </Text>
            </TouchableOpacity>}
            <View
                style={{
                    backgroundColor: "#fff",
                    borderRadius: 0, width: "100%",
                    padding: 1,
                    alignItems: "center",
                    position: 'absolute',
                    bottom: "45%",
                    alignSelf: 'center',
                }}>
                <Text style={{ fontSize: 40, fontWeight: "bold", color: "#000" }}>
                    {score}
                </Text>
            </View>



        </SafeAreaView>
    );
}

export default Game;

const styles = StyleSheet.create({
});
