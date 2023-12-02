// CameraComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Button } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

import styles from "./CameraScreen.style";
import { COLORS, icons } from "../../constants";
import URL from '../../constants/url';
import { useRouter } from 'expo-router';

// const apiUrl = 'https://glamorous-tan-pangolin.cyclic.app/prompts/getRecipe';
const apiUrl = URL.baseURL + '/prompts/getRecipe';
const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dyh2a0lou/image/upload'

const router = useRouter();

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Photo:', photo);
      setCapturedImage(photo.uri);
      setPreviewVisible(true);
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const submitPicture = async () => {
    console.log('Submit photo to backend:', capturedImage);
    let newFile = {
      uri: capturedImage,
      type: `test/${capturedImage.split(".")[1]}`,
      name: `test.${capturedImage.split(".")[1]}`
    }
    sendPhotoToBackend(newFile);
  };

  const sendPhotoToBackend = async (photo) => {
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', 'CookItUp');
    formData.append('cloud_name', 'dyh2a0lou');
  
    fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData
    }).then(res => res.json()
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
      <Modal visible={isPreviewVisible} transparent={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {capturedImage && <Image source={{ uri: capturedImage }} style={{ width: '100%', height: '80%' }} />}
          <View style={styles.buttonPreviewContainer}>
            <TouchableOpacity style={styles.buttonPreview} onPress={retakePicture}>
              <Text style={styles.buttonPreviewText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPreview} onPress={submitPicture}>
              <Text style={styles.buttonPreviewText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CameraScreen;
