import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";
import Title from "./../../components/Title";
import { OutLineButton } from "./../../components/button";

import { NavBack } from "./../../components/nav";
import routes from "../../navigation/routes";

import { IMLocalized } from "./../../config/IMLocalized";

import { Dropbox } from "dropbox";

function DropBoxImagePicker({ navigation }) {
  const [customPictures, setCustomPictures] = useState([]);
  const [churchPictures, setChurchPictures] = useState([]);
  const [friendsPictures, setFriendsPictures] = useState([]);

  const dbx = new Dropbox({
    accessToken:
      "OOYsPivpbOAAAAAAAAABOQtqNjZ42vQGmgbGYrf95kdNKC4QXXTvBNS8l3T8EMnk",
  });

  const getFilesDropBox = async () => {
    const cps = await getData("/PCM Connect/Custom");
    const chps = await getData("/PCM Connect/Church");
    const fps = await getData("/PCM Connect/Friends");

    setCustomPictures(cps);
    setChurchPictures(chps);
    setFriendsPictures(fps);
  };

  const getData = async (path) => {
    const list = await getFolderList(path);
    const params = {
      entries: list.entries.map((e) => {
        const res = {
          path: e.path_lower,
          mode: "bestfit",
          size: "w480h320",
        };
        return res;
      }),
    };

    return await getThumbnails(params);
  };

  const getFolderList = async (path) => {
    return await dbx.filesListFolder({ path });
  };

  const getThumbnails = async (params) => {
    return await dbx.filesGetThumbnailBatch(params);
  };

  const getSharedLink = async (path) => {
    return await dbx.sharingCreateSharedLink({ path });
  };

  const selectPicture = (picture) => {
    const { metadata } = picture;

    selectedPicture = metadata.id;
    selectPictureMetadata = metadata;
  };

  const usePicture = async () => {
    const publicLink = await getSharedLink(selectPictureMetadata.path_lower);

    let res = publicLink.url.substr(0, publicLink.url.length - 4);
    res += "raw=1";

    return res;
  };

  return (
    <Screen style={styles.screen}>
      <NavBack />
      <ScrollView style={styles.scrollView}>
        <Title> Church</Title>
        {}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.background,
  },
  scrollView: {
    zIndex: -1,
  },
  filterList: {
    marginBottom: 30,
    overflow: "visible",
    zIndex: -1,
  },
  noticesList: {
    zIndex: -1,
  },
});

export default DropBoxImagePicker;
