import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/core";

const GameOverButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 30, fontWeight: "bold", color: "red" }}>
                    GAME OVER
                </Text>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginLeft: 10, }}>
                        Tap to
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginLeft: 10, }}>
                        Continue
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default GameOverButton

const styles = StyleSheet.create({})