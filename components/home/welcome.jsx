import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { COLORS, icons, SIZES } from "../../constants";


const Welcome = () => {
  const router = useRouter();

  const welcomeTagLine = `"Say Cheese to Cooking Ease"`
  const welcomeBodyMessage = `No more guesswork in the kitchen. Our app takes the mystery out of ingredients and turns you into a gourmet chef`;
  const welcomeSnapMessage = `📸 Capture ingredients with a click, and let our app whip up personalized recipes just for you. Unleash your inner chef effortlessly! 🍳🧙‍♂️`;

  const [searchText, setSearchText] = useState('')
  const handleSearch = () => {
    // API request with search text
    console.log('Searching for:', searchText);
  };

  const redirectToCamera = () => {
    console.log('Open Camera')
    router.push('/camera/camera');
  }

  const colorScheme = useColorScheme();

  return (

    <View>
      <View style={styles.container}>
        <Text style={ colorScheme === 'dark'? styles.userNameDarkTheme : styles.userName }>Hello Chef! 🧑🏼‍🍳</Text>
        <Text style={ colorScheme === 'dark'? styles.welcomeMessageDarkTheme : styles.welcomeMessage }>Find your perfect recipe</Text>
        <View style= { colorScheme === 'dark' ? { flex: 1, height: 1, backgroundColor: 'white' } : { flex: 1, height: 1, backgroundColor: 'black' } } />

        <View style={{ borderColor: 'gray', marginTop: 50, backgroundColor: '#F5EEC6', alignItems: "center", borderRadius: 10, padding: 10 }}>
          <Text style={styles.welcomeTagLine}>{welcomeTagLine}</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              placeholder='What are your ingredients?'
            />
          </View>

          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Image
              source={icons.search}
              resizeMode='contain'
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text style= {colorScheme === 'dark' ? styles.welcomeBodyDarkTheme : styles.welcomeBody}>{welcomeBodyMessage}
          </Text>
        </View>

        <View>
          <View style={{ backgroundColor: '#E0FDA5', borderRadius: 10, paddingHorizontal: 10 }}>
            <Text style={styles.welcomeSnapMessage}>{welcomeSnapMessage}
            </Text>
            <TouchableOpacity style={styles.buttonTryOut} onPress={redirectToCamera}>
              <Text style={styles.buttonTryOutText}>Try out!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
