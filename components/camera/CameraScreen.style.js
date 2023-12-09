import { StyleSheet } from "react-native";

import { COLORS} from "../../constants";

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
  buttonPreview: {
    flex: 1,
    alignSelf: "flex-end",
    borderRadius: 20,
    backgroundColor: '#3498db',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    height: 30
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker background
  },
  buttonPreviewContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  retakeButton: {
    backgroundColor: 'tomato',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    height: 40,
  },
  submitButton: {
    backgroundColor: 'limegreen',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    height: 40,
  },
  buttonPreviewText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
