import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Score = (props: any) => {
    return (
        <View
            style={{
                backgroundColor: "#fff",
                borderRadius: 0, width: "100%",
                padding: 1,
                alignItems: "center",
                position: 'absolute',
                bottom: "45%",
                alignSelf: 'center',
            }}>
            <Text style={{ fontSize: 40, fontWeight: "bold", color: "#000" }}>
                {props.score}
            </Text>
        </View>
    )
}

export default Score

const styles = StyleSheet.create({
})