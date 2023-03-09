import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HighScore = (props: any) => {
    return (
        <View
            style={{
                backgroundColor: "#FFB84C",
                borderRadius: 10,
                paddingHorizontal: 20,
                alignItems: "center",
                position: 'absolute',
                top: 15,
                right: 15,
                alignSelf: 'center',
            }}>
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
                {props.highScore}

            </Text>
        </View>
    )
}

export default HighScore

const styles = StyleSheet.create({
})