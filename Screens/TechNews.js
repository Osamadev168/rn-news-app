import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Card from '../Components/Card'
import { useState, useEffect } from 'react'
import NewsApi from '../APi/NewsApi'
const TechNews = () => {
    const [techNews, setTechNews] = useState([])
    const FetchNews = () => {
        NewsApi.get('https://newsapi.org/v2/everything?q=tech&apiKey=3d77db050aa84253bbe2420817fcd3bf')
            .then(async (response) => {
                setTechNews(response.data.articles)
            }).catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        FetchNews()
    }, [])
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, margin: 20 }}>Tech News Latest</Text>
            <FlatList
                data={techNews}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item }) => (
                    <View>
                        <Card item={item} />
                    </View>


                )}
            />
        </View>
    )
}

export default TechNews

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    }
})