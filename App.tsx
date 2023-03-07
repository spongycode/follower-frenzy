import React, {useEffect, useReducer, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import CustomCard from './components/CustomCard';
import FAB from './components/FAB';
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
    image_url: "https://"
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
    <SafeAreaView style={{flex: 1}}>
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
          />
      </Animated.View>
      <Animated.View style={blockStyleC}>
        <CustomCard
          fullname={stateC.fullname}
          username={stateC.username}
          followers={stateC.followers_count}
          image_url={stateC.image_url}
          />
      </Animated.View>
      {!btn_hide && <FAB color="#B50F27" name="arrow-down-bold" isUp={false} handleButtonPress={handleButtonPress}/>}
      {!btn_hide && <FAB color="#056016" name="arrow-up-bold" isUp={true} handleButtonPress={handleButtonPress}/>}


    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
});
