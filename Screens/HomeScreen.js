import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import Card from '../Components/Card'
import React from 'react'
import axios from 'axios'
import NewsApi from '../APi/NewsApi'

const HomeScreen = () => {
    const [news, setNews] = useState([])
    const [newsSource, setNewsSource] = useState([])
    const [newsfetched, setNewsfetched] = useState(false)


    const FetchNewsbySource = (source) => {
        setNewsfetched(true)
        NewsApi.get(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=3d77db050aa84253bbe2420817fcd3bf`)
            .then(async function (response) {
                setNewsSource(response.data)


            })
            .catch(function (error) {
                console.log(error)
            })


    }
    const fechNews = () => {
        setNewsfetched(false)
        NewsApi.get('top-headlines?country=us&apiKey=3d77db050aa84253bbe2420817fcd3bf')
            .then(async function (response) {
                setNews(response.data.articles)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(() => {
        // if

        // NewsApi.get('top-headlines?country=us&apiKey=3d77db050aa84253bbe2420817fcd3bf')
        //     .then(async function (response) {
        //         setNews(response.data.articles)
        //     })
        //     .catch(function (error) {
        //         console.log(error)
        //     })


    }, [])
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>Trending  News Latest</Text>
            <ScrollView horizontal={true} contentContainerStyle={{ justifyContent: 'space-evenly', margin: 0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity onPress={fechNews}>
                        <View
                            style={{ height: 30, width: '100%', borderColor: 'redrgba(70, 102, 167, 0.7)', borderWidth: 1, borderRadius: 10, alignItems: 'center', margin: 20, justifyContent: 'center', backgroundColor: 'rgba(70, 167, 249, 0.2)' }}
                        >
                            <Text style={{ fontSize: 20, justifyContent: 'space-between' }}>All</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => FetchNewsbySource('bbc-news')}>
                        <View
                            style={{ height: 30, width: '100%', borderColor: 'redrgba(70, 102, 167, 0.7)', borderWidth: 1, borderRadius: 10, alignItems: 'center', margin: 20, justifyContent: 'center', backgroundColor: 'rgba(70, 167, 249, 0.2)' }}
                        >
                            <Text style={{ fontSize: 20, justifyContent: 'space-between' }}>BBC</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => FetchNewsbySource('cnn')}>
                        <View style={{ height: 30, width: '100%', borderColor: 'redrgba(70, 102, 167, 0.7)', borderWidth: 1, borderRadius: 10, alignItems: 'center', margin: 20, justifyContent: 'center', backgroundColor: 'rgba(70, 167, 249, 0.2)' }}>
                            <Text style={{ fontSize: 20, justifyContent: 'space-between' }}>CNN</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => FetchNewsbySource('the-washington-post')}>
                        <View style={{ height: 30, width: '100%', borderColor: 'redrgba(70, 102, 167, 0.7)', borderWidth: 1, borderRadius: 10, alignItems: 'center', margin: 20, justifyContent: 'center', backgroundColor: 'rgba(70, 167, 249, 0.2)' }}>
                            <Text style={{ fontSize: 20, justifyContent: 'space-between' }}>Washington Post</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => FetchNewsbySource('fox-news')}>
                        <View style={{ height: 30, width: '100%', borderColor: 'redrgba(70, 102, 167, 0.7)', borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', margin: 20, backgroundColor: 'rgba(70, 167, 249, 0.2)' }}>
                            <Text style={{ fontSize: 20, justifyContent: 'space-between' }}>Fox News</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => FetchNewsbySource('the-wall-street-journal')}>
                        <View style={{ height: 30, width: '100%', borderColor: 'redrgba(70, 102, 167, 0.7)', borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', margin: 20, backgroundColor: 'rgba(70, 167, 249, 0.2)' }}>
                            <Text style={{ fontSize: 20, justifyContent: 'space-between' }}>The Wall Street Journal</Text>
                        </View>
                    </TouchableOpacity>
                </View></ScrollView>


            <FlatList
                data={newsfetched ? newsSource.articles : news}
                keyExtractor={(item, index) => 'key' + index}
                initialNumToRender={10}
                renderItem={({ item }) => (
                    <View>
                        <Card item={item} />
                    </View>


                )}
            />


        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        backgroundColor: 'rgb(240, 240, 240)'
    },
    scroll: {
        marginBottom: 60
    }
}) 