import React, { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Platform, Animated } from 'react-native';
import { Text, View } from '../../components/Themed';
import URL from '../../constants/url';


interface RecipeHistory {
  _id: string;
  request: string;
  status: string;
  llmResponse: string;
  createdDate: string;
  isFavorite:boolean;
}

const ITEM_MARGIN_BOTTOM = 20;
const ITEM_PADDING = 10;
export default function TabTwoScreen() {

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [data, setData] = useState<RecipeHistory[]>([]);
  const [filteredData, setFilteredData] = useState<RecipeHistory[]>([]); // New state for filtered data
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
        const apiUrl = URL.baseURL+'/prompts/getAllRecipes';
        fetch(apiUrl)
        .then((res) =>res.json())
        .then((resJson) =>{setData(resJson.data)})
        .catch((error) => {
          console.log("Request API Error: ", error);
        }).finally(() => setIsLoading(false));

    };

    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, searchQuery]);

  const filterData = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = data.filter((item) => item.request.toLowerCase().includes(lowerCaseQuery));
    setFilteredData(filtered);
  };

  const renderItem = ({ item, index }: { item: RecipeHistory; index: number }) => {
    
    const scale = scrollY.interpolate({
      inputRange: [
        -1, 0,
        100 * index,
        100 * (index + 2)
      ],
      outputRange : [1, 1, 1, 0]
    })

    const handleItemPress = () => {
      console.log("press");
      router.push({
        pathname: '../response/response',
        params: item as any,
      })
    };

    return (
      <Animated.View style={[styles.item, {transform:[{scale}]}]}>
        <TouchableOpacity onPress={handleItemPress}>
          <View style={styles.wrapText}>
            <Text style={styles.fontSize}>{item.request}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Image
            source={item.isFavorite ? require('../../assets/icons/heart.png') : require('../../assets/icons/heart-ol.png')}
            style={styles.heartIcon}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Recipe..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sort</Text>
        </TouchableOpacity> */}
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Animated.FlatList
        data={filteredData} // Use filteredData instead of data
        keyExtractor={(item) => `${item._id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            padding: 20
          }}
          onScroll = { 
            Animated.event(
              [{nativeEvent : {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true}
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fontSize: {
    fontSize: 18
  },
  wrapText: {
    flex: 0.8,
    marginLeft: 10,
    justifyContent: "center",
    paddingRight: 50
  },
  item: {
    flexDirection: 'row',
    marginBottom: ITEM_MARGIN_BOTTOM,
    borderRadius: 10,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 20,
      },
    }),
    padding: ITEM_PADDING,
  },
  favoriteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 7,
    flex: 0.2,
    justifyContent: 'center',
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: 'red',
  },
  searchInput: {
    height: "100%",
    width: "90%",
    borderColor: 'gray',
    borderWidth: 1,
    margin: "2%",
    paddingLeft: "5%",
    backgroundColor: 'white',
    borderRadius: 50,
  },
  button: {
    paddingLeft: "5%",
    paddingRight: "5%",
    marginLeft: "5%",
    width: 'auto',
    padding: "3%",
    borderRadius: 50,
    backgroundColor: 'pink',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center'
  },
});
