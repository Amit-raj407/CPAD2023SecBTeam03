import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: "10%",
        backgroundColor: COLORS.lightWhite
    },
    text: {
       
            fontFamily: FONT.bold,
            fontSize: SIZES.xLarge,
            color: COLORS.primary,
            marginTop: 2,
        
    },
    button: {
        width: '40%',
        backgroundColor: '#3498db',
        padding: 0,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        height: "7%",
        width: "15%",
        alignSelf: 'flex-end'
    },
    buttonText: {
        width: "80%",
        height: "50%",
        tintColor: COLORS.black
    },
    status: {
        marginTop: 20,
        backgroundColor: '#E0FDA5', 
        borderRadius: 10, 
        paddingHorizontal: 15,
        paddingVertical: 15
    }
})


export default styles;