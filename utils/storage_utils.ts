import AsyncStorage from '@react-native-async-storage/async-storage';

const giveHighScore = async () => {
    try {
        const value = await AsyncStorage.getItem('HIGHSCORE');
        if (value !== null) {
            return parseInt(value);
        } else {
            return 0;
        }
    } catch (error) {
        console.log(error);
    }
}

const updateHighScore = async (score: number) => {
    try {
        await AsyncStorage.setItem('HIGHSCORE', score.toString());
    } catch (error) {
        console.log(error);
    }
}
export { giveHighScore, updateHighScore };

