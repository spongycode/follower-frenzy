import React, { useEffect, useReducer, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
    Animated,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import CustomCard from '../components/CustomCard';
import FAB from '../components/FAB';
import { giveUrl } from '../utils/api_service';
import Score from '../components/Score';
import HighScore from '../components/HighScore';
import GameOverButton from '../components/GameOverButton';
import { giveHighScore, updateHighScore } from '../utils/storage_utils';
import { useBackHandler } from '@react-native-community/hooks';
import { useNavigation } from "@react-navigation/core";
import Life from '../components/Life';

var database = require('../data/insta_db.json');
const windowHeight = Dimensions.get('window').height;
const blockHeight = windowHeight / 2;
const color1 = '#000';
const color2 = '#000';


const Game = () => {

    const navigation = useNavigation();

    const initialState = {
        username: 'joesmith',
        fullname: 'Joe Smith',
        is_verified: true,
        followers_count: 234090,
        image_url: "https://"
    };


    const [isAnimating, setIsAnimating] = useState(false);
    const [animatedValue] = useState(new Animated.Value(0));

    const [colorA, setColorA] = useState(color1);
    const [colorB, setColorB] = useState(color2);
    const [colorC, setColorC] = useState(color1);


    const [btn_hide, setBtn_hide] = useState(false);
    const [hideFollowers, setHideFollowers] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const [highScore, setHighScore] = useState(0);
    const [life, setLife] = useState(3);


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
        return Math.floor(Math.random() * (database.length));
    };

    const displayHighScore = () => {
        giveHighScore().then((val: any) => {
            setHighScore(val);
        })
    }


    const initGame = async () => {
        setScore(0);
        displayHighScore();
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


    const createTwoButtonAlert = (() => {
        Alert.alert('Confirm Exit', 'Are you sure you want to exit? Any unsaved progress will be lost. 😱', [
            {
                text: 'Keep Playing 🎮',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Exit Game 🚪', onPress: () => { console.log('OK Pressed'); navigation.goBack() } },
        ])
    });

    useEffect(() => {
        initGame();
    }, []);

    useBackHandler(() => {
        createTwoButtonAlert();
        return true;
    })

    const transferState = () => {
        setColorA(colorB);
        setColorB(colorC);
        setColorC(colorB);
        updateStateA(stateB);
        updateStateB(stateC);
        giveUrl(stateB.username).then(resp => {
            updateStateA({ image_url: resp.data.data.user.profile_pic_url_hd });
        })
        giveUrl(stateC.username).then(resp => {
            updateStateB({ image_url: resp.data.data.user.profile_pic_url_hd });
        })
        let idx3 = giveIdx();
        updateStateC(database[idx3]);
        giveUrl(database[idx3].username).then(resp => {
            updateStateC({ image_url: resp.data.data.user.profile_pic_url_hd });
        })
    };

    const handleButtonPress = (isUp: boolean) => {
        setIsAnimating(true);
        setBtn_hide(true);
        setHideFollowers(false);
        if ((isUp && stateB.followers_count >= stateA.followers_count) ||
            (!isUp && stateA.followers_count >= stateB.followers_count)) {
            updateHighScore(Math.max(score + 1, highScore));
            setHighScore(Math.max(score + 1, highScore));
            setScore(score + 1);
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {
                setIsAnimating(false);
                transferState();
                setBtn_hide(false);
                setHideFollowers(true);
                animatedValue.setValue(0);
            });
        } else if (life > 0) {
            setLife(life - 1);
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 200,
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

            {gameOver && <GameOverButton />}
            <Score score={score} />
            <HighScore highScore={highScore} />
            <Life life={life} />



        </SafeAreaView>
    );
}

export default Game;

const styles = StyleSheet.create({
});
