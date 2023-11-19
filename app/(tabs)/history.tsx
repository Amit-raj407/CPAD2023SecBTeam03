import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Platform, Animated } from 'react-native';
import { Text, View } from '../../components/Themed';
import {historyMockData} from "../../mock/History";

interface RecipeHistory {
  id: string;
  queryString: string;
  isFavorite?: boolean;
  recipe: {
    name: string;
    description: string;
    ingredients: string;
    instructions: string;
  }[];
  createdAt: string;
}

const BG_IMG = "https://cdn.pixabay.com/photo/2016/11/19/11/38/avocado-1838785_1280.jpg";
const ITEM_MARGIN_BOTTOM = 20;
const ITEM_PADDING = 10;
export default function TabTwoScreen() {

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [data, setData] = useState<RecipeHistory[]>([]);
  const [filteredData, setFilteredData] = useState<RecipeHistory[]>([]); // New state for filtered data
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(historyMockData.response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, searchQuery]);

  const filterData = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = data.filter((item) => item.recipe[0].name.toLowerCase().includes(lowerCaseQuery));
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

    return (
      <Animated.View style={[styles.item, {transform:[{scale}]}]}>
        <View style={styles.wrapText}>
          <Text style={styles.fontSize}>{item.recipe[0].name}</Text>
        </View>
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sort</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Animated.FlatList
        data={filteredData} // Use filteredData instead of data
        keyExtractor={(item) => `${item.id}`}
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
    flex: 1,
    marginLeft: 10,
    justifyContent: "center"
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
        shadowOpacity: 0.5,
        shadowRadius: 20,
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
    padding: 10,
  },
  heartIcon: {
    width: 30,
    height: 30,
    tintColor: 'red',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    width: 250
  },
  button: {
    paddingLeft: 10,
    padding: 10,
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
  },
});
