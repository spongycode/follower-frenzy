import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { giveHighScore } from '../utils/storage_utils'
import { useState } from "react";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

const Home = () => {
    const navigation = useNavigation();

    const [highScore, setHighScore] = useState(0);

    const focus = useIsFocused();

    useEffect(() => {
        if (focus == true) {
            giveHighScore().then((val: any) => {
                setHighScore(val);
            })
        }
    }, [focus]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFB84C", alignItems: "center", justifyContent: "center" }}>
            <View style={{ position: "absolute", top: "25%", alignItems: "center" }}>
                <Text style={{
                    fontSize: 30, fontWeight: "400",
                    color: "#fff", letterSpacing: 3,
                    fontFamily: "tiltwarp"
                }}>
                    HIGH SCORE
                </Text>
                <Text style={{
                    fontSize: 50, fontWeight: "800",
                    color: "#fff",
                    fontFamily: "tiltwarp"
                }}>
                    {highScore}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Game')}
                style={{
                    backgroundColor: "#F16767",
                    borderRadius: 10, width: 200,
                    padding: 20,
                    alignItems: "center"
                }}>
                <Text style={{ fontSize: 40, fontWeight: "800", letterSpacing: 1, color: "#fff" }}>
                    START
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Home;
