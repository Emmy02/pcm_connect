import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Modal,
  View,
  TextInput,
  ScrollView,
  Text,
} from "react-native";

import Screen from "./Screen";

import Title from "./Title";

import { createClient } from "pexels";
import { colors } from "../config";
import { TouchableOpacity } from "react-native-gesture-handler";

function ImageModal({ onPress, modalVisible = false, setModalVisible }) {
  const [photos, setPhotos] = useState([]);

  const client = createClient(
    "563492ad6f91700001000001f02799b4e2cc48488ad0f5ec036edc3c"
  );

  const getPhotos = (query) => {
    client.photos
      .search({ query, per_page: 20 })
      .then((res) => setPhotos(res.photos || []));
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <Screen style={styles.centeredView}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
          <View style={styles.search}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => getPhotos(text)}
            />
          </View>
          <Title>Select Images</Title>
          <ScrollView horizontal style={styles.imagesContainer}>
            {photos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onPress(photo.src.medium);
                  setModalVisible(false);
                }}
              >
                <Image
                  style={{
                    height: 200,
                    width: 200,
                    borderRadius: 10,
                    margin: 5,
                  }}
                  source={{ uri: photo.src.medium }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Screen>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
  centeredView: {
    flex: 1,
    padding: 10,
  },
  modalView: {
    flex: 1,
  },
  textInput: {
    borderRadius: 10,
    borderColor: colors.primary,
    backgroundColor: colors.light,
    padding: 10,
  },
  imagesContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  container: { width: "100%", overflow: "hidden", zIndex: 999 },
});

export default ImageModal;
