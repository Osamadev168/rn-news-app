import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import Card from "../Components/Card";
import React from "react";
import axios from "axios";
import NewsApi from "../APi/NewsApi";

const Articles = () => {
  const [news, setNews] = useState([]);
  const [q, setq] = useState([]);
  const [newsSource, setNewsSource] = useState([]);
  const [newsfetched, setNewsfetched] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState([]);
  const [getsearch, setgetSearch] = useState(false);

  const searchNews = async (s) => {
    await NewsApi.get(
      `everything?q=${s}&apiKey=3d77db050aa84253bbe2420817fcd3bf`
    )
      .then(async function (response) {
        setq(response.data.articles);
        console.log(q);

        setgetSearch(true);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setShowSearch(false);
      });
  };
  const FetchNews = () => {
    NewsApi.get(
      "everything?q=articles&from=2022-08-07&sortBy=popularity&language=en&apiKey=3d77db050aa84253bbe2420817fcd3bf"
    )
      .then(async function (response) {
        setNews(response.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const FetchNewsbySource = (source) => {
    setNewsfetched(true);
    NewsApi.get(
      `https://newsapi.org/v2/top-headlines?category=${source}&language=en&apiKey=3d77db050aa84253bbe2420817fcd3bf`
    )
      .then(async function (response) {
        setNewsSource(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const renderSearchBox = () => {
    if (showSearch === false) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };
  const fechNews = () => {
    setNewsfetched(false);
    NewsApi.get(
      "top-headlines?country=gb&apiKey=3d77db050aa84253bbe2420817fcd3bf"
    )
      .then(async function (response) {
        setNews(response.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // FetchNews()
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, margin: 20 }}>Latest Articles</Text>
      <View style={{ margin: 10 }}>
        <TouchableOpacity onPress={renderSearchBox}>
          <View
            style={{
              height: 30,
              width: "100%",
              borderColor: "redrgba(70, 102, 167, 0.7)",
              borderWidth: 1,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(70, 167, 249, 0.2)",
            }}
          >
            <Text style={{ fontSize: 20, justifyContent: "space-between" }}>
              Search
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {showSearch ? (
        <View>
          <View
            style={{
              backgroundColor: "rgba(142, 201, 255, 0.2)",
              borderRadius: 10,
              margin: 10,
              padding: 10,
            }}
          >
            <TextInput
              style={{ height: 20, width: "100%", fontSize: 20 }}
              onChangeText={(s) => setSearch(s)}
            ></TextInput>
          </View>

          <Button
            title="Search"
            color="rgba(142, 201, 255, 0.8)"
            onPress={() => searchNews(search)}
          ></Button>
        </View>
      ) : null}

      <ScrollView
        horizontal={true}
        contentContainerStyle={{ justifyContent: "space-evenly", margin: 0 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity onPress={fechNews}>
            <View
              style={{
                height: 30,
                width: "100%",
                borderColor: "redrgba(70, 102, 167, 0.7)",
                borderWidth: 1,
                borderRadius: 10,
                alignItems: "center",
                margin: 20,
                justifyContent: "center",
                backgroundColor: "rgba(70, 167, 249, 0.2)",
              }}
            >
              <Text style={{ fontSize: 20, justifyContent: "space-between" }}>
                All
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => FetchNewsbySource("business")}>
            <View
              style={{
                height: 30,
                width: "100%",
                borderColor: "redrgba(70, 102, 167, 0.7)",
                borderWidth: 1,
                borderRadius: 10,
                alignItems: "center",
                margin: 20,
                justifyContent: "center",
                backgroundColor: "rgba(70, 167, 249, 0.2)",
              }}
            >
              <Text style={{ fontSize: 20, justifyContent: "space-between" }}>
                Business
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => FetchNewsbySource("sports")}>
            <View
              style={{
                height: 30,
                width: "100%",
                borderColor: "redrgba(70, 102, 167, 0.7)",
                borderWidth: 1,
                borderRadius: 10,
                alignItems: "center",
                margin: 20,
                justifyContent: "center",
                backgroundColor: "rgba(70, 167, 249, 0.2)",
              }}
            >
              <Text style={{ fontSize: 20, justifyContent: "space-between" }}>
                Sports
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => FetchNewsbySource("Science")}>
            <View
              style={{
                height: 30,
                width: "100%",
                borderColor: "redrgba(70, 102, 167, 0.7)",
                borderWidth: 1,
                borderRadius: 10,
                alignItems: "center",
                margin: 20,
                justifyContent: "center",
                backgroundColor: "rgba(70, 167, 249, 0.2)",
              }}
            >
              <Text style={{ fontSize: 20, justifyContent: "space-between" }}>
                Science
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => FetchNewsbySource("entertainment")}>
            <View
              style={{
                height: 30,
                width: "100%",
                borderColor: "redrgba(70, 102, 167, 0.7)",
                borderWidth: 1,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                margin: 20,
                backgroundColor: "rgba(70, 167, 249, 0.2)",
              }}
            >
              <Text style={{ fontSize: 20, justifyContent: "space-between" }}>
                Entertainment
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => FetchNewsbySource("health")}>
            <View
              style={{
                height: 30,
                width: "100%",
                borderColor: "redrgba(70, 102, 167, 0.7)",
                borderWidth: 1,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                margin: 20,
                backgroundColor: "rgba(70, 167, 249, 0.2)",
              }}
            >
              <Text style={{ fontSize: 20, justifyContent: "space-between" }}>
                Health
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FlatList
        style={styles.scroll}
        data={newsfetched ? newsSource.articles : news}
        keyExtractor={(item, index) => "key" + index}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <View>
            <Card item={item} />
          </View>
        )}
      />
      <FlatList
        style={styles.scroll}
        data={getsearch ? q : null}
        keyExtractor={(item, index) => "key" + index}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <View>
            <Card item={item} />
          </View>
        )}
      />
      {/* <ScrollView showsVerticalScrollIndicator={false} horizontal={false} style={styles.scroll}>
                {news.map((item, key) => (
                    <Card key={key} item={item} />
                ))}
            </ScrollView> */}
    </View>
  );
};

export default Articles;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: "rgb(240, 240, 240)",
  },
  scroll: {
    marginBottom: 150,
  },
});
