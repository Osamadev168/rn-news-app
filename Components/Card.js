import {
  StyleSheet,
  Text,
  View,
  Image,
  Share,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Moment from "moment";
import * as WebBrowser from "expo-web-browser";
const Card = ({ item }) => {
  const handleShare = () => {
    const { url, title } = item; //get url and title form our prop
    var message = `${title} \n\n Read more on this ${url} \n\n Shared via React Native News App`; // custome message
    return Share.share(
      { title, message, url: message },
      { dialogTitle: `Share ${title}` }
    );
  };
  const openBrowser = async () => {
    await WebBrowser.openBrowserAsync(`${item.url}`);
  };
  return (
    <View style={styles.container}>
      <Text>{Moment(item.publishedAt).format("d MMM")}</Text>
      <Text style={styles.title}>{item.title}</Text>

      {item.image === null ? (
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdVu2F4-i-uXdkSK3CsBscHBrUUe1R0_bELNoSaRpD&s",
          }}
          style={styles.image}
        />
      ) : (
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      )}

      <Text style={styles.descriptionText}>{item.description}</Text>
      <Text style={styles.sourceText}>{item.source.name}</Text>

      <TouchableOpacity onPress={openBrowser}>
        <View style={styles.openBrowserButton}>
          <Text style={styles.buttonText}>More</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShare}>
        <View style={styles.shareButton}>
          <Text style={styles.buttonText}>Share</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "rgba(25, 75, 188, 0.3)",
    borderRadius: 20,
    backgroundColor: "rgba(25, 75, 255, 0.1)",
  },
  shareButton: {
    width: "100%",
    height: 30,
    borderColor: "purple",
    backgroundColor: "rgb(163, 153, 219)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "400",
  },
  openBrowserButton: {
    width: "100%",
    height: 30,
    borderColor: "purple",
    backgroundColor: "rgb(163, 216, 219)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 18,
    color: "rgb(90, 90, 90)",
    fontWeight: "500",
    padding: 10,
    marginTop: 10,
  },
  image: {
    height: 100,
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
    opacity: 0.9,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  sourceText: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },
});
