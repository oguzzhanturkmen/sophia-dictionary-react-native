import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { setRefresh } from '../../../api/api';

import { useState } from 'react';

const ProfileScreenHeader = ({router, username}) => {
   
  const handleBackPress = () => router.back();

  return (
    <View>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            className="rounded-xl p-1"
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <ChevronLeftIcon size="38" strokeWidth={2.5} color="#80c04e" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.titleContainer}
            
          >
            <Text style={styles.titleText}>{username}</Text>
          </TouchableOpacity>

          <View style={styles.placeholderView}></View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#191919',
    marginBottom: -30, 
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingBottom: 15,
  },
  backButton: {
    marginLeft: 8,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  placeholderView: {
    width: 38,
  },
});

export default React.memo(ProfileScreenHeader);
