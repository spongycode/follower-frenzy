import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomCard = (props: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fullname}>{props.fullname}</Text>
      <Text style={styles.username}>@{props.username}</Text>
      <Text style={styles.generalText}>has</Text>
      <Text style={styles.followers}>{props.followers}</Text>
      <Text style={styles.generalText}>followers</Text>
    </View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  fullname: {
    marginTop: 40,
    fontSize: 40,
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
  },
  username: {
    marginTop: 5,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  generalText: {
    fontSize: 20,
    marginTop: 10,
    color: '#fff',
    fontWeight: '400',
  },
  followers: {
    marginTop: 10,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
  },
});
