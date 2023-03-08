import { ImageBackground, StyleSheet, Text } from 'react-native';
import React from 'react';

const CustomCard = (props: any) => {
  return (
    <ImageBackground source={{
      uri: props.image_url,
    }} imageStyle={{ opacity: 0.6 }} style={styles.container}>
      <Text style={styles.fullname}>{props.fullname}</Text>
      <Text style={styles.username}>@{props.username}</Text>
      <Text style={styles.generalText}>has</Text>
      <Text style={styles.followers}>{props.followers}</Text>
      <Text style={styles.generalText}>followers</Text>
    </ImageBackground>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: "#000",
    flex: 1,
  },
  fullname: {
    marginTop: 40,
    fontSize: 40,
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
  },
  image: {
    width: 100,
    height: 100,
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
