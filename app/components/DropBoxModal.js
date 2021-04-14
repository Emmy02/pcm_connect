import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  View,
  Text,
  ScrollView,
} from "react-native";

//import { Dropbox } from "dropbox";

import Screen from "./Screen";

import Title from "./Title";
import { colors } from "../config";

function DropBoxModal({ onPress, modalVisible = false, setModalVisible }) {
  const [custom, setCustom] = useState([]);
  const [church, setChurch] = useState([]);
  const [friends, setFriends] = useState([]);
  const [dropbox, setDropbox] = useState(null);

  const getFolderList = async (dropbox, path) => {
    return await dropbox.filesListFolder({ path });
  };

  const getThumbnails = async (dropbox, params) => {
    return await dropbox.filesGetThumbnailBatch(params);
  };

  const getSharedLink = async (dropbox, path) => {
    return await dropbox.sharingCreateSharedLink({ path });
  };

  const getData = async (dropbox, path) => {
    const data = await getFolderList(dropbox, path);

    const params = {
      entries: data.entries.map((e) => {
        const res = {
          path: e.path_lower,
          mode: "bestfit",
          size: "w480h320",
        };
        return res;
      }),
    };

    return await getThumbnails(dropbox, params);
  };

  const onSelect = async (dropbox, image) => {
    const { metadata } = image;

    const publicLink = await getSharedLink(dropbox, metadata.path_lower);
    let res = publicLink.url.substr(0, publicLink.url.length - 4);
    res += "raw=1";

    setModalVisible(false);
    return onPress(res);
  };

  const getCustom = async (dropbox) => {
    const { entries } = await getData(dropbox, "/PCM Connect/Custom");
    setCustom(entries);
  };

  const getChurch = async (dropbox) => {
    const { entries } = await getData(dropbox, "/PCM Connect/Church");
    setChurch(entries);
  };

  const getFriends = async (dropbox) => {
    const { entries } = await getData(dropbox, "/PCM Connect/Friends");
    setFriends(entries);
  };

  useEffect(() => {
    const dropBoxInstance = new Dropbox({
      accessToken:
        "Luh2ZW1kpzoAAAAAAAAAAdb4FVy2Af3ZrwK1zvE4cJ0FYFCHps6q4xBvx_zZr3F0",
      fetch,
    });

    setDropbox(dropBoxInstance);

    getCustom(dropBoxInstance);
    getChurch(dropBoxInstance);
    getFriends(dropBoxInstance);
  }, []);

  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <Screen style={styles.centeredView}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
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
        </View>

        <View style={styles.modalView}>
          <View style={{ flex: 1, backgroundColor: colors.light }}>
            <Title style={styles.modalText}>Custom</Title>
            <ScrollView horizontal>
              {custom.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onSelect(dropbox, image)}
                >
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      margin: 5,
                      resizeMode: "contain",
                    }}
                    source={{
                      uri: "data:image/jpeg;base64, " + image.thumbnail,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.modalView}>
          <View style={{ flex: 1, backgroundColor: colors.light }}>
            <Title style={styles.modalText}>Church</Title>
            <ScrollView horizontal>
              {church.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onSelect(dropbox, image)}
                >
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      margin: 5,
                      resizeMode: "contain",
                    }}
                    source={{
                      uri: "data:image/jpeg;base64, " + image.thumbnail,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.modalView}>
          <View style={{ flex: 1, backgroundColor: colors.light }}>
            <Title style={styles.modalText}>Friends</Title>
            <ScrollView horizontal>
              {friends.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onSelect(dropbox, image)}
                >
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      margin: 5,
                      resizeMode: "contain",
                    }}
                    source={{
                      uri: "data:image/jpeg;base64, " + image.thumbnail,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Screen>
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    padding: 10,
  },
});

export default DropBoxModal;
