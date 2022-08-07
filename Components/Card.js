import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useRef, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
const Card = ({ item, content }) => {
    const refRBSheet = useRef();


    return (
        <View style={styles.container}>
            <Text>{item.publishedAt}</Text>
            <Text style={{ fontSize: 20 }}>{item.title}</Text>

            {item.image !== null ? <Image source={{ uri: item.urlToImage }} style={{ height: 100, width: '100%' }} /> : <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdVu2F4-i-uXdkSK3CsBscHBrUUe1R0_bELNoSaRpD&s' }} style={{ height: 60, width: '100%' }} />}
            <Button onPress={async () => {
                await WebBrowser.openBrowserAsync(`${item.url}`)
            }} title='Open'>

            </Button>
            <Text style={{ fontSize: 18, margin: 10 }}>{item.description}</Text>
            <Text>{item.source.name}</Text>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={400}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <View>
                    <Image source={{ uri: item.image }} style={{ height: 60, width: '100%' }} />
                </View>
            </RBSheet>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: 'lightblue',
        borderRadius: 10


    }
})