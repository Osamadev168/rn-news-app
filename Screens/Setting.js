import { StyleSheet, Text, View, Switch } from 'react-native'
import React, { useState } from 'react'

const Setting = () => {
    const [enable, setEnable] = useState(false)
    const toggleSwitch = () => {
        setEnable(previousState => !previousState);


    }
    return (
        <View style={{ marginTop: 50, alignItems: 'center', backgroundColor: 'dark' }}>
            <Text>Setting</Text>
            <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={enable ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={enable} />
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({})