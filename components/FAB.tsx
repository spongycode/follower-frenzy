import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FAB = (props: any) => {
   
  return (
      props.isUp? 
        <TouchableOpacity
        style={[styles.fabStyle, {backgroundColor: props.color, right: 30}]}
        onPress={() => props.handleButtonPress()}>
        <MaterialCommunityIcons name={props.name} size={70} color="#fff" />
        </TouchableOpacity>:  <TouchableOpacity
        style={[styles.fabStyle, {backgroundColor: props.color, left: 30}]}
        onPress={() => props.handleButtonPress()}>
        <MaterialCommunityIcons name={props.name} size={70} color="#fff" />
        </TouchableOpacity>
    
  );
};
const styles = StyleSheet.create({
  fabStyle: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
export default FAB;
