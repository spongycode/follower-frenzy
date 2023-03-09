import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { giveHighScore } from '../utils/storage_utils'
import { useState } from "react";

const Home = () => {
    const navigation = useNavigation();

    const [highScore, setHighScore] = useState(0);

    giveHighScore().then((val: any) => {
        setHighScore(val);
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFB84C", alignItems: "center", justifyContent: "center" }}>
            <View style={{ position: "absolute", top: "25%", alignItems: "center" }}>
                <Text style={{
                    fontSize: 30, fontWeight: "600",
                    color: "#fff",
                }}>
                    HIGH SCORE
                </Text>
                <Text style={{
                    fontSize: 50, fontWeight: "600",
                    color: "#fff",
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
                <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
                    PLAY
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Home;
