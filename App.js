import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, Button } from 'react-native';
import { useState, useEffect } from 'react';
import NewsApi from './APi/NewsApi';
import Card from './Components/Card';
import Navigation from './Navigation/Navigation';
export default function App() {

  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
