import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "./ResponseScreen.style";

import { COLORS, icons } from "../../constants";
import axios from 'axios';
import URL from '../../constants/url';
import { ScrollView } from 'react-native-gesture-handler';

const ResponseScreen = (props) => {

    const [recipeId, setRecipeId] = useState(props.props._id);
    const [recipe, setRecipe] = useState(props.props);

    // const updateRecipe = () => {
    //     setRecipe(newRecipe);
    // }

    const apiUrl = URL.baseURL+'/prompts/getRecipeById'

    const handleRefresh = () => {
        axios.get(`${apiUrl}/${recipeId}`).then((response) => {
            setRecipe(response.data.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <View style={styles.container}>
            { recipe.status !== 'RESPONSE GENERATED' && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRefresh}
                >
                    <Image
                        source={icons.refresh}
                        resizeMode='contain'
                        style={styles.buttonText}
                    />
                </TouchableOpacity>
            )}
            <Text style={styles.text}>Hello Chef! 🧑🏼‍🍳</Text>
            <ScrollView style={{ marginTop: 20, marginBottom: 20 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.llmResponse}>{recipe.llmResponse}</Text>
                { recipe.status !== 'RESPONSE GENERATED' && (
                    <View style={styles.status}>
                        <Text style={styles.text}>Current Status: {recipe.status}</Text>
                    </View>
                ) }
            </ScrollView>
        </View>
    )
}

export default ResponseScreen;