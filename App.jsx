import React from 'react';
import Search from './component/Search'
import Banner from './assets/Banner.png'
import Footer from './assets/footer.jpg'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.banner} source={Banner} />
        <View style={styles.search} >
          <Search />
        </View>
        <TouchableOpacity onPress={prevState => !prevState}>
          <Image style={styles.footer} source={Footer} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    flex: 0,
    width: '100%',
    height: 170,
  },
  footer: {
    flex: 0,
    objectFit: 'cover',
    width: '100%',
    height: 70,
  },
  search: {
    flex: 4,
  },
});