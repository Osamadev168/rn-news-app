import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Share,
  Modal,
} from "react-native";
import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { useRef, useEffect, useState } from "react";
import Moment from "moment";
import * as WebBrowser from "expo-web-browser";
const Card = ({ item, content }) => {
  const refRBSheet = useRef();

  const [modalVisible, setModalVisible] = useState(false);
  const handleShare = () => {
    const { url, title } = item; //get url and title form our prop
    var message = `${title} \n\n Read More ${url} \n\n Shared via The Muneer Bhai News`; // custome message
    return Share.share(
      { title, message, url: message },
      { dialogTitle: `Share ${title}` }
    );
  };
  return (
    <View style={styles.container}>
      <Text>{Moment(item.publishedAt).format("d MMM")}</Text>
      <Text style={{ fontSize: 20 }}>{item.title}</Text>

      {item.image !== null ? (
        <Image
          source={{ uri: item.urlToImage }}
          style={{ height: 100, width: "100%" }}
        />
      ) : (
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdVu2F4-i-uXdkSK3CsBscHBrUUe1R0_bELNoSaRpD&s",
          }}
          style={{ height: 60, width: "100%" }}
        />
      )}
      <Button
        onPress={async () => {
          await WebBrowser.openBrowserAsync(`${item.url}`);
        }}
        title="Open"
      ></Button>
      <Text style={{ fontSize: 18, margin: 10 }}>{item.description}</Text>
      <Text>{item.source.name}</Text>
      <Button onPress={() => setModalVisible(true)} title="share"></Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        statusBarTranslucent={false}
      >
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            marginTop: 5,
            overflow: "hidden",
            flexDirection: "column",
          }}
        >
          <View>
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
              color={"#252525"}
            />
            <Button title="Share" onPress={handleShare} color={"#DA3349"} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "rgba(25, 75, 188, 0.3)",
    borderRadius: 20,
    backgroundColor: "rgba(25, 75, 255, 0.1)",
    boxShadow: "0 10 10px rgba(0,0,0,1)",
  },
});
