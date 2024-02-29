import React from 'react';
import Search from './component/Search'
import Banner from './assets/Banner.png'
import { Image, StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={Banner} />
        <View style={styles.search} >
          <Search />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 0,
    width: '100%',
    height: 170,
  },
  search: {
    flex: 4,
  },
});