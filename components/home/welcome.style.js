import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  userNameDarkTheme: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  welcomeMessageDarkTheme: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: 'white',
    marginTop: 2,
  },
  welcomeTagLine: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginBottom: 5,
  },
  welcomeBody: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginTop: 50,
    marginBottom: 50,
  },
  welcomeBodyDarkTheme: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.white,
    marginTop: 50,
    marginBottom: 50,
  },
  welcomeSnapMessage: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginTop: 30,
    marginBottom: 30,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  buttonTryOut: {
    backgroundColor: '#007BFF', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: '50%',
    alignSelf: 'center',
    marginBottom: 20
  },
  buttonTryOutText: {
    color: 'white', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the overlay color and opacity
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;
