import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import Card from "../Components/Card";
import React from "react";
import axios from "axios";
import NewsApi from "../APi/NewsApi";

const Articles = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [q, setq] = useState([]);
  const [newsSource, setNewsSource] = useState([]);
  const [newsfetched, setNewsfetched] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState([]);
  const [getsearch, setgetSearch] = useState(false);

  const searchNews = async (s) => {
    await NewsApi.get(
      `everything?q=${s}&language=en&sortBy=publishedAt&apiKey=3d77db050aa84253bbe2420817fcd3bf`
    )
      .then(async function (response) {
        setq(response.data.articles);
        setLoading(true);

        setgetSearch(true);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setShowSearch(false);
        setLoading(false);
      });
  };
  const FetchNews = () => {
    NewsApi.get(
      "everything?q=articles&sortBy=popularity&language=en&apiKey=3d77db050aa84253bbe2420817fcd3bf"
    )
      .then(async function (response) {
        setNews(response.data.articles);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const FetchNewsbySource = (source) => {
    NewsApi.get(
      `top-headlines?category=${source}&language=en&apiKey=3d77db050aa84253bbe2420817fcd3bf`
    )
      .then(async function (response) {
        setNewsSource(response.data);
        setNewsfetched(true);

        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
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
    FetchNews();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Latest Articles</Text>
      <View style={{ margin: 10 }}>
        <TouchableOpacity onPress={renderSearchBox}>
          <View style={styles.searchButton1}>
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

          <TouchableOpacity onPress={() => searchNews(search)}>
            <View style={styles.searchButton2}>
              <Text style={{ fontSize: 15 }}>Done</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.catagoriesContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={fechNews}>
              <View style={styles.catagoriesText}>
                <Text style={{ fontSize: 20, justifyContent: "space-between" }}>
                  All
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => FetchNewsbySource("business")}>
              <View style={styles.catagoriesText}>
                <Text style={styles.innerText}>Business</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => FetchNewsbySource("sports")}>
              <View style={styles.catagoriesText}>
                <Text style={styles.innerText}>Sports</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => FetchNewsbySource("Science")}>
              <View style={styles.catagoriesText}>
                <Text style={styles.innerText}>Science</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => FetchNewsbySource("entertainment")}
            >
              <View style={styles.catagoriesText}>
                <Text style={styles.innerText}>Entertainment</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => FetchNewsbySource("health")}>
              <View style={styles.catagoriesText}>
                <Text style={styles.innerText}>Health</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

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
  headerText: {
    fontSize: 30,
    margin: 20,
  },
  searchButton1: {
    height: 30,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(70, 167, 249, 0.2)",
  },
  searchButton2: {
    height: 30,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(163, 177, 255)",
  },
  scroll: {},
  catagoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  catagoriesText: {
    height: 30,
    width: "100%",
    borderColor: "redrgba(70, 102, 167, 0.7)",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
    justifyContent: "center",
    backgroundColor: "rgba(70, 167, 249, 0.2)",
  },
  innerText: {
    fontSize: 20,
    justifyContent: "space-between",
  },
});
