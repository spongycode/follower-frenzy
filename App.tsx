import React, {useEffect, useReducer, useState} from 'react';
import {
  Animated,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import CustomCard from './components/CustomCard';
var database = require('./data/insta_db.json');
const windowHeight = Dimensions.get('window').height;
const blockHeight = windowHeight / 2;
const color1 = '#FFB84C';
const color2 = '#F16767';

const App = () => {
  const initialState = {
    username: 'joesmith',
    fullname: 'Joe Smith',
    is_verified: true,
    followers_count: 234090,
  };

  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const [colorA, setColorA] = useState(color1);
  const [colorB, setColorB] = useState(color2);
  const [colorC, setColorC] = useState(color1);

  const [btn_hide, setBtn_hide] = useState(false);

  const [stateA, updateStateA] = useReducer(
    (state: any, updates: any) => ({...state, ...updates}),
    initialState,
  );

  const [stateB, updateStateB] = useReducer(
    (state: any, updates: any) => ({...state, ...updates}),
    initialState,
  );

  const [stateC, updateStateC] = useReducer(
    (state: any, updates: any) => ({...state, ...updates}),
    initialState,
  );

  const giveIdx = () => {
    return Math.floor(Math.random() * (database.length - 1 - 0 + 1));
  };

  const initGame = () => {
    updateStateA(database[giveIdx()]);
    updateStateB(database[giveIdx()]);
    updateStateC(database[giveIdx()]);
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
    updateStateC(database[giveIdx()]);
  };

  const handleButtonPress = () => {
    setIsAnimating(true);
    setBtn_hide(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setIsAnimating(false);
      transferState();
      setBtn_hide(false);
      animatedValue.setValue(0);
    });
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
    <SafeAreaView>
      <Animated.View style={blockStyleA}>
        <CustomCard
          fullname={stateA.fullname}
          username={stateA.username}
          followers={stateA.followers_count}
        />
      </Animated.View>
      <Animated.View style={blockStyleB}>
        <CustomCard
          fullname={stateB.fullname}
          username={stateB.username}
          followers={stateB.followers_count}
        />
        {!btn_hide ? (
          <View style={styles.btn_container}>
            <TouchableOpacity
              style={styles.swipeButton}
              onPress={handleButtonPress}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
                LOW
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.swipeButton}
              onPress={handleButtonPress}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
                HIGH
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </Animated.View>
      <Animated.View style={blockStyleC}>
        <CustomCard
          fullname={stateC.fullname}
          username={stateC.username}
          followers={stateC.followers_count}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  btn_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  blockText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#fff',
    alignSelf: 'center',
    margin: 100,
  },
  swipeButton: {
    backgroundColor: '#4C4B16',
    width: 100,
    alignItems: 'center',
    padding: 20,
    borderRadius: 6,
  },
});
