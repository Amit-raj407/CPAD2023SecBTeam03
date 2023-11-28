import { View, Text } from 'react-native';
import ResponseScreen from '../../components/response/ResponseScreen'
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

const Response = (props: any) => {

const [item, setItem] = useState(useLocalSearchParams());
    
  return (
    <View style={{ flex: 1 }}>
      <ResponseScreen props = {item} />
    </View>
  );
}

export default Response