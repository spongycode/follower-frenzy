import React, {useState} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const blockHeight = windowHeight / 2;
const color1 = '#FFB84C';
const color2 = '#F16767';

const App = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const [blockACount, setBlockACount] = useState(1);
  const [blockBCount, setBlockBCount] = useState(2);
  const [blockCCount, setBlockCCount] = useState(3);
  const [colorA, setColorA] = useState(color1);
  const [colorB, setColorB] = useState(color2);
  const [colorC, setColorC] = useState(color1);

  const [btn_hide, setBtn_hide] = useState(false);

  const updateText = () => {
    setBlockACount(blockBCount);
    setBlockBCount(blockCCount);
    setBlockCCount(blockCCount + 1);
    setColorA(colorB);
    setColorB(colorC);
    setColorC(colorB);
  };

  const handleButtonPress = () => {
    setIsAnimating(true);
    setBtn_hide(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setIsAnimating(false);
      updateText();
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
    <View>
      <Animated.View style={blockStyleA}>
        <Text style={styles.blockText}>
          {'Block ' + blockACount.toString()}
        </Text>
      </Animated.View>
      <Animated.View style={blockStyleB}>
        <Text style={styles.blockText}>
          {'Block ' + blockBCount.toString()}
        </Text>
        {!btn_hide ? (
          <TouchableOpacity
            style={styles.swipeButton}
            onPress={handleButtonPress}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
              SWIPE
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </Animated.View>
      <Animated.View style={blockStyleC}>
        <Text style={styles.blockText}>
          {'Block ' + blockCCount.toString()}
        </Text>
      </Animated.View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
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
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
});
