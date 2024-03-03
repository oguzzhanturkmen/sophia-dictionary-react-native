import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { router } from 'expo-router';

const width = Dimensions.get('window').width;

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeftIcon size="38" strokeWidth={2.5} color="#80c04e" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Post</Text>
      <View style={{ width: 40 }} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingBottom: 15,
  },
  backButton: { marginLeft: -8 },
  headerTitle: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    width: width * 0.8,
    fontWeight: 'bold',
  },
});

export default Header;
