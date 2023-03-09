import { StyleSheet, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Life = (props: any) => {
    return (
        <View
            style={{
                backgroundColor: "#D7F2F5",
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 2,
                alignItems: "center",
                position: 'absolute',
                top: 15,
                left: 15,
                alignSelf: 'center',
            }}>
            <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-evenly" }}>
                {props.life == 3 ? <>
                    <MaterialCommunityIcons name="heart" size={28} color="red" />
                    <MaterialCommunityIcons name="heart" size={28} color="red" />
                    <MaterialCommunityIcons name="heart" size={28} color="red" />
                </> : props.life == 2 ? <>
                    <MaterialCommunityIcons name="heart" size={28} color="red" />
                    <MaterialCommunityIcons name="heart" size={28} color="red" />
                    <MaterialCommunityIcons name="heart" size={28} color="gray" />
                </> : props.life == 1 ? <>
                    <MaterialCommunityIcons name="heart" size={28} color="red" />
                    <MaterialCommunityIcons name="heart" size={28} color="gray" />
                    <MaterialCommunityIcons name="heart" size={28} color="gray" />
                </> : <>
                    <MaterialCommunityIcons name="heart" size={28} color="gray" />
                    <MaterialCommunityIcons name="heart" size={28} color="gray" />
                    <MaterialCommunityIcons name="heart" size={28} color="gray" />
                </>}
            </View>
        </View >
    )
}

export default Life

const styles = StyleSheet.create({
})