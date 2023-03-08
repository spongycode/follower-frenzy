import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
const Home = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFB84C", alignItems: "center", justifyContent: "center" }}>
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
