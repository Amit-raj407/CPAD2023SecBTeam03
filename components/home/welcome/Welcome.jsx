import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { COLORS, icons, SIZES } from "../../../constants";

// const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  // const [activeJobType, setActiveJobType] = useState("Full-time");

  const welcomeTagLine = `"Say Cheese to Cooking Ease"`
  const welcomeBodyMessage = `No more guesswork in the kitchen. Our app takes the mystery out of ingredients and turns you into a gourmet chef`;

  return (

    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello User</Text>
        <Text style={styles.welcomeMessage}>Find your perfect recipe</Text>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        
        <View style={{ borderColor:'gray',borderBottomWidth:1,borderTopWidth:1, marginTop: 50, backgroundColor: ['#f5f5f5', '#fbfbfb'] }}>
          <Text style={styles.welcomeTagLine}>{welcomeTagLine}</Text>
        </View>

        <Text style={styles.welcomeBody}>{welcomeBodyMessage}
        </Text>
      
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View> */}
    </View>
  );
};

export default Welcome;
