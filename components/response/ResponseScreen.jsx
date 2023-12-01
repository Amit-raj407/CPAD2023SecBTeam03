import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "./ResponseScreen.style";

import { COLORS, icons } from "../../constants";
import axios from 'axios';

const ResponseScreen = (props) => {

    const [recipeId, setRecipeId] = useState(props.props._id);
    const [recipe, setRecipe] = useState(props.props);

    // const updateRecipe = () => {
    //     setRecipe(newRecipe);
    // }

    const apiUrl = 'http://10.207.128.244:3000/prompts/getRecipeById'

    const handleRefresh = () => {
        axios.get(`${apiUrl}/${recipeId}`).then((response) => {
            setRecipe(response.data.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        console.log("Hello", props)
        console.log(props.props);
        console.log(recipeId);
    }, [])
    return (
        <View style={styles.container}>
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
            <Text style={styles.text}>Hello Chef</Text>
            <Text style={styles.text}>{recipe.llmResponse}</Text>
            <View style={styles.status}>
                <Text style={styles.text}>Current Status: {recipe.status}</Text>
            </View>
        </View>
    )
}

export default ResponseScreen;