// CameraComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

import styles from "./CameraScreen.style";
import { COLORS, icons } from "../../constants";

const apiUrl = 'http://localhost:3000/prompts/getRecipeFromImage';

const sendPhotoToBackend = async (photo) => {
  const formData = new FormData();
  formData.append('photo', {
    uri: photo.uri,
    type: 'image/jpeg',
    name: 'photo.jpg',
  });

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // Handle the response from the backend as needed.
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Photo:', photo);
      sendPhotoToBackend(photo);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={cameraRef}>
        <View style={ styles.buttonContainer }>
          <TouchableOpacity
            style={ styles.button }
            onPress={takePicture}>
            <Image
              source={icons.camera}
              resizeMode='contain'
              style={styles.buttonText}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
