import React, { useEffect, useReducer, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import CustomCard from './components/CustomCard';
import FAB from './components/FAB';
import { giveUrl } from './utils/api_service';

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
      updateStateC({ image_url: resp.data.data.user.profile_pic_url_hd });
    })
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
      {!btn_hide && <FAB color="#B50F27" name="arrow-down-bold" isUp={false} handleButtonPress={handleButtonPress} />}
      {!btn_hide && <FAB color="#056016" name="arrow-up-bold" isUp={true} handleButtonPress={handleButtonPress} />}


    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
});
