import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    width: "20%",
    alignSelf: "center",
    marginBottom: "10%",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    width: 60,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.black
  },
});

export default styles;
