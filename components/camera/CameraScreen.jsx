// CameraComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

import styles from "./CameraScreen.style";
import { COLORS, icons } from "../../constants";
import URL from '../../constants/url';
import { useRouter } from 'expo-router';

// const apiUrl = 'https://glamorous-tan-pangolin.cyclic.app/prompts/getRecipe';
const apiUrl = URL.baseURL+'/prompts/getRecipe';
const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dyh2a0lou/image/upload'

const router = useRouter();

const sendPhotoToBackend = async (photo) => {
  const formData = new FormData();
  formData.append('file', photo);
  formData.append('upload_preset', 'CookItUp');
  formData.append('cloud_name', 'dyh2a0lou');
  
  fetch(cloudinaryUrl, {
    method: 'POST',
    body: formData
  }).then( res => res.json()
  ).then(res => {
    console.log(res.url)
    const requestBody = {
      searchQuery: res.url,
      type: 'Image',
    };
    axios.post(apiUrl, {
      params: requestBody,  // Include the request body as parameters
      headers: {
        // Include any headers if needed
        'Content-Type': 'application/json',
        // Add other headers as needed
      },
    }).then(response => {
      // Handle successful response
      console.log(response.data.res.responseBody);
      router.push({
        pathname: 'response/response',
        params: response.data.res.responseBody
      })
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });
  }).catch(err => {
    console.log(err)
  })
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
      let newFile = {
        uri: photo.uri,
        type: `test/${photo.uri.split(".")[1]}`,
        name: `test.${photo.uri.split(".")[1]}`
      }
      sendPhotoToBackend(newFile);
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
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
